/**
 * Stripe Payment Gateway Handoff - Cancellation
 * 
 * ASSUMPTION: This implementation assumes Stripe Test Mode is active.
 * 
 * If a user abandons the Stripe Checkout flow, they are redirected back to this `/payment/cancel` page.
 * The shipment remains in a PENDING state, and the user can safely retry payment from the shipment details.
 */
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage({
  searchParams,
}: {
  searchParams: { shipmentId?: string };
}) {
  const shipmentId = searchParams.shipmentId;

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card className="border-red-200">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-700">Payment Canceled</CardTitle>
          <CardDescription className="text-lg mt-2">
            The payment process was canceled or interrupted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center text-muted-foreground">
          <p>
            No charges have been made. Your shipment remains in a <span className="font-semibold text-foreground">PENDING</span> state. 
            You can return to the shipment details and try paying again whenever you are ready.
          </p>
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
              Return to Shipment
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
