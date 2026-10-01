import { apiClient } from "@/lib/api/client";
import { ServiceType } from "@/types/api";

export interface CalculatePricePayload {
  destinationZoneId: string;
  serviceType: ServiceType;
  weight: number;
}

export interface PricingResult {
  price: number;
  breakdown: {
    basePrice: number;
    pricePerKg: number;
    weight: number;
    ruleId: string;
    isDefaultFallback: boolean;
  };
}

export interface PricingRule {
  id: string;
  zoneId: string | null;
  zone?: {
    id: string;
    name: string;
  };
  serviceType: ServiceType;
  basePrice: number;
  pricePerKg: number;
  maxWeight: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertPricingRulePayload {
  zoneId?: string | null;
  serviceType: ServiceType;
  basePrice: number;
  pricePerKg: number;
  maxWeight: number;
}

export const pricingService = {
  calculatePrice: (data: CalculatePricePayload) => {
    return apiClient<PricingResult>("/pricing/calculate", {
      method: "POST",
      body: data,
    });
  },

  getRules: () => {
    return apiClient<PricingRule[]>("/pricing/rules", {
      method: "GET",
    });
  },

  upsertRule: (data: UpsertPricingRulePayload) => {
    return apiClient<PricingRule>("/pricing/rules", {
      method: "PUT",
      body: data,
    });
  },
};
