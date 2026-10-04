import { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { AuthAwareCTAButton } from "@/components/public/AuthAwareCTAButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Shiply",
  description: "Transparent, predictable pricing for all your shipping needs.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Light Parcels",
      description: "Perfect for everyday items, documents, and small electronics.",
      price: "Distance Based",
      subtitle: "Starting at $5 base fee",
      features: [
        { name: "Up to 5 kg", included: true },
        { name: "Standard dashboard tracking", included: true },
        { name: "Local couriers only", included: true },
        { name: "Secure Stripe Payments", included: true },
      ],
      button: "Start Shipping",
      href: "/auth/register",
      highlighted: false,
    },
    {
      name: "Standard Parcels",
      description: "For larger boxes, clothing, and medium-sized packages.",
      price: "Distance Based",
      subtitle: "Starting at $15 base fee",
      features: [
        { name: "Up to 20 kg", included: true },
        { name: "Standard dashboard tracking", included: true },
        { name: "Local couriers only", included: true },
        { name: "Secure Stripe Payments", included: true },
      ],
      button: "Start Shipping",
      href: "/auth/register",
      highlighted: true,
    },
    {
      name: "Heavy Goods",
      description: "For heavy items, equipment, and large deliveries.",
      price: "Distance Based",
      subtitle: "Starting at $30 base fee",
      features: [
        { name: "Over 20 kg", included: true },
        { name: "Standard dashboard tracking", included: true },
        { name: "Cargo/Van couriers required", included: true },
        { name: "Secure Stripe Payments", included: true },
      ],
      button: "Start Shipping",
      href: "/auth/register",
      highlighted: false,
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header */}
      <section className="py-20 bg-background text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Transparent, predictable pricing.</h1>
          <p className="text-lg text-muted-foreground">
            No hidden fees. No fuel surcharges out of nowhere. Just reliable rates that scale as your business grows.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col p-8 rounded-3xl border ${plan.highlighted ? 'border-primary shadow-2xl scale-105 bg-card' : 'border-border bg-background'}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.subtitle}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <AuthAwareCTAButton 
                  href={plan.href}
                  unauthenticatedText={plan.button}
                  authenticatedText="Go to Dashboard"
                  className={buttonVariants({ 
                    size: "lg", 
                    variant: plan.highlighted ? 'default' : 'outline',
                    className: "w-full"
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold mb-2">How do you calculate shipping rates?</h4>
              <p className="text-muted-foreground">Rates are calculated automatically based on the straight-line distance between the origin and destination addresses, multiplied by the weight of the package. A base fee is applied depending on the weight tier.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Do you have a subscription model?</h4>
              <p className="text-muted-foreground">No, we keep things simple with a transparent pay-per-shipment model. You only pay for what you ship, with no hidden monthly fees.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">How are couriers paid?</h4>
              <p className="text-muted-foreground">The delivery fee you pay is securely held in escrow via Stripe until the package is successfully delivered, at which point the assigned courier receives their earnings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
