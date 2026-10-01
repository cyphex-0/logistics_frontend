import { Metadata } from "next";
import { Suspense } from "react";
import { AdminUserDetailClient } from "./components/AdminUserDetailClient";
import { PageHeader } from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "User Details | Shiply",
  description: "View and manage user details",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPage(props: PageProps) {
  const { id } = await props.params;

  return (
    <div className="space-y-6">
      <Suspense fallback={
        <div>
          <PageHeader title="Loading User..." />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
        </div>
      }>
        <AdminUserDetailClient id={id} />
      </Suspense>
    </div>
  );
}
