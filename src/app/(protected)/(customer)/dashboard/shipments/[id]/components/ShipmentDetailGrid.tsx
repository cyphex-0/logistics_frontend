import { Shipment } from "@/services/shipment.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

interface ShipmentDetailGridProps {
  shipment: Shipment;
}

export function ShipmentDetailGrid({ shipment }: ShipmentDetailGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <CardTitle className="text-lg">Origin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-base mb-2">Sender</p>
            <p>{shipment.originAddress}</p>
            <p>{shipment.originCity}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Navigation className="w-5 h-5 text-muted-foreground" />
          <CardTitle className="text-lg">Destination</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-base mb-2">{shipment.recipientName}</p>
            <p className="text-muted-foreground">{shipment.recipientPhone}</p>
            <p className="mt-2">{shipment.destinationAddress}</p>
            <p>{shipment.destinationCity}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
