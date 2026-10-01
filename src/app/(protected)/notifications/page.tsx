"use client";

import { useNotifications, useMarkNotificationRead } from "@/lib/query/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Bell, CheckCircle2 } from "lucide-react";
import { Timestamp } from "@/components/shared/Timestamp";
import type { Notification } from "@/services/user.service";

export default function NotificationsPage() {
  const { data: response, isLoading, isError } = useNotifications();
  const markAsRead = useMarkNotificationRead();
  const notifications: Notification[] = response || [];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 && "s"}.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <p>No notifications yet</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-colors ${!notification.isRead ? 'bg-primary/5 border-primary/20' : ''}`}
            >
              <CardContent className="p-4 sm:p-6 flex gap-4">
                <div className="mt-1">
                  {!notification.isRead ? (
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-4">
                    <p className={`font-medium leading-none ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      <Timestamp date={notification.createdAt} showTime />
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  
                  {!notification.isRead && (
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 -ml-2 text-xs"
                        onClick={() => markAsRead.mutate(notification.id)}
                        disabled={markAsRead.isPending}
                      >
                        {markAsRead.isPending && markAsRead.variables === notification.id ? (
                          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                        ) : null}
                        Mark as read
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
