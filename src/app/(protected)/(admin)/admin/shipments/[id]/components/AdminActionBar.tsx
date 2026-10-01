import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/services/shipment.service";
import { CourierAssignDialog } from "./CourierAssignDialog";
import { RefundDialog } from "./RefundDialog";
import { AdminEditShipmentDialog } from "./AdminEditShipmentDialog";
import { DeleteShipmentDialog } from "./DeleteShipmentDialog";
import { AdminTransitionActions } from "./AdminTransitionActions";
import { Trash2, Edit2, UserPlus, DollarSign } from "lucide-react";

interface AdminActionBarProps {
  shipment: Shipment;
}

export function AdminActionBar({ shipment }: AdminActionBarProps) {
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const canEdit = shipment.status === "PENDING";
  const canAssign = shipment.status === "CONFIRMED" || shipment.status === "PICKUP_ASSIGNED";
  const canRefund = shipment.paymentStatus === "PAID";
  // Assuming Admin can delete any shipment as per requirement "Admin only. Soft deletes shipment."

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-lg shadow-sm mb-6 border">
        {canEdit && (
          <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
        
        {canAssign && (
          <Button variant="default" size="sm" onClick={() => setIsAssignOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Courier
          </Button>
        )}

        {canRefund && (
          <Button variant="outline" size="sm" onClick={() => setIsRefundOpen(true)}>
            <DollarSign className="w-4 h-4 mr-2" />
            Refund
          </Button>
        )}

        <AdminTransitionActions shipment={shipment} />

        <div className="flex-1" />

        <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)}>
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>

      {isAssignOpen && (
        <CourierAssignDialog
          shipment={shipment}
          open={isAssignOpen}
          onOpenChange={setIsAssignOpen}
        />
      )}

      {isRefundOpen && (
        <RefundDialog
          shipment={shipment}
          open={isRefundOpen}
          onOpenChange={setIsRefundOpen}
        />
      )}

      {isEditOpen && (
        <AdminEditShipmentDialog
          shipment={shipment}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {isDeleteOpen && (
        <DeleteShipmentDialog
          shipment={shipment}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
        />
      )}
    </>
  );
}
