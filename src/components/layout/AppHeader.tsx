"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { MobileNav } from "./MobileNav";
import { useAuth } from "@/components/providers/AuthProvider";

export function AppHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto px-4 flex h-20 items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center gap-4 z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image 
                src="/logo.png" 
                alt="Shiply Logo" 
                fill
                className="object-contain" 
                priority
              />
            </div>
            <span className="font-bold text-2xl tracking-tight inline-block text-primary">
              Shiply
            </span>
          </Link>
        </div>
        
        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm font-medium">
          <Link href="/services" className="transition-colors hover:text-primary text-foreground/70">
            Services
          </Link>
          <Link href="/solutions" className="transition-colors hover:text-primary text-foreground/70">
            Solutions
          </Link>
          {user && (
            <Link href="/dashboard/tracking" className="transition-colors hover:text-primary text-foreground/70">
              Track Shipment
            </Link>
          )}
          <Link href="/pricing" className="transition-colors hover:text-primary text-foreground/70">
            Pricing
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary text-foreground/70">
            About Us
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary text-foreground/70">
            Contact
          </Link>
          <Link href="/careers" className="transition-colors hover:text-primary text-foreground/70">
            Careers
          </Link>
        </nav>
        
        {/* Right side: Actions */}
        <div className="flex items-center gap-4 z-10">
          <ThemeToggle />
          <MobileNav />

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Link href="/dashboard" className={buttonVariants()}>Dashboard</Link>
            ) : (
              <>
                <Link href="/auth/login" className={buttonVariants({ variant: "ghost", className: "text-base font-medium" })}>
                  Log in
                </Link>
                <Link href="/auth/register" className={buttonVariants({ className: "text-base" })}>
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
