"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useShipment } from "@/lib/query";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { ShipmentStatusHeader } from "./components/ShipmentStatusHeader";
import { ShipmentDetailGrid } from "./components/ShipmentDetailGrid";
import { ParcelSummary } from "./components/ParcelSummary";
import { ShipmentActions } from "./components/ShipmentActions";
import { TrackingTimeline } from "./components/TrackingTimeline";

export default function ShipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Unbox params
  const { id } = use(params);
  
  const { data: shipment, isLoading, isError } = useShipment(id, {
    refetchInterval: (query) => {
      const currentShipment = query.state.data as any;
      if (!currentShipment) return 5000;
      if (currentShipment.status === "PENDING") return 3000;
      if (["CONFIRMED", "PICKED_UP", "IN_TRANSIT"].includes(currentShipment.status)) return 10000;
      return false; // STOP polling if delivered or cancelled
    }
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !shipment) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Shipment Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The shipment you are looking for does not exist or you do not have permission to view it.
        </p>
        <Button onClick={() => router.push("/dashboard/shipments")}>
          Back to Shipments
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/shipments")}
        className="mb-6 -ml-4"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Shipments
      </Button>

      <ShipmentStatusHeader shipment={shipment} />
      
      <ShipmentActions shipment={shipment} />
      <div className="mb-6" />

      <ShipmentDetailGrid shipment={shipment} />
      
      <ParcelSummary parcel={shipment.parcel} />

      <TrackingTimeline shipmentId={shipment.id} />
    </div>
  );
}


