import { StatCard } from "@/components/shared/StatCard";
import { Users, Package, Activity } from "lucide-react";
import { DashboardStats } from "@/services/admin.service";

interface AdminStatGridProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function AdminStatGrid({ stats, isLoading }: AdminStatGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Users"
        value={isLoading ? "-" : stats?.totalUsers?.toLocaleString() || "0"}
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
        value={isLoading ? "-" : stats?.activeShipments?.toLocaleString() || "0"}
        icon={Activity}
        description="Currently in progress"
      />
    </div>
  );
}
