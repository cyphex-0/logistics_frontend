import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      </div>
      <Link href="/" className={buttonVariants()}>
        Return Home
      </Link>
    </div>
  );
}
