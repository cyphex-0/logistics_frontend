import { Shipment } from "@/services/shipment.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

interface ParcelSummaryProps {
  parcel: Shipment["parcel"];
}

export function ParcelSummary({ parcel }: ParcelSummaryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Package className="w-5 h-5 text-muted-foreground" />
        <CardTitle className="text-lg">Parcel Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 text-sm">
          <div>
            <dt className="text-muted-foreground mb-1">Weight</dt>
            <dd className="font-medium">{parcel.weight} kg</dd>
          </div>
          <div>
            <dt className="text-muted-foreground mb-1">Dimensions</dt>
            <dd className="font-medium">
              {parcel.length} x {parcel.width} x {parcel.height} cm
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground mb-1">Fragile</dt>
            <dd className="font-medium">{parcel.isFragile ? "Yes" : "No"}</dd>
          </div>
          {parcel.description && (
            <div className="col-span-2 sm:col-span-4 mt-2">
              <dt className="text-muted-foreground mb-1">Description</dt>
              <dd className="font-medium">{parcel.description}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
