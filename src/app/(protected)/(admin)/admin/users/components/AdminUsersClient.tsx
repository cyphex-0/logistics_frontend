"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAdminUsers } from "@/hooks/queries";
import { PageHeader } from "@/components/shared/PageHeader";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { UserTable } from "./UserTable";
import { UserFilters } from "./UserFilters";
import { ErrorPanel } from "@/components/shared/ErrorPanel";

export function AdminUsersClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const roleParam = searchParams.get("role");
  const q = searchParams.get("q") || undefined;
  
  const role = roleParam && roleParam !== "ALL" ? roleParam : undefined;

  const { data, isLoading, error } = useAdminUsers({
    page,
    limit,
    role,
    q,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const responseData = data as unknown as { meta?: { totalPages: number }; data?: import("@/types/api").User[] };
  const totalPages = responseData?.meta?.totalPages || 0;
  
  const filteredData = useMemo(() => {
    const rawData = responseData?.data || (Array.isArray(data) ? data : []);

    return rawData.filter(user => {
      let matches = true;
      if (role) {
        matches = matches && user.role === role;
      }
      if (q) {
        const query = q.toLowerCase();
        matches = matches && (
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
        );
      }
      return matches;
    });
  }, [data, responseData?.data, role, q]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="User Management" 
          description="Manage administrators, couriers, and customers."
        />
      </div>

      <UserFilters />

      {error ? (
        <ErrorPanel message="Error loading users. Please try again." />
      ) : (
        <UserTable 
          data={filteredData} 
          isLoading={isLoading} 
        />
      )}

      {!isLoading && totalPages > 1 && (
        <div className="mt-4 flex justify-end">
          <PaginationControls 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
