import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Only enable in production or specifically requested environments
  enabled: process.env.NODE_ENV === "production" && !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,

  // Disable session replay to protect user privacy as requested
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  
  // Filter out noise
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Network request failed"
  ],

  // Scrub PII and sensitive data
  beforeSend(event) {
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers.cookie;
        delete event.request.headers.authorization;
      }
    }
    
    // Scrub breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
        if (breadcrumb.data && typeof breadcrumb.data === 'object') {
          const scrubbedData = { ...breadcrumb.data };
          ['password', 'token', 'cookie', 'session', 'auth', 'card', 'payment', 'cvv', 'credit'].forEach(key => {
            if (key in scrubbedData) {
              scrubbedData[key] = '[FILTERED]';
            }
          });
          breadcrumb.data = scrubbedData;
        }
        return breadcrumb;
      });
    }
    return event;
  }
});
