import { NextResponse } from 'next/server';
import { deleteSession, getAccessToken } from '@/lib/auth/session';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';

export async function POST() {
  try {
    const accessToken = await getAccessToken();
    
    if (accessToken) {
      // Best effort backend logout
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
      } catch (e) {
        console.error('Backend logout failed:', e);
      }
    }

    // Always clear local cookies
    await deleteSession();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    // Even if it fails, clear session locally
    await deleteSession();
    
    return NextResponse.json(
      { success: false, message: 'Error during logout' },
      { status: 500 }
    );
  }
}
