'use client';

import { ReactNode } from 'react';
import { useProfile } from '@/hooks/queries';
import { UserRole } from '@/types/api';
import { AccessDeniedPanel } from './AccessDeniedPanel';

interface RoleGateProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGate({ allowedRoles, children, fallback }: RoleGateProps) {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return null; // Or a loading skeleton
  }

  const user = data;
  
  if (!user || !allowedRoles.includes(user.role)) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }
    return <AccessDeniedPanel />;
  }

  return <>{children}</>;
}
