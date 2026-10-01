import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PricingResult } from "@/types/api";

interface PriceBreakdownCardProps {
  pricing: PricingResult;
}

export function PriceBreakdownCard({ pricing }: PriceBreakdownCardProps) {
  const { price, breakdown } = pricing;
  const { basePrice, pricePerKg, weight, isDefaultFallback } = breakdown;
  
  const weightCharge = weight * pricePerKg;

  return (
    <Card className="w-full bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Estimated Price</CardTitle>
        {isDefaultFallback && (
          <CardDescription className="text-amber-600 dark:text-amber-500">
            Using standard default rates for this route.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Base Price</span>
            <span>৳{basePrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-muted-foreground">
            <span>Weight Charge ({weight}kg × ৳{pricePerKg.toFixed(2)}/kg)</span>
            <span>৳{weightCharge.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-3 mt-3 flex justify-between items-center font-semibold text-base">
            <span>Total Estimated Price</span>
            <span className="text-primary">৳{price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
