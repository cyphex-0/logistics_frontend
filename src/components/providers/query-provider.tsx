"use client";

import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from "@tanstack/react-query";
import { useState } from "react";

import { handleApiError } from "@/components/feedback/error-toast-mapper";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: (failureCount, error) => {
              // Only retry once
              if (failureCount >= 1) return false;
              // Do not retry 4xx errors
              if (error instanceof Error && "status" in error) {
                const status = (error as { status?: number }).status;
                if (status && status >= 400 && status < 500) return false;
              }
              return true;
            },
            refetchOnWindowFocus: false,
          },
        },
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (mutation.meta?.suppressGlobalError) return;
            handleApiError(error, "Action failed");
          },
        }),
        queryCache: new QueryCache({
          onError: (error) => {
            console.error("Query error:", error);
          }
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
