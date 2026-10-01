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

  getNotifications: () => {
    return apiClient<Notification[]>("/users/me/notifications", {
      method: "GET",
    });
  },

  markNotificationRead: (id: string) => {
    return apiClient<Notification>(`/users/me/notifications/${id}/read`, {
      method: "PATCH",
    });
  },
};
