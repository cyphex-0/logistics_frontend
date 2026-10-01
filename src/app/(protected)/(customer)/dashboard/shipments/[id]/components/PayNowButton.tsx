import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { useInitiatePayment } from "@/lib/query/payments";
import { PaymentMethod } from "@/types/api";

interface PayNowButtonProps {
  shipmentId: string;
}

export function PayNowButton({ shipmentId }: PayNowButtonProps) {
  const { mutate: initiatePayment, isPending } = useInitiatePayment();

  const handlePay = () => {
    initiatePayment({
      shipmentId,
      method: PaymentMethod.STRIPE,
    });
  };

  return (
    <Button 
      onClick={handlePay} 
      disabled={isPending} 
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CreditCard className="w-4 h-4 mr-2" />}
      Pay Now (Stripe)
    </Button>
  );
}
