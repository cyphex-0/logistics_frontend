import { apiClient } from "@/lib/api/client";

// Basic Auth Types (to be expanded in later phases)
export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  name?: string;
  role?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

export const authService = {
  login: (data: LoginPayload) => {
    return apiClient<{ user: AuthUser; token: string }>("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  register: (data: RegisterPayload) => {
    return apiClient<{ user: AuthUser; token: string }>("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  logout: () => {
    return apiClient<void>("/auth/logout", {
      method: "POST",
    });
  },

  getProfile: () => {
    return apiClient<{ user: AuthUser }>("/auth/me", {
      method: "GET",
    });
  },
};
