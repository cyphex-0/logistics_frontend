import { Check } from "lucide-react";

interface PricingInfoCardProps {
  title: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export function PricingInfoCard({ title, description, features, isFeatured }: PricingInfoCardProps) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${isFeatured ? 'border-primary ring-1 ring-primary shadow-lg bg-primary/5' : 'bg-card hover:-translate-y-1'}`}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
