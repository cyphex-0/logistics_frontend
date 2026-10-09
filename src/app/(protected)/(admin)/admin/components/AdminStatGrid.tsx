import { StatCard } from "@/components/shared/StatCard";
import { Users, Package, Activity } from "lucide-react";
import { DashboardStats } from "@/services/admin.service";

interface AdminStatGridProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function AdminStatGrid({ stats, isLoading }: AdminStatGridProps) {
  const totalUsers = stats ? (stats.totalCustomers || 0) + (stats.totalCouriers || 0) : 0;
  const activeShipments = stats ? (stats.shipmentsByStatus?.inTransit || 0) + (stats.shipmentsByStatus?.pending || 0) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Users"
        value={isLoading ? "-" : totalUsers.toLocaleString()}
        icon={Users}
        description="Registered platform users"
      />
      <StatCard
        title="Total Shipments"
        value={isLoading ? "-" : stats?.totalShipments?.toLocaleString() || "0"}
        icon={Package}
        description="All time shipments"
      />
      <StatCard
        title="Active Shipments"
        value={isLoading ? "-" : activeShipments.toLocaleString()}
        icon={Activity}
        description="Currently in progress"
      />
    </div>
  );
}
