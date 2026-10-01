import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zoneService, CreateZonePayload } from "@/services/zone.service";
import { queryKeys } from "./keys";
import { toast } from "sonner";

export function useZones() {
  return useQuery({
    queryKey: queryKeys.zones.lists(),
    queryFn: () => zoneService.getZones(),
  });
}

export function useCreateZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateZonePayload) => zoneService.createZone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones.lists() });
      toast.success("Zone created successfully");
    },
  });
}

export function useUpdateZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateZonePayload> }) => 
      zoneService.updateZone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones.lists() });
      toast.success("Zone updated successfully");
    },
  });
}

export function useDeleteZone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => zoneService.deleteZone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones.lists() });
      toast.success("Zone deleted successfully");
    },
  });
}
