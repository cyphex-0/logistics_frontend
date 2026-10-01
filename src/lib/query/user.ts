import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { queryKeys } from "./keys";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.user.notifications,
    queryFn: () => userService.getNotifications(),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.notifications });
    },
  });
}


