import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthHintProps {
  password?: string;
}

export function PasswordStrengthHint({ password = "" }: PasswordStrengthHintProps) {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains a lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains an uppercase letter", met: /[A-Z]/.test(password) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 mt-3">
      {criteria.map((criterion, i) => (
        <div key={i} className="flex items-center text-xs">
          {criterion.met ? (
            <Check className="mr-1.5 h-3.5 w-3.5 text-green-500 shrink-0" />
          ) : (
            <X className="mr-1.5 h-3.5 w-3.5 text-muted-foreground shrink-0" />
          )}
          <span className={cn(criterion.met ? "text-green-500" : "text-muted-foreground", "truncate")}>
            {criterion.label}
          </span>
        </div>
      ))}
    </div>
  );
}
