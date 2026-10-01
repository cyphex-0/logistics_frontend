"use client";

import { useShipmentTimeline } from "@/lib/query/shipments";
import { Skeleton } from "@/components/ui/skeleton";
import { Timestamp } from "@/components/shared/Timestamp";
import { getStatusConfig } from "@/lib/constants/shipment";

export function TrackingTimeline({ shipmentId }: { shipmentId: string }) {
  const { data: events, isLoading, isError } = useShipmentTimeline(shipmentId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tracking Timeline</h3>
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (isError || !events) {
    return (
      <div className="p-6 text-center border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Failed to load tracking timeline.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-6">Tracking Timeline</h3>
      {events.length === 0 ? (
        <div className="text-muted-foreground text-center p-6 border rounded-lg bg-muted/20">
          No tracking events found.
        </div>
      ) : (
        <div className="relative pl-6 border-l-2 border-muted space-y-8 ml-3">
          {events.map((event, index) => {
            const config = getStatusConfig(event.status);
            const Icon = config.icon;
            
            return (
              <div key={index} className="relative">
                <div className="absolute -left-[35px] bg-background border-2 border-muted rounded-full p-1 z-10 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${config.colorClass}`} />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-foreground tracking-tight">
                    {config.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{event.description}</span>
                  <Timestamp 
                    date={event.createdAt} 
                    showTime 
                    className="text-xs text-muted-foreground mt-1 font-medium" 
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
