import React from 'react'
import {createRoot} from 'react-dom/client'
import {
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom'
import BaseRoutes from './BaseRoutes'
import {FlagsProvider} from 'react-feature-flags'
import {flags} from './FeatureFlags'
import {Auth0ProviderWithHistory} from './Components/Auth0ProviderWithHistory'
import * as Sentry from '@sentry/react'
import {BrowserTracing} from '@sentry/tracing'
import ApplicationError from './Components/ApplicationError'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import {CypressHistorySupport} from 'cypress-react-router'


Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'https://bldrs.ai',
    'https://*.bldrs.dev',
  ],
})

if (JSON.stringify(process.env.DISABLE_MOCK_SERVICE_WORKER) !== 'true') {
  const {worker} = require('./__mocks__/browser')
  worker.start({
    onUnhandledRequest(req) {
      if (req.url.host === 'bldrs.us.auth0.com.cypress') {
        // eslint-disable-next-line no-console
        // console.log(`Found an expected ${req.method} request to cypress fake ${req.url}`)
      } else {
        // eslint-disable-next-line no-console
        console.error(`Found an unhandled ${req.method} request to ${req.url}`)
      }
    },
  })
}

const root = createRoot(document.getElementById('root'))

root.render(
    <Sentry.ErrorBoundary fallback={<ApplicationError/>}>
      <FlagsProvider value={flags}>
        <HelmetProvider>
          <Helmet>
            <title>Bldrs.ai</title>
          </Helmet>
          <BrowserRouter>
            <CypressHistorySupport/>
            <Auth0ProviderWithHistory>
              <BaseRoutes/>
            </Auth0ProviderWithHistory>
          </BrowserRouter>
        </HelmetProvider>
      </FlagsProvider>
    </Sentry.ErrorBoundary>,
)
