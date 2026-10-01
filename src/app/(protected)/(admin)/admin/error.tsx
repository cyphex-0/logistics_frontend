"use client";

import { ErrorPanel } from "@/components/shared/ErrorPanel";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPanel 
      title="Something went wrong!" 
      message={error.message || "An unexpected error occurred while loading this page."} 
      onRetry={() => reset()} 
    />
  );
}
