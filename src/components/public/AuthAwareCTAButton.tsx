"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface AuthAwareCTAButtonProps {
  unauthenticatedText: string;
  authenticatedText?: string;
  href?: string;
  className?: string;
}

export function AuthAwareCTAButton({ 
  unauthenticatedText, 
  authenticatedText = "Go to Dashboard",
  href = "/auth/register",
  className 
}: AuthAwareCTAButtonProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`inline-flex items-center justify-center opacity-70 ${className}`}>
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <Link href="/dashboard" className={className}>
        {authenticatedText}
      </Link>
    );
  }

  return (
    <Link href={href} className={className}>
      {unauthenticatedText}
    </Link>
  );
}
