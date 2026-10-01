import { parseResponse } from "./response";
import { ApiError } from "./errors";

export const getBaseUrl = () => {
  // If running on the client, route through the Next.js BFF proxy
  if (typeof window !== "undefined") {
    return "/api";
  }
  // If running on the server, call the backend directly
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
};

let refreshPromise: Promise<boolean> | null = null;

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  _retry?: boolean;
};

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, params, headers, _retry, ...customConfig } = options;
  const baseUrl = getBaseUrl();
  
  // Construct URL
  const url = new URL(
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`,
    baseUrl.startsWith("http") ? baseUrl : (typeof window !== "undefined" ? window.location.origin + baseUrl : "http://localhost:3000/api")
  );

  // Append query params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // Required for sending/receiving HttpOnly cookies with BFF or cross-origin (if allowed)
    credentials: "include",
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    let response = await fetch(url.toString(), config);
    
    // One-retry refresh logic for 401s on the client
    if (
      response.status === 401 && 
      typeof window !== "undefined" && 
      !_retry && 
      !endpoint.includes("/auth/")
    ) {
      if (!refreshPromise) {
        refreshPromise = fetch("/api/auth/refresh", { method: "POST" })
          .then((res) => res.ok)
          .catch(() => false)
          .finally(() => {
            refreshPromise = null;
          });
      }
      
      const refreshSuccess = await refreshPromise;
      if (refreshSuccess) {
        // Retry the original request
        options._retry = true;
        // Re-execute apiClient instead of fetch so it goes through parseResponse naturally?
        // Actually, just re-fetch here is simpler, but wait, `parseResponse` takes the `Response` object.
        response = await fetch(url.toString(), config);
      } else {
        // If refresh fails, clear session cookies via a logout API call or just redirect to login
        // Redirecting directly ensures the user lands on login with their session invalidated
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/login";
      }
    }

    return await parseResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Handle network errors (e.g., DNS issues, offline)
    throw new ApiError(0, "Network error occurred or server is unreachable.");
  }
}
