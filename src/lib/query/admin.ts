import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { queryKeys } from "./keys";
import { toast } from "sonner";

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats,
    queryFn: () => adminService.getStats(),
  });
}

export function useAdminUsers(filters?: { role?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.admin.users.list(filters || {}),
    queryFn: () => adminService.getUsers(filters),
  });
}

export function useGetAdminUser(id: string) {
  return useQuery({
    queryKey: queryKeys.admin.users.detail(id),
    queryFn: () => adminService.getAdminUser(id),
    enabled: !!id,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role, serviceArea }: { userId: string; role: string; serviceArea?: string }) => 
      adminService.updateUserRole(userId, { role, serviceArea }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.detail(data.id) });
      toast.success("User role updated successfully");
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => adminService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users.lists() });
      toast.success("User deleted successfully");
    },
  });
}

export function useAuditLogs(filters?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.admin.auditLogs.list(filters || {}),
    queryFn: () => adminService.getAuditLogs(filters),
  });
}
