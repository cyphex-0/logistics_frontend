export interface AuditLog {
  id: string;
  actorId: string | null;
  action: string;
  entity: string;
  entityId: string;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  ipAddress: string | null;
  description: string | null;
  createdAt: string;
}

export interface AuditLogFilters {
  entity?: string;
  action?: string;
  actorId?: string;
}
