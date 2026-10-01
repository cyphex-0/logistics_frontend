import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { AuditLog } from '@/types/audit';

export interface PaginatedAuditLogs {
  logs: AuditLog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function useAuditLogs(
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: ['audit-logs', { page, limit }],
    queryFn: async (): Promise<PaginatedAuditLogs> => {
      const searchParams = new URLSearchParams();
      searchParams.set('page', page.toString());
      searchParams.set('limit', limit.toString());

      const response = await apiClient<PaginatedAuditLogs>(`/admin/audit-logs?${searchParams.toString()}`, { method: 'GET' });
      return response;
    },
  });
}
