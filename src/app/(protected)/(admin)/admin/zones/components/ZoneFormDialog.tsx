"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateZone } from "@/hooks/queries";
import { CreateZonePayload } from "@/services/zone.service";
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
import { Plus } from "lucide-react";
import { BANGLADESH_LOCATIONS } from "@/lib/bangladesh-locations";

const zoneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  coverageCities: z.string().min(2, "At least one city is required"),
  isActive: z.boolean(),
});

type ZoneFormValues = z.infer<typeof zoneSchema>;

export function ZoneFormDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateZone();

  const form = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      name: "",
      coverageCities: "",
      isActive: true,
    },
  });

  const onSubmit = (values: ZoneFormValues) => {
    // Convert comma-separated string to array
    const parsedCities = values.coverageCities
      .split(",")
      .map(city => city.trim())
      .filter(city => city.length > 0);

    mutate({
      name: values.name,
      coverageCities: parsedCities,
      isActive: values.isActive
    } as unknown as CreateZonePayload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
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
      <Button onClick={() => { form.reset(); setOpen(true); }}>
        <Plus className="mr-2 h-4 w-4" />
        Add Zone
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Zone</DialogTitle>
          <DialogDescription>
            Create a new delivery zone. You can load a preset or type your own.
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
                {isPending ? "Creating..." : "Create Zone"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
