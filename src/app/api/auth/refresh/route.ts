import { NextResponse } from 'next/server';
import { getRefreshToken, createSession, getSession } from '@/lib/auth/session';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';

export async function POST() {
  try {
    const refreshToken = await getRefreshToken();
    const session = await getSession();

    if (!refreshToken || !session) {
      return NextResponse.json(
        { success: false, message: 'No valid session or refresh token' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Failed to refresh token' },
        { status: 401 }
      );
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data || data;

    // Refresh the session with new tokens
    await createSession(
      session,
      newAccessToken,
      newRefreshToken || refreshToken
    );

    return NextResponse.json({
      success: true,
      message: 'Tokens refreshed successfully',
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during token refresh' },
      { status: 500 }
    );
  }
}
