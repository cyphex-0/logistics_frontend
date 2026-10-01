'use client';

import { ReactNode } from 'react';
import { UserRole } from '@/types/api';
import { hasAnyRole } from '@/lib/auth/authorize';
import { useProfile } from '@/hooks/queries';

interface PermissionGateProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({ allowedRoles, children, fallback = null }: PermissionGateProps) {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return null;
  }

  const user = data;

  if (hasAnyRole(user?.role, allowedRoles)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
