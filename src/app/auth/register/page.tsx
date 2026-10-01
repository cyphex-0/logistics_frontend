import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Register - Courier & Logistics Platform',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
