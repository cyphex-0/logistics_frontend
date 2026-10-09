import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, LoginPayload, RegisterPayload } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { queryKeys } from "./keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, data.user);
      toast.success("Successfully logged in");
      router.push("/dashboard");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, data.user);
      toast.success("Successfully registered");
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Successfully logged out");
      router.push("/login");
    },
  });
}

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => userService.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => userService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      // Also invalidate auth.me in case name or avatar was updated
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Profile updated successfully");
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
      // Also invalidate auth.me so the AppHeader avatar updates
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success("Avatar uploaded successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload avatar");
    }
  });
}
