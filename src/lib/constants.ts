/**
 * Application Constants
 *
 * Centralized constant values for the frontend application.
 */

export const APP_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://logistics-backend-jyz7.onrender.com/api/v1",
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  APP_NAME: "Courier & Logistics Platform",
};

export const AUTH_CONFIG = {
  TOKEN_COOKIE_NAME: "token", // Handled by BFF
  SESSION_DURATION_DAYS: 7,
};

export const DATE_FORMATS = {
  DISPLAY_DATETIME: "MMM dd, yyyy HH:mm",
  DISPLAY_DATE: "MMM dd, yyyy",
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};
