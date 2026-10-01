"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/providers/AuthProvider";
import { useUIStore } from "@/lib/store/ui.store";

export function MobileNav() {
  const { user } = useAuth();
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
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/services" className={`text-lg font-medium hover:text-primary ${pathname === '/services' ? 'text-primary' : ''}`}>
            Services
          </Link>
          <Link href="/tracking" className={`text-lg font-medium hover:text-primary ${pathname === '/tracking' ? 'text-primary' : ''}`}>
            Track Shipment
          </Link>
          <Link href="/pricing" className={`text-lg font-medium hover:text-primary ${pathname === '/pricing' ? 'text-primary' : ''}`}>
            Pricing
          </Link>
          <hr className="my-4" />
          {user ? (
            <Link href="/dashboard" className={buttonVariants()}>Dashboard</Link>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                Log in
              </Link>
              <Link href="/auth/register" className={buttonVariants()}>
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
