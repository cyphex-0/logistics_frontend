"use client";

import { useState } from "react";
import { useUpdateShipmentStatus } from "@/lib/query/shipments";
import { ShipmentStatus } from "@/types/api";
import { Shipment } from "@/services/shipment.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface StatusTransitionDialogProps {
  shipment: Shipment;
  targetStatus: ShipmentStatus | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StatusTransitionDialog({
  shipment,
  targetStatus,
  open,
  onOpenChange,
}: StatusTransitionDialogProps) {
  const [description, setDescription] = useState("");
  const [failureReason, setFailureReason] = useState("");

  const { mutate: updateStatus, isPending, error } = useUpdateShipmentStatus();

  const handleUpdate = () => {
    if (!targetStatus) return;

    if (targetStatus === ShipmentStatus.FAILED_DELIVERY && !failureReason.trim()) {
      toast.error("Please provide a failure reason.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please provide a description for this status change.");
      return;
    }

    updateStatus(
      {
        id: shipment.id,
        status: targetStatus,
        description,
        failureReason: targetStatus === ShipmentStatus.FAILED_DELIVERY ? failureReason : undefined,
      },
      {
        onSuccess: () => {
          toast.success(`Shipment marked as ${targetStatus.replace(/_/g, " ")}`);
          onOpenChange(false);
          setDescription("");
          setFailureReason("");
        },
      }
    );
  };

  const typedError = error as { response?: { status?: number; data?: { code?: string; message?: string } } } | null;
  const isConflictError = typedError?.response?.status === 409;
  const errorData = typedError?.response?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Shipment Status</DialogTitle>
          <DialogDescription>
            You are about to change the status to{" "}
            <span className="font-semibold text-foreground">
              {targetStatus?.replace(/_/g, " ")}
            </span>
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Update Failed</AlertTitle>
            <AlertDescription>
              {isConflictError && errorData?.code === "MAX_DELIVERY_ATTEMPTS_REACHED"
                ? "Maximum delivery attempts reached. You can only mark this shipment as Returned."
                : errorData?.message || "An error occurred while updating the status."}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-4">
          {targetStatus === ShipmentStatus.FAILED_DELIVERY && (
            <div className="space-y-2">
              <Label htmlFor="failureReason">Failure Reason</Label>
              <Textarea
                id="failureReason"
                placeholder="e.g. Customer not available, Incorrect address..."
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              placeholder="e.g. Picked up from sender, Package dropped at front door..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={isPending || !description.trim() || (targetStatus === ShipmentStatus.FAILED_DELIVERY && !failureReason.trim())}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Confirm Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
