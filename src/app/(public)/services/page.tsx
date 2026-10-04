import { Metadata } from "next";
import { Package, Zap, Globe, Shield, Clock, MapPin, Truck } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "Our Services | Shiply",
  description: "Explore our comprehensive range of logistics and courier delivery services.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Package className="h-12 w-12 text-primary" />,
      title: "Local Delivery",
      description: "Reliable delivery for everyday shipments. Perfect for small businesses and personal shipments across town.",
      features: ["Transparent pricing", "Status tracking updates", "Stripe payment integration"]
    },
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Independent Couriers",
      description: "Our platform connects you with local independent couriers who accept and deliver your requests on demand.",
      features: ["Flexible pickup times", "Direct courier assignment", "Dedicated dashboards"]
    },
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "E-Commerce Support",
      description: "A centralized platform to manage your business shipments from origin to destination.",
      features: ["Unified shipment dashboard", "Address management", "Order history"]
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Secure Platform",
      description: "We take accountability seriously with role-based access and secure data handling.",
      features: ["Authenticated users", "Secure payment escrows", "Admin oversight"]
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero */}
      <section className="relative py-24 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Shipping containers" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container px-4 mx-auto relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Logistics solutions tailored to you.</h1>
          <p className="text-xl opacity-90 mb-8">
            Shiply offers a streamlined platform connecting customers who need packages delivered with independent couriers ready to move them.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors border">
                <div className="shrink-0 p-4 bg-background rounded-xl shadow-sm h-fit">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="h-16 w-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
              <h4 className="text-xl font-bold mb-2">Book</h4>
              <p className="text-muted-foreground text-sm">Enter your package details and choose a service tier.</p>
            </div>
            <div>
              <div className="h-16 w-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
              <h4 className="text-xl font-bold mb-2">Pickup</h4>
              <p className="text-muted-foreground text-sm">A courier arrives at your location to collect the shipment.</p>
            </div>
            <div>
              <div className="h-16 w-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
              <h4 className="text-xl font-bold mb-2">Transit</h4>
              <p className="text-muted-foreground text-sm">Monitor the status of your package directly from your unified dashboard.</p>
            </div>
            <div>
              <div className="h-16 w-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">4</div>
              <h4 className="text-xl font-bold mb-2">Deliver</h4>
              <p className="text-muted-foreground text-sm">The courier marks the delivery as completed in the system.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
