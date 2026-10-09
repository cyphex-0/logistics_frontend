/**
 * Stripe Payment Gateway Handoff & Asynchronous Webhook Confirmation
 * 
 * ASSUMPTION: This implementation assumes Stripe Test Mode is active.
 * 
 * 1. Payment Initiation: The user clicks "Pay Now", calling the backend to create a Stripe Checkout Session.
 * 2. Gateway Handoff: The frontend immediately redirects `window.location.href` to the backend-returned `paymentUrl`.
 * 3. Return & Confirmation: Upon completing checkout, Stripe redirects the user back to this `/payment/success` page.
 *    Because the backend processes the webhook asynchronously, this page polls the backend to confirm the status 
 *    update (Shipment -> CONFIRMED, Payment -> PAID) rather than faking a success state on the client.
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useShipment, queryKeys } from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";
import { PaymentStatus, ShipmentStatus } from "@/types/api";

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { shipmentId?: string; session_id?: string };
}) {
  const shipmentId = searchParams.shipmentId;
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isPolling, setIsPolling] = useState(true);
  
  // Use React Query to fetch the shipment. We'll enable it only if we have a shipmentId.
  const { data: shipment, refetch } = useShipment(shipmentId || "");

  useEffect(() => {
    if (!shipmentId) {
      setTimeout(() => setIsPolling(false), 0);
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.all });
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;
    const intervalTime = 3000; // 3 seconds

    const poll = async () => {
      attempts++;
      const result = await refetch();
      const currentShipment = result.data;
      
      if (
        currentShipment && 
        (currentShipment.paymentStatus === PaymentStatus.PAID || 
         currentShipment.status !== ShipmentStatus.PENDING)
      ) {
        setIsPolling(false);
        queryClient.invalidateQueries({ queryKey: queryKeys.shipments.all });
        // Automatically redirect back to the shipment page after 2 seconds
        setTimeout(() => {
          router.push(`/dashboard/shipments/${shipmentId}`);
        }, 2000);
        return;
      }

      if (attempts >= maxAttempts) {
        setIsPolling(false);
      } else {
        setTimeout(poll, intervalTime);
      }
    };

    const timer = setTimeout(poll, intervalTime);
    return () => clearTimeout(timer);
  }, [shipmentId, refetch, queryClient, router]);

  const isConfirmed = shipment?.paymentStatus === PaymentStatus.PAID;

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card className="border-green-200">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-700">Payment Initiated Successfully</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your transaction has been processed by the payment gateway.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center text-muted-foreground">
          {isConfirmed ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg">
              <p className="font-semibold">Payment Confirmed!</p>
              <p className="text-sm mt-1">Your shipment is now confirmed and ready for the next steps.</p>
              <p className="text-sm mt-3 animate-pulse">Redirecting to your shipment details...</p>
            </div>
          ) : (
            <>
              <p>
                Please note: The payment is currently being confirmed asynchronously. 
                It may take a few moments for the shipment status to update to <span className="font-semibold text-foreground">CONFIRMED</span> in our system once the webhook is received from the payment provider.
              </p>
              
              {isPolling && (
                <div className="flex items-center justify-center text-blue-600 space-x-2 my-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Checking confirmation status...</span>
                </div>
              )}
            </>
          )}

          {shipmentId && (
            <div className="bg-muted p-4 rounded-lg inline-block">
              <span className="text-sm font-medium">Shipment ID:</span>
              <br />
              <code className="text-xs">{shipmentId}</code>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          {shipmentId ? (
            <Link 
              href={`/dashboard/shipments/${shipmentId}`}
              className={`inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto`}
            >
              <Package className="w-4 h-4 mr-2" />
              View Shipment Details
            </Link>
          ) : (
            <Link 
              href="/dashboard/shipments"
              className={`inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto`}
            >
              <Package className="w-4 h-4 mr-2" />
              Return to Shipments
            </Link>
          )}
          <Link 
            href="/dashboard"
            className={`inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto`}
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}


