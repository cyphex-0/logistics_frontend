import { NextResponse } from 'next/server';
import { getSession, getAccessToken, getRefreshToken, createSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getSession();
    let accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (!session || !accessToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const backendUrl = process.env.API_BASE_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';
    
    // First attempt to fetch fresh profile
    let res = await fetch(`${backendUrl}/users/me`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
      cache: 'no-store'
    });

    // If 401, try to refresh the token transparently on the server
    if (res.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${backendUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const { accessToken: newAccess, refreshToken: newRefresh } = refreshData.data || refreshData;
        
        // Save new tokens
        accessToken = newAccess;
        await createSession(session, newAccess as string, (newRefresh || refreshToken) as string);
        
        // Retry fetching profile
        res = await fetch(`${backendUrl}/users/me`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          cache: 'no-store'
        });
      }
    }

    if (res.ok) {
      const data = await res.json();
      const freshUser = data.data;
      
      if (freshUser && session.name !== freshUser.name) {
        session.name = freshUser.name;
        // The token might have already been refreshed, but it's safe to call createSession again
        const latestRefresh = await getRefreshToken();
        await createSession(session, accessToken as string, (latestRefresh || refreshToken || "") as string);
      }
      
      return NextResponse.json({
        success: true,
        user: { ...session, avatar: freshUser?.avatar },
      });
    }

    return NextResponse.json({
      success: true,
      user: session, // Fallback without avatar if everything fails but we still have a session
    });
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

