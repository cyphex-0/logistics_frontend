"use client";

import { Zone } from "@/services/zone.service";
import { useUpdateZone } from "@/hooks/queries";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ZoneStatusSwitch({ zone }: { zone: Zone }) {
  const { mutate, isPending } = useUpdateZone();

  const handleToggle = (checked: boolean) => {
    mutate(
      { id: zone.id, data: { isActive: checked } },
      {
        onSuccess: () => {
          toast.success(`Zone ${zone.name} is now ${checked ? "active" : "inactive"}.`);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to update zone status.");
        },
      }
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`status-${zone.id}`}
        checked={zone.isActive}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
      <Label htmlFor={`status-${zone.id}`}>
        {zone.isActive ? "Active" : "Inactive"}
      </Label>
    </div>
  );
}
