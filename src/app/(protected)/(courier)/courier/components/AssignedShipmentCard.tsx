import { Shipment } from "@/services/shipment.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Timestamp } from "@/components/shared/Timestamp";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Package, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NextActionBadge } from "./NextActionBadge";
import { ShipmentStatus } from "@/types/api";

interface AssignedShipmentCardProps {
  shipment: Shipment;
}

export function AssignedShipmentCard({ shipment }: AssignedShipmentCardProps) {

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              {shipment.trackingNumber}
            </CardTitle>
            <CardDescription className="mt-1">
              Service: {shipment.serviceType.replace('_', ' ')}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <StatusBadge status={shipment.status} className="mb-2" />
            <NextActionBadge status={shipment.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex flex-col items-center justify-between py-1">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <div className="w-0.5 h-full bg-border my-1" />
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col justify-between py-0 space-y-4">
              <div>
                <p className="text-sm font-medium">Pickup</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{shipment.originAddress}, {shipment.originCity}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{shipment.destinationAddress}, {shipment.destinationCity}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t mt-4 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span className="truncate max-w-[120px]">
            <Timestamp date={shipment.updatedAt} />
          </span>
        </div>
        <Link href={`/courier/shipments/${shipment.id}`} className={buttonVariants({ variant: "ghost", size: "sm" }) + " ml-auto"}>
          View Details <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
