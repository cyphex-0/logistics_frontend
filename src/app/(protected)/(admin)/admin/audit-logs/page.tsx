import { Metadata } from 'next';
import { AdminAuditLogsClient } from './components/AdminAuditLogsClient';

export const metadata: Metadata = {
  title: 'Audit Logs | Admin Dashboard',
  description: 'Immutable system operational history',
};

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground mt-2">
          View immutable records of system operational changes.
        </p>
      </div>

      <>
        <AdminAuditLogsClient />
      </>
    </div>
  );
}
