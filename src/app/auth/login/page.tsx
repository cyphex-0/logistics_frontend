import { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Login - Shiply',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground mt-2">Login to your account</p>
      </div>
      <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
