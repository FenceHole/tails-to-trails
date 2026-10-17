import {
  BUSINESS,
  PAGES,
  pageUrl,
  type PageKey,
} from '@/content/site';
import { OG_IMAGE_ALT, OG_IMAGE_URL, buildJsonLd } from './schema';

export interface PageHead {
  title: string;
  description: string;
  /** Absolute canonical URL, or null for pages that must not have one (404). */
  canonical: string | null;
  robots: string;
  /** Serialized JSON-LD, or null. */
  jsonLd: string | null;
}

export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  /** Raw text content (scripts only). */
  text?: string;
}

const ROBOTS_INDEX = 'index, follow, max-image-preview:large';

const NOT_FOUND_HEAD: PageHead = {
  title: `Page not found | ${BUSINESS.name}`,
  description:
    'That page could not be found. Tails to Trails offers dog walking, pet sitting, boarding and cat sitting in Pittsburgh, PA.',
  canonical: null,
  robots: 'noindex, follow',
  jsonLd: null,
};

/** "/dog-walking-pittsburgh" -> "/dog-walking-pittsburgh/"; strips base, query and hash. */
export function normalizePath(input: string): string {
  let path = input.split('#')[0]!.split('?')[0]!;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length);
  }
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  return path.replace(/\/{2,}/g, '/');
}

const PAGE_KEY_BY_PATH = new Map<string, PageKey>(
  (Object.values(PAGES) as { key: PageKey; path: string }[]).map((page) => [
    page.path,
    page.key,
  ]),
);

export function resolvePageKey(pathname: string): PageKey | null {
  return PAGE_KEY_BY_PATH.get(normalizePath(pathname)) ?? null;
}

export function getPageHead(pathname: string): PageHead {
  const key = resolvePageKey(pathname);
  if (!key) return NOT_FOUND_HEAD;
  const page = PAGES[key];
  return {
    title: page.title,
    description: page.description,
    canonical: pageUrl(key),
    robots: ROBOTS_INDEX,
    jsonLd: buildJsonLd(key),
  };
}

function meta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): HeadTag {
  return { tag: 'meta', attrs: { [attr]: key, content } };
}

/**
 * Every tag that goes in <head> besides <title>. The prerender step renders
 * this list to a string and the client updater applies the same list after
 * in-app navigation, so the two can never disagree.
 */
export function buildHeadTags(head: PageHead): HeadTag[] {
  const tags: HeadTag[] = [
    meta('name', 'description', head.description),
    meta('name', 'robots', head.robots),
  ];
  if (head.canonical) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: head.canonical } });
  }
  tags.push(
    meta('property', 'og:site_name', BUSINESS.name),
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', head.title),
    meta('property', 'og:description', head.description),
  );
  if (head.canonical) tags.push(meta('property', 'og:url', head.canonical));
  tags.push(
    meta('property', 'og:image', OG_IMAGE_URL),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', OG_IMAGE_ALT),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', head.title),
    meta('name', 'twitter:description', head.description),
    meta('name', 'twitter:image', OG_IMAGE_URL),
    meta('name', 'twitter:image:alt', OG_IMAGE_ALT),
  );
  if (head.jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: head.jsonLd,
    });
  }
  return tags;
}
