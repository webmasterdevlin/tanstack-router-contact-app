import {
  createRootRoute,
  Link,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { FormEvent, lazy, Suspense, useEffect, useState } from 'react';
import { z } from 'zod';
import { createContact, getContacts } from '../services/contacts.ts';
import { Contact } from '../models.ts';

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
  const { contacts, q } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const router = useRouter();
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  const handleOnChangeEvent = async (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    await navigate({ search: { q: e.currentTarget.value } });
  };

  const action = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact = await createContact();
    await navigate({
      to: `/contacts/${contact.id}/edit`,
    });
  };

  return (
    <>
      <div id="sidebar">
        <h1>
          <a href="https://reactrouter.com/main/start/tutorial" target="_blank">
            React Router's Tutorial
          </a>
        </h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              className={router.state.isLoading ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value={query}
              onChange={handleOnChangeEvent}
            />
            <div
              id="search-spinner"
              hidden={!router.state.isLoading}
              aria-hidden
            />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form onSubmit={action}>
            <button type="submit">New</button>
          </form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`/contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
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
