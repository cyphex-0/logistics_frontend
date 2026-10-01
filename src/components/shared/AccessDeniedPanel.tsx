"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AccessDeniedPanelProps {
  message?: string;
}

export function AccessDeniedPanel({ message = "You do not have permission to view this page." }: AccessDeniedPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <Alert variant="destructive" className="max-w-md mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Link href="/">
        <Button variant="outline">Return to Home</Button>
      </Link>
    </div>
  );
}
