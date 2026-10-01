import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shipment } from "@/services/shipment.service";

interface ActivitySummaryProps {
  shipments: Shipment[];
  isLoading: boolean;
}

export function ActivitySummary({ shipments, isLoading }: ActivitySummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent System Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground animate-pulse">Loading activity...</p>
          </div>
        ) : shipments.length === 0 ? (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shipments.slice(0, 5).map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Shipment {shipment.trackingNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {shipment.status.replace(/_/g, " ")}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
