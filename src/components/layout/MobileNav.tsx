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
          <Link href="/services" className={`text-lg font-medium hover:text-primary ${pathname === '/services' ? 'text-primary' : 'text-foreground/70'}`}>
            Services
          </Link>
          <Link href="/solutions" className={`text-lg font-medium hover:text-primary ${pathname === '/solutions' ? 'text-primary' : 'text-foreground/70'}`}>
            Solutions
          </Link>
          {user && (
            <Link href="/dashboard/tracking" className={`text-lg font-medium hover:text-primary ${pathname === '/dashboard/tracking' ? 'text-primary' : 'text-foreground/70'}`}>
              Track Shipment
            </Link>
          )}
          <Link href="/pricing" className={`text-lg font-medium hover:text-primary ${pathname === '/pricing' ? 'text-primary' : 'text-foreground/70'}`}>
            Pricing
          </Link>
          <Link href="/about" className={`text-lg font-medium hover:text-primary ${pathname === '/about' ? 'text-primary' : 'text-foreground/70'}`}>
            About Us
          </Link>
          <Link href="/contact" className={`text-lg font-medium hover:text-primary ${pathname === '/contact' ? 'text-primary' : 'text-foreground/70'}`}>
            Contact
          </Link>
          <Link href="/careers" className={`text-lg font-medium hover:text-primary ${pathname === '/careers' ? 'text-primary' : 'text-foreground/70'}`}>
            Careers
          </Link>
          <hr className="my-4 border-border/50" />
          {user ? (
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>Dashboard</Link>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/auth/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Log in
              </Link>
              <Link href="/auth/register" className={buttonVariants({ size: "lg" })}>
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
