"use client";

import { useProfile } from "@/hooks/queries";
import { UserRole } from "@/types/api";
import { hasAnyRole } from "@/lib/auth/authorize";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export function RoleGate({ children, allowedRoles, fallback = null }: RoleGateProps) {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return null; // Or a skeleton
  }

  if (!profile || !hasAnyRole(profile.role, allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
