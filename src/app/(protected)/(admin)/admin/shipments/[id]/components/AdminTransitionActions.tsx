import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShipmentStatus } from "@/types/api";
import { Shipment } from "@/services/shipment.service";
import { useUpdateShipmentStatus } from "@/hooks/queries";
import { toast } from "sonner";
import { Loader2, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea";

interface AdminTransitionActionsProps {
  shipment: Shipment;
}

const ALL_STATUSES: ShipmentStatus[] = [
  ShipmentStatus.PENDING,
  ShipmentStatus.CONFIRMED,
  ShipmentStatus.PICKUP_ASSIGNED,
  ShipmentStatus.PICKED_UP,
  ShipmentStatus.IN_TRANSIT,
  ShipmentStatus.OUT_FOR_DELIVERY,
  ShipmentStatus.DELIVERED,
  ShipmentStatus.FAILED_DELIVERY,
  ShipmentStatus.CANCELLED,
  ShipmentStatus.RETURNED,
];

export function AdminTransitionActions({ shipment }: AdminTransitionActionsProps) {
  const [open, setOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<ShipmentStatus>(shipment.status);
  const [description, setDescription] = useState("");
  const [failureReason, setFailureReason] = useState("");
  
  const updateStatus = useUpdateShipmentStatus();

  const handleUpdate = () => {
    if (!description.trim()) {
      toast.error("Please provide a description for the status update.");
      return;
    }

    updateStatus.mutate(
      {
        id: shipment.id,
        status: targetStatus,
        description,
        failureReason: targetStatus === "FAILED_DELIVERY" ? failureReason : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Shipment status updated successfully.");
          setOpen(false);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to update status.");
        },
      }
    );
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Activity className="w-4 h-4 mr-2" />
        Force Status
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Status Override</DialogTitle>
            <DialogDescription>
              Forcefully change the status of shipment {shipment.trackingNumber}. 
              This bypasses normal role restrictions.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status-select">New Status</Label>
              <Select value={targetStatus} onValueChange={(v) => setTargetStatus(v as ShipmentStatus)}>
                <SelectTrigger id="status-select">
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Event Description (Required)</Label>
              <Textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Admin updated status..."
              />
            </div>

            {targetStatus === "FAILED_DELIVERY" && (
              <div className="space-y-2">
                <Label htmlFor="failureReason">Failure/Cancellation Reason (Optional)</Label>
                <Input 
                  id="failureReason"
                  value={failureReason}
                  onChange={(e) => setFailureReason(e.target.value)}
                  placeholder="e.g. Lost in transit, Customer requested"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={updateStatus.isPending}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate} 
              disabled={updateStatus.isPending || !description.trim() || targetStatus === shipment.status}
            >
              {updateStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
