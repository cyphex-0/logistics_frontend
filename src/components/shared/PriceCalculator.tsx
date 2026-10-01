"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { pricingService } from "@/services/pricing.service";
import { ServiceType } from "@/types/api";

interface PriceCalculatorProps {
  zoneId?: string;
}

export function PriceCalculator({ zoneId }: PriceCalculatorProps) {
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = async () => {
    if (!weight || isNaN(Number(weight))) return;
    
    setLoading(true);
    try {
      // If zoneId is provided, use that, else use a default for estimation
      const estimatedZoneId = zoneId || "zone_1";
      const data = await pricingService.calculatePrice({
        weight: Number(weight),
        serviceType: ServiceType.STANDARD,
        destinationZoneId: estimatedZoneId,
      });
      setResult(data.price);
    } catch (error) {
      console.error("Failed to calculate price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Price Calculator
        </CardTitle>
        <CardDescription>Estimate shipping cost based on weight.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="0.1"
            step="0.1"
            placeholder="e.g. 5.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        {result !== null && (
          <div className="p-3 bg-muted rounded-md text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
            <p className="text-2xl font-bold text-primary">${result.toFixed(2)}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCalculate} 
          disabled={!weight || loading}
        >
          {loading ? "Calculating..." : "Calculate Price"}
        </Button>
      </CardFooter>
    </Card>
  );
}
