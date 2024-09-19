import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import ErrorPage from './components/ErrorPage';
import NotFoundPage from './components/NotFoundPage';

const router = createRouter({
  defaultPreload: 'intent', // Preloading by "intent" works by using hover and touch start events on <Link> components to preload the dependencies for the destination route.
  defaultNotFoundComponent: () => <NotFoundPage />,
  defaultErrorComponent: () => <ErrorPage />,
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router; // merge your router's exact types with exported hooks, components, and utilities.
  }
}

function InnerApp() {
  // add context from authentication library like MSAL
  return <RouterProvider router={router} />;
}

function App() {
  return (
    // providers
    <InnerApp />
  );
}
export default App;
