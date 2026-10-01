import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { UserRole } from '@/types/api';

const secretKey = process.env.SESSION_SECRET || 'super-secret-key-for-local-dev-only-change-me';
const key = new TextEncoder().encode(secretKey);

export interface SessionMetadata {
  userId: string;
  email: string;
  role: UserRole;
  name?: string;
}

export async function encrypt(payload: SessionMetadata) {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionMetadata;
  } catch {
    return null;
  }
}

export async function createSession(metadata: SessionMetadata, accessToken: string, refreshToken?: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const sessionToken = await encrypt(metadata);

  const cookieStore = await cookies();

  // Store session metadata
  cookieStore.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  // Store backend access token
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  // Store backend refresh token if provided
  if (refreshToken) {
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: refreshExpiresAt,
      sameSite: 'lax',
      path: '/',
    });
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const session = await decrypt(sessionCookie);

  if (!session?.userId) {
    return null;
  }

  return session;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get('refresh_token')?.value;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}
