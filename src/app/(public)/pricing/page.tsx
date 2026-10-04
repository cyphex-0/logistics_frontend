import { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Shiply",
  description: "Transparent, predictable pricing for all your shipping needs.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Pay As You Go",
      description: "Perfect for individuals and small businesses with occasional shipping needs.",
      price: "Variable",
      subtitle: "Based on weight & distance",
      features: [
        { name: "Live GPS Tracking", included: true },
        { name: "Standard Delivery (2-3 days)", included: true },
        { name: "Basic Email Support", included: true },
        { name: "Express Delivery", included: false },
        { name: "API Access", included: false },
        { name: "Dedicated Account Manager", included: false },
      ],
      button: "Start Shipping",
      href: "/auth/register",
      highlighted: false,
    },
    {
      name: "Business Pro",
      description: "For growing e-commerce businesses needing reliable, discounted bulk shipping.",
      price: "$49",
      subtitle: "per month",
      features: [
        { name: "Live GPS Tracking", included: true },
        { name: "Standard & Express Delivery", included: true },
        { name: "Priority 24/7 Support", included: true },
        { name: "Up to 20% off base rates", included: true },
        { name: "Full API Access", included: true },
        { name: "Dedicated Account Manager", included: false },
      ],
      button: "Start Free Trial",
      href: "/auth/register",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "Custom logistics infrastructure for massive scale operations.",
      price: "Custom",
      subtitle: "Tailored to your volume",
      features: [
        { name: "Live GPS Tracking", included: true },
        { name: "All Delivery Tiers", included: true },
        { name: "White-glove 24/7 Support", included: true },
        { name: "Maximum Volume Discounts", included: true },
        { name: "Unlimited API Access", included: true },
        { name: "Dedicated Account Manager", included: true },
      ],
      button: "Contact Sales",
      href: "/contact",
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
                <Button 
                  asChild 
                  size="lg" 
                  variant={plan.highlighted ? 'default' : 'outline'} 
                  className="w-full"
                >
                  <Link href={plan.href}>{plan.button}</Link>
                </Button>
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
              <p className="text-muted-foreground">Base rates are determined by the origin, destination zone, and total weight. Business Pro and Enterprise tiers receive percentage discounts off these base rates.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Can I switch plans later?</h4>
              <p className="text-muted-foreground">Absolutely. You can upgrade to Business Pro or scale down to Pay As You Go at any time from your billing dashboard. Changes take effect at the start of the next billing cycle.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Is there a minimum volume for Enterprise?</h4>
              <p className="text-muted-foreground">Enterprise plans typically require a minimum commitment of 5,000 shipments per month to unlock dedicated account management and custom integrations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
