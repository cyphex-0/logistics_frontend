import { apiClient } from "@/lib/api/client";
import { User } from "@/types/api";
export interface DashboardStats {
  totalCustomers: number;
  totalCouriers: number;
  totalShipments: number;
  shipmentsByStatus: {
    pending: number;
    inTransit: number;
    delivered: number;
  };
  totalRevenue: number;
}

export const adminService = {
  getStats: () => {
    return apiClient<DashboardStats>("/admin/dashboard-stats", {
      method: "GET",
    });
  },

  getUsers: (params?: { role?: string; page?: number; limit?: number; q?: string }) => {
    return apiClient<{ total: number; page: number; limit: number; data: User[] }>("/admin/users", {
      method: "GET",
      params,
    });
  },

  updateUserRole: (userId: string, data: { role: string; serviceArea?: string }) => {
    return apiClient<User>(`/admin/users/${userId}/role`, {
      method: "PATCH",
      body: data,
    });
  },

  deleteUser: (userId: string) => {
    return apiClient<void>(`/admin/users/${userId}`, {
      method: "DELETE",
    });
  },

  getAuditLogs: (params?: { page?: number; limit?: number }) => {
    return apiClient<unknown[]>("/admin/audit-logs", {
      method: "GET",
      params,
    });
  },

  getAdminUser: (userId: string) => {
    return apiClient<User>(`/admin/users/${userId}`, {
      method: "GET",
    });
  },
};
