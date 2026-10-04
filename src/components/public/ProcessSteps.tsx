const steps = [
  {
    number: "01",
    title: "Book",
    description: "Tell us what's moving and where.",
  },
  {
    number: "02",
    title: "Pickup",
    description: "We coordinate collection with no loose ends.",
  },
  {
    number: "03",
    title: "Transit",
    description: "Follow each key milestone in one simple view.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Complete the last handoff with confidence.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-24 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="text-primary text-xs font-semibold tracking-wider uppercase mb-3">The Shiply Way</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple at every checkpoint.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="text-primary/40 font-mono text-sm font-bold mb-4 group-hover:text-primary transition-colors">
                {step.number}
              </div>
              
              {/* Optional top border indicator line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-border mb-4">
                 <div className="absolute top-0 left-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base pr-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
