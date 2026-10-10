'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/lib/store/ui.store';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { DemoLoginCard } from '@/components/auth/DemoLoginCard';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const { setGlobalLoading } = useUIStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues, isDemo: string | null = null) => {
    setGlobalLoading(true);
    if (isDemo) setDemoLoading(isDemo);
    else setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Failed to login');
      }

      toast.success('Logged in successfully');
      
      // Invalidate the auth query to update the session in context
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      
      const role = responseData.user?.role;
      let targetUrl = callbackUrl;
      // Prevent redirecting back to login if the callbackUrl is the login page itself
      if (targetUrl === '/' || targetUrl.startsWith('/auth/login') || targetUrl === '/login') {
        if (role === 'ADMIN') targetUrl = '/admin';
        else if (role === 'COURIER') targetUrl = '/courier';
        else targetUrl = '/dashboard';
      }
      
      router.push(targetUrl);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
      setDemoLoading(null);
      setGlobalLoading(false);
    }
  };

  const handleDemoLogin = (role: 'CUSTOMER' | 'COURIER' | 'ADMIN') => {
    const emailMap = {
      CUSTOMER: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL || 'customer@example.com',
      COURIER: process.env.NEXT_PUBLIC_DEMO_COURIER_EMAIL || 'courier@example.com',
      ADMIN: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || 'admin@example.com',
    };
    
    const passMap = {
      CUSTOMER: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD || 'password123',
      COURIER: process.env.NEXT_PUBLIC_DEMO_COURIER_PASSWORD || 'password123',
      ADMIN: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || 'password123',
    };
    
    form.setValue('email', emailMap[role]);
    form.setValue('password', passMap[role]);
    onSubmit({ email: emailMap[role], password: passMap[role] }, role);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your email and password to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data, null))} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} disabled={isLoading || !!demoLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="••••••••" {...field} disabled={isLoading || !!demoLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || !!demoLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        
        <div className="relative mt-6 mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or one-click demo</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <DemoLoginCard
            role="CUSTOMER"
            isLoading={isLoading || !!demoLoading}
            onSelect={handleDemoLogin}
          />
          <DemoLoginCard
            role="COURIER"
            isLoading={isLoading || !!demoLoading}
            onSelect={handleDemoLogin}
          />
          <DemoLoginCard
            role="ADMIN"
            isLoading={isLoading || !!demoLoading}
            onSelect={handleDemoLogin}
          />
        </div>
        
        <GoogleLoginButton />
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-semibold text-primary hover:underline">
            Register here
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
