import { Metadata } from "next";
import { CTASection } from "@/components/public/CTASection";
import { Package, Zap, MapPin, BarChart3, CreditCard, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Shiply",
  description: "Explore our delivery services, from Standard to Express, built for speed and transparency.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored for modern businesses and individuals. 
            Choose the speed that fits your needs.
          </p>
        </div>
      </section>

      {/* Core Delivery Services */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Standard Delivery</h2>
              <p className="text-muted-foreground mb-4">
                Reliable and cost-effective shipping for packages that aren&apos;t time-critical. 
                Full tracking capabilities and secure handling included.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Estimated 2-5 business days</li>
                <li>• Full lifecycle tracking</li>
                <li>• Proof of delivery</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Express Delivery</h2>
              <p className="text-muted-foreground mb-4">
                Prioritized routing for urgent shipments. Next-day and same-day options available 
                depending on origin and destination.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Priority courier assignment</li>
                <li>• Real-time map tracking</li>
                <li>• Expedited handling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to manage logistics effectively.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-background border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Live Map Tracking</h3>
              <p className="text-sm text-muted-foreground">Track your courier in real-time as they approach the destination.</p>
            </div>
            <div className="p-6 rounded-xl bg-background border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CreditCard className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Pay safely with Stripe integration and clear pricing breakdown.</p>
            </div>
            <div className="p-6 rounded-xl bg-background border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <Bell className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Status Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive updates at every critical stage of the shipment lifecycle.</p>
            </div>
            <div className="p-6 rounded-xl bg-background border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <BarChart3 className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">Access your shipment history and usage metrics (available for registered users).</p>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </div>
  );
}
