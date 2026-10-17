import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { SeoManager } from '@/seo/seo-manager';

/**
 * The exact tree that is rendered to static HTML at build time and hydrated
 * in the browser. Server and client must both mount this, nothing else.
 */
export default function Root({ ssrPath }: { ssrPath?: string }) {
  return (
    <ErrorBoundary>
      <App ssrPath={ssrPath} />
      <SeoManager />
    </ErrorBoundary>
  );
}
