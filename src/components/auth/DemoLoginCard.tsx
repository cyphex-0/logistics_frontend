import { Button } from "@/components/ui/button";
import { RoleIcon } from "@/components/auth/RoleIcon";

interface DemoLoginCardProps {
  role: "CUSTOMER" | "COURIER" | "ADMIN";
  isLoading: boolean;
  onSelect: (role: "CUSTOMER" | "COURIER" | "ADMIN") => void;
}

export function DemoLoginCard({ role, isLoading, onSelect }: DemoLoginCardProps) {
  const titleMap = {
    CUSTOMER: "Customer",
    COURIER: "Courier",
    ADMIN: "Admin",
  };

  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center gap-2 h-24 transition-colors hover:bg-muted/50"
      onClick={() => onSelect(role)}
      disabled={isLoading}
      type="button"
    >
      <RoleIcon role={role} className="h-6 w-6 text-primary" />
      <span className="text-sm font-medium">{titleMap[role]}</span>
    </Button>
  );
}
