import { CourierQueue } from "../components/CourierQueue";

export default function CourierShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Deliveries</h1>
        <p className="text-muted-foreground">Manage your assigned packages and track their delivery status.</p>
      </div>

      <CourierQueue />
    </div>
  );
}
