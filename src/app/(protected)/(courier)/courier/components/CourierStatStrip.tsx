"use client";

import { StatCard } from "@/components/shared/StatCard";
import { Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { useShipments } from "@/lib/query/shipments";
import { ShipmentStatus } from "@/types/api";

export function CourierStatStrip() {
  const { data: shipmentsData, isLoading } = useShipments();

  // If loading, show placeholders
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  const shipments = shipmentsData?.data || [];
  
  const assigned = shipments.filter(s => s.status === ShipmentStatus.PICKUP_ASSIGNED || s.status === ShipmentStatus.PICKED_UP || s.status === ShipmentStatus.IN_TRANSIT || s.status === ShipmentStatus.OUT_FOR_DELIVERY).length;
  
  const remaining = shipments.filter(s => s.status !== ShipmentStatus.DELIVERED && s.status !== ShipmentStatus.FAILED_DELIVERY && s.status !== ShipmentStatus.CANCELLED).length;
  
  const completed = shipments.filter(s => s.status === ShipmentStatus.DELIVERED).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Assigned Today"
        value={assigned.toString()}
        icon={Package}
        description="Active packages"
      />
      <StatCard
        title="Remaining"
        value={remaining.toString()}
        icon={Truck}
        description="To be delivered"
      />
      <StatCard
        title="Completed"
        value={completed.toString()}
        icon={CheckCircle}
        description="Successfully delivered"
      />
      <StatCard
        title="Next Stop"
        value="View Map"
        icon={MapPin}
        description="See itinerary"
      />
    </div>
  );
}
