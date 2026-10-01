import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
          Join our platform today to manage your shipments, or become a courier to start delivering.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/register" className={buttonVariants({ size: "lg" })}>
            Create an Account
          </Link>
          <Link href="/auth/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
