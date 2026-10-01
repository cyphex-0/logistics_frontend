"use client";

import { useState } from "react";
import { Zone } from "@/services/zone.service";
import { useDeleteZone } from "@/hooks/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function ZoneDeleteDialog({ zone }: { zone: Zone }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteZone();

  const handleDelete = () => {
    mutate(zone.id, {
      onSuccess: () => {
        toast.success(`Zone ${zone.name} deleted successfully.`);
        setOpen(false);
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to delete zone.");
        setOpen(false);
      },
    });
  };

  return (
    <>
      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10" onClick={() => setOpen(true)}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Zone</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the zone &quot;{zone.name}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
