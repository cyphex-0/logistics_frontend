import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/api";
import { UserRole } from "@/types/api";
import { useUpdateUserRole, useProfile } from "@/hooks/queries";
import { toast } from "sonner";
import { Loader2, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function RoleChangeDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole>(user.role);
  const [serviceArea, setServiceArea] = useState(user.serviceArea || "");
  
  const updateRole = useUpdateUserRole();
  const { data: me } = useProfile();
  
  const isSelf = me?.id === user.id;

  const handleUpdate = () => {
    updateRole.mutate(
      { 
        id: user.id, 
        role,
        serviceArea: role === UserRole.COURIER ? serviceArea : undefined
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" disabled={isSelf}>
            <ShieldAlert className="w-4 h-4 mr-2" />
            Change Role
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Update the access level and permissions for {user.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-select">Access Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger id="role-select">
                <SelectValue placeholder="Select role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.CUSTOMER}>Customer</SelectItem>
                <SelectItem value={UserRole.COURIER}>Courier</SelectItem>
                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === UserRole.COURIER && (
            <div className="space-y-2">
              <Label htmlFor="serviceArea">Service Area</Label>
              <Input 
                id="serviceArea"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                placeholder="e.g. Dhaka North, Sylhet Metro"
              />
              <p className="text-xs text-muted-foreground">
                Required for couriers to filter relevant shipments.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={updateRole.isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate} 
            disabled={updateRole.isPending || role === user.role}
          >
            {updateRole.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
