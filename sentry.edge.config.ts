import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Only enable in production or specifically requested environments
  enabled: process.env.NODE_ENV === "production" && !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,
});
