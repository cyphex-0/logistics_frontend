import { ShoppingCart, Factory, Car, Stethoscope } from "lucide-react";

const industries = [
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    description: "Inventory that moves with demand.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Production-ready logistics.",
  },
  {
    icon: Car,
    title: "Automotive",
    description: "Parts in motion, production protected.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Pharma",
    description: "Care when timing matters.",
  },
];

export function IndustriesGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16">
          <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-3">Industries</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Built around the way your business moves.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <div key={idx} className="group">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{industry.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
