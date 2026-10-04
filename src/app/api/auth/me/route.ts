import { NextResponse } from 'next/server';
import { getSession, getAccessToken, getRefreshToken, createSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getSession();
    const accessToken = await getAccessToken();

    if (!session || !accessToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch fresh profile from backend
    const backendUrl = process.env.API_BASE_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';
    const res = await fetch(`${backendUrl}/users/me`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
      cache: 'no-store'
    });

    if (res.ok) {
      const data = await res.json();
      const freshUser = data.data;
      
      // Only update name in the cookie. DO NOT update avatar in the cookie because Base64 images exceed the 4KB cookie limit!
      if (session.name !== freshUser.name) {
        session.name = freshUser.name;
        
        const refreshToken = await getRefreshToken();
        await createSession(session, accessToken, refreshToken);
      }
      
      return NextResponse.json({
        success: true,
        // Inject the avatar directly into the response so the frontend has it, but it stays out of the cookie
        user: { ...session, avatar: freshUser.avatar },
      });
    }

    return NextResponse.json({
      success: true,
      user: session,
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
