"use client";

import { useProfile, useUpdateProfile, useUploadAvatar } from "@/lib/query/auth";
import { useAuth } from "@/components/providers/AuthProvider";
import { useNotifications } from "@/lib/query/user";
import { Notification } from "@/services/user.service";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogOut, Moon, Sun, Monitor, Bell, Shield, Users, Map, DollarSign, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(5, "Phone number is too short").optional().or(z.literal("")),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const { logout } = useAuth();
  const { setTheme, theme } = useTheme();
  const { data } = useNotifications();
  
  const notifications: Notification[] = Array.isArray(data) ? data : (data as unknown as { notifications?: Notification[] })?.notifications || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      avatar: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar.mutate(file, {
        onSuccess: () => {
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      });
    }
  };

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        phone: profile.phone || "",
        avatar: profile.avatar || "",
      });
    }
  }, [profile, form]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load profile.
      </div>
    );
  }

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile.mutate(data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account information and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-6 flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  {profile.avatar && <AvatarImage src={profile.avatar} alt={profile.name || "Avatar"} />}
                  <AvatarFallback className="text-xl">
                    {profile.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium mb-1">Profile Avatar</p>
                  <p className="text-xs text-muted-foreground mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleAvatarChange} 
                      accept="image/png, image/jpeg, image/gif" 
                      className="hidden" 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadAvatar.isPending}
                    >
                      {uploadAvatar.isPending ? "Uploading..." : "Upload Picture"}
                    </Button>
                    {profile.avatar && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          updateProfile.mutate({ avatar: null });
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profile.email} 
                  disabled 
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  value={profile.role} 
                  disabled 
                  className="bg-muted capitalize"
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={updateProfile.isPending || !form.formState.isDirty}
                >
                  {updateProfile.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => form.reset({ name: profile.name || "", phone: profile.phone || "", avatar: profile.avatar || "" })}
                  disabled={!form.formState.isDirty}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how Shiply looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium">Interface Theme</span>
              <span className="text-sm text-muted-foreground">Select Light, Dark, or System theme.</span>
            </div>
            <div className="grid grid-cols-3 p-1 bg-muted rounded-lg">
              <Button
                variant="ghost"
                className={`w-full rounded-md h-9 px-1 ${theme === "light" ? "bg-background shadow-sm hover:bg-background text-foreground" : "hover:bg-transparent text-muted-foreground"}`}
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 h-4 w-4" /> Light
              </Button>
              <Button
                variant="ghost"
                className={`w-full rounded-md h-9 px-1 ${theme === "dark" ? "bg-background shadow-sm hover:bg-background text-foreground" : "hover:bg-transparent text-muted-foreground"}`}
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 h-4 w-4" /> Dark
              </Button>
              <Button
                variant="ghost"
                className={`w-full rounded-md h-9 px-1 ${theme === "system" ? "bg-background shadow-sm hover:bg-background text-foreground" : "hover:bg-transparent text-muted-foreground"}`}
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 h-4 w-4" /> System
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage your notifications and alerts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Unread Notifications</span>
                <span className="text-sm text-muted-foreground">You have {unreadCount} unread messages.</span>
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                {unreadCount}
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" render={<Link href="/notifications" />} nativeButton={false}>
              <Bell className="mr-2 h-4 w-4" /> Open Notifications Center
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Session</CardTitle>
            <CardDescription>
              Manage your active session on this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Log out</span>
                <span className="text-sm text-muted-foreground">End your current session safely.</span>
              </div>
              <Button variant="destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {profile.role === "ADMIN" && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Admin Shortcuts
              </CardTitle>
              <CardDescription>
                Quick access to administrative functions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="w-full justify-start h-auto py-3" render={<Link href="/admin/users" />} nativeButton={false}>
                  <Users className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">Manage Users</span>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3" render={<Link href="/admin/zones" />} nativeButton={false}>
                  <Map className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">Manage Zones</span>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3" render={<Link href="/admin/pricing" />} nativeButton={false}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">Pricing Rules</span>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3" render={<Link href="/admin/audit-logs" />} nativeButton={false}>
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">Audit Logs</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}





