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

export interface CourierPerformance {
  id: string;
  name: string;
  serviceArea: string | null;
  totalAssigned: number;
  delivered: number;
  failed: number;
  avgDeliveryTimeHours: number;
}

export const adminService = {
  getRevenueReport: (days: number = 30) => {
    return apiClient<{ date: string; revenue: number }[]>("/admin/reports/revenue", {
      method: "GET",
      params: { days },
    });
  },

  getCourierPerformance: () => {
    return apiClient<CourierPerformance[]>("/admin/reports/courier-performance", {
      method: "GET",
    });
  },

  exportData: (type: 'shipments' | 'users' | 'payments' | 'audit-logs', startDate?: string, endDate?: string) => {
    return apiClient<Record<string, unknown>[]>("/admin/reports/export", {
      method: "GET",
      params: { type, startDate, endDate },
    });
  },

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
