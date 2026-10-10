"use client";

import Link from "next/link";
import Image from "next/image";
import { UserRole } from "@/types/api";
import { useAuth } from "@/components/providers/AuthProvider";

export function AppFooter() {
  const { user } = useAuth();
  
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image 
                  src="/logo.png" 
                  alt="Shiply Logo" 
                  fill
                  className="object-contain" 
                />
              </div>
              <span className="font-bold text-2xl tracking-tight inline-block text-primary">
                Shiply
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Next-generation courier and logistics platform delivering speed,
              reliability, and real-time tracking for all your shipments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              {user && user.role === UserRole.CUSTOMER && (
                <li>
                  <Link href="/dashboard/tracking" className="hover:text-primary transition-colors">
                    Track Package
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Shiply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
