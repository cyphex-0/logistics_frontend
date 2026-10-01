import { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CTASection } from "@/components/public/CTASection";
import { PricingInfoCard } from "@/components/public/PricingInfoCard";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Courier & Logistics Platform",
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
          <div className="max-w-3xl mx-auto bg-muted/50 rounded-3xl p-8 md:p-12 text-center border border-primary/20 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Calculator className="h-48 w-48" />
            </div>
            <div className="relative z-10">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Calculate Exact Pricing</h2>
              <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
                Authoritative pricing is calculated securely by our backend engine. 
                Sign in to your account to use our interactive calculator and get an exact quote for your specific addresses and package weight.
              </p>
              <Link href="/auth/login" className={buttonVariants({ size: "lg", className: "px-8 transition-transform hover:scale-105" })}>
                Log in to Calculate
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
}
