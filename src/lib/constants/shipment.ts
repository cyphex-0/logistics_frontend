import { ShipmentStatus } from "@/types/api";
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  XCircle, 
  LucideIcon, 
  ClipboardCheck, 
  UserCheck, 
  MapPin, 
  AlertCircle, 
  Undo2 
} from "lucide-react";

export interface ShipmentStatusConfig {
  label: string;
  icon: LucideIcon;
  colorClass: string; // text color
  bgClass: string;    // badge background color (opaque/solid for badges)
  lightBgClass: string; // timeline background color (light/transparent for timeline circles)
}

export const SHIPMENT_STATUS_CONFIG: Record<ShipmentStatus, ShipmentStatusConfig> = {
  [ShipmentStatus.PENDING]: {
    label: "Pending",
    icon: Clock,
    colorClass: "text-status-pending",
    bgClass: "bg-status-pending text-slate-900 hover:bg-status-pending/80",
    lightBgClass: "bg-status-pending/20",
  },
  [ShipmentStatus.CONFIRMED]: {
    label: "Confirmed",
    icon: ClipboardCheck,
    colorClass: "text-status-confirmed",
    bgClass: "bg-status-confirmed text-white hover:bg-status-confirmed/80",
    lightBgClass: "bg-status-confirmed/20",
  },
  [ShipmentStatus.PICKUP_ASSIGNED]: {
    label: "Pickup Assigned",
    icon: UserCheck,
    colorClass: "text-status-pickup-assigned",
    bgClass: "bg-status-pickup-assigned text-white hover:bg-status-pickup-assigned/80",
    lightBgClass: "bg-status-pickup-assigned/20",
  },
  [ShipmentStatus.PICKED_UP]: {
    label: "Picked Up",
    icon: Package,
    colorClass: "text-status-picked-up",
    bgClass: "bg-status-picked-up text-white hover:bg-status-picked-up/80",
    lightBgClass: "bg-status-picked-up/20",
  },
  [ShipmentStatus.IN_TRANSIT]: {
    label: "In Transit",
    icon: Truck,
    colorClass: "text-status-in-transit",
    bgClass: "bg-status-in-transit text-white hover:bg-status-in-transit/80",
    lightBgClass: "bg-status-in-transit/20",
  },
  [ShipmentStatus.OUT_FOR_DELIVERY]: {
    label: "Out For Delivery",
    icon: MapPin,
    colorClass: "text-status-out-for-delivery",
    bgClass: "bg-status-out-for-delivery text-slate-900 hover:bg-status-out-for-delivery/80",
    lightBgClass: "bg-status-out-for-delivery/20",
  },
  [ShipmentStatus.DELIVERED]: {
    label: "Delivered",
    icon: CheckCircle2,
    colorClass: "text-status-delivered",
    bgClass: "bg-status-delivered text-white hover:bg-status-delivered/80",
    lightBgClass: "bg-status-delivered/20",
  },
  [ShipmentStatus.FAILED_DELIVERY]: {
    label: "Failed Delivery",
    icon: AlertCircle,
    colorClass: "text-status-failed-delivery",
    bgClass: "bg-status-failed-delivery text-white hover:bg-status-failed-delivery/80",
    lightBgClass: "bg-status-failed-delivery/20",
  },
  [ShipmentStatus.CANCELLED]: {
    label: "Cancelled",
    icon: XCircle,
    colorClass: "text-status-cancelled",
    bgClass: "bg-status-cancelled text-white hover:bg-status-cancelled/80",
    lightBgClass: "bg-status-cancelled/20",
  },
  [ShipmentStatus.RETURNED]: {
    label: "Returned",
    icon: Undo2,
    colorClass: "text-status-returned",
    bgClass: "bg-status-returned text-white hover:bg-status-returned/80",
    lightBgClass: "bg-status-returned/20",
  },
};

export const getStatusConfig = (status: ShipmentStatus | string): ShipmentStatusConfig => {
  return SHIPMENT_STATUS_CONFIG[status as ShipmentStatus] || {
    label: (status || "Unknown").replace(/_/g, " "),
    icon: Package,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted text-muted-foreground",
    lightBgClass: "bg-muted",
  };
};
