import { Metadata } from "next";
import { RoleCard } from "@/components/public/RoleCard";
import { User, Truck, ShieldUser } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "About Us | Shiply",
  description: "Learn about our mission, platform roles, and our commitment to transparent and reliable logistics.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About the Platform</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are a leading courier and logistics platform dedicated to providing fast, reliable, and secure delivery services. 
            Our platform connects customers with professional couriers, managed by advanced routing algorithms and a transparent accountability model.
          </p>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Who uses our platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our ecosystem is built for three primary roles, each with dedicated tools and workflows.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard 
              icon={User}
              title="Customers"
              description="Create shipments, track packages in real-time, and manage delivery addresses from a unified dashboard."
              href="/auth/register"
              ctaText="Join as Customer"
            />
            <RoleCard 
              icon={Truck}
              title="Couriers"
              description="Accept delivery requests, optimize routes, update statuses, and manage earnings seamlessly."
              href="/auth/register"
              ctaText="Become a Courier"
            />
            <RoleCard 
              icon={ShieldUser}
              title="Administrators"
              description="Oversee platform operations, manage users, monitor system health, and ensure service quality."
              href="/auth/login"
              ctaText="Admin Portal"
            />
          </div>
        </div>
      </section>

      {/* Accountability Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Our Accountability Model</h2>
          <p className="text-muted-foreground mb-4 text-lg">
            We believe in complete transparency. Every shipment has a strict lifecycle, from pending payment to delivery. 
            Customers have full visibility into the location and status of their packages.
          </p>
          <p className="text-muted-foreground text-lg">
            Payments are processed securely via Stripe, and couriers are held to high standards of reliability and punctuality.
          </p>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
}
