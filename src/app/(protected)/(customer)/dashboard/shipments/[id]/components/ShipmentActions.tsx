import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, XCircle } from "lucide-react";
import { Shipment } from "@/services/shipment.service";
import { ShipmentStatus, PaymentStatus } from "@/types/api";
import { PayNowButton } from "./PayNowButton";
import { CancelShipmentDialog } from "./CancelShipmentDialog";
import { EditShipmentDialog } from "./EditShipmentDialog";

interface ShipmentActionsProps {
  shipment: Shipment;
}

export function ShipmentActions({ shipment }: ShipmentActionsProps) {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Only allow actions if shipment is PENDING
  if (shipment.status !== ShipmentStatus.PENDING) {
    return null;
  }

  const isPaid = shipment.paymentStatus === PaymentStatus.PAID;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {!isPaid && <PayNowButton shipmentId={shipment.id} />}
        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
        <Button variant="destructive" onClick={() => setIsCancelOpen(true)}>
          <XCircle className="w-4 h-4 mr-2" />
          Cancel Shipment
        </Button>
      </div>

      <CancelShipmentDialog
        shipmentId={shipment.id}
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
      />

      {isEditOpen && (
        <EditShipmentDialog
          shipment={shipment}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
}
