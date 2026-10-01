"use client";

import { useState } from "react";
import { ShipmentStatus } from "@/types/api";
import { Shipment } from "@/services/shipment.service";
import { Button } from "@/components/ui/button";
import { StatusTransitionDialog } from "./StatusTransitionDialog";
import { Truck, Package, PackageCheck, AlertTriangle, ArrowRightCircle } from "lucide-react";

interface DeliveryActionBarProps {
  shipment: Shipment;
}

const getAvailableTransitions = (currentStatus: ShipmentStatus): ShipmentStatus[] => {
  switch (currentStatus) {
    case ShipmentStatus.PICKUP_ASSIGNED:
      return [ShipmentStatus.PICKED_UP];
    case ShipmentStatus.PICKED_UP:
      return [ShipmentStatus.IN_TRANSIT];
    case ShipmentStatus.IN_TRANSIT:
      return [ShipmentStatus.OUT_FOR_DELIVERY];
    case ShipmentStatus.OUT_FOR_DELIVERY:
      return [ShipmentStatus.DELIVERED, ShipmentStatus.FAILED_DELIVERY];
    case ShipmentStatus.FAILED_DELIVERY:
      return [ShipmentStatus.OUT_FOR_DELIVERY, ShipmentStatus.RETURNED];
    default:
      return [];
  }
};

const getActionConfig = (status: ShipmentStatus) => {
  switch (status) {
    case ShipmentStatus.PICKED_UP:
      return { icon: Package, label: "Mark as Picked Up", variant: "default" as const };
    case ShipmentStatus.IN_TRANSIT:
      return { icon: Truck, label: "Mark In Transit", variant: "default" as const };
    case ShipmentStatus.OUT_FOR_DELIVERY:
      return { icon: Truck, label: "Out for Delivery", variant: "default" as const };
    case ShipmentStatus.DELIVERED:
      return { icon: PackageCheck, label: "Mark Delivered", variant: "default" as const };
    case ShipmentStatus.FAILED_DELIVERY:
      return { icon: AlertTriangle, label: "Report Failure", variant: "destructive" as const };
    case ShipmentStatus.RETURNED:
      return { icon: ArrowRightCircle, label: "Return to Sender", variant: "destructive" as const };
    default:
      return { icon: Package, label: "Update Status", variant: "secondary" as const };
  }
};

export function DeliveryActionBar({ shipment }: DeliveryActionBarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<ShipmentStatus | null>(null);

  const availableTransitions = getAvailableTransitions(shipment.status);

  if (availableTransitions.length === 0) {
    return null;
  }

  const handleActionClick = (status: ShipmentStatus) => {
    setTargetStatus(status);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-muted/20 border rounded-lg">
      <div className="flex-1 min-w-[200px] flex items-center">
        <p className="text-sm text-muted-foreground">
          Update the shipment status to continue the delivery process.
        </p>
      </div>
      <div className="flex gap-2">
        {availableTransitions.map((status) => {
          const config = getActionConfig(status);
          const Icon = config.icon;
          return (
            <Button
              key={status}
              variant={config.variant}
              onClick={() => handleActionClick(status)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {config.label}
            </Button>
          );
        })}
      </div>

      <StatusTransitionDialog
        shipment={shipment}
        targetStatus={targetStatus}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
