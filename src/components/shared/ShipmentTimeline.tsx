import { ShipmentStatus } from "@/types/api";
import { cn } from "@/lib/utils";
import { getStatusConfig } from "@/lib/constants/shipment";
import { Timestamp } from "@/components/shared/Timestamp";

interface TimelineEvent {
  status: ShipmentStatus;
  timestamp: string;
  location?: string;
  description?: string;
}

interface ShipmentTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function ShipmentTimeline({ events, className }: ShipmentTimelineProps) {
  // Sort events newest first
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className={cn("space-y-6", className)}>
      {sortedEvents.map((event, index) => {
        const config = getStatusConfig(event.status);
        const Icon = config.icon;
        const isLatest = index === 0;

        return (
          <div key={index} className="relative flex gap-4">
            {/* Connecting line */}
            {index !== sortedEvents.length - 1 && (
              <div className="absolute left-4 top-8 -bottom-6 w-px bg-border" />
            )}
            
            {/* Icon */}
            <div className={cn(
              "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-background z-10",
              isLatest ? `border-current ${config.colorClass}` : "border-muted text-muted-foreground"
            )}>
              <Icon className="h-4 w-4" />
            </div>
            
            {/* Content */}
            <div className="flex flex-col flex-1 pb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className={cn("font-medium", isLatest ? "text-foreground" : "text-muted-foreground")}>
                  {config.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  <Timestamp date={event.timestamp} showTime />
                </span>
              </div>
              
              {event.location && (
                <span className="text-sm text-muted-foreground mt-1">
                  Location: {event.location}
                </span>
              )}
              
              {event.description && (
                <p className="text-sm mt-2 p-3 bg-muted/50 rounded-md">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
