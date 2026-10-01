/**
 * Centralized Query Keys Factory
 *
 * This provides type-safe, consistent query keys for React Query (TanStack Query).
 * Using a factory ensures we avoid typos and makes cache invalidation predictable.
 */

export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },

  users: {
    all: () => ["users"] as const,
    lists: () => ["users", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["users", "list", filters] as const,
    details: () => ["users", "detail"] as const,
    detail: (id: string) => ["users", "detail", id] as const,
    couriers: () => ["users", "couriers"] as const,
    couriersList: (filters?: Record<string, unknown>) => ["users", "couriers", "list", filters] as const,
  },

  shipments: {
    all: () => ["shipments"] as const,
    lists: () => ["shipments", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["shipments", "list", filters] as const,
    details: () => ["shipments", "detail"] as const,
    detail: (id: string) => ["shipments", "detail", id] as const,
    tracking: (id: string) => ["shipments", "tracking", id] as const,
    trackingNumber: (trackingNumber: string) => ["shipments", "tracking-number", trackingNumber] as const,
    deliveryAttempts: (id: string) => ["shipments", "delivery-attempts", id] as const,
  },

  zones: {
    all: () => ["zones"] as const,
    lists: () => ["zones", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["zones", "list", filters] as const,
    details: () => ["zones", "detail"] as const,
    detail: (id: string) => ["zones", "detail", id] as const,
  },

  pricingRules: {
    all: () => ["pricing-rules"] as const,
    lists: () => ["pricing-rules", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["pricing-rules", "list", filters] as const,
    details: () => ["pricing-rules", "detail"] as const,
    detail: (id: string) => ["pricing-rules", "detail", id] as const,
    calculate: (payload: Record<string, unknown>) => ["pricing-rules", "calculate", payload] as const,
  },

  payments: {
    all: () => ["payments"] as const,
    lists: () => ["payments", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["payments", "list", filters] as const,
    details: () => ["payments", "detail"] as const,
    detail: (id: string) => ["payments", "detail", id] as const,
  },

  notifications: {
    all: () => ["notifications"] as const,
    lists: () => ["notifications", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["notifications", "list", filters] as const,
    unreadCount: () => ["notifications", "unread-count"] as const,
  },

  auditLogs: {
    all: () => ["audit-logs"] as const,
    lists: () => ["audit-logs", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["audit-logs", "list", filters] as const,
  },

  analytics: {
    all: () => ["analytics"] as const,
    adminDashboard: (dateRange?: Record<string, unknown>) => ["analytics", "admin", dateRange] as const,
    customerDashboard: (dateRange?: Record<string, unknown>) => ["analytics", "customer", dateRange] as const,
    courierDashboard: (dateRange?: Record<string, unknown>) => ["analytics", "courier", dateRange] as const,
  },
};
