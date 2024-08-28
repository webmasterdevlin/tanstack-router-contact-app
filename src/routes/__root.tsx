import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { lazy, Suspense, useEffect, useState } from 'react';
import { z } from 'zod';
import { getContacts } from '../services/contacts.ts';
import { Contact } from '../models.ts';
import Footer from '../components/sidebar/Footer.tsx';
import SearchContact from '../components/sidebar/SearchContact.tsx';
import ContactList from '../components/sidebar/ContactList.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loaderDeps: ({ search: { q } }) => {
    return { q };
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: async ({ deps: { q } }) => {
    const contacts = (await getContacts(q || '')) as Contact[];

    return { contacts, q };
  },
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

function RootComponent() {
  const { q } = Route.useLoaderData();
  const [query, setQuery] = useState(q ?? '');
  const router = useRouter();

  useEffect(() => {
    if (q) setQuery(q);
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <Footer />
        <SearchContact query={query} setQuery={setQuery} />
        <ContactList />
      </div>
      <div id="detail" className={router.state.isLoading ? 'loading' : ''}>
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  );
}
