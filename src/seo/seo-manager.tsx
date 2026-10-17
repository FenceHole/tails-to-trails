import { useEffect } from 'react';
import { buildHeadTags, getPageHead, type PageHead } from './head';
import { SEO_ATTR } from './render-head';

function applyHead(head: PageHead): void {
  document.title = head.title;
  document.head
    .querySelectorAll(`[${SEO_ATTR}]`)
    .forEach((element) => element.remove());
  for (const { tag, attrs, text } of buildHeadTags(head)) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value);
    }
    element.setAttribute(SEO_ATTR, '1');
    if (text) element.textContent = text;
    document.head.appendChild(element);
  }
}

/**
 * Every route is prerendered with its own head, so crawlers never need this.
 * It keeps the tab title, canonical and share tags correct while a visitor
 * clicks around without a page load, and covers the dev server where
 * nothing is prerendered.
 */
export function SeoManager(): null {
  useEffect(() => {
    let lastPath: string | null = null;

    const sync = () => {
      const path = window.location.pathname;
      if (path === lastPath) return;
      const first = lastPath === null;
      lastPath = path;
      const head = getPageHead(path);
      // Prerendered head is already correct on first load: leave it alone.
      if (
        first &&
        document.head.querySelector(`[${SEO_ATTR}]`) &&
        document.title === head.title
      ) {
        return;
      }
      applyHead(head);
    };

    sync();
    const events = ['popstate', 'pushState', 'replaceState'] as const;
    events.forEach((name) => window.addEventListener(name, sync));
    return () => {
      events.forEach((name) => window.removeEventListener(name, sync));
    };
  }, []);

  return null;
}
