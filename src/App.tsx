import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Layout } from '@/components/site-chrome';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';
import ServicePage from '@/pages/service';
import { routePattern } from '@/content/site';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path={routePattern('home')} component={Home} />
          <Route path={routePattern('dogWalking')}>
            <ServicePage pageKey="dogWalking" />
          </Route>
          <Route path={routePattern('packWalks')}>
            <ServicePage pageKey="packWalks" />
          </Route>
          <Route path={routePattern('boarding')}>
            <ServicePage pageKey="boarding" />
          </Route>
          <Route path={routePattern('catSitting')}>
            <ServicePage pageKey="catSitting" />
          </Route>
          <Route path={routePattern('yardCleanup')}>
            <ServicePage pageKey="yardCleanup" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

export default function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter
        base={import.meta.env.BASE_URL.replace(/\/$/, '')}
        ssrPath={ssrPath}
      >
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}
