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
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
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
          <nav className="hidden md:flex items-center gap-8 ml-8 text-base font-medium">
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
