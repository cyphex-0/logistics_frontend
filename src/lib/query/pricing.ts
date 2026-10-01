import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pricingService, CalculatePricePayload, UpsertPricingRulePayload } from "@/services/pricing.service";
import { queryKeys } from "./keys";
import { toast } from "sonner";

/**
 * Hook to calculate pricing for a shipment.
 * 
 * DESIGN DECISION: Why does the frontend never calculate the final price?
 * - The frontend relies strictly on the backend to provide the authoritative price estimate.
 * - This ensures pricing rules, weight surcharges, seasonal discounts, and active zone restrictions 
 *   are evaluated securely on the server.
 * - Client-side price computations can be manipulated or become out of sync with business logic, 
 *   leading to discrepancies between the estimated price and the final payment processed by Stripe.
 * - By calling POST `/pricing/calculate`, we ensure a single source of truth for all calculations.
 */
export function useCalculatePrice(payload?: CalculatePricePayload) {
  return useQuery({
    queryKey: queryKeys.pricing.calculation(payload || {}),
    queryFn: () => pricingService.calculatePrice(payload!),
    enabled: !!payload?.weight && !!payload?.serviceType && !!payload?.destinationZoneId,
    retry: false, // Don't retry validation errors
  });
}

export function usePricingRules() {
  return useQuery({
    queryKey: queryKeys.pricing.rules,
    queryFn: () => pricingService.getRules(),
  });
}

export function useUpsertPricingRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpsertPricingRulePayload) => 
      pricingService.upsertRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricing.rules });
      toast.success("Pricing rule updated successfully");
    },
  });
}
