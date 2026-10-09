import { toast } from "sonner";
import { ApiError } from "@/lib/api/errors";

export function handleApiError(error: unknown, defaultTitle: string = "Action failed") {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      // 401 should trigger a redirect or is handled gracefully by client logic.
      // Usually we don't spam toasts for 401s if they are redirected to login.
      return;
    }
    
    let description = error.message;
    let title = defaultTitle;

    if (error.status === 403) {
      title = "Permission Denied";
      description = "You do not have the required permissions to perform this action.";
    } else if (error.status === 409) {
      title = "Conflict / Already Exists";
      const isUniqueConstraint = error.message?.toLowerCase().includes("unique constraint") || error.message?.toLowerCase().includes("already exists");
      description = isUniqueConstraint 
        ? "A record with this name or identifier already exists. Please use a different one."
        : (error.message || "This resource was modified by someone else or has a conflicting state.");
    } else if (error.fieldErrors && error.fieldErrors.length > 0) {
      title = "Validation Error";
      description = error.fieldErrors.map((e) => e.message).join("\n");
    }

    toast.error(title, {
      description,
      duration: 5000,
    });
  } else if (error instanceof Error) {
    toast.error(defaultTitle, {
      description: error.message,
      duration: 5000,
    });
  } else {
    toast.error(defaultTitle, {
      description: "An unexpected error occurred.",
      duration: 5000,
    });
  }
}
