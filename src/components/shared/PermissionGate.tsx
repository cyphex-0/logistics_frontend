"use client";

import { useProfile } from "@/hooks/queries";
import { UserRole } from "@/types/api";

type Permission = "create:shipment" | "manage:users" | "accept:delivery" | "manage:zones";

const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: ["manage:users", "manage:zones", "create:shipment"],
  [UserRole.COURIER]: ["accept:delivery"],
  [UserRole.CUSTOMER]: ["create:shipment"],
};

export function hasPermission(role: UserRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  return rolePermissions[role]?.includes(permission) || false;
}

interface PermissionGateProps {
  children: React.ReactNode;
  permission: Permission;
  fallback?: React.ReactNode;
}

export function PermissionGate({ children, permission, fallback = null }: PermissionGateProps) {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return null;
  }

  if (!hasPermission(profile?.role, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
