import { ShipmentStatus } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface NextActionBadgeProps {
  status: ShipmentStatus;
}

export function NextActionBadge({ status }: NextActionBadgeProps) {
  let nextAction = "";
  let variant: "default" | "secondary" | "outline" | "destructive" = "secondary";

  switch (status) {
    case ShipmentStatus.PICKUP_ASSIGNED:
      nextAction = "Pick Up Package";
      variant = "default";
      break;
    case ShipmentStatus.PICKED_UP:
      nextAction = "Start Transit";
      variant = "default";
      break;
    case ShipmentStatus.IN_TRANSIT:
      nextAction = "Out for Delivery";
      variant = "default";
      break;
    case ShipmentStatus.OUT_FOR_DELIVERY:
      nextAction = "Deliver or Fail";
      variant = "default";
      break;
    case ShipmentStatus.FAILED_DELIVERY:
      nextAction = "Reattempt / Return";
      variant = "destructive";
      break;
    default:
      return null;
  }

  return (
    <Badge variant={variant} className="flex items-center gap-1 mt-2">
      <ArrowRight className="h-3 w-3" />
      Next: {nextAction}
    </Badge>
  );
}
