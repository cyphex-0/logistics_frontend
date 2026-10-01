import { CheckCircle2, CreditCard, PackageSearch } from "lucide-react";

export function LifecycleStepper() {
  return (
    <div className="py-12">
      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
        
        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-background border-4 border-primary flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Create Shipment</h3>
          <p className="text-muted-foreground max-w-[250px]">Enter pickup and delivery details to get your shipment started.</p>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-background border-4 border-primary flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Pay Securely</h3>
          <p className="text-muted-foreground max-w-[250px]">Complete payment through our secure Stripe integration.</p>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-background border-4 border-primary flex items-center justify-center mb-4 transition-transform hover:scale-105 duration-300">
            <PackageSearch className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Track & Receive</h3>
          <p className="text-muted-foreground max-w-[250px]">Follow your package in real-time until it safely arrives.</p>
        </div>
      </div>
    </div>
  );
}
