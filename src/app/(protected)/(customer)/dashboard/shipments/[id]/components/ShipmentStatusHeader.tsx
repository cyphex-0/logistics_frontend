import { PaymentStatus } from "@/types/api";
import { Shipment } from "@/services/shipment.service";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Timestamp } from "@/components/shared/Timestamp";

interface ShipmentStatusHeaderProps {
  shipment: Shipment;
}

export function ShipmentStatusHeader({ shipment }: ShipmentStatusHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Tracking No: {shipment.trackingNumber}
        </h1>
        <p className="text-muted-foreground text-sm">
          Created on <Timestamp date={shipment.createdAt} />
        </p>
      </div>
      <div className="flex gap-2">
        <StatusBadge status={shipment.status} className="text-sm px-3 py-1" />
        {shipment.paymentStatus && (
          <Badge variant={shipment.paymentStatus === PaymentStatus.PAID ? "default" : "secondary"} className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700 data-[state=unpaid]:bg-yellow-600">
            Payment: {shipment.paymentStatus}
          </Badge>
        )}
      </div>
    </div>
  );
}
