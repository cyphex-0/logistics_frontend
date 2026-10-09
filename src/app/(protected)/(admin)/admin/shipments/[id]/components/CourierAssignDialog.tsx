import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAdminUsers, useAssignCourier, useZones } from "@/hooks/queries";
import { Shipment } from "@/services/shipment.service";
import { ApiResponse, User } from "@/types/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourierAssignDialogProps {
  shipment: Shipment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourierAssignDialog({ shipment, open, onOpenChange }: CourierAssignDialogProps) {
  const [selectedCourierId, setSelectedCourierId] = useState<string>("");
  
  // Fetch couriers
  const { data: usersData, isLoading: couriersLoading } = useAdminUsers({
    role: "COURIER",
    limit: 50, // Fetch enough to show in a select
  });

  // Fetch zones to find the origin zone's name
  const { data: zones = [], isLoading: zonesLoading } = useZones();
  const originZone = zones.find((z) => z.id === shipment.originZoneId);

  const assignCourier = useAssignCourier();
  
  // Filter couriers to only those whose serviceArea matches the originZone's name
  const allCouriers = Array.isArray(usersData) ? usersData : ((usersData as unknown as { data: User[] })?.data || []);
  const couriers = allCouriers.filter((c: User) => {
    if (!originZone || !c.serviceArea) return false;
    const allowedZones = c.serviceArea.toLowerCase().split(',').map((z: string) => z.trim());
    return allowedZones.includes(originZone.name.toLowerCase());
  });

  const handleAssign = () => {
    if (!selectedCourierId) {
      toast.error("Please select a courier.");
      return;
    }

    assignCourier.mutate(
      { id: shipment.id, courierId: selectedCourierId },
      {
        onSuccess: () => {
          toast.success("Courier assigned successfully.");
          onOpenChange(false);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to assign courier.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Courier</DialogTitle>
          <DialogDescription>
            Select a courier to handle the delivery of shipment {shipment.trackingNumber}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="courier-select" className="mb-2 block">
            Select Courier
          </Label>
          {couriersLoading || zonesLoading ? (
            <div className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading couriers...
            </div>
          ) : (
            <Select value={selectedCourierId} onValueChange={(val) => setSelectedCourierId(val || "")}>
              <SelectTrigger id="courier-select">
                <span className="flex-1 text-left truncate">
                  {selectedCourierId && couriers.find((c: User) => c.id === selectedCourierId) 
                    ? `${couriers.find((c: User) => c.id === selectedCourierId).name} (${couriers.find((c: User) => c.id === selectedCourierId).email})`
                    : "Select a courier..."}
                </span>
              </SelectTrigger>
              <SelectContent>
                {couriers.length === 0 ? (
                  <SelectItem value="none" disabled>
                    {originZone ? `No couriers found in ${originZone.name}` : "No couriers found"}
                  </SelectItem>
                ) : (
                  couriers.map((courier: { id: string; name: string; email: string }) => (
                    <SelectItem key={courier.id} value={courier.id}>
                      {courier.name} ({courier.email})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={assignCourier.isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            disabled={!selectedCourierId || assignCourier.isPending || couriersLoading || zonesLoading}
          >
            {assignCourier.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
