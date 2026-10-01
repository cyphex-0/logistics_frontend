import { Metadata } from "next";
import { AdminShipmentsClient } from "./components/AdminShipmentsClient";

export const metadata: Metadata = {
  title: "Admin Shipments | Courier & Logistics Platform",
  description: "Manage all shipments in the platform",
};

import { Suspense } from "react";

export default function AdminShipmentsPage() {
  return (
    <>
      <AdminShipmentsClient />
    </>
  );
}
