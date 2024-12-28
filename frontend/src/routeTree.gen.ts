/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as testTestImport } from './routes/(test)/test_'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as authAuthImport } from './routes/(auth)/_auth'
import { Route as appParentsImport } from './routes/(app)/_parents'
import { Route as appKidsImport } from './routes/(app)/_kids'
import { Route as appExamplesImport } from './routes/(app)/_examples'
import { Route as testTestAImport } from './routes/(test)/test.a_'
import { Route as authAuthProfileImport } from './routes/(auth)/_auth.profile'
import { Route as authAuthDashboardImport } from './routes/(auth)/_auth.dashboard'
import { Route as appParentsParentsIndexImport } from './routes/(app)/_parents/parents.index'
import { Route as testTestASomethingImport } from './routes/(test)/test.a.something'
import { Route as testTestABImport } from './routes/(test)/test.a.b_'
import { Route as appParentsParentsManageImport } from './routes/(app)/_parents/parents.manage'
import { Route as appExamplesDemoTestingImport } from './routes/(app)/_examples/demo.testing'
import { Route as appExamplesDemoDialogsImport } from './routes/(app)/_examples/demo.dialogs'
import { Route as testTestABCImport } from './routes/(test)/test.a.b.c'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()
const appImport = createFileRoute('/(app)')()
const appUnauthorizedLazyImport = createFileRoute('/(app)/unauthorized')()
const appTermsLazyImport = createFileRoute('/(app)/terms')()
const appStatusLazyImport = createFileRoute('/(app)/status')()
const appPrivacyLazyImport = createFileRoute('/(app)/privacy')()
const appExamplesQueryLazyImport = createFileRoute('/(app)/_examples/query')()
const appExamplesFormLazyImport = createFileRoute('/(app)/_examples/form')()
const appExamplesDemoLazyImport = createFileRoute('/(app)/_examples/demo_')()
const appExamplesDemoTypographyLazyImport = createFileRoute(
  '/(app)/_examples/demo/typography',
)()
const appExamplesDemoTablesLazyImport = createFileRoute(
  '/(app)/_examples/demo/tables',
)()
const appExamplesDemoNavigationLazyImport = createFileRoute(
  '/(app)/_examples/demo/navigation',
)()
const appExamplesDemoLoadersLazyImport = createFileRoute(
  '/(app)/_examples/demo/loaders',
)()
const appExamplesDemoFormsLazyImport = createFileRoute(
  '/(app)/_examples/demo/forms',
)()
const appExamplesDemoDatabaseLazyImport = createFileRoute(
  '/(app)/_examples/demo/database',
)()
const appExamplesDemoContainersLazyImport = createFileRoute(
  '/(app)/_examples/demo/containers',
)()
const appExamplesDemoColorsLazyImport = createFileRoute(
  '/(app)/_examples/demo/colors',
)()
const appExamplesDemoBasicLazyImport = createFileRoute(
  '/(app)/_examples/demo/basic',
)()

// Create/Update Routes

const authRoute = authImport.update({
  id: '/(auth)',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const appUnauthorizedLazyRoute = appUnauthorizedLazyImport
  .update({
    id: '/unauthorized',
    path: '/unauthorized',
    getParentRoute: () => appRoute,
  } as any)
  .lazy(() => import('./routes/(app)/unauthorized.lazy').then((d) => d.Route))

const appTermsLazyRoute = appTermsLazyImport
  .update({
    id: '/terms',
    path: '/terms',
    getParentRoute: () => appRoute,
  } as any)
  .lazy(() => import('./routes/(app)/terms.lazy').then((d) => d.Route))

const appStatusLazyRoute = appStatusLazyImport
  .update({
    id: '/status',
    path: '/status',
    getParentRoute: () => appRoute,
  } as any)
  .lazy(() => import('./routes/(app)/status.lazy').then((d) => d.Route))

const appPrivacyLazyRoute = appPrivacyLazyImport
  .update({
    id: '/privacy',
    path: '/privacy',
    getParentRoute: () => appRoute,
  } as any)
  .lazy(() => import('./routes/(app)/privacy.lazy').then((d) => d.Route))

const testTestRoute = testTestImport.update({
  id: '/(test)/test_',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => authRoute,
} as any)

const authAuthRoute = authAuthImport.update({
  id: '/_auth',
  getParentRoute: () => authRoute,
} as any)

const appParentsRoute = appParentsImport.update({
  id: '/_parents',
  getParentRoute: () => appRoute,
} as any)

const appKidsRoute = appKidsImport.update({
  id: '/_kids',
  getParentRoute: () => appRoute,
} as any)

const appExamplesRoute = appExamplesImport.update({
  id: '/_examples',
  getParentRoute: () => appRoute,
} as any)

const appExamplesQueryLazyRoute = appExamplesQueryLazyImport
  .update({
    id: '/query',
    path: '/query',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/query.lazy').then((d) => d.Route),
  )

const appExamplesFormLazyRoute = appExamplesFormLazyImport
  .update({
    id: '/form',
    path: '/form',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() => import('./routes/(app)/_examples/form.lazy').then((d) => d.Route))

const appExamplesDemoLazyRoute = appExamplesDemoLazyImport
  .update({
    id: '/demo_',
    path: '/demo',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo_.lazy').then((d) => d.Route),
  )

const testTestARoute = testTestAImport.update({
  id: '/(test)/test/a_',
  path: '/test/a',
  getParentRoute: () => rootRoute,
} as any)

const authAuthProfileRoute = authAuthProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => authAuthRoute,
} as any)

const authAuthDashboardRoute = authAuthDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => authAuthRoute,
} as any)

const appParentsParentsIndexRoute = appParentsParentsIndexImport.update({
  id: '/parents/',
  path: '/parents/',
  getParentRoute: () => appParentsRoute,
} as any)

const appExamplesDemoTypographyLazyRoute = appExamplesDemoTypographyLazyImport
  .update({
    id: '/demo/typography',
    path: '/demo/typography',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.typography.lazy').then(
      (d) => d.Route,
    ),
  )

const appExamplesDemoTablesLazyRoute = appExamplesDemoTablesLazyImport
  .update({
    id: '/demo/tables',
    path: '/demo/tables',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.tables.lazy').then((d) => d.Route),
  )

const appExamplesDemoNavigationLazyRoute = appExamplesDemoNavigationLazyImport
  .update({
    id: '/demo/navigation',
    path: '/demo/navigation',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.navigation.lazy').then(
      (d) => d.Route,
    ),
  )

const appExamplesDemoLoadersLazyRoute = appExamplesDemoLoadersLazyImport
  .update({
    id: '/demo/loaders',
    path: '/demo/loaders',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.loaders.lazy').then((d) => d.Route),
  )

const appExamplesDemoFormsLazyRoute = appExamplesDemoFormsLazyImport
  .update({
    id: '/demo/forms',
    path: '/demo/forms',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.forms.lazy').then((d) => d.Route),
  )

const appExamplesDemoDatabaseLazyRoute = appExamplesDemoDatabaseLazyImport
  .update({
    id: '/demo/database',
    path: '/demo/database',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.database.lazy').then((d) => d.Route),
  )

const appExamplesDemoContainersLazyRoute = appExamplesDemoContainersLazyImport
  .update({
    id: '/demo/containers',
    path: '/demo/containers',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.containers.lazy').then(
      (d) => d.Route,
    ),
  )

const appExamplesDemoColorsLazyRoute = appExamplesDemoColorsLazyImport
  .update({
    id: '/demo/colors',
    path: '/demo/colors',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.colors.lazy').then((d) => d.Route),
  )

const appExamplesDemoBasicLazyRoute = appExamplesDemoBasicLazyImport
  .update({
    id: '/demo/basic',
    path: '/demo/basic',
    getParentRoute: () => appExamplesRoute,
  } as any)
  .lazy(() =>
    import('./routes/(app)/_examples/demo.basic.lazy').then((d) => d.Route),
  )

const testTestASomethingRoute = testTestASomethingImport.update({
  id: '/(test)/test/a/something',
  path: '/test/a/something',
  getParentRoute: () => rootRoute,
} as any)

const testTestABRoute = testTestABImport.update({
  id: '/(test)/test/a/b_',
  path: '/test/a/b',
  getParentRoute: () => rootRoute,
} as any)

const appParentsParentsManageRoute = appParentsParentsManageImport.update({
  id: '/parents/manage',
  path: '/parents/manage',
  getParentRoute: () => appParentsRoute,
} as any)

const appExamplesDemoTestingRoute = appExamplesDemoTestingImport.update({
  id: '/demo/testing',
  path: '/demo/testing',
  getParentRoute: () => appExamplesRoute,
} as any)

const appExamplesDemoDialogsRoute = appExamplesDemoDialogsImport.update({
  id: '/demo/dialogs',
  path: '/demo/dialogs',
  getParentRoute: () => appExamplesRoute,
} as any)

const testTestABCRoute = testTestABCImport.update({
  id: '/(test)/test/a/b/c',
  path: '/test/a/b/c',
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
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_examples': {
      id: '/(app)/_examples'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appExamplesImport
      parentRoute: typeof appRoute
    }
    '/(app)/_kids': {
      id: '/(app)/_kids'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof appKidsImport
      parentRoute: typeof appImport
    }
    '/(app)/_parents': {
      id: '/(app)/_parents'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof appParentsImport
      parentRoute: typeof appImport
    }
    '/(auth)': {
      id: '/(auth)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_auth': {
      id: '/(auth)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authAuthImport
      parentRoute: typeof authRoute
    }
    '/(auth)/login': {
      id: '/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof authImport
    }
    '/(test)/test_': {
      id: '/(test)/test_'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof testTestImport
      parentRoute: typeof rootRoute
    }
    '/(app)/privacy': {
      id: '/(app)/privacy'
      path: '/privacy'
      fullPath: '/privacy'
      preLoaderRoute: typeof appPrivacyLazyImport
      parentRoute: typeof appImport
    }
    '/(app)/status': {
      id: '/(app)/status'
      path: '/status'
      fullPath: '/status'
      preLoaderRoute: typeof appStatusLazyImport
      parentRoute: typeof appImport
    }
    '/(app)/terms': {
      id: '/(app)/terms'
      path: '/terms'
      fullPath: '/terms'
      preLoaderRoute: typeof appTermsLazyImport
      parentRoute: typeof appImport
    }
    '/(app)/unauthorized': {
      id: '/(app)/unauthorized'
      path: '/unauthorized'
      fullPath: '/unauthorized'
      preLoaderRoute: typeof appUnauthorizedLazyImport
      parentRoute: typeof appImport
    }
    '/(auth)/_auth/dashboard': {
      id: '/(auth)/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof authAuthDashboardImport
      parentRoute: typeof authAuthImport
    }
    '/(auth)/_auth/profile': {
      id: '/(auth)/_auth/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof authAuthProfileImport
      parentRoute: typeof authAuthImport
    }
    '/(test)/test/a_': {
      id: '/(test)/test/a_'
      path: '/test/a'
      fullPath: '/test/a'
      preLoaderRoute: typeof testTestAImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_examples/demo_': {
      id: '/(app)/_examples/demo_'
      path: '/demo'
      fullPath: '/demo'
      preLoaderRoute: typeof appExamplesDemoLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/form': {
      id: '/(app)/_examples/form'
      path: '/form'
      fullPath: '/form'
      preLoaderRoute: typeof appExamplesFormLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/query': {
      id: '/(app)/_examples/query'
      path: '/query'
      fullPath: '/query'
      preLoaderRoute: typeof appExamplesQueryLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/dialogs': {
      id: '/(app)/_examples/demo/dialogs'
      path: '/demo/dialogs'
      fullPath: '/demo/dialogs'
      preLoaderRoute: typeof appExamplesDemoDialogsImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/testing': {
      id: '/(app)/_examples/demo/testing'
      path: '/demo/testing'
      fullPath: '/demo/testing'
      preLoaderRoute: typeof appExamplesDemoTestingImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_parents/parents/manage': {
      id: '/(app)/_parents/parents/manage'
      path: '/parents/manage'
      fullPath: '/parents/manage'
      preLoaderRoute: typeof appParentsParentsManageImport
      parentRoute: typeof appParentsImport
    }
    '/(test)/test/a/b_': {
      id: '/(test)/test/a/b_'
      path: '/test/a/b'
      fullPath: '/test/a/b'
      preLoaderRoute: typeof testTestABImport
      parentRoute: typeof rootRoute
    }
    '/(test)/test/a/something': {
      id: '/(test)/test/a/something'
      path: '/test/a/something'
      fullPath: '/test/a/something'
      preLoaderRoute: typeof testTestASomethingImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_examples/demo/basic': {
      id: '/(app)/_examples/demo/basic'
      path: '/demo/basic'
      fullPath: '/demo/basic'
      preLoaderRoute: typeof appExamplesDemoBasicLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/colors': {
      id: '/(app)/_examples/demo/colors'
      path: '/demo/colors'
      fullPath: '/demo/colors'
      preLoaderRoute: typeof appExamplesDemoColorsLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/containers': {
      id: '/(app)/_examples/demo/containers'
      path: '/demo/containers'
      fullPath: '/demo/containers'
      preLoaderRoute: typeof appExamplesDemoContainersLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/database': {
      id: '/(app)/_examples/demo/database'
      path: '/demo/database'
      fullPath: '/demo/database'
      preLoaderRoute: typeof appExamplesDemoDatabaseLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/forms': {
      id: '/(app)/_examples/demo/forms'
      path: '/demo/forms'
      fullPath: '/demo/forms'
      preLoaderRoute: typeof appExamplesDemoFormsLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/loaders': {
      id: '/(app)/_examples/demo/loaders'
      path: '/demo/loaders'
      fullPath: '/demo/loaders'
      preLoaderRoute: typeof appExamplesDemoLoadersLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/navigation': {
      id: '/(app)/_examples/demo/navigation'
      path: '/demo/navigation'
      fullPath: '/demo/navigation'
      preLoaderRoute: typeof appExamplesDemoNavigationLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/tables': {
      id: '/(app)/_examples/demo/tables'
      path: '/demo/tables'
      fullPath: '/demo/tables'
      preLoaderRoute: typeof appExamplesDemoTablesLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_examples/demo/typography': {
      id: '/(app)/_examples/demo/typography'
      path: '/demo/typography'
      fullPath: '/demo/typography'
      preLoaderRoute: typeof appExamplesDemoTypographyLazyImport
      parentRoute: typeof appExamplesImport
    }
    '/(app)/_parents/parents/': {
      id: '/(app)/_parents/parents/'
      path: '/parents'
      fullPath: '/parents'
      preLoaderRoute: typeof appParentsParentsIndexImport
      parentRoute: typeof appParentsImport
    }
    '/(test)/test/a/b/c': {
      id: '/(test)/test/a/b/c'
      path: '/test/a/b/c'
      fullPath: '/test/a/b/c'
      preLoaderRoute: typeof testTestABCImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface appExamplesRouteChildren {
  appExamplesDemoLazyRoute: typeof appExamplesDemoLazyRoute
  appExamplesFormLazyRoute: typeof appExamplesFormLazyRoute
  appExamplesQueryLazyRoute: typeof appExamplesQueryLazyRoute
  appExamplesDemoDialogsRoute: typeof appExamplesDemoDialogsRoute
  appExamplesDemoTestingRoute: typeof appExamplesDemoTestingRoute
  appExamplesDemoBasicLazyRoute: typeof appExamplesDemoBasicLazyRoute
  appExamplesDemoColorsLazyRoute: typeof appExamplesDemoColorsLazyRoute
  appExamplesDemoContainersLazyRoute: typeof appExamplesDemoContainersLazyRoute
  appExamplesDemoDatabaseLazyRoute: typeof appExamplesDemoDatabaseLazyRoute
  appExamplesDemoFormsLazyRoute: typeof appExamplesDemoFormsLazyRoute
  appExamplesDemoLoadersLazyRoute: typeof appExamplesDemoLoadersLazyRoute
  appExamplesDemoNavigationLazyRoute: typeof appExamplesDemoNavigationLazyRoute
  appExamplesDemoTablesLazyRoute: typeof appExamplesDemoTablesLazyRoute
  appExamplesDemoTypographyLazyRoute: typeof appExamplesDemoTypographyLazyRoute
}

const appExamplesRouteChildren: appExamplesRouteChildren = {
  appExamplesDemoLazyRoute: appExamplesDemoLazyRoute,
  appExamplesFormLazyRoute: appExamplesFormLazyRoute,
  appExamplesQueryLazyRoute: appExamplesQueryLazyRoute,
  appExamplesDemoDialogsRoute: appExamplesDemoDialogsRoute,
  appExamplesDemoTestingRoute: appExamplesDemoTestingRoute,
  appExamplesDemoBasicLazyRoute: appExamplesDemoBasicLazyRoute,
  appExamplesDemoColorsLazyRoute: appExamplesDemoColorsLazyRoute,
  appExamplesDemoContainersLazyRoute: appExamplesDemoContainersLazyRoute,
  appExamplesDemoDatabaseLazyRoute: appExamplesDemoDatabaseLazyRoute,
  appExamplesDemoFormsLazyRoute: appExamplesDemoFormsLazyRoute,
  appExamplesDemoLoadersLazyRoute: appExamplesDemoLoadersLazyRoute,
  appExamplesDemoNavigationLazyRoute: appExamplesDemoNavigationLazyRoute,
  appExamplesDemoTablesLazyRoute: appExamplesDemoTablesLazyRoute,
  appExamplesDemoTypographyLazyRoute: appExamplesDemoTypographyLazyRoute,
}

const appExamplesRouteWithChildren = appExamplesRoute._addFileChildren(
  appExamplesRouteChildren,
)

interface appParentsRouteChildren {
  appParentsParentsManageRoute: typeof appParentsParentsManageRoute
  appParentsParentsIndexRoute: typeof appParentsParentsIndexRoute
}

const appParentsRouteChildren: appParentsRouteChildren = {
  appParentsParentsManageRoute: appParentsParentsManageRoute,
  appParentsParentsIndexRoute: appParentsParentsIndexRoute,
}

const appParentsRouteWithChildren = appParentsRoute._addFileChildren(
  appParentsRouteChildren,
)

interface appRouteChildren {
  appExamplesRoute: typeof appExamplesRouteWithChildren
  appKidsRoute: typeof appKidsRoute
  appParentsRoute: typeof appParentsRouteWithChildren
  appPrivacyLazyRoute: typeof appPrivacyLazyRoute
  appStatusLazyRoute: typeof appStatusLazyRoute
  appTermsLazyRoute: typeof appTermsLazyRoute
  appUnauthorizedLazyRoute: typeof appUnauthorizedLazyRoute
}

const appRouteChildren: appRouteChildren = {
  appExamplesRoute: appExamplesRouteWithChildren,
  appKidsRoute: appKidsRoute,
  appParentsRoute: appParentsRouteWithChildren,
  appPrivacyLazyRoute: appPrivacyLazyRoute,
  appStatusLazyRoute: appStatusLazyRoute,
  appTermsLazyRoute: appTermsLazyRoute,
  appUnauthorizedLazyRoute: appUnauthorizedLazyRoute,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

interface authAuthRouteChildren {
  authAuthDashboardRoute: typeof authAuthDashboardRoute
  authAuthProfileRoute: typeof authAuthProfileRoute
}

const authAuthRouteChildren: authAuthRouteChildren = {
  authAuthDashboardRoute: authAuthDashboardRoute,
  authAuthProfileRoute: authAuthProfileRoute,
}

const authAuthRouteWithChildren = authAuthRoute._addFileChildren(
  authAuthRouteChildren,
)

interface authRouteChildren {
  authAuthRoute: typeof authAuthRouteWithChildren
  authLoginRoute: typeof authLoginRoute
}

const authRouteChildren: authRouteChildren = {
  authAuthRoute: authAuthRouteWithChildren,
  authLoginRoute: authLoginRoute,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof authAuthRouteWithChildren
  '': typeof appParentsRouteWithChildren
  '/login': typeof authLoginRoute
  '/test': typeof testTestRoute
  '/privacy': typeof appPrivacyLazyRoute
  '/status': typeof appStatusLazyRoute
  '/terms': typeof appTermsLazyRoute
  '/unauthorized': typeof appUnauthorizedLazyRoute
  '/dashboard': typeof authAuthDashboardRoute
  '/profile': typeof authAuthProfileRoute
  '/test/a': typeof testTestARoute
  '/demo': typeof appExamplesDemoLazyRoute
  '/form': typeof appExamplesFormLazyRoute
  '/query': typeof appExamplesQueryLazyRoute
  '/demo/dialogs': typeof appExamplesDemoDialogsRoute
  '/demo/testing': typeof appExamplesDemoTestingRoute
  '/parents/manage': typeof appParentsParentsManageRoute
  '/test/a/b': typeof testTestABRoute
  '/test/a/something': typeof testTestASomethingRoute
  '/demo/basic': typeof appExamplesDemoBasicLazyRoute
  '/demo/colors': typeof appExamplesDemoColorsLazyRoute
  '/demo/containers': typeof appExamplesDemoContainersLazyRoute
  '/demo/database': typeof appExamplesDemoDatabaseLazyRoute
  '/demo/forms': typeof appExamplesDemoFormsLazyRoute
  '/demo/loaders': typeof appExamplesDemoLoadersLazyRoute
  '/demo/navigation': typeof appExamplesDemoNavigationLazyRoute
  '/demo/tables': typeof appExamplesDemoTablesLazyRoute
  '/demo/typography': typeof appExamplesDemoTypographyLazyRoute
  '/parents': typeof appParentsParentsIndexRoute
  '/test/a/b/c': typeof testTestABCRoute
}

export interface FileRoutesByTo {
  '/': typeof authAuthRouteWithChildren
  '': typeof appParentsRouteWithChildren
  '/login': typeof authLoginRoute
  '/test': typeof testTestRoute
  '/privacy': typeof appPrivacyLazyRoute
  '/status': typeof appStatusLazyRoute
  '/terms': typeof appTermsLazyRoute
  '/unauthorized': typeof appUnauthorizedLazyRoute
  '/dashboard': typeof authAuthDashboardRoute
  '/profile': typeof authAuthProfileRoute
  '/test/a': typeof testTestARoute
  '/demo': typeof appExamplesDemoLazyRoute
  '/form': typeof appExamplesFormLazyRoute
  '/query': typeof appExamplesQueryLazyRoute
  '/demo/dialogs': typeof appExamplesDemoDialogsRoute
  '/demo/testing': typeof appExamplesDemoTestingRoute
  '/parents/manage': typeof appParentsParentsManageRoute
  '/test/a/b': typeof testTestABRoute
  '/test/a/something': typeof testTestASomethingRoute
  '/demo/basic': typeof appExamplesDemoBasicLazyRoute
  '/demo/colors': typeof appExamplesDemoColorsLazyRoute
  '/demo/containers': typeof appExamplesDemoContainersLazyRoute
  '/demo/database': typeof appExamplesDemoDatabaseLazyRoute
  '/demo/forms': typeof appExamplesDemoFormsLazyRoute
  '/demo/loaders': typeof appExamplesDemoLoadersLazyRoute
  '/demo/navigation': typeof appExamplesDemoNavigationLazyRoute
  '/demo/tables': typeof appExamplesDemoTablesLazyRoute
  '/demo/typography': typeof appExamplesDemoTypographyLazyRoute
  '/parents': typeof appParentsParentsIndexRoute
  '/test/a/b/c': typeof testTestABCRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_examples': typeof appExamplesRouteWithChildren
  '/(app)/_kids': typeof appKidsRoute
  '/(app)/_parents': typeof appParentsRouteWithChildren
  '/(auth)': typeof authRouteWithChildren
  '/(auth)/_auth': typeof authAuthRouteWithChildren
  '/(auth)/login': typeof authLoginRoute
  '/(test)/test_': typeof testTestRoute
  '/(app)/privacy': typeof appPrivacyLazyRoute
  '/(app)/status': typeof appStatusLazyRoute
  '/(app)/terms': typeof appTermsLazyRoute
  '/(app)/unauthorized': typeof appUnauthorizedLazyRoute
  '/(auth)/_auth/dashboard': typeof authAuthDashboardRoute
  '/(auth)/_auth/profile': typeof authAuthProfileRoute
  '/(test)/test/a_': typeof testTestARoute
  '/(app)/_examples/demo_': typeof appExamplesDemoLazyRoute
  '/(app)/_examples/form': typeof appExamplesFormLazyRoute
  '/(app)/_examples/query': typeof appExamplesQueryLazyRoute
  '/(app)/_examples/demo/dialogs': typeof appExamplesDemoDialogsRoute
  '/(app)/_examples/demo/testing': typeof appExamplesDemoTestingRoute
  '/(app)/_parents/parents/manage': typeof appParentsParentsManageRoute
  '/(test)/test/a/b_': typeof testTestABRoute
  '/(test)/test/a/something': typeof testTestASomethingRoute
  '/(app)/_examples/demo/basic': typeof appExamplesDemoBasicLazyRoute
  '/(app)/_examples/demo/colors': typeof appExamplesDemoColorsLazyRoute
  '/(app)/_examples/demo/containers': typeof appExamplesDemoContainersLazyRoute
  '/(app)/_examples/demo/database': typeof appExamplesDemoDatabaseLazyRoute
  '/(app)/_examples/demo/forms': typeof appExamplesDemoFormsLazyRoute
  '/(app)/_examples/demo/loaders': typeof appExamplesDemoLoadersLazyRoute
  '/(app)/_examples/demo/navigation': typeof appExamplesDemoNavigationLazyRoute
  '/(app)/_examples/demo/tables': typeof appExamplesDemoTablesLazyRoute
  '/(app)/_examples/demo/typography': typeof appExamplesDemoTypographyLazyRoute
  '/(app)/_parents/parents/': typeof appParentsParentsIndexRoute
  '/(test)/test/a/b/c': typeof testTestABCRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/test'
    | '/privacy'
    | '/status'
    | '/terms'
    | '/unauthorized'
    | '/dashboard'
    | '/profile'
    | '/test/a'
    | '/demo'
    | '/form'
    | '/query'
    | '/demo/dialogs'
    | '/demo/testing'
    | '/parents/manage'
    | '/test/a/b'
    | '/test/a/something'
    | '/demo/basic'
    | '/demo/colors'
    | '/demo/containers'
    | '/demo/database'
    | '/demo/forms'
    | '/demo/loaders'
    | '/demo/navigation'
    | '/demo/tables'
    | '/demo/typography'
    | '/parents'
    | '/test/a/b/c'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/test'
    | '/privacy'
    | '/status'
    | '/terms'
    | '/unauthorized'
    | '/dashboard'
    | '/profile'
    | '/test/a'
    | '/demo'
    | '/form'
    | '/query'
    | '/demo/dialogs'
    | '/demo/testing'
    | '/parents/manage'
    | '/test/a/b'
    | '/test/a/something'
    | '/demo/basic'
    | '/demo/colors'
    | '/demo/containers'
    | '/demo/database'
    | '/demo/forms'
    | '/demo/loaders'
    | '/demo/navigation'
    | '/demo/tables'
    | '/demo/typography'
    | '/parents'
    | '/test/a/b/c'
  id:
    | '__root__'
    | '/'
    | '/(app)'
    | '/(app)/_examples'
    | '/(app)/_kids'
    | '/(app)/_parents'
    | '/(auth)'
    | '/(auth)/_auth'
    | '/(auth)/login'
    | '/(test)/test_'
    | '/(app)/privacy'
    | '/(app)/status'
    | '/(app)/terms'
    | '/(app)/unauthorized'
    | '/(auth)/_auth/dashboard'
    | '/(auth)/_auth/profile'
    | '/(test)/test/a_'
    | '/(app)/_examples/demo_'
    | '/(app)/_examples/form'
    | '/(app)/_examples/query'
    | '/(app)/_examples/demo/dialogs'
    | '/(app)/_examples/demo/testing'
    | '/(app)/_parents/parents/manage'
    | '/(test)/test/a/b_'
    | '/(test)/test/a/something'
    | '/(app)/_examples/demo/basic'
    | '/(app)/_examples/demo/colors'
    | '/(app)/_examples/demo/containers'
    | '/(app)/_examples/demo/database'
    | '/(app)/_examples/demo/forms'
    | '/(app)/_examples/demo/loaders'
    | '/(app)/_examples/demo/navigation'
    | '/(app)/_examples/demo/tables'
    | '/(app)/_examples/demo/typography'
    | '/(app)/_parents/parents/'
    | '/(test)/test/a/b/c'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  appRoute: typeof appRouteWithChildren
  authRoute: typeof authRouteWithChildren
  testTestRoute: typeof testTestRoute
  testTestARoute: typeof testTestARoute
  testTestABRoute: typeof testTestABRoute
  testTestASomethingRoute: typeof testTestASomethingRoute
  testTestABCRoute: typeof testTestABCRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  appRoute: appRouteWithChildren,
  authRoute: authRouteWithChildren,
  testTestRoute: testTestRoute,
  testTestARoute: testTestARoute,
  testTestABRoute: testTestABRoute,
  testTestASomethingRoute: testTestASomethingRoute,
  testTestABCRoute: testTestABCRoute,
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
        "/(app)",
        "/(auth)",
        "/(test)/test_",
        "/(test)/test/a_",
        "/(test)/test/a/b_",
        "/(test)/test/a/something",
        "/(test)/test/a/b/c"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/_examples",
        "/(app)/_kids",
        "/(app)/_parents",
        "/(app)/privacy",
        "/(app)/status",
        "/(app)/terms",
        "/(app)/unauthorized"
      ]
    },
    "/(app)/_examples": {
      "filePath": "(app)/_examples.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_examples/demo_",
        "/(app)/_examples/form",
        "/(app)/_examples/query",
        "/(app)/_examples/demo/dialogs",
        "/(app)/_examples/demo/testing",
        "/(app)/_examples/demo/basic",
        "/(app)/_examples/demo/colors",
        "/(app)/_examples/demo/containers",
        "/(app)/_examples/demo/database",
        "/(app)/_examples/demo/forms",
        "/(app)/_examples/demo/loaders",
        "/(app)/_examples/demo/navigation",
        "/(app)/_examples/demo/tables",
        "/(app)/_examples/demo/typography"
      ]
    },
    "/(app)/_kids": {
      "filePath": "(app)/_kids.tsx",
      "parent": "/(app)"
    },
    "/(app)/_parents": {
      "filePath": "(app)/_parents.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_parents/parents/manage",
        "/(app)/_parents/parents/"
      ]
    },
    "/(auth)": {
      "filePath": "(auth)",
      "children": [
        "/(auth)/_auth",
        "/(auth)/login"
      ]
    },
    "/(auth)/_auth": {
      "filePath": "(auth)/_auth.tsx",
      "parent": "/(auth)",
      "children": [
        "/(auth)/_auth/dashboard",
        "/(auth)/_auth/profile"
      ]
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.tsx",
      "parent": "/(auth)"
    },
    "/(test)/test_": {
      "filePath": "(test)/test_.tsx"
    },
    "/(app)/privacy": {
      "filePath": "(app)/privacy.lazy.tsx",
      "parent": "/(app)"
    },
    "/(app)/status": {
      "filePath": "(app)/status.lazy.tsx",
      "parent": "/(app)"
    },
    "/(app)/terms": {
      "filePath": "(app)/terms.lazy.tsx",
      "parent": "/(app)"
    },
    "/(app)/unauthorized": {
      "filePath": "(app)/unauthorized.lazy.tsx",
      "parent": "/(app)"
    },
    "/(auth)/_auth/dashboard": {
      "filePath": "(auth)/_auth.dashboard.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(auth)/_auth/profile": {
      "filePath": "(auth)/_auth.profile.tsx",
      "parent": "/(auth)/_auth"
    },
    "/(test)/test/a_": {
      "filePath": "(test)/test.a_.tsx"
    },
    "/(app)/_examples/demo_": {
      "filePath": "(app)/_examples/demo_.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/form": {
      "filePath": "(app)/_examples/form.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/query": {
      "filePath": "(app)/_examples/query.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/dialogs": {
      "filePath": "(app)/_examples/demo.dialogs.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/testing": {
      "filePath": "(app)/_examples/demo.testing.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_parents/parents/manage": {
      "filePath": "(app)/_parents/parents.manage.tsx",
      "parent": "/(app)/_parents"
    },
    "/(test)/test/a/b_": {
      "filePath": "(test)/test.a.b_.tsx"
    },
    "/(test)/test/a/something": {
      "filePath": "(test)/test.a.something.tsx"
    },
    "/(app)/_examples/demo/basic": {
      "filePath": "(app)/_examples/demo.basic.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/colors": {
      "filePath": "(app)/_examples/demo.colors.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/containers": {
      "filePath": "(app)/_examples/demo.containers.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/database": {
      "filePath": "(app)/_examples/demo.database.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/forms": {
      "filePath": "(app)/_examples/demo.forms.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/loaders": {
      "filePath": "(app)/_examples/demo.loaders.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/navigation": {
      "filePath": "(app)/_examples/demo.navigation.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/tables": {
      "filePath": "(app)/_examples/demo.tables.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_examples/demo/typography": {
      "filePath": "(app)/_examples/demo.typography.lazy.tsx",
      "parent": "/(app)/_examples"
    },
    "/(app)/_parents/parents/": {
      "filePath": "(app)/_parents/parents.index.tsx",
      "parent": "/(app)/_parents"
    },
    "/(test)/test/a/b/c": {
      "filePath": "(test)/test.a.b.c.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
