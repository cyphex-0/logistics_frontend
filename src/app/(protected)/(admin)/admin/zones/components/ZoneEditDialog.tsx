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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit2, CheckSquare, Square } from "lucide-react";
import { BANGLADESH_LOCATIONS } from "@/lib/bangladesh-locations";

const zoneSchema = z.object({
  name: z.string().min(2, "Division is required"),
  coverageCities: z.array(z.string()).min(1, "At least one district is required"),
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
      coverageCities: zone.coverageCities,
      isActive: zone.isActive,
    },
  });

  // Re-populate when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: zone.name,
        coverageCities: zone.coverageCities,
        isActive: zone.isActive,
      });
    }
  }, [open, zone, form]);

  const selectedDivisionName = form.watch("name");
  
  // When division changes (and not matching the initial zone name), clear the coverage cities
  useEffect(() => {
    if (open && selectedDivisionName) {
      const currentCities = form.getValues("coverageCities");
      const division = BANGLADESH_LOCATIONS.find(d => d.name === selectedDivisionName);
      
      // If the current selected cities don't belong to the new division, clear them
      // (Unless it's the initial load where they match)
      if (division && currentCities.length > 0 && !currentCities.every(c => division.districts.includes(c))) {
        form.setValue("coverageCities", [], { shouldValidate: true });
      }
    }
  }, [selectedDivisionName, open, form]);

  const selectedDivision = BANGLADESH_LOCATIONS.find(d => d.name === selectedDivisionName);

  const onSubmit = (values: ZoneFormValues) => {
    mutate({
      id: zone.id,
      data: {
        name: values.name,
        coverageCities: values.coverageCities,
        isActive: values.isActive
      }
    }, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const handleSelectAll = () => {
    if (selectedDivision) {
      form.setValue("coverageCities", selectedDivision.districts, { shouldValidate: true });
    }
  };

  const handleDeselectAll = () => {
    form.setValue("coverageCities", [], { shouldValidate: true });
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Edit2 className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Zone</DialogTitle>
          <DialogDescription>
            Update division and operational districts for this zone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division (Zone Name)</FormLabel>
                  {/* If the current zone name is NOT in BANGLADESH_LOCATIONS (a legacy zone), we show it as an input instead of select to not break it, or we allow selecting a new one. Let's just use Select and if the value doesn't match, they have to pick a valid one. */}
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={zone.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BANGLADESH_LOCATIONS.map((div) => (
                        <SelectItem key={div.name} value={div.name}>
                          {div.name} Division
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedDivision ? (
              <FormField
                control={form.control}
                name="coverageCities"
                render={() => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <div>
                        <FormLabel>Coverage Districts</FormLabel>
                        <FormDescription>
                          Select the districts this zone will operate in.
                        </FormDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={handleSelectAll}
                          className="h-7 text-xs px-2"
                        >
                          <CheckSquare className="h-3 w-3 mr-1" /> All
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={handleDeselectAll}
                          className="h-7 text-xs px-2"
                        >
                          <Square className="h-3 w-3 mr-1" /> None
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3 max-h-[200px] overflow-y-auto p-1 border rounded-md bg-muted/20">
                      {selectedDivision.districts.map((district) => (
                        <FormField
                          key={district}
                          control={form.control}
                          name="coverageCities"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={district}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2 hover:bg-muted/50 transition-colors"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(district)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, district])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== district
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer w-full">
                                  {district}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="coverageCities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legacy Coverage Cities (Comma Separated)</FormLabel>
                    <FormControl>
                      <Input 
                        value={field.value.join(", ")} 
                        onChange={(e) => {
                          const val = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                          field.onChange(val);
                        }} 
                      />
                    </FormControl>
                    <FormDescription>
                      Legacy zone detected. Please select a valid Division above to update to the new system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
