import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CTASection } from "@/components/public/CTASection";
import { PricingInfoCard } from "@/components/public/PricingInfoCard";
import { PricingAuthCTA } from "@/components/public/PricingAuthCTA";

export const metadata: Metadata = {
  title: "Pricing | Shiply",
  description: "Transparent pricing based on distance, weight, and service type. Log in to access the pricing calculator.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our dynamic pricing engine calculates exact costs based on actual distance, package weight, and chosen service level. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <PricingInfoCard 
              title="Standard Delivery"
              description="Base rate pricing ideal for regular shipments."
              features={[
                "Distance-based calculation",
                "Weight tier adjustments",
                "Standard processing fees",
                "Proof of delivery included"
              ]}
            />
            <PricingInfoCard 
              title="Express Delivery"
              description="Premium pricing for prioritized, urgent handling."
              isFeatured={true}
              features={[
                "Expedited base rate",
                "Priority courier matching",
                "Distance and weight adjusted",
                "Real-time GPS tracking included"
              ]}
            />
          </div>

          {/* Authenticated Calculator CTA */}
          <PricingAuthCTA />
        </div>
      </section>
      
      <CTASection />
    </div>
  );
}
