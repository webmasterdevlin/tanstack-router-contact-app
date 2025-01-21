import globalStyle from '../styles/index.css?url';
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import {
    Outlet,
    ScrollRestoration,
    createRootRoute,
    useRouter,
} from '@tanstack/react-router'
import { z } from 'zod';
import { Meta, Scripts } from '@tanstack/start'
import { Contact } from '@/models';
import { getContactsFn } from '@/functions/contact';
import SidebarContactList from '@/components/SidebarContactList';
import SidebarFooter from '@/components/SidebarFooter';
import SidebarSearchContact from '@/components/SidebarSearchContact';


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
        links: [
            {
                rel: 'stylesheet',
                href: globalStyle
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
            { rel: 'icon', href: '/favicon.ico' },
        ]
    }),
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
        console.log("I am running in the server");

        const contacts = (await getContactsFn({ data: q || '' })) as Contact[];
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

export function RootComponent() {
    const { q } = Route.useLoaderData();
    const [query, setQuery] = useState(q ?? '');
    const router = useRouter();

    useEffect(() => {
        if (q) setQuery(q);
    }, [q]);

    return (
        <RootDocument>
            <div style={{ display: 'flex', width: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} id="sidebar">
                    <SidebarFooter />
                    <SidebarSearchContact query={query} setQuery={setQuery} />
                    <SidebarContactList />
                </div>
                <div id="detail" className={router.state.isLoading ? 'loading' : ''}>
                    <Outlet />
                </div>
                <Suspense>
                    <TanStackRouterDevtools position="bottom-right" />
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
