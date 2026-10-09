"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateZone } from "@/hooks/queries";
import { Zone } from "@/services/zone.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit2 } from "lucide-react";
import { BANGLADESH_LOCATIONS } from "@/lib/bangladesh-locations";

const zoneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  coverageCities: z.string().min(2, "At least one city is required"),
  isActive: z.boolean(),
});

type ZoneFormValues = z.infer<typeof zoneSchema>;

interface ZoneEditDialogProps {
  zone: Zone;
}

export function ZoneEditDialog({ zone }: ZoneEditDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateZone();

  const form = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      name: zone.name,
      coverageCities: zone.coverageCities.join(", "),
      isActive: zone.isActive,
    },
  });

  // Re-populate when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: zone.name,
        coverageCities: zone.coverageCities.join(", "),
        isActive: zone.isActive,
      });
    }
  }, [open, zone, form]);

  const onSubmit = (values: ZoneFormValues) => {
    // Convert comma-separated string to array
    const parsedCities = values.coverageCities
      .split(",")
      .map(city => city.trim())
      .filter(city => city.length > 0);

    mutate({
      id: zone.id,
      data: {
        name: values.name,
        coverageCities: parsedCities,
        isActive: values.isActive
      }
    }, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const handleTemplateSelect = (divisionName: string | null) => {
    if (!divisionName) return;
    const division = BANGLADESH_LOCATIONS.find(d => d.name === divisionName);
    if (division) {
      form.setValue("name", division.name);
      form.setValue("coverageCities", division.districts.join(", "));
    }
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Edit2 className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Zone</DialogTitle>
          <DialogDescription>
            Update division and operational districts for this zone.
          </DialogDescription>
        </DialogHeader>

        {/* Template Selector */}
        <div className="space-y-2">
          <FormLabel>Quick Load Template (Optional)</FormLabel>
          <Select onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Bangladesh Division to auto-fill..." />
            </SelectTrigger>
            <SelectContent>
              {BANGLADESH_LOCATIONS.map((div) => (
                <SelectItem key={div.name} value={div.name}>
                  {div.name} Division
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Khulna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverageCities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage Cities (Comma Separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Khulna, Satkhira, Jessore" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the cities covered by this zone, separated by commas. You can add or remove any city.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Active Status
                    </FormLabel>
                    <FormDescription>
                      Is this zone currently operational?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
