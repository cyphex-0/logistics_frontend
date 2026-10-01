import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <LoadingSkeleton type="card" count={3} />
    </div>
  );
}
