import { Metadata } from "next";
import { PricingManagement } from "./PricingManagement";

export const metadata: Metadata = {
  title: "Pricing Rules Management | Admin",
  description: "Manage system-wide and zone-specific pricing rules.",
};

export default function AdminPricingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pricing Rules</h2>
      </div>
      <PricingManagement />
    </div>
  );
}
