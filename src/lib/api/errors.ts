import { ApiFieldError } from "@/types/api";

export class ApiError extends Error {
  public status: number;
  public fieldErrors?: ApiFieldError[];
  public retryable: boolean;

  constructor(status: number, message: string, fieldErrors?: ApiFieldError[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
    // Typically, 5xx errors or network timeouts are retryable. 4xx are not.
    this.retryable = status >= 500 || status === 408 || status === 0;
  }
}
