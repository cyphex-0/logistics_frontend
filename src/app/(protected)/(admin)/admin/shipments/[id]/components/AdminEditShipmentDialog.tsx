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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ServiceType } from "@/types/api";
import { Shipment } from "@/services/shipment.service";
import { useUpdateShipment } from "@/hooks/queries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zoneService, Zone } from "@/services/zone.service";

export const editSchema = z.object({
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().min(10, "Valid phone number is required"),
  originAddress: z.string().min(5, "Origin address is required"),
  originCity: z.string().min(2, "Origin city is required"),
  originZoneId: z.string().min(1, "Origin zone is required"),
  destinationAddress: z.string().min(5, "Destination address is required"),
  destinationCity: z.string().min(2, "Destination city is required"),
  destinationZoneId: z.string().min(1, "Destination zone is required"),
  serviceType: z.enum([ServiceType.STANDARD, ServiceType.EXPRESS]),
  parcel: z.object({
    weight: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
    length: z.coerce.number().min(1, "Length must be at least 1 cm"),
    width: z.coerce.number().min(1, "Width must be at least 1 cm"),
    height: z.coerce.number().min(1, "Height must be at least 1 cm"),
    description: z.string().optional(),
    isFragile: z.boolean(),
  }),
});

type EditFormValues = z.infer<typeof editSchema>;

interface AdminAdminEditShipmentDialogProps {
  shipment: Shipment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminEditShipmentDialog({ shipment, open, onOpenChange }: AdminAdminEditShipmentDialogProps) {
  const { mutate: updateShipment, isPending } = useUpdateShipment();
  const [zones, setZones] = useState<Zone[]>([]);

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      recipientName: shipment.recipientName,
      recipientPhone: shipment.recipientPhone,
      originAddress: shipment.originAddress || "",
      originCity: shipment.originCity || "",
      originZoneId: shipment.originZoneId || "",
      destinationAddress: shipment.destinationAddress,
      destinationCity: shipment.destinationCity,
      destinationZoneId: shipment.destinationZoneId,
      serviceType: shipment.serviceType,
      parcel: {
        weight: Number(shipment.parcel.weight),
        length: Number(shipment.parcel.length || 1),
        width: Number(shipment.parcel.width || 1),
        height: Number(shipment.parcel.height || 1),
        description: shipment.parcel.description || "",
        isFragile: shipment.parcel.isFragile || false,
      },
    },
  });

  useEffect(() => {
    if (open) {
      zoneService.getZones().then(setZones).catch(console.error);
    }
  }, [open]);

  const onSubmit = (values: EditFormValues) => {
    updateShipment(
      { id: shipment.id, data: values },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onOpenChange(false)}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Shipment Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col overflow-hidden">
            <Tabs defaultValue="destination" className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="origin">Origin</TabsTrigger>
                <TabsTrigger value="destination">Destination</TabsTrigger>
                <TabsTrigger value="parcel">Parcel</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto py-4 px-1">
                <TabsContent value="origin" className="space-y-4 mt-0">
                  <FormField control={form.control as any} name="originAddress" render={({ field }) => (
                    <FormItem><FormLabel>Origin Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control as any} name="originCity" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin City</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {(zones.find(z => z.id === form.watch("originZoneId"))?.coverageCities || []).map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control as any} name="originZoneId" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin Zone</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select zone">
                                {(val: string | null) => {
                                  if (!val) return "Select zone";
                                  const zone = zones.find(z => z.id === val);
                                  return zone ? zone.name : val;
                                }}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {zones.map((zone) => (
                              <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </TabsContent>
                
                <TabsContent value="destination" className="space-y-4 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control as any} name="recipientName" render={({ field }) => (
                      <FormItem><FormLabel>Recipient Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control as any} name="recipientPhone" render={({ field }) => (
                      <FormItem><FormLabel>Recipient Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control as any} name="destinationAddress" render={({ field }) => (
                    <FormItem><FormLabel>Destination Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control as any} name="destinationCity" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination City</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {(zones.find(z => z.id === form.watch("destinationZoneId"))?.coverageCities || []).map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control as any} name="destinationZoneId" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Zone</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select zone">
                                {(val: string | null) => {
                                  if (!val) return "Select zone";
                                  const zone = zones.find(z => z.id === val);
                                  return zone ? zone.name : val;
                                }}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {zones.map((zone) => (
                              <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </TabsContent>
                
                <TabsContent value="parcel" className="space-y-4 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control as any} name="serviceType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value={ServiceType.STANDARD}>Standard Delivery</SelectItem>
                            <SelectItem value={ServiceType.EXPRESS}>Express Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control as any} name="parcel.weight" render={({ field }) => (
                      <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField control={form.control as any} name="parcel.length" render={({ field }) => (
                      <FormItem><FormLabel>Length (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control as any} name="parcel.width" render={({ field }) => (
                      <FormItem><FormLabel>Width (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control as any} name="parcel.height" render={({ field }) => (
                      <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control as any} name="parcel.description" render={({ field }) => (
                    <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="What's in the parcel?" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control as any} name="parcel.isFragile" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Fragile Item</FormLabel>
                        <p className="text-sm text-muted-foreground">Handle with care.</p>
                      </div>
                    </FormItem>
                  )} />
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="flex justify-end pt-4 mt-2 gap-2 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
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





