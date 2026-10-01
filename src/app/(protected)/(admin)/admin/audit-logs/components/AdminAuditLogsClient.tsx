'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuditLogs } from '@/lib/query/audit';
import { AuditLogTable } from './AuditLogTable';
import { LocalAuditFilter } from './LocalAuditFilter';
import { AuditDetailsDrawer } from './AuditDetailsDrawer';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { AuditLog } from '@/types/audit';

export function AdminAuditLogsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL state
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const entityParam = searchParams.get('entity') || '';
  const actionParam = searchParams.get('action') || '';
  const actorIdParam = searchParams.get('actorId') || '';

  // Local state for debounced input
  const [localEntity, setLocalEntity] = useState(entityParam);
  const [localAction, setLocalAction] = useState(actionParam);
  const [localActorId, setLocalActorId] = useState(actorIdParam);

  // Drawer state
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Debounce effect to update URL when typing
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (localEntity) params.set('entity', localEntity);
      else params.delete('entity');

      if (localAction) params.set('action', localAction);
      else params.delete('action');

      if (localActorId) params.set('actorId', localActorId);
      else params.delete('actorId');

      // Reset to page 1 on filter change
      if (localEntity !== entityParam || localAction !== actionParam || localActorId !== actorIdParam) {
        params.set('page', '1');
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [localEntity, localAction, localActorId, searchParams, router, entityParam, actionParam, actorIdParam]);

  const { data, isLoading, isError } = useAuditLogs(page, limit);

  // Perform local filtering as required by "operate on currently loaded records"
  const filteredLogs = data?.logs.filter((log) => {
    let match = true;
    if (entityParam && !log.entity.toLowerCase().includes(entityParam.toLowerCase())) {
      match = false;
    }
    if (actionParam && !log.action.toLowerCase().includes(actionParam.toLowerCase())) {
      match = false;
    }
    if (actorIdParam && (!log.actorId || !log.actorId.toLowerCase().includes(actorIdParam.toLowerCase()))) {
      match = false;
    }
    return match;
  }) || [];

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'entity') setLocalEntity(value);
    if (key === 'action') setLocalAction(value);
    if (key === 'actorId') setLocalActorId(value);
  };

  if (isError) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20">
        Failed to load audit logs. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LocalAuditFilter 
        entity={localEntity}
        action={localAction}
        actorId={localActorId}
        onFilterChange={handleFilterChange}
      />

      <AuditLogTable 
        logs={filteredLogs} 
        isLoading={isLoading} 
        onViewDetails={setSelectedLog} 
      />

      {data?.meta && data.meta.totalPages > 1 && (
        <PaginationControls
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <AuditDetailsDrawer
        open={!!selectedLog}
        onOpenChange={(open) => !open && setSelectedLog(null)}
        auditLog={selectedLog}
      />
    </div>
  );
}
