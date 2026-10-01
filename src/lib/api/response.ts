import { ApiResponse, ApiErrorResponse } from "@/types/api";
import { ApiError } from "./errors";

export async function parseResponse<T>(response: Response): Promise<T> {
  // Check for 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  let data: unknown;
  const text = await response.text();
  
  if (!text || text.trim() === "") {
    data = {};
  } else {
    // Detect HTML responses (e.g. Next.js page shell from redirects or middleware)
    const trimmed = text.trimStart();
    if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
      throw new ApiError(
        response.status,
        response.status === 200
          ? "Received an HTML page instead of JSON. You may need to log in again."
          : `Unexpected HTML response (status ${response.status}). Please try again.`
      );
    }

    try {
      data = JSON.parse(text);
    } catch {
      console.error(`[parseResponse] Failed to parse JSON. URL: ${response.url}, Status: ${response.status}, Content: ${text.substring(0, 500)}`);
      throw new ApiError(
        response.status,
        `Failed to parse server response as JSON. Status: ${response.status}. Response: ${text.substring(0, 150)}...`
      );
    }
  }

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;
    const message = errorData.message || "An unexpected error occurred.";
    throw new ApiError(response.status, message, errorData.errors);
  }

  // Expecting standard API response structure
  const apiResponse = data as ApiResponse<T>;
  if (!apiResponse.success) {
    throw new ApiError(
      response.status,
      apiResponse.message || "Request failed.",
      apiResponse.errors
    );
  }

  // Return the data object itself if successful, falling back to full response if it deviates
  return apiResponse.data !== undefined ? apiResponse.data : (apiResponse as unknown as T);
}
