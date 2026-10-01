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
    <div className="space-y-1 mt-2">
      {criteria.map((criterion, i) => (
        <div key={i} className="flex items-center text-xs">
          {criterion.met ? (
            <Check className="mr-2 h-3 w-3 text-green-500" />
          ) : (
            <X className="mr-2 h-3 w-3 text-muted-foreground" />
          )}
          <span className={cn(criterion.met ? "text-green-500" : "text-muted-foreground")}>
            {criterion.label}
          </span>
        </div>
      ))}
    </div>
  );
}
