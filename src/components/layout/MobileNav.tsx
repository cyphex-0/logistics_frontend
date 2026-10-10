"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/providers/AuthProvider";
import { useUIStore } from "@/lib/store/ui.store";
import { UserRole } from "@/types/api";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const { isMobileNavOpen, setMobileNavOpen } = useUIStore();

  // Close the sheet automatically when a link is clicked / route changes
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  return (
    <Sheet open={isMobileNavOpen} onOpenChange={setMobileNavOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="p-6 w-[80vw] max-w-sm overflow-y-auto">
        <div className="flex items-center gap-2 mb-8 mt-2">
          <Image src="/logo.png" alt="Shiply Logo" width={32} height={32} className="object-contain" />
          <span className="font-bold text-xl tracking-tight text-primary">Shiply</span>
        </div>
        
        <nav className="flex flex-col gap-5">
          <Link href="/services" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/services' ? 'text-primary' : 'text-foreground/80')}>
            Services
          </Link>
          <Link href="/solutions" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/solutions' ? 'text-primary' : 'text-foreground/80')}>
            Solutions
          </Link>
          {user && user.role === UserRole.CUSTOMER && (
            <Link href="/dashboard/tracking" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/dashboard/tracking' ? 'text-primary' : 'text-foreground/80')}>
              Track Shipment
            </Link>
          )}
          <Link href="/pricing" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/pricing' ? 'text-primary' : 'text-foreground/80')}>
            Pricing
          </Link>
          <Link href="/about" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/about' ? 'text-primary' : 'text-foreground/80')}>
            About Us
          </Link>
          <Link href="/contact" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/contact' ? 'text-primary' : 'text-foreground/80')}>
            Contact
          </Link>
          
          <hr className="my-2 border-border/50" />
          
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <div className="h-11 w-full rounded-md bg-muted animate-pulse"></div>
              <div className="h-11 w-full rounded-md bg-muted animate-pulse"></div>
            </div>
          ) : user ? (
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "w-full")}>Dashboard</Link>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/auth/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}>
                Log in
              </Link>
              <Link href="/auth/register" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
