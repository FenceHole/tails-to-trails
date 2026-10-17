import { createRoot, hydrateRoot } from 'react-dom/client';

import Root from './root';
import { normalizePath, resolvePageKey } from './seo/head';

import './index.css';

const container = document.getElementById('root')!;

const options = {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error: unknown, errorInfo: { componentStack?: string }) => {
    console.error(error, errorInfo.componentStack);
  },
  onRecoverableError: (error: unknown) => {
    console.error('Recoverable render error:', error);
  },
};

/**
 * Production HTML is prerendered per route and stamped with the route it was
 * rendered for ("*" is the 404 view). Hydrate only when that matches the URL.
 * The dev server has no markup, and a host may answer an unknown URL with
 * another page's HTML; both get a fresh client render instead.
 */
function prerenderMatchesUrl(): boolean {
  const rendered = container.dataset.ssrPath;
  if (!rendered || !container.firstElementChild) return false;
  const here = normalizePath(window.location.pathname);
  return rendered === '*' ? resolvePageKey(here) === null : rendered === here;
}

if (prerenderMatchesUrl()) {
  hydrateRoot(container, <Root />, options);
} else {
  container.replaceChildren();
  createRoot(container, options).render(<Root />);
}
