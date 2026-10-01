"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications, useMarkNotificationRead } from "@/lib/query/user";
import { Notification } from "@/services/user.service";
import { Timestamp } from "@/components/shared/Timestamp";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { data } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationRead();

  const notifications: Notification[] = Array.isArray(data) ? data : (data as { notifications?: Notification[] })?.notifications || [];

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    unreadNotifications.forEach((n) => markAsRead(n.id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-2 right-2 flex h-3 w-3 items-center justify-center rounded-full bg-status-pending">
              {/* Optional: Add unread count if needed, but simple dot matches the previous style */}
            </span>
          )}
          <span className="sr-only">Notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal flex justify-between items-center">
            <span className="font-semibold">Notifications</span>
            {hasUnread && (
              <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={handleMarkAllAsRead}>
                Mark all read
              </Button>
            )}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={cn("flex flex-col items-start gap-1 p-3 cursor-pointer", !notification.isRead && "bg-muted/50")}
                onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
              >
                <div className="flex justify-between w-full items-center">
                  <span className={cn("font-medium text-sm", !notification.isRead && "text-primary")}>
                    {notification.title}
                  </span>
                  {!notification.isRead && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {notification.message}
                </span>
                <Timestamp date={notification.createdAt} relative className="text-[10px] text-muted-foreground mt-1" />
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-center text-sm font-medium text-primary justify-center cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
