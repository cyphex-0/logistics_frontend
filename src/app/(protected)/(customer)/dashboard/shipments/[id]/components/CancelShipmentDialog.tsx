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

interface CancelShipmentDialogProps {
  shipmentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CancelShipmentDialog({ shipmentId, isOpen, onClose }: CancelShipmentDialogProps) {
  const { mutate: cancelShipment, isPending } = useCancelShipment();

  const handleCancel = () => {
    cancelShipment(shipmentId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Shipment</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this shipment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Keep Shipment
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isPending}>
            {isPending ? "Cancelling..." : "Cancel Shipment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
