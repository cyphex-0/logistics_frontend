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
import { useUpdateShipment } from "@/hooks/queries";
import { Shipment } from "@/services/shipment.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdminEditShipmentDialogProps {
  shipment: Shipment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminEditShipmentDialog({ shipment, open, onOpenChange }: AdminEditShipmentDialogProps) {
  const [recipientName, setRecipientName] = useState(shipment.recipientName || "");
  const [recipientPhone, setRecipientPhone] = useState(shipment.recipientPhone || "");
  const [destinationAddress, setDestinationAddress] = useState(shipment.destinationAddress || "");
  
  const updateShipment = useUpdateShipment();

  const handleEdit = () => {
    updateShipment.mutate(
      { 
        id: shipment.id, 
        data: { recipientName, recipientPhone, destinationAddress } 
      },
      {
        onSuccess: () => {
          toast.success("Shipment updated successfully.");
          onOpenChange(false);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to update shipment.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shipment Details</DialogTitle>
          <DialogDescription>
            Update basic information for shipment {shipment.trackingNumber}.
            Only pending shipments can be edited.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input 
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientPhone">Recipient Phone</Label>
            <Input 
              id="recipientPhone"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destinationAddress">Destination Address</Label>
            <Input 
              id="destinationAddress"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={updateShipment.isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleEdit} 
            disabled={updateShipment.isPending}
          >
            {updateShipment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
