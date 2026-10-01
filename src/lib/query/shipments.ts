import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shipmentService, CreateShipmentPayload } from "@/services/shipment.service";
import { queryKeys } from "./keys";
import { ShipmentStatus } from "@/types/api";
import { toast } from "sonner";

export function useShipments(filters?: { status?: ShipmentStatus; page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.shipments.list(filters || {}),
    queryFn: () => shipmentService.getShipments(filters),
  });
}

export function useShipment(id: string) {
  return useQuery({
    queryKey: queryKeys.shipments.detail(id),
    queryFn: () => shipmentService.getShipmentById(id),
    enabled: !!id,
  });
}

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShipmentPayload) => shipmentService.createShipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.all });
      toast.success("Shipment created successfully");
    },
  });
}

export function useUpdateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateShipmentPayload> }) => 
      shipmentService.updateShipment(id, data),
    meta: { suppressGlobalError: true },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      toast.success("Shipment updated successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables) => {
      if (error?.response?.status === 409 || error?.status === 409) {
        toast.error("Shipment status has changed. Refreshing data...");
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      } else {
        toast.error(error?.response?.data?.message || error?.message || "Failed to update shipment");
      }
    },
  });
}

export function useCancelShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => shipmentService.cancelShipment(id),
    meta: { suppressGlobalError: true },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      toast.success("Shipment cancelled successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables) => {
      if (error?.response?.status === 409 || error?.status === 409) {
        toast.error("Shipment status has changed. Refreshing data...");
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables) });
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      } else {
        toast.error(error?.response?.data?.message || error?.message || "Failed to cancel shipment");
      }
    },
  });
}

export function useUpdateShipmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, description, failureReason }: { id: string; status: ShipmentStatus; description: string; failureReason?: string }) => 
      shipmentService.updateShipmentStatus(id, { status, description, failureReason }),
    meta: { suppressGlobalError: true },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      toast.success(`Shipment status updated to ${data.status}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables) => {
      if (error?.response?.status === 409 || error?.status === 409) {
        toast.error("Shipment status has changed or conflicts. Refreshing data...");
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      } else {
        toast.error(error?.response?.data?.message || error?.message || "Failed to update shipment status");
      }
    },
  });
}

export function useAssignCourier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, courierId }: { id: string; courierId: string }) => 
      shipmentService.assignCourier(id, courierId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.lists() });
      toast.success("Courier assigned successfully");
    },
  });
}

export function useTracking(trackingNumber: string) {
  return useQuery({
    queryKey: queryKeys.shipments.tracking(trackingNumber),
    queryFn: () => shipmentService.trackShipment(trackingNumber),
    enabled: !!trackingNumber,
  });
}

export function useSearchShipments(filters?: { trackingNumber?: string; status?: ShipmentStatus; page?: number; limit?: number }, enabled = true) {
  return useQuery({
    queryKey: queryKeys.shipments.search(filters?.trackingNumber || ""),
    queryFn: () => shipmentService.searchShipments(filters),
    enabled: enabled && (!!filters?.trackingNumber || !!filters?.status),
  });
}

export function useShipmentTimeline(id: string) {
  return useQuery({
    queryKey: queryKeys.shipments.timeline(id),
    queryFn: () => shipmentService.getShipmentTracking(id),
    enabled: !!id,
  });
}

