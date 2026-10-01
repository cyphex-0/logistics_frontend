"use client";

import { StatCard } from "@/components/shared/StatCard";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useProfile, useShipments } from "@/hooks/queries";
import { ShipmentStatus } from "@/types/api";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Timestamp } from "@/components/shared/Timestamp";
import { useRouter } from "next/navigation";

export default function CustomerDashboardPage() {
  const router = useRouter();
  
  // Dashboard Refresh Behavior: 
  // Profile and shipments data are fetched using React Query.
  // The default staleTime of 0 ensures that these queries automatically 
  // refetch on window focus and on component mount. Actions like creating
  // a new shipment will invalidate the query keys (queryKeys.shipments.list()),
  // which forces the dashboard to show fresh data without a manual page reload.
  const { data: profile, isLoading: isProfileLoading, isError: isProfileError, refetch: refetchProfile } = useProfile();
  const { data: shipmentsData, isLoading: isShipmentsLoading, isError: isShipmentsError, refetch: refetchShipments } = useShipments();
  const shipments = shipmentsData?.data || [];
  
  const totalShipments = shipmentsData?.total ?? shipments.length;
  const inTransitCount = shipments.filter(
    (s) =>
      s.status === ShipmentStatus.IN_TRANSIT ||
      s.status === ShipmentStatus.OUT_FOR_DELIVERY,
  ).length;
  const deliveredCount = shipments.filter(
    (s) => s.status === ShipmentStatus.DELIVERED,
  ).length;
  const pendingCount = shipments.filter(
    (s) =>
      s.status === ShipmentStatus.PENDING ||
      s.status === ShipmentStatus.CONFIRMED,
  ).length;

  const recentShipments = [...shipments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        {isProfileLoading ? (
          <div className="h-9 w-48 bg-muted animate-pulse rounded-md mb-2"></div>
        ) : isProfileError ? (
          <div className="mb-2 text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to load profile.</span>
            <Button variant="link" size="sm" onClick={() => refetchProfile()} className="h-auto p-0">Retry</Button>
          </div>
        ) : (
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {profile?.name.split(" ")[0]}!
          </h1>
        )}
        <p className="text-muted-foreground">
          Here is an overview of your shipments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Shipments"
          value={isShipmentsLoading ? "-" : totalShipments.toString()}
          icon={Package}
          description="All time shipments"
        />
        <StatCard
          title="In Transit"
          value={isShipmentsLoading ? "-" : inTransitCount.toString()}
          icon={Truck}
          description="Currently moving"
        />
        <StatCard
          title="Delivered"
          value={isShipmentsLoading ? "-" : deliveredCount.toString()}
          icon={CheckCircle}
          description="Successfully delivered"
        />
        <StatCard
          title="Pending"
          value={isShipmentsLoading ? "-" : pendingCount.toString()}
          icon={Clock}
          description="Awaiting action"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 border rounded-xl p-6 bg-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Recent Shipments</h3>
            {recentShipments.length > 0 && (
              <Link href="/dashboard/shipments">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground"
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          <div className="flex-1">
            {isShipmentsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg animate-pulse"
                  >
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted rounded"></div>
                      <div className="h-3 w-24 bg-muted rounded"></div>
                    </div>
                    <div className="h-6 w-20 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : isShipmentsError ? (
              <div className="p-8 text-center border rounded-lg border-destructive/20 bg-destructive/5 flex flex-col items-center">
                <AlertCircle className="h-8 w-8 text-destructive mb-3" />
                <p className="text-destructive font-medium mb-3">Failed to load recent shipments</p>
                <Button variant="outline" size="sm" onClick={() => refetchShipments()}>Try Again</Button>
              </div>
            ) : recentShipments.length > 0 ? (
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <Link
                    href={`/dashboard/shipments/${shipment.id}`}
                    key={shipment.id}
                    className="block group"
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors">
                      <div>
                        <div className="font-medium">
                          {shipment.trackingNumber}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          To: {shipment.recipientName} •{" "}
                          <Timestamp date={shipment.createdAt} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={shipment.status} />
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">No shipments yet</h4>
                <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
                  Create your first shipment to start sending packages across
                  the country.
                </p>
                <Link href="/dashboard/shipments/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Shipment
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 space-y-4">
          <div className="border rounded-xl p-6 bg-card h-fit">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dashboard/shipments/new"
                  className="flex items-center text-sm font-medium hover:text-primary transition-colors p-2 -mx-2 rounded-md hover:bg-muted"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                    <Plus className="h-4 w-4" />
                  </div>
                  Create New Shipment
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/payments"
                  className="flex items-center text-sm font-medium hover:text-primary transition-colors p-2 -mx-2 rounded-md hover:bg-muted"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  View Payment History
                </Link>
              </li>
            </ul>
          </div>

          <div className="border rounded-xl p-6 bg-card h-fit">
            <h3 className="font-semibold text-lg mb-4">Track Package</h3>
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const trackingNumber = formData.get("tracking") as string;
                if (trackingNumber) {
                  router.push(`/track/${trackingNumber}`);
                }
              }}
            >
              <input
                name="tracking"
                type="text"
                placeholder="Enter tracking number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit">Track</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
