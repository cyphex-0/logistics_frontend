"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { PricingRule, UpsertPricingRulePayload } from "@/services/pricing.service";
import { useUpsertPricingRule } from "@/lib/query/pricing";
import { useZones } from "@/lib/query/zones";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NumericField } from "./NumericField";
import { ServiceType } from "@/types/api";

export const formSchema = z.object({
  serviceType: z.nativeEnum(ServiceType),
  zoneId: z.string().optional().nullable(),
  basePrice: z.number().min(0, "Base price must be positive"),
  pricePerKg: z.number().min(0, "Price per kg must be positive"),
  maxWeight: z.number().min(0, "Max weight must be positive"),
});

interface PricingRuleFormProps {
  initialData?: PricingRule;
  onSuccess?: () => void;
}

export function PricingRuleForm({ initialData, onSuccess }: PricingRuleFormProps) {
  const { data: zonesData } = useZones();
  const upsertMutation = useUpsertPricingRule();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: initialData?.serviceType || ServiceType.STANDARD,
      zoneId: initialData?.zone?.id || null,
      basePrice: initialData?.basePrice || 0,
      pricePerKg: initialData?.pricePerKg || 0,
      maxWeight: initialData?.maxWeight || 50,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload: UpsertPricingRulePayload = {
        serviceType: values.serviceType,
        basePrice: values.basePrice,
        pricePerKg: values.pricePerKg,
        maxWeight: values.maxWeight,
        zoneId: values.zoneId,
      };

      await upsertMutation.mutateAsync(payload);
      toast.success("Pricing rule saved successfully");
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      toast.error((error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to save pricing rule");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!!initialData}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ServiceType.STANDARD}>Standard</SelectItem>
                  <SelectItem value={ServiceType.EXPRESS}>Express</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zoneId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone (Optional)</FormLabel>
              <Select 
                onValueChange={(val) => field.onChange(val === "none" ? null : val)} 
                defaultValue={field.value || "none"}
                disabled={!!initialData}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a zone for specific rule" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Fallback/Default (All Zones)</SelectItem>
                  {zonesData?.map((zone: { id: string; name: string }) => (
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

        <NumericField form={form} name="basePrice" label="Base Price ($)" />
        <NumericField form={form} name="pricePerKg" label="Price per KG ($)" />
        <NumericField form={form} name="maxWeight" label="Maximum Weight (KG)" />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={upsertMutation.isPending}>
            {upsertMutation.isPending ? "Saving..." : "Save Rule"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
