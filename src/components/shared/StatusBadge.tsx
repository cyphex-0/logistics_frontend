import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShipmentStatus } from "@/types/api";
import { getStatusConfig } from "@/lib/constants/shipment";

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={cn("border-transparent font-medium", config.bgClass, className)}
    >
      {config.label}
    </Badge>
  );
}
