import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { FeatureCard } from "@/components/public/FeatureCard";
import { LifecycleStepper } from "@/components/public/LifecycleStepper";
import { CTASection } from "@/components/public/CTASection";
import { Truck, Map, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Courier & Logistics Platform | Fast & Reliable",
  description: "Next-generation logistics platform for individuals and businesses. Create shipments, pay securely, and track in real-time.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Next-Generation <span className="text-primary">Logistics</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto mb-8">
            Fast, reliable, and transparent courier services for businesses and individuals. Track your shipments in real-time from pickup to delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register" className={buttonVariants({ size: "lg" })}>
              Get Started
            </Link>
            <Link href="/pricing" className={buttonVariants({ size: "lg", variant: "outline" })}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our streamlined process makes sending and receiving packages easier than ever.</p>
          </div>
          <LifecycleStepper />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Platform Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Built on modern infrastructure to provide the best delivery experience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Truck} 
              title="Express Delivery" 
              description="Standard and Express delivery options to meet your specific timeline requirements." 
            />
            <FeatureCard 
              icon={Map} 
              title="Real-Time Tracking" 
              description="Monitor your shipments on a live map with continuous status updates." 
            />
            <FeatureCard 
              icon={Clock} 
              title="Efficient Routing" 
              description="Optimized courier assignments to ensure the fastest possible delivery times." 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Secure Payments" 
              description="Integrated payment processing with Stripe for safe and reliable transactions." 
            />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
