import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { shipmentService, CreateShipmentPayload } from "@/services/shipment.service";
import { userService } from "@/services/user.service";
import { adminService } from "@/services/admin.service";
import { zoneService, CreateZonePayload } from "@/services/zone.service";
import { pricingService, UpsertPricingRulePayload } from "@/services/pricing.service";
import { paymentService } from "@/services/payment.service";
import { ShipmentStatus } from "@/types/api";

// --- Users & Profile ---
export function useProfile() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: () => userService.getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.lists(),
    queryFn: () => userService.getNotifications(),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userService.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.lists() });
    },
  });
}

/**
 * Fetches paginated shipments.
 * Dashboard refresh behavior: The dashboard relies on React Query's default
 * staleTime (60s) to refetch on mount and window focus (if enabled). Cache invalidation
 * (via queryClient.invalidateQueries) during mutations (e.g. createShipment)
 * ensures the dashboard stays up to date without manual polling.
 */
export function useShipments(params?: { status?: ShipmentStatus; page?: number; limit?: number; trackingNumber?: string }) {
  return useQuery({
    queryKey: queryKeys.shipments.list(params),
    queryFn: () => shipmentService.getShipments(params),
  });
}

export function useShipment(id: string) {
  return useQuery({
    queryKey: queryKeys.shipments.detail(id),
    queryFn: () => shipmentService.getShipmentById(id),
    enabled: !!id,
  });
}

export function useTracking(trackingNumber: string) {
  return useQuery({
    queryKey: queryKeys.shipments.trackingNumber(trackingNumber),
    queryFn: () => shipmentService.trackShipment(trackingNumber),
    enabled: !!trackingNumber,
  });
}

export function useCreateShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateShipmentPayload) => shipmentService.createShipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.all() });
    },
  });
}


export function useUpdateShipmentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, description, failureReason }: { id: string; status: ShipmentStatus; description: string; failureReason?: string }) => 
      shipmentService.updateShipmentStatus(id, { status, description, failureReason }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.list() });
    },
  });
}

export function useUpdateShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateShipmentPayload> }) => 
      shipmentService.updateShipment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.list() });
    },
  });
}

export function useDeleteShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shipmentService.deleteShipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.list() });
    },
  });
}

export function useAssignCourier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, courierId }: { id: string; courierId: string }) => 
      shipmentService.assignCourier(id, courierId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.list() });
    },
  });
}

export function useRefundPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { shipmentId: string; reason?: string }) => paymentService.refundPayment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables.shipmentId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.list() });
    },
  });
}

// --- Zones ---
export function useZones() {
  return useQuery({
    queryKey: queryKeys.zones.all(),
    queryFn: () => zoneService.getZones(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateZonePayload) => zoneService.createZone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones.all() });
    },
  });
}

export function useUpdateZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateZonePayload> }) => 
      zoneService.updateZone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones.all() });
    },
  });
}

export function useDeleteZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => zoneService.deleteZone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones.all() });
    },
  });
}

// --- Admin ---
export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.analytics.adminDashboard(),
    queryFn: () => adminService.getStats(),
    staleTime: 60 * 1000,
  });
}

export function useAdminUsers(params?: { role?: string; page?: number; limit?: number; q?: string }) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => adminService.getUsers(params),
  });
}

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => adminService.getAdminUser(id),
    enabled: !!id,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role, serviceArea }: { id: string; role: string; serviceArea?: string }) => 
      adminService.updateUserRole(id, { role, serviceArea }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
    },
  });
}

export function useAuditLogs(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.auditLogs.list(params),
    queryFn: () => adminService.getAuditLogs(params),
  });
}

// --- Pricing ---
export function usePricingRules() {
  return useQuery({
    queryKey: queryKeys.pricingRules.lists(),
    queryFn: () => pricingService.getRules(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpsertPricingRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpsertPricingRulePayload) => pricingService.upsertRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricingRules.all() });
    },
  });
}
