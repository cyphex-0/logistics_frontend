"use client";

import { useShipments } from "@/lib/query/shipments";
import { AssignedShipmentCard } from "./AssignedShipmentCard";
import { PackageX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CourierQueue() {
  const { data: shipmentsData, isLoading, isError, refetch } = useShipments({ limit: 50 }); // Fetch assigned shipments

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading your assigned shipments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground bg-destructive/5 rounded-xl border border-destructive/20 p-6 text-center">
        <PackageX className="h-10 w-10 text-destructive mb-4" />
        <h3 className="font-semibold text-lg text-foreground">Failed to load shipments</h3>
        <p className="mb-4">There was a problem retrieving your assigned deliveries.</p>
        <Button variant="outline" onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const shipments = shipmentsData?.data || [];
  
  // Sort: pending first, then in transit, then terminal states
  const sortedShipments = [...shipments].sort((a, b) => {
    const isATerminal = ["DELIVERED", "FAILED_DELIVERY", "CANCELLED"].includes(a.status);
    const isBTerminal = ["DELIVERED", "FAILED_DELIVERY", "CANCELLED"].includes(b.status);
    
    if (isATerminal === isBTerminal) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return isATerminal ? 1 : -1;
  });

  if (sortedShipments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-muted/30 rounded-xl border border-dashed p-8 text-center">
        <PackageX className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-semibold text-lg">No assigned shipments</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          You don&apos;t have any packages assigned to you right now. 
          {/* Documentation: Assignment is Admin-controlled */}
          When an Admin assigns a shipment to you, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sortedShipments.map((shipment) => (
        <AssignedShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  );
}
