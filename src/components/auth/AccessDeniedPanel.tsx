import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import Link from "next/link";

export function AccessDeniedPanel() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 bg-muted p-3 rounded-full w-fit">
            <LockIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You do not have permission to view this content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className={buttonVariants()}>
            Return to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
