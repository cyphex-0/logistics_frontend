"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUIStore } from "@/lib/store/ui.store";

export function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { isGlobalLoading } = useUIStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show the indicator if the request takes more than 300ms 
    // to prevent flickering for fast requests
    let timeoutId: NodeJS.Timeout;

    if (isFetching > 0 || isMutating > 0 || isGlobalLoading) {
      timeoutId = setTimeout(() => setShow(true), 300);
    } else {
      timeoutId = setTimeout(() => setShow(false), 0);
    }

    return () => clearTimeout(timeoutId);
  }, [isFetching, isMutating, isGlobalLoading]);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden bg-primary/20">
      <div className="h-full bg-primary transition-all duration-300 ease-in-out origin-left animate-in fade-in slide-in-from-left-full" 
           style={{
             animation: "progress 2s ease-in-out infinite"
           }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { transform: translateX(-100%); width: 100%; }
          50% { transform: translateX(0%); width: 10%; }
          100% { transform: translateX(100%); width: 100%; }
        }
      `}} />
    </div>
  );
}
