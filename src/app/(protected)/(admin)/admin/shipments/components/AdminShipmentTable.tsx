"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Shipment } from "@/types/domain";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Timestamp } from "@/components/shared/Timestamp";

interface AdminShipmentTableProps {
  data: Shipment[];
  isLoading: boolean;
}

export const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    cell: ({ row }) => (
      <div className="font-mono font-medium">
        {row.original.trackingNumber}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.customer?.name || "Unknown"}
      </div>
    ),
  },
  {
    id: "courier",
    header: "Courier",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.original.courier?.name || "Unassigned"}
      </div>
    ),
  },
  {
    id: "route",
    header: "Route",
    cell: ({ row }) => (
      <div className="text-sm">
        <div className="font-medium">{row.original.originCity}</div>
        <div className="text-muted-foreground text-xs">to {row.original.destinationCity}</div>
      </div>
    ),
  },
  {
    accessorKey: "serviceType",
    header: "Service",
    cell: ({ row }) => (
      <div className="text-sm font-medium">
        {row.original.serviceType}
      </div>
    ),
  },
  {
    id: "price",
    header: "Price",
    cell: ({ row }) => {
      const { estimatedPrice, finalPrice } = row.original;
      return (
        <div className="text-sm">
          {finalPrice ? (
            <span className="font-medium">৳{Number(finalPrice).toFixed(2)}</span>
          ) : (
            <span className="text-muted-foreground">Est: ৳{Number(estimatedPrice).toFixed(2)}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="text-sm whitespace-nowrap">
        <Timestamp date={row.original.createdAt} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shipment = row.original;
      return (
        <div className="flex items-center justify-end">
          <Link href={`/admin/shipments/${shipment.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View Details</span>
          </Link>
        </div>
      );
    },
  },
];

export function AdminShipmentTable({ data, isLoading }: AdminShipmentTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No shipments found"
      emptyDescription="Try adjusting your filters or search query."
      mobileCards={true}
    />
  );
}
