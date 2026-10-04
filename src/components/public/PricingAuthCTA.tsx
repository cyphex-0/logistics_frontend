"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export function PricingAuthCTA() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto bg-muted/50 rounded-3xl p-8 md:p-12 text-center border border-primary/20 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Calculator className="h-48 w-48" />
      </div>
      <div className="relative z-10">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Calculate Exact Pricing</h2>
        
        {user ? (
          <>
            <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
              Authoritative pricing is calculated securely by our backend engine. 
              Head over to your dashboard to use the interactive calculator and get an exact quote.
            </p>
            <Link href="/dashboard" className={buttonVariants({ size: "lg", className: "px-8 transition-transform hover:scale-105" })}>
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
              Authoritative pricing is calculated securely by our backend engine. 
              Sign in to your account to use our interactive calculator and get an exact quote for your specific addresses and package weight.
            </p>
            <Link href="/auth/login" className={buttonVariants({ size: "lg", className: "px-8 transition-transform hover:scale-105" })}>
              Log in to Calculate
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
