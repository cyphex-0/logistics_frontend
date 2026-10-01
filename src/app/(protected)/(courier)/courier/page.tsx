import { CourierStatStrip } from "./components/CourierStatStrip";
import { CourierQueue } from "./components/CourierQueue";

export default function CourierDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courier Dashboard</h1>
        <p className="text-muted-foreground">Your operational overview and assigned tasks.</p>
      </div>

      <CourierStatStrip />

      <div className="space-y-4">
        <h3 className="font-semibold text-xl tracking-tight">Assigned Deliveries</h3>
        <CourierQueue />
      </div>
    </div>
  );
}
