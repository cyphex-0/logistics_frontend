import { Metadata } from "next";
import { CourierAnalyticsClient } from "./CourierAnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics | Courier",
  description: "View your delivery performance and statistics",
};

export default function CourierAnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <CourierAnalyticsClient />
    </div>
  );
}
