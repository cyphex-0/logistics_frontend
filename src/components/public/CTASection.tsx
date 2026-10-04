"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { Loader2 } from "lucide-react";

export function CTASection() {
  const { user, isLoading } = useAuth();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/10" />
          
          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to move your first shipment?
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Get a clear plan, a precise quote, and a partner who stays close to every handoff.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            {isLoading ? (
               <div className="inline-flex h-14 items-center justify-center rounded-md bg-background/50 px-8">
                 <Loader2 className="h-6 w-6 animate-spin" />
               </div>
            ) : user ? (
              <Link 
                href="/dashboard" 
                className="inline-flex h-14 items-center justify-center rounded-md bg-background px-8 text-lg font-medium text-foreground shadow transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link 
                href="/auth/register" 
                className="inline-flex h-14 items-center justify-center rounded-md bg-background px-8 text-lg font-medium text-foreground shadow transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Start a Quote
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
