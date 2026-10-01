import * as React from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface MobileFilterSheetProps {
  children: React.ReactNode;
  triggerLabel?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function MobileFilterSheet({
  children,
  triggerLabel = "Filters",
  title = "Filters",
  description = "Refine your results using the filters below.",
  className,
}: MobileFilterSheetProps) {
  return (
    <div className={cn("md:hidden w-full", className)}>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" size="sm" className="w-full flex gap-2" />}>
          <Filter className="h-4 w-4" />
          {triggerLabel}
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-xl" showCloseButton={true}>
          <SheetHeader className="text-left">
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto pb-6">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
