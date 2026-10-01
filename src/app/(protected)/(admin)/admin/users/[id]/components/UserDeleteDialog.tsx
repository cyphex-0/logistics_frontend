import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/api";
import { useDeleteUser, useProfile } from "@/hooks/queries";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function UserDeleteDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const deleteUser = useDeleteUser();
  const { data: me } = useProfile();
  const router = useRouter();

  const isSelf = me?.id === user.id;

  const handleDelete = () => {
    deleteUser.mutate(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully.");
        setOpen(false);
        router.push("/admin/users");
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to delete user.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm" disabled={isSelf}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deactivate User Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {user.name}&apos;s account? This action will prevent them from logging in. This is a soft delete, meaning their data will remain in the database for auditing purposes.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={deleteUser.isPending}>
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={handleDelete} 
            disabled={deleteUser.isPending}
          >
            {deleteUser.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Deactivation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
