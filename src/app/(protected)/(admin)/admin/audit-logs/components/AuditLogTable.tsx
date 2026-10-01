import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AuditLog } from '@/types/audit';
import { Timestamp } from '@/components/shared/Timestamp';
import { AuditEventBadge } from './AuditEventBadge';
import { FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AuditLogTableProps {
  logs: AuditLog[];
  isLoading: boolean;
  onViewDetails: (log: AuditLog) => void;
}

export function AuditLogTable({ logs, isLoading, onViewDetails }: AuditLogTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No audit logs found.</p>
      </div>
    );
  }

  return (
    <div className="md:border md:rounded-lg overflow-hidden">
      <Table mobileCards={true}>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Entity ID</TableHead>
            <TableHead>Actor ID</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap text-sm" data-label="Timestamp">
                <Timestamp date={log.createdAt} showTime />
              </TableCell>
              <TableCell data-label="Event">
                <AuditEventBadge action={log.action} entity={log.entity} />
              </TableCell>
              <TableCell className="font-mono text-xs" data-label="Entity ID">
                {log.entityId}
              </TableCell>
              <TableCell className="font-mono text-xs" data-label="Actor ID">
                {log.actorId || <span className="text-muted-foreground italic">System</span>}
              </TableCell>
              <TableCell className="text-right" data-label="Actions">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(log)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
