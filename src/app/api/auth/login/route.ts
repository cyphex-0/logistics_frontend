import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call the real backend login endpoint
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Invalid credentials' },
        { status: response.status }
      );
    }

    // Backend success returns data.user, data.accessToken, data.refreshToken
    const { user, accessToken, refreshToken } = data.data || data;

    // Create session in HttpOnly cookies
    await createSession(
      {
        userId: user.id || user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      accessToken,
      refreshToken
    );

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user.id || user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
