import { Metadata } from "next";
import { Suspense } from "react";
import { AdminUsersClient } from "./components/AdminUsersClient";

export const metadata: Metadata = {
  title: "Admin Users | Shiply",
  description: "Manage users, roles, and platform access",
};

export default function AdminUsersPage() {
  return (
    <>
      <AdminUsersClient />
    </>
  );
}
