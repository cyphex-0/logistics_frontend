"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useShipments } from "@/hooks/queries";
import { ShipmentStatus, ApiResponse } from "@/types/api";
import { Shipment } from "@/types/domain";
import { PageHeader } from "@/components/shared/PageHeader";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { AdminShipmentTable } from "./AdminShipmentTable";
import { ShipmentFilterBar } from "./ShipmentFilterBar";
import { DispatchQueueBadge } from "./DispatchQueueBadge";
import { ErrorPanel } from "@/components/shared/ErrorPanel";
import { useMemo } from "react";

export function AdminShipmentsClient() {
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const statusParam = searchParams.get("status");
  const trackingNumber = searchParams.get("q") || undefined;
  const sortParam = searchParams.get("sort") || "newest";
  
  const status = statusParam && statusParam !== "ALL" 
    ? (statusParam as ShipmentStatus) 
    : undefined;

  const { data, isLoading, error } = useShipments({
    page,
    limit,
    status,
    trackingNumber,
  });

  const sortedData = useMemo(() => {
    const apiData = data as ApiResponse<Shipment[]> | undefined;
    if (!apiData || !apiData.data) return [];
    
    const shipments = [...apiData.data];
    
    switch(sortParam) {
      case "oldest":
        return shipments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "status":
        return shipments.sort((a, b) => a.status.localeCompare(b.status));
      case "newest":
      default:
        return shipments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [data, sortParam]);

  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const totalPages = (data as ApiResponse<Shipment[]> | undefined)?.meta?.totalPages || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="All Shipments" 
          description="Manage and track all shipments across the platform."
        />
        <DispatchQueueBadge />
      </div>

      <ShipmentFilterBar />

      {error ? (
        <ErrorPanel message="Error loading shipments. Please try again." />
      ) : (
        <AdminShipmentTable 
          data={sortedData} 
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
