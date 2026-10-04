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
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Express Delivery",
      description: "Same-day and next-day delivery options for urgent packages. Our fastest routing ensures your package arrives precisely when it needs to.",
      features: ["Same-day within city", "Next-day nationwide", "Priority handling"]
    },
    {
      icon: <Package className="h-12 w-12 text-primary" />,
      title: "Standard Shipping",
      description: "Cost-effective, reliable delivery for everyday shipments. Perfect for e-commerce businesses and regular personal shipments.",
      features: ["2-3 days delivery", "Cost-effective", "Scheduled pickups"]
    },
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "International Freight",
      description: "Seamless international shipping with automated customs handling and global tracking visibility.",
      features: ["Customs clearance", "Global network", "Air & Ocean freight"]
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Secure Transport",
      description: "High-security transport for valuable items, confidential documents, and sensitive materials.",
      features: ["GPS tracking", "Insured up to $10,000", "Identity verification on delivery"]
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
            From lightning-fast express delivery to secure international freight, Shiply offers the infrastructure you need to move goods globally.
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
              <p className="text-muted-foreground text-sm">Live GPS tracking directly from your unified dashboard.</p>
            </div>
            <div>
              <div className="h-16 w-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-6">4</div>
              <h4 className="text-xl font-bold mb-2">Deliver</h4>
              <p className="text-muted-foreground text-sm">Secure handover with digital signature and photo proof.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
