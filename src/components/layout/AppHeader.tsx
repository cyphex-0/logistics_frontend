"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Package } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { useAuth } from "@/components/providers/AuthProvider";

export function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl inline-block text-primary">
              CourierLogistics
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium">
            <Link href="/services" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Services
            </Link>
            <Link href="/tracking" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Track Shipment
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Pricing
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileNav />

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link href="/dashboard" className={buttonVariants()}>Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
                  Log in
                </Link>
                <Link href="/auth/register" className={buttonVariants()}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
