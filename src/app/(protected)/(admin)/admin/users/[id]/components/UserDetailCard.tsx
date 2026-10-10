import { User } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Timestamp } from "@/components/shared/Timestamp";
import { Shield, User as UserIcon, Truck, Mail, Phone, MapPin, Calendar, Activity } from "lucide-react";
import { UserRole } from "@/types/api";
import { RoleChangeDialog } from "./RoleChangeDialog";
import { UserDeleteDialog } from "./UserDeleteDialog";

interface UserDetailCardProps {
  user: User;
  isLoading: boolean;
}

const RoleIcon = ({ role }: { role: UserRole }) => {
  switch (role) {
    case UserRole.ADMIN:
      return <Shield className="w-5 h-5 text-primary" />;
    case UserRole.COURIER:
      return <Truck className="w-5 h-5 text-blue-500" />;
    case UserRole.CUSTOMER:
      return <UserIcon className="w-5 h-5 text-muted-foreground" />;
  }
};

export function UserDetailCard({ user, isLoading }: UserDetailCardProps) {
  if (isLoading || !user) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1.5 w-full sm:w-auto">
          <CardTitle className="text-2xl flex flex-wrap items-center gap-3">
            <span className="break-words">{user.name}</span>
            <Badge variant={user.isActive ? "default" : "secondary"} className="shrink-0">
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
            <div className="flex items-center gap-2">
              <RoleIcon role={user.role} />
              <span className="capitalize font-medium text-foreground">{user.role.toLowerCase()}</span>
            </div>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span className="text-muted-foreground break-all">User ID: {user.id}</span>
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <RoleChangeDialog user={user} />
          <UserDeleteDialog user={user} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact Info</h4>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">{user.phone || "Not provided"}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">System Info</h4>
            
            {user.role === UserRole.COURIER && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Service Area</p>
                  <p className="text-sm text-muted-foreground">{user.serviceArea || "Not specified"}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Joined Platform</p>
                <p className="text-sm text-muted-foreground">
                  <Timestamp date={user.createdAt} />
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  <Timestamp date={user.updatedAt} showTime />
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
