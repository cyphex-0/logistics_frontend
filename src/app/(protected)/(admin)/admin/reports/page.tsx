import { Metadata } from 'next';

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

      <div className="rounded-md border p-8 text-center text-muted-foreground">
        <p>Reports module is currently under development.</p>
        <p className="text-sm mt-2">Check back later for comprehensive analytics and reporting tools.</p>
      </div>
    </div>
  );
}
