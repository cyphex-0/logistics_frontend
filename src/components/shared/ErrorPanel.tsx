import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPanelProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorPanel({ title = "Something went wrong", message, onRetry, className }: ErrorPanelProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center rounded-lg border border-destructive/20 bg-destructive/10 ${className || ""}`}>
      <div className="rounded-full bg-destructive/20 p-3 mb-4">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
