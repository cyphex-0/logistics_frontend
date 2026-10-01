import { Metadata } from "next";
import { TrackingSearchForm } from "./components/TrackingSearchForm";

export const metadata: Metadata = {
  title: "Tracking Search | Courier Logistics",
};

export default function TrackingPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Track Your Shipment</h1>
        <p className="text-muted-foreground mt-2">
          Enter a tracking number to see the current status and timeline of your shipment.
        </p>
      </div>

      <>
        <TrackingSearchForm />
      </>
    </div>
  );
}
