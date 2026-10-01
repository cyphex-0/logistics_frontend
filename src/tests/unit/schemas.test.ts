import { registerSchema } from "@/components/auth/RegisterForm";
import { loginSchema } from "@/components/auth/LoginForm";
import { editSchema as editShipmentSchema } from "@/app/(protected)/(customer)/dashboard/shipments/[id]/components/EditShipmentDialog";
import { formSchema as newShipmentSchema } from "@/app/(protected)/(customer)/dashboard/shipments/new/page";
import { formSchema as pricingRuleSchema } from "@/components/admin/pricing/PricingRuleForm";
import { ServiceType } from "@/types/api";

describe("Zod Validation Schemas", () => {
  describe("Registration Schema", () => {
    it("should accept valid registration data", () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        password: "Password123!",
        role: "CUSTOMER",
      };
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject weak passwords", () => {
      const invalidData = {
        name: "Test User",
        email: "test@example.com",
        password: "weak", // Too short
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
    
    it("should reject invalid emails", () => {
      const invalidData = {
        name: "Test User",
        email: "not-an-email",
        password: "Password123!",
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("Login Schema", () => {
    it("should accept valid login data", () => {
      const validData = {
        email: "test@example.com",
        password: "Password123!",
      };
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("New Shipment Schema", () => {
    it("should accept valid shipment data", () => {
      const validData = {
        originZoneId: "zone-1",
        destinationZoneId: "zone-2",
        serviceType: ServiceType.STANDARD,
        originAddress: "123 Street A",
        originCity: "City A",
        destinationAddress: "456 Street B",
        destinationCity: "City B",
        recipientName: "John Doe",
        recipientPhone: "01700000000",
        parcel: {
          weight: 10,
          length: 10,
          width: 10,
          height: 10,
          description: "Test package",
          isFragile: false,
        }
      };
      const result = newShipmentSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject negative weights", () => {
      const invalidData = {
        originZoneId: "zone-1",
        destinationZoneId: "zone-2",
        serviceType: ServiceType.STANDARD,
        weight: -5,
        packageDetails: "Test package",
      };
      const result = newShipmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("Edit Shipment Schema", () => {
    it("should accept valid edit shipment data", () => {
      const validData = {
        recipientName: "Jane Doe",
        recipientPhone: "01700000001",
        destinationAddress: "123 Test St",
        destinationCity: "Test City",
        destinationZoneId: "zone-2",
        serviceType: ServiceType.EXPRESS,
        parcel: {
          weight: 15,
        }
      };
      const result = editShipmentSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject zero or negative weights", () => {
      const invalidData = {
        weight: 0,
        packageDetails: "Updated package",
      };
      const result = editShipmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("Pricing Rule Schema", () => {
    it("should accept valid pricing rule data", () => {
      const validData = {
        serviceType: ServiceType.STANDARD,
        basePrice: 50,
        pricePerKg: 10,
        zoneId: null,
        maxWeight: 50,
      };
      const result = pricingRuleSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject negative prices", () => {
      const invalidData = {
        serviceType: ServiceType.STANDARD,
        basePrice: -5,
        pricePerKg: -10,
        maxWeight: 50,
      };
      const result = pricingRuleSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
