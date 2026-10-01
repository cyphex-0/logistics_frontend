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
import { useRefundPayment } from "@/hooks/queries";
import { Shipment } from "@/services/shipment.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RefundDialogProps {
  shipment: Shipment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefundDialog({ shipment, open, onOpenChange }: RefundDialogProps) {
  const [reason, setReason] = useState("");
  const refundPayment = useRefundPayment();

  const handleRefund = () => {
    refundPayment.mutate(
      { shipmentId: shipment.id, reason },
      {
        onSuccess: () => {
          toast.success("Shipment refunded and cancelled successfully.");
          onOpenChange(false);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to process refund.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Process Refund</DialogTitle>
          <DialogDescription>
            Are you sure you want to refund payment for shipment {shipment.trackingNumber}? 
            This will also cancel the shipment. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="refund-reason" className="mb-2 block">
            Reason (Optional)
          </Label>
          <Input 
            id="refund-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Customer requested cancellation"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={refundPayment.isPending}>
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={handleRefund} 
            disabled={refundPayment.isPending}
          >
            {refundPayment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
