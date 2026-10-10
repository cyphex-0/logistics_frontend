'use client';
import { Truck, User } from 'lucide-react';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types/api';
import Link from 'next/link';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrengthHint } from '@/components/auth/PasswordStrengthHint';

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z.string().optional(),
  role: z.enum([UserRole.CUSTOMER, UserRole.COURIER]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [error, setError] = useState<string | null>(null);
  const { setGlobalLoading } = useUIStore();;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      role: UserRole.CUSTOMER,
    },
  });

  const watchPassword = form.watch("password");

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setGlobalLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.user) {
          window.location.assign(callbackUrl || (result.user.role === UserRole.COURIER ? '/courier' : '/dashboard'));
        } else {
           router.push('/login?message=registered');
        }
      } else {
        if (result.errors) {
          if (Array.isArray(result.errors)) {
            result.errors.forEach((err: Record<string, unknown>) => {
              const field = (Array.isArray(err.path) ? err.path[0] : err.path) || err.field || err.name || err.param;
              if (field && typeof err.message === 'string') {
                form.setError(field as keyof RegisterFormValues, { type: 'server', message: err.message });
              } else if (field && typeof err.msg === 'string') {
                form.setError(field as keyof RegisterFormValues, { type: 'server', message: err.msg });
              }
            });
          } else if (typeof result.errors === 'object' && result.errors !== null) {
            Object.keys(result.errors).forEach((key) => {
              const errorMessage = (result.errors as Record<string, string>)[key];
              form.setError(key as keyof RegisterFormValues, { type: 'server', message: errorMessage });
            });
          }
        }
        setError(result.message || 'Registration failed');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setGlobalLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-muted">
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
        <CardDescription className="text-base">
          Join Shiply to manage your logistics easily
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3 pb-2">
                  <FormLabel className="text-sm font-medium">Account Type</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-sm ${field.value === UserRole.CUSTOMER ? 'border-primary bg-primary/5 text-primary' : 'border-muted bg-transparent hover:bg-accent/50 text-muted-foreground'}`}
                        onClick={() => field.onChange(UserRole.CUSTOMER)}
                      >
                        <User className="mb-2 h-6 w-6" />
                        <span className="text-sm font-medium">Customer</span>
                      </div>
                      <div 
                        className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-sm ${field.value === UserRole.COURIER ? 'border-primary bg-primary/5 text-primary' : 'border-muted bg-transparent hover:bg-accent/50 text-muted-foreground'}`}
                        onClick={() => field.onChange(UserRole.COURIER)}
                      >
                        <Truck className="mb-2 h-6 w-6" />
                        <span className="text-sm font-medium">Courier</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" className="h-10" {...field} />
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
                    <PasswordInput placeholder="Enter a secure password" {...field} />
                  </FormControl>
                  <PasswordStrengthHint password={watchPassword} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-sm font-medium text-destructive mt-2 p-3 bg-destructive/10 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-6 text-base font-medium h-11" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-4 border-t mt-6">
        <div className="text-sm text-center text-muted-foreground w-full pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-semibold transition-colors">
            Log in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}


