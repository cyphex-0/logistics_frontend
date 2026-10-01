import { UserRole } from "@/types/api";

export function canAccessAdmin(role?: UserRole): boolean {
  return role === UserRole.ADMIN;
}

export function canAccessCourier(role?: UserRole): boolean {
  return role === UserRole.COURIER;
}

export function canAccessCustomer(role?: UserRole): boolean {
  return role === UserRole.CUSTOMER;
}

export function hasAnyRole(currentRole?: UserRole, allowedRoles?: UserRole[]): boolean {
  if (!currentRole) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return allowedRoles.includes(currentRole);
}
