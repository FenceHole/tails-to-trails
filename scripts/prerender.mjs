/**
 * Static prerender, run after `vite build` (client) and `vite build --ssr`.
 *
 * Writes one fully rendered HTML file per route (dist/public/<route>/index.html),
 * a 404.html, sitemap.xml and robots.txt. Search engines and link previews get
 * real content and per-page <title>, canonical and JSON-LD without running JS;
 * the browser then hydrates the same markup.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist', 'public');
const serverDir = path.join(root, 'dist', 'server');
const base = `${(process.env.BASE_PATH || '/').replace(/\/+$/, '')}/`;

async function loadServerEntry() {
  const file = (await readdir(serverDir)).find((name) =>
    /^entry-server\.m?js$/.test(name),
  );
  if (!file) {
    throw new Error(`Prerender: no SSR bundle found in ${serverDir}`);
  }
  return import(pathToFileURL(path.join(serverDir, file)).href);
}

/** Preload the Latin web fonts so text paints in the right face on first render. */
async function fontPreloadTags() {
  let files = [];
  try {
    files = await readdir(path.join(clientDir, 'assets'));
  } catch {
    return [];
  }
  const latin = files
    .filter(
      (name) =>
        name.endsWith('.woff2') &&
        /-latin-/.test(name) &&
        !/-latin-ext-/.test(name) &&
        !/italic/.test(name),
    )
    .sort()
    .slice(0, 4);
  return latin.map(
    (name) =>
      `<link rel="preload" href="${base}assets/${name}" as="font" type="font/woff2" crossorigin>`,
  );
}

function requireMarker(template, marker) {
  if (!template.includes(marker)) {
    throw new Error(`Prerender: ${marker} missing from dist/public/index.html`);
  }
}

async function main() {
  const { render, ROUTES, NOT_FOUND_PATH, SITE_URL } = await loadServerEntry();

  const rawTemplate = await readFile(path.join(clientDir, 'index.html'), 'utf8');
  requireMarker(rawTemplate, '<!--app-head-->');
  requireMarker(rawTemplate, '<!--app-html-->');

  // The dev-only fallback <title> is replaced by the per-route head below.
  const template = rawTemplate.replace(
    /<!--dev-head-->[\s\S]*?<!--\/dev-head-->\s*/,
    '',
  );
  const preloads = await fontPreloadTags();

  requireMarker(template, '<div id="root">');

  /**
   * `ssrKey` is stamped on #root so the browser only hydrates markup that was
   * rendered for the URL it is on: the route path, or "*" for the 404 view.
   * Hosts that answer an unknown URL with some other page's HTML get a fresh
   * client render instead of a hydration mismatch.
   */
  const buildPage = (url, ssrKey) => {
    const { html, head } = render(url);
    // Function replacers: page text contains "$" (prices) which String.replace
    // would otherwise treat as a substitution pattern.
    return template
      .replace('<!--app-head-->', () => [head, ...preloads].join('\n    '))
      .replace('<div id="root">', () => `<div id="root" data-ssr-path="${ssrKey}">`)
      .replace('<!--app-html-->', () => html);
  };

  for (const route of ROUTES) {
    const outFile =
      route === '/'
        ? path.join(clientDir, 'index.html')
        : path.join(clientDir, route.replace(/^\/|\/$/g, ''), 'index.html');
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, buildPage(route, route));
    console.log(`prerendered ${route}`);
  }

  await writeFile(path.join(clientDir, '404.html'), buildPage(NOT_FOUND_PATH, '*'));
  console.log('prerendered 404.html');

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...ROUTES.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(path.join(clientDir, 'sitemap.xml'), sitemap);

  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  await writeFile(path.join(clientDir, 'robots.txt'), robots);

  console.log(`sitemap.xml and robots.txt written for ${SITE_URL}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
