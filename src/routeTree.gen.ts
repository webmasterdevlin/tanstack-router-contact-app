/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ContactsContactIdIndexImport } from './routes/contacts.$contactId.index'
import { Route as ContactsContactIdEditImport } from './routes/contacts.$contactId.edit'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ContactsContactIdIndexRoute = ContactsContactIdIndexImport.update({
  path: '/contacts/$contactId/',
  getParentRoute: () => rootRoute,
} as any)

const ContactsContactIdEditRoute = ContactsContactIdEditImport.update({
  path: '/contacts/$contactId/edit',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/contacts/$contactId/edit': {
      id: '/contacts/$contactId/edit'
      path: '/contacts/$contactId/edit'
      fullPath: '/contacts/$contactId/edit'
      preLoaderRoute: typeof ContactsContactIdEditImport
      parentRoute: typeof rootRoute
    }
    '/contacts/$contactId/': {
      id: '/contacts/$contactId/'
      path: '/contacts/$contactId'
      fullPath: '/contacts/$contactId'
      preLoaderRoute: typeof ContactsContactIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/contacts/$contactId/edit': typeof ContactsContactIdEditRoute
  '/contacts/$contactId': typeof ContactsContactIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/contacts/$contactId/edit': typeof ContactsContactIdEditRoute
  '/contacts/$contactId': typeof ContactsContactIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/contacts/$contactId/edit': typeof ContactsContactIdEditRoute
  '/contacts/$contactId/': typeof ContactsContactIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/contacts/$contactId/edit' | '/contacts/$contactId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/contacts/$contactId/edit' | '/contacts/$contactId'
  id: '__root__' | '/' | '/contacts/$contactId/edit' | '/contacts/$contactId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ContactsContactIdEditRoute: typeof ContactsContactIdEditRoute
  ContactsContactIdIndexRoute: typeof ContactsContactIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ContactsContactIdEditRoute: ContactsContactIdEditRoute,
  ContactsContactIdIndexRoute: ContactsContactIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/contacts/$contactId/edit",
        "/contacts/$contactId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/contacts/$contactId/edit": {
      "filePath": "contacts.$contactId.edit.tsx"
    },
    "/contacts/$contactId/": {
      "filePath": "contacts.$contactId.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
