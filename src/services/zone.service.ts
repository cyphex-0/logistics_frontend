import { apiClient } from "@/lib/api/client";

export interface Zone {
  id: string;
  name: string;
  city: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateZonePayload {
  name: string;
  city: string;
  isActive?: boolean;
}

export const zoneService = {
  getZones: () => {
    return apiClient<Zone[]>("/zones", {
      method: "GET",
    });
  },

  createZone: (data: CreateZonePayload) => {
    return apiClient<Zone>("/zones", {
      method: "POST",
      body: data,
    });
  },

  updateZone: (id: string, data: Partial<CreateZonePayload>) => {
    return apiClient<Zone>(`/zones/${id}`, {
      method: "PATCH",
      body: data,
    });
  },

  deleteZone: (id: string) => {
    return apiClient<void>(`/zones/${id}`, {
      method: "DELETE",
    });
  },
};
