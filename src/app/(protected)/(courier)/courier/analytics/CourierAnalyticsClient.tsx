"use client";

import { useShipments } from "@/hooks/queries";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Loader2, PackageX, CheckCircle2, Truck, AlertTriangle } from "lucide-react";
import type { Shipment } from "@/services/shipment.service";
import { AnalyticsCard } from "./components/AnalyticsCard";
import { AvailabilityInfo } from "./components/AvailabilityInfo";
import { getStatusConfig } from "@/lib/constants/shipment";
import dynamic from "next/dynamic";

const StatusDistributionChart = dynamic(() => import("./components/StatusDistributionChart").then(mod => mod.StatusDistributionChart), {
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center border rounded-xl bg-card">
      <p className="text-sm text-muted-foreground animate-pulse">Loading chart...</p>
    </div>
  ),
});

const DeliveryTrendCard = dynamic(() => import("./components/DeliveryTrendCard").then(mod => mod.DeliveryTrendCard), {
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] items-center justify-center border rounded-xl bg-card">
      <p className="text-sm text-muted-foreground animate-pulse">Loading chart...</p>
    </div>
  ),
});

export function CourierAnalyticsClient() {
  const { data: shipmentsData, isLoading, error } = useShipments({ limit: 50 });
  
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-2">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <h3 className="text-xl font-semibold">Failed to load analytics</h3>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const shipments: Shipment[] = shipmentsData?.data || [];

  // Calculate status distribution
  const statusCounts = shipments.reduce((acc: Record<string, number>, shipment: Shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(statusCounts).map(status => ({
    name: getStatusConfig(status).label,
    value: statusCounts[status]
  }));

  // Calculate trends (by creation date or delivery date, simplified to just mock dates from recent shipments)
  // For a real app, this would group by actual dates. Here we'll group by a simplified date string.
  const dateCounts = shipments.reduce((acc: Record<string, number>, shipment: Shipment) => {
    const date = new Date(shipment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(dateCounts)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7) // Last 7 days with data
    .map(date => ({
      name: date,
      shipments: dateCounts[date]
    }));

  const totalCompleted = shipments.filter((s: Shipment) => s.status === 'DELIVERED').length;
  const totalFailed = shipments.filter((s: Shipment) => s.status === 'RETURNED' || s.status === 'CANCELLED').length;
  const totalActive = shipments.length - totalCompleted - totalFailed;
  const completionRate = shipments.length > 0 ? Math.round((totalCompleted / shipments.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
        <p className="text-muted-foreground">Track your delivery performance and history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Total Assigned"
          value={shipments.length}
          description="Shipments assigned to you"
          icon={<Truck className="h-4 w-4" />}
          iconClassName="text-muted-foreground"
        />
        <AnalyticsCard 
          title="Completion Rate"
          value={`${completionRate}%`}
          description="Successfully delivered"
          icon={<CheckCircle2 className="h-4 w-4" />}
          iconClassName="text-emerald-500"
        />
        <AnalyticsCard 
          title="Active Deliveries"
          value={totalActive}
          description="Currently in progress"
          icon={<Truck className="h-4 w-4" />}
          iconClassName="text-blue-500"
        />
        <AnalyticsCard 
          title="Failed / Returned"
          value={totalFailed}
          description="Unsuccessful attempts"
          icon={<PackageX className="h-4 w-4" />}
          iconClassName="text-red-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2 grid gap-4 md:grid-cols-2">
          <StatusDistributionChart data={pieData} />
          <DeliveryTrendCard data={barData} />
        </div>
        <div className="col-span-1 space-y-4">
          <AvailabilityInfo />
          
          <Card>
            <CardHeader>
              <CardTitle>Earnings Information</CardTitle>
              <CardDescription>Financial summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted p-4 border flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Earnings Data Unavailable</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Detailed earnings and payment split information is currently unavailable via the analytics platform. 
                    Please contact dispatch for financial records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
