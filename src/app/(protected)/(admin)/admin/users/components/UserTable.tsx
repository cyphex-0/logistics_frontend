"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "@/components/shared/Timestamp";
import { Eye, Shield, User as UserIcon, Truck } from "lucide-react";
import Link from "next/link";
import { User } from "@/types/api";
import { UserRole } from "@/types/api";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";

interface UserTableProps {
  data: User[];
  isLoading: boolean;
}

const RoleIcon = ({ role }: { role: UserRole }) => {
  switch (role) {
    case UserRole.ADMIN:
      return <Shield className="w-4 h-4 text-primary" />;
    case UserRole.COURIER:
      return <Truck className="w-4 h-4 text-blue-500" />;
    case UserRole.CUSTOMER:
      return <UserIcon className="w-4 h-4 text-muted-foreground" />;
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <RoleIcon role={row.original.role} />
        <span className="text-sm capitalize">{row.original.role.toLowerCase()}</span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <div className="text-sm whitespace-nowrap">
        <Timestamp date={row.original.createdAt} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center justify-end">
          <Link href={`/admin/users/${user.id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View Details</span>
          </Link>
        </div>
      );
    },
  },
];

export function UserTable({ data, isLoading }: UserTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyTitle="No users found"
      emptyDescription="Try adjusting your filters or search query."
      mobileCards={true}
    />
  );
}
