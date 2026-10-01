import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteShipment } from "@/hooks/queries";
import { Shipment } from "@/services/shipment.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeleteShipmentDialogProps {
  shipment: Shipment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteShipmentDialog({ shipment, open, onOpenChange }: DeleteShipmentDialogProps) {
  const router = useRouter();
  const deleteShipment = useDeleteShipment();

  const handleDelete = () => {
    deleteShipment.mutate(shipment.id, {
      onSuccess: () => {
        toast.success("Shipment deleted successfully.");
        onOpenChange(false);
        router.push("/admin/shipments");
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to delete shipment.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shipment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete shipment {shipment.trackingNumber}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={deleteShipment.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteShipment.isPending}>
            {deleteShipment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
