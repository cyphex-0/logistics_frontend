"use client";

import { useShipments } from "@/hooks/queries";
import { ShipmentStatus, ApiResponse } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function DispatchQueueBadge() {
  const { data, isLoading } = useShipments({
    status: ShipmentStatus.CONFIRMED,
    limit: 1, // We just need the total count
  });

  if (isLoading) {
    return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
  }

  const count = (data as ApiResponse<unknown> | undefined)?.meta?.total || 0;

  if (count === 0) return null;

  return (
    <Badge variant="secondary" className="ml-2 font-mono">
      {count} dispatch-ready
    </Badge>
  );
}
