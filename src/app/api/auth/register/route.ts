import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call the real backend register endpoint
    // Note: Email verification is not part of the current backend implementation.
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Registration failed', errors: data.errors },
        { status: response.status }
      );
    }

    const { user, accessToken, refreshToken } = data.data || data;

    if (accessToken && refreshToken && user) {
        // Create session in HttpOnly cookies if tokens are returned
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
    }

    return NextResponse.json({
      success: true,
      message: 'Registered successfully',
      user: user ? {
        id: user.id || user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      } : undefined
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during registration' },
      { status: 500 }
    );
  }
}
