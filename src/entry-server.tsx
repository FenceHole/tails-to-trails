import { renderToString } from 'react-dom/server';
import Root from './root';
import { PAGES, SITE_URL } from '@/content/site';
import { getPageHead } from '@/seo/head';
import { renderHeadTags } from '@/seo/render-head';

/** Every indexable route, with trailing slash. scripts/prerender.mjs writes one HTML file per entry. */
export const ROUTES: string[] = Object.values(PAGES).map((page) => page.path);

/** Matches no page, so it renders the 404 view. Written out as 404.html. */
export const NOT_FOUND_PATH = '/404/';

export { SITE_URL };

export function render(url: string): { html: string; head: string } {
  return {
    html: renderToString(<Root ssrPath={url} />),
    head: renderHeadTags(getPageHead(url)),
  };
}
