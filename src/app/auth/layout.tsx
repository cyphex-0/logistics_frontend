import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 relative py-12 px-4 sm:px-6 lg:px-8">
      <Link 
        href="/" 
        className={cn(
          buttonVariants({ variant: "ghost" }), 
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </>
      </Link>
      {children}
    </div>
  );
}
