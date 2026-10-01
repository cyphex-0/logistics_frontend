"use client";

import { useDashboardStats, useShipments } from "@/hooks/queries";
import { AdminStatGrid } from "./components/AdminStatGrid";
import { RevenueCard } from "./components/RevenueCard";
import { ActivitySummary } from "./components/ActivitySummary";
import dynamic from "next/dynamic";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminChartCard = dynamic(() => import("./components/AdminChartCard").then(mod => mod.AdminChartCard), {
  ssr: false,
  loading: () => (
    <div className="flex h-[338px] items-center justify-center border rounded-xl bg-card">
      <p className="text-sm text-muted-foreground animate-pulse">Loading chart...</p>
    </div>
  ),
});
import { AlertCircle } from "lucide-react";

export function AdminDashboardClient() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  // Fetch shipments for activity feed and distribution charts
  const { data: shipmentsResponse, isLoading: shipmentsLoading, error: shipmentsError } = useShipments({ limit: 50 });

  const shipments = shipmentsResponse?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform statistics and operational overview.</p>
      </div>

      {statsError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard statistics. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* 
        Documentation for charts:
        - Primary KPI row (AdminStatGrid, RevenueCard) uses aggregate stats fetched from /admin/dashboard-stats.
        - Secondary visualizations (AdminChartCard, ActivitySummary) are derived from the live /shipments endpoint.
      */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <AdminStatGrid stats={stats} isLoading={statsLoading} />
        </div>
        <div className="md:col-span-1">
          <RevenueCard revenue={stats?.revenue} isLoading={statsLoading} />
        </div>
      </div>

      {/* Secondary visualizations row */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          {shipmentsError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load shipments for distribution chart.</AlertDescription>
            </Alert>
          )}
          <AdminChartCard shipments={shipments} isLoading={shipmentsLoading} />
        </div>
        <div>
          {shipmentsError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load recent system activity.</AlertDescription>
            </Alert>
          )}
          <ActivitySummary shipments={shipments} isLoading={shipmentsLoading} />
        </div>
      </div>
    </div>
  );
}
