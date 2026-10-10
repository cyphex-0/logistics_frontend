import { Plane, Ship, Warehouse, FileCheck, MapPin, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast, closely managed air cargo for time-critical shipments.",
    href: "/services",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description: "Predictable ocean capacity with clear milestones from port to port.",
    href: "/services",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Flexible storage, inventory visibility and fulfillment in the right places.",
    href: "/services",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Documentation and compliance that keep cargo moving across borders.",
    href: "/services",
  },
  {
    icon: MapPin,
    title: "Last-Mile Delivery",
    description: "A final handoff that feels as precise as every move before it.",
    href: "/services",
  },
  {
    icon: Truck,
    title: "Road Freight",
    description: "Reliable regional and cross-border freight, from pickup through proof of delivery.",
    href: "/services",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16">
          <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-3">What we move</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Every link in your supply chain.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="group relative p-6 md:p-8 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={service.href} 
                  className="inline-flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors"
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

