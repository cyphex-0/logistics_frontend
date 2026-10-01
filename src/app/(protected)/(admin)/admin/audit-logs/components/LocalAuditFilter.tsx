'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface LocalAuditFilterProps {
  entity: string;
  action: string;
  actorId: string;
  onFilterChange: (key: string, value: string) => void;
}

export function LocalAuditFilter({ entity, action, actorId, onFilterChange }: LocalAuditFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by entity (e.g. shipment)..."
          className="pl-8"
          value={entity}
          onChange={(e) => onFilterChange('entity', e.target.value)}
        />
      </div>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by action (e.g. STATUS_CHANGED)..."
          className="pl-8"
          value={action}
          onChange={(e) => onFilterChange('action', e.target.value)}
        />
      </div>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by actor ID..."
          className="pl-8"
          value={actorId}
          onChange={(e) => onFilterChange('actorId', e.target.value)}
        />
      </div>
    </div>
  );
}
