"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, CheckSquare, Square } from "lucide-react";
import { BANGLADESH_LOCATIONS } from "@/lib/bangladesh-locations";

const zoneSchema = z.object({
  name: z.string().min(2, "Division is required"),
  coverageCities: z.array(z.string()).min(1, "At least one district is required"),
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
      coverageCities: [],
      isActive: true,
    },
  });

  const selectedDivisionName = form.watch("name");
  
  // When division changes, reset coverage cities unless we are just opening the dialog
  useEffect(() => {
    if (open && selectedDivisionName) {
      const currentCities = form.getValues("coverageCities");
      const division = BANGLADESH_LOCATIONS.find(d => d.name === selectedDivisionName);
      // If the current selected cities don't belong to the new division, clear them
      if (division && currentCities.length > 0 && !currentCities.every(c => division.districts.includes(c))) {
        form.setValue("coverageCities", [], { shouldValidate: true });
      }
    }
  }, [selectedDivisionName, open, form]);

  const selectedDivision = BANGLADESH_LOCATIONS.find(d => d.name === selectedDivisionName);

  const onSubmit = (values: ZoneFormValues) => {
    mutate({
      name: values.name,
      coverageCities: values.coverageCities,
      isActive: values.isActive
    } as unknown as CreateZonePayload, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
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
      <Button onClick={() => { form.reset(); setOpen(true); }}>
        <Plus className="mr-2 h-4 w-4" />
        Add Zone
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Zone</DialogTitle>
          <DialogDescription>
            Select a division and its operational districts.
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
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a division" />
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

            {selectedDivision && (
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
