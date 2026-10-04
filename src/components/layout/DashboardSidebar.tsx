"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  MapPin,
  Settings,
  CreditCard,
  Truck,
  FileText,
  Search,
  Bell,
  BarChart3
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/shipments", label: "Shipments", icon: Package },
  { href: "/admin/users", label: "Users & Drivers", icon: Users },
  { href: "/admin/zones", label: "Zones", icon: MapPin },
  { href: "/admin/pricing", label: "Pricing", icon: CreditCard },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: FileText },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

const customerLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/shipments", label: "My Shipments", icon: Package },
  { href: "/dashboard/tracking", label: "Track Shipment", icon: Search },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
];

const courierLinks = [
  { href: "/courier", label: "Overview", icon: LayoutDashboard },
  { href: "/courier/shipments", label: "Assigned Shipments", icon: Truck },
  { href: "/courier/analytics", label: "Analytics", icon: BarChart3 },
];

export function DashboardSidebar({ className }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const links =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "COURIER"
      ? courierLinks
      : customerLinks;

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center space-x-2 mb-6 px-4 text-xl font-bold tracking-tight text-sidebar-primary hover:text-sidebar-primary/80 transition-colors">
            <Image src="/logo.png" alt="Shiply Logo" width={32} height={32} className="h-8 w-auto object-contain" />
            <span>Shiply</span>
          </Link>
          <div className="space-y-1 mt-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto px-3 py-4 border-t space-y-1 shrink-0">
        <Link
          href="/notifications"
          className={cn(
            "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            pathname === "/notifications"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          <Bell className="h-4 w-4" />
          Notifications
        </Link>
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            pathname === "/profile"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  );
}
