import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/providers/AuthProvider";
import { useProfile } from "@/hooks/queries";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function AvailabilityInfo() {
  const { user: sessionUser } = useAuth();
  const { data: profile, isLoading } = useProfile();
  
  if (!sessionUser || sessionUser.role !== "COURIER") return null;

  if (isLoading || !profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Context</CardTitle>
          <CardDescription>Your current assignment status</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Context</CardTitle>
        <CardDescription>Your current assignment status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          {profile.isAvailable ? (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
              <XCircle className="w-3 h-3 mr-1" /> Unavailable
            </Badge>
          )}
        </div>
        
        {profile.serviceArea && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Service Area</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.serviceArea}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
