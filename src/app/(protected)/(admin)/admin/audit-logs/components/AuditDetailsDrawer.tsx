import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AuditLog } from '@/types/audit';
import { Timestamp } from '@/components/shared/Timestamp';
import { AuditEventBadge } from './AuditEventBadge';

interface AuditDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auditLog: AuditLog | null;
}

export function AuditDetailsDrawer({ open, onOpenChange, auditLog }: AuditDetailsDrawerProps) {
  if (!auditLog) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Audit Log Details</SheetTitle>
          <SheetDescription>
            Immutable record of operational change.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block mb-1">Timestamp</span>
              <span className="font-medium">
                <Timestamp date={auditLog.createdAt} showTime />
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Actor ID</span>
              <span className="font-medium font-mono text-xs break-all">
                {auditLog.actorId || 'System'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Action & Entity</span>
              <AuditEventBadge action={auditLog.action} entity={auditLog.entity} />
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Entity ID</span>
              <span className="font-medium font-mono text-xs break-all">
                {auditLog.entityId}
              </span>
            </div>
            {auditLog.ipAddress && (
              <div>
                <span className="text-muted-foreground block mb-1">IP Address</span>
                <span className="font-medium">{auditLog.ipAddress}</span>
              </div>
            )}
            {auditLog.description && (
              <div className="col-span-2">
                <span className="text-muted-foreground block mb-1">Description</span>
                <span className="font-medium">{auditLog.description}</span>
              </div>
            )}
          </div>

          {auditLog.oldValue && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Old Value</h4>
              <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
                {JSON.stringify(auditLog.oldValue, null, 2)}
              </pre>
            </div>
          )}

          {auditLog.newValue && (
            <div>
              <h4 className="text-sm font-semibold mb-2">New Value</h4>
              <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
                {JSON.stringify(auditLog.newValue, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
