import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth/session';
import { UserRole } from '@/types/api';

const publicRoutes = ['/', '/about', '/services', '/pricing', '/contact', '/solutions', '/careers'];
const authRoutes = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files
  if (
    pathname.startsWith('/_next') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  // --- API Proxy Logic ---
  // Proxying is now handled robustly by src/app/api/[...proxy]/route.ts
  // to avoid Turbopack middleware rewrite bugs.

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // --- App Route Logic ---
  const sessionCookie = request.cookies.get('session')?.value;
  const session = await decrypt(sessionCookie);
  
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = !publicRoutes.includes(pathname) && !isAuthRoute;

  // Redirect to dashboard if logged in and trying to access login/register
  if (isAuthRoute && session) {
    let dashboardPath = '/dashboard';
    if (session.role === UserRole.ADMIN) dashboardPath = '/admin';
    if (session.role === UserRole.COURIER) dashboardPath = '/courier';
    
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  // Redirect to login if trying to access protected route without session
  if (isProtectedRoute && !session) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    const response = NextResponse.redirect(url);
    if (sessionCookie) {
      // Clear invalid session cookie
      response.cookies.delete('session');
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
    }
    return response;
  }

  // Basic Role checks
  if (session && isProtectedRoute) {
    const correctPath = session.role === UserRole.ADMIN ? '/admin' : (session.role === UserRole.COURIER ? '/courier' : '/dashboard');

    if (pathname.startsWith('/admin') && session.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(correctPath, request.url));
    }
    
    if (pathname.startsWith('/courier') && session.role !== UserRole.COURIER) {
      return NextResponse.redirect(new URL(correctPath, request.url));
    }

    if (pathname.startsWith('/dashboard') && session.role !== UserRole.CUSTOMER) {
      return NextResponse.redirect(new URL(correctPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

