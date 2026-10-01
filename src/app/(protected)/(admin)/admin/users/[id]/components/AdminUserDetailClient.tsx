"use client";

import { useAdminUser } from "@/hooks/queries";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UserDetailCard } from "./UserDetailCard";
import { ErrorPanel } from "@/components/shared/ErrorPanel";

interface AdminUserDetailClientProps {
  id: string;
}

export function AdminUserDetailClient({ id }: AdminUserDetailClientProps) {
  const { data: user, isLoading, error } = useAdminUser(id);

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Error" />
        <ErrorPanel message="Failed to load user details. They might have been deleted or you don't have access." />
        <Link href="/admin/users" className={buttonVariants({ variant: "outline" })}>
          Back to Users
        </Link>
      </div>
    );
  }

  if (!isLoading && !user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
        <PageHeader 
          title="User Details" 
          description={user ? `Manage ${user.name}'s account and role.` : "Loading..."}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <UserDetailCard user={user!} isLoading={isLoading} />
      </div>
    </div>
  );
}
