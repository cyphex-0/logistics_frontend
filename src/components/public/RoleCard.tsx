import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  ctaText: string;
}

export function RoleCard({ icon: Icon, title, description, href, ctaText }: RoleCardProps) {
  return (
    <div className="flex flex-col p-8 border rounded-2xl bg-card hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="h-32 w-32" />
      </div>
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 z-10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-bold text-2xl mb-3 z-10">{title}</h3>
      <p className="text-muted-foreground mb-8 flex-1 z-10">{description}</p>
      <Link href={href} className={buttonVariants({ variant: "default", className: "w-full z-10 sm:w-auto" })}>
        {ctaText}
      </Link>
    </div>
  );
}
