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
import { useCancelShipment } from "@/lib/query";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CancelShipmentDialogProps {
  shipmentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CancelShipmentDialog({ shipmentId, isOpen, onClose }: CancelShipmentDialogProps) {
  const { mutate: cancelShipment, isPending } = useCancelShipment();
  const [reason, setReason] = useState("");

  const handleCancel = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }
    
    cancelShipment(
      { id: shipmentId, reason }, 
      {
        onSuccess: () => {
          setReason("");
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Shipment</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this shipment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="cancel-reason" className="mb-2 block">
            Reason for cancellation <span className="text-destructive">*</span>
          </Label>
          <Textarea 
            id="cancel-reason"
            placeholder="Please tell us why you are cancelling this shipment..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isPending}
            rows={3}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Keep Shipment
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isPending || !reason.trim()}>
            {isPending ? "Cancelling..." : "Cancel Shipment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
