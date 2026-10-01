import { StatCard } from "@/components/shared/StatCard";
import { DollarSign } from "lucide-react";

interface RevenueCardProps {
  revenue?: number;
  isLoading: boolean;
}

export function RevenueCard({ revenue, isLoading }: RevenueCardProps) {
  return (
    <StatCard
      title="Total Revenue"
      value={isLoading ? "-" : `$${(revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      icon={DollarSign}
      description="Platform lifetime revenue"
    />
  );
}
