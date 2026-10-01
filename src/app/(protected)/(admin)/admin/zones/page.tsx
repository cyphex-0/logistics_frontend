import { Metadata } from "next";
import AdminZonesClient from "./components/AdminZonesClient";

export const metadata: Metadata = {
  title: "Admin - Zone Management",
};

export default function AdminZonesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Zone Management</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage delivery zones.
        </p>
      </div>
      <AdminZonesClient />
    </div>
  );
}
