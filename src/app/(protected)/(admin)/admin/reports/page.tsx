import { Metadata } from 'next';
import { AdminReportsClient } from './AdminReportsClient';

export const metadata: Metadata = {
  title: 'Reports | Admin Dashboard',
  description: 'View and generate system reports',
};

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-2">
          View system analytics, generate reports, and export data.
        </p>
      </div>

      <AdminReportsClient />
    </div>
  );
}
