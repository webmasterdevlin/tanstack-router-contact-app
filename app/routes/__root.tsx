// app/routes/__root.tsx
import {
    Outlet,
    ScrollRestoration,
    createRootRoute,
    useRouter,
} from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import SidebarContactList from '../components/SidebarContactList';
import SidebarFooter from '../components/SidebarFooter';
import SidebarSearchContact from '../components/SidebarSearchContact';
import { z } from 'zod';
import { Contact } from '../models';
import { getContacts } from '../services/contacts';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
    }),
    component: RootComponent,
    validateSearch: z.object({
        q: z.string().optional(),
    }),
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    // loaderDeps: ({ search: { q } }) => {
    //     return { q };
    // },
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    loader: async ({ deps: { q } }) => {
        const contacts = (await getContacts(q || '')) as Contact[];

        return { contacts, q };
    },
})

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
    // const { q } = Route.useLoaderData();
    // const [query, setQuery] = useState(q ?? '');
    // const router = useRouter();

    // useEffect(() => {
    //     if (q) setQuery(q);
    // }, [q]);

    return (
        <RootDocument>
            <div id="sidebar">
                <SidebarFooter />

            </div>
            <div id="detail">
                <Outlet />
                <Suspense>
                    <TanStackRouterDevtools initialIsOpen={true} />
                </Suspense>
            </div>
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <Meta />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}
