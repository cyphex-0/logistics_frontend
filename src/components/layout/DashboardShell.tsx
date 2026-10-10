"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";
import { UserNav } from "./UserNav";
import { NotificationBell } from "./NotificationBell";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar className="hidden md:block w-64 flex-shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Top Header */}
        <header className="h-16 flex items-center justify-between border-b px-4 md:px-6 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <DashboardSidebar className="border-r-0" />
              </SheetContent>
            </Sheet>
            <Link href="/" className="font-bold text-lg text-primary hover:text-primary/80 transition-colors">Shiply</Link>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <NotificationBell />
            <UserNav />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
