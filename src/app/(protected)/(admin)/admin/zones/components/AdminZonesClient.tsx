"use client";

import { useZones } from "@/hooks/queries";
import { ZoneTable } from "./ZoneTable";
import { ZoneFormDialog } from "./ZoneFormDialog";

export default function AdminZonesClient() {
  const { data: zones, isLoading, isError } = useZones();

  if (isLoading) {
    return <div className="text-center py-10">Loading zones...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load zones.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Zones</h2>
        <ZoneFormDialog />
      </div>
      <ZoneTable zones={zones || []} />
    </div>
  );
}
