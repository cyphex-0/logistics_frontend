import { Badge } from '@/components/ui/badge';

interface AuditEventBadgeProps {
  action: string;
  entity: string;
}

export function AuditEventBadge({ action, entity }: AuditEventBadgeProps) {
  // Determine color based on action or entity
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
  
  const lowerAction = action.toLowerCase();
  
  if (lowerAction.includes('create') || lowerAction.includes('assign')) {
    variant = 'default';
  } else if (lowerAction.includes('delete') || lowerAction.includes('remove') || lowerAction.includes('deactivate')) {
    variant = 'destructive';
  } else if (lowerAction.includes('update') || lowerAction.includes('change')) {
    variant = 'outline';
  }

  return (
    <div className="flex flex-col space-y-1">
      <Badge variant={variant} className="w-fit text-xs px-2 py-0.5 whitespace-nowrap">
        {action}
      </Badge>
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
        {entity}
      </span>
    </div>
  );
}
