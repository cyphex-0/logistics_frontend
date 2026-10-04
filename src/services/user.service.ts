import { apiClient } from "@/lib/api/client";
import { User } from "@/types/api";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const userService = {
  getProfile: () => {
    return apiClient<User>("/users/me", {
      method: "GET",
    });
  },

  updateProfile: (data: unknown) => {
    return apiClient<unknown>("/users/me", {
      method: "PATCH",
      body: data,
    });
  },

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return apiClient<{ avatar: string }>("/users/me/avatar", {
      method: "POST",
      body: formData,
    });
  },

  getNotifications: async () => {
    const res = await apiClient<{ notifications: Notification[] }>("/users/me/notifications", {
      method: "GET",
    });
    return res.notifications || [];
  },

  markNotificationRead: (id: string) => {
    return apiClient<Notification>(`/users/me/notifications/${id}/read`, {
      method: "PATCH",
    });
  },
};
