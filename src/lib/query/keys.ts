export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
    notifications: ["user", "notifications"] as const,
  },
  shipments: {
    all: ["shipments"] as const,
    lists: () => [...queryKeys.shipments.all, "list"] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.shipments.lists(), filters] as const,
    details: () => [...queryKeys.shipments.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.shipments.details(), id] as const,
    tracking: (trackingNumber: string) => [...queryKeys.shipments.all, "tracking", trackingNumber] as const,
    search: (trackingNumber: string) => [...queryKeys.shipments.all, "search", trackingNumber] as const,
    timeline: (id: string) => [...queryKeys.shipments.all, "timeline", id] as const,
  },
  zones: {
    all: ["zones"] as const,
    lists: () => [...queryKeys.zones.all, "list"] as const,
  },
  pricing: {
    rules: ["pricing", "rules"] as const,
    calculation: (payload: unknown) => ["pricing", "calculate", payload] as const,
  },
  admin: {
    stats: ["admin", "stats"] as const,
    users: {
      all: ["admin", "users"] as const,
      lists: () => [...queryKeys.admin.users.all, "list"] as const,
      list: (filters: Record<string, unknown>) => [...queryKeys.admin.users.lists(), filters] as const,
      detail: (id: string) => [...queryKeys.admin.users.all, "detail", id] as const,
    },
    auditLogs: {
      all: ["admin", "auditLogs"] as const,
      lists: () => [...queryKeys.admin.auditLogs.all, "list"] as const,
      list: (filters: Record<string, unknown>) => [...queryKeys.admin.auditLogs.lists(), filters] as const,
    }
  }
};
