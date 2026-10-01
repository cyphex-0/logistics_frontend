import { User, Truck, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleIconProps {
  role: "CUSTOMER" | "COURIER" | "ADMIN";
  className?: string;
}

export function RoleIcon({ role, className }: RoleIconProps) {
  const iconProps = { className: cn("h-5 w-5", className) };

  switch (role) {
    case "CUSTOMER":
      return <User {...iconProps} />;
    case "COURIER":
      return <Truck {...iconProps} />;
    case "ADMIN":
      return <ShieldCheck {...iconProps} />;
    default:
      return <HelpCircle {...iconProps} />;
  }
}
