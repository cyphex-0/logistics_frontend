import { parseResponse } from "./response";
import { ApiError } from "./errors";

export const getBaseUrl = () => {
  // If running on the client, route through the Next.js BFF proxy
  if (typeof window !== "undefined") {
    return "/api";
  }
  // If running on the server, call the backend directly
  return process.env.API_BASE_URL || "http://localhost:5000/api";
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
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const baseString = normalizedBase.startsWith("http") 
    ? normalizedBase 
    : (typeof window !== "undefined" ? window.location.origin + normalizedBase : `http://localhost:3000${normalizedBase.startsWith("/") ? normalizedBase : `/${normalizedBase}`}`);
    
  const url = new URL(normalizedEndpoint, baseString);

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
        // Retry the original request with refreshed token
        options._retry = true;
        response = await fetch(url.toString(), config);
      } else {
        // Redirect to login and throw immediately so parseResponse is never
        // reached on the stale 401 response (avoids confusing JSON-parse errors).
        window.location.href = "/auth/login";
        throw new ApiError(401, "Session expired. Redirecting to login...");
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
