import { Badge } from "@/components/ui/badge";

interface RuleScopeBadgeProps {
  zoneId?: string | null;
}

export function RuleScopeBadge({ zoneId }: RuleScopeBadgeProps) {
  if (zoneId) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        Zone-Specific
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
      Fallback/Default
    </Badge>
  );
}
