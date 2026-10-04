import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceType } from "@/types/api";
import { Shipment } from "@/services/shipment.service";
import { useUpdateShipment } from "@/lib/query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zoneService, Zone } from "@/services/zone.service";

export const editSchema = z.object({
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().min(10, "Valid phone number is required"),
  destinationAddress: z.string().min(5, "Address must be at least 5 characters"),
  destinationCity: z.string().min(2, "City is required"),
  destinationZoneId: z.string().min(1, "Destination zone is required"),
  serviceType: z.enum([ServiceType.STANDARD, ServiceType.EXPRESS]),
  parcel: z.object({
    weight: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
  }),
});

type EditFormValues = z.infer<typeof editSchema>;

interface EditShipmentDialogProps {
  shipment: Shipment;
  isOpen: boolean;
  onClose: () => void;
}

export function EditShipmentDialog({ shipment, isOpen, onClose }: EditShipmentDialogProps) {
  const { mutate: updateShipment, isPending } = useUpdateShipment();
  const [zones, setZones] = useState<Zone[]>([]);

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      recipientName: shipment.recipientName,
      recipientPhone: shipment.recipientPhone,
      destinationAddress: shipment.destinationAddress,
      destinationCity: shipment.destinationCity,
      destinationZoneId: shipment.destinationZoneId,
      serviceType: shipment.serviceType,
      parcel: {
        weight: Number(shipment.parcel.weight),
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
      zoneService.getZones().then(setZones).catch(console.error);
    }
  }, [isOpen]);

  const onSubmit = (values: EditFormValues) => {
    // Only send fields that might have changed
    const data = {
      ...values,
      parcel: {
        ...shipment.parcel,
        weight: values.parcel.weight,
        length: Number(shipment.parcel.length),
        width: Number(shipment.parcel.width),
        height: Number(shipment.parcel.height),
      }
    };

    updateShipment(
      { id: shipment.id, data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Shipment Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destinationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destinationCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destinationZoneId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Zone</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a delivery zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {zones.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ServiceType.STANDARD}>Standard Delivery</SelectItem>
                      <SelectItem value={ServiceType.EXPRESS}>Express Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parcel.weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcel Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4 gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
