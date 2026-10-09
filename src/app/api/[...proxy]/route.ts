import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return handleProxy(request);
}

export async function POST(request: NextRequest) {
  return handleProxy(request);
}

export async function PUT(request: NextRequest) {
  return handleProxy(request);
}

export async function PATCH(request: NextRequest) {
  return handleProxy(request);
}

export async function DELETE(request: NextRequest) {
  return handleProxy(request);
}

async function handleProxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // This route catches /api/admin/audit-logs etc.
  const backendPath = pathname.replace('/api', '');
  
  const API_URL = process.env.API_BASE_URL || 'https://logistics-backend-jyz7.onrender.com/api/v1';
  const targetUrl = new URL(API_URL + backendPath + request.nextUrl.search);

  const requestHeaders = new Headers(request.headers);
  const accessToken = request.cookies.get('access_token')?.value;
  
  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  // Remove host header so the backend doesn't get confused
  requestHeaders.delete('host');

  try {
    const fetchOptions: RequestInit = {
      method: request.method,
      headers: requestHeaders,
      // We cannot forward the body for GET/HEAD requests
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
      redirect: 'manual',
      // No caching for proxy
      cache: 'no-store',
    };

    const response = await fetch(targetUrl.toString(), fetchOptions);

    console.log(`[Proxy] Fetched ${targetUrl.toString()} -> Status: ${response.status}, Content-Type: ${response.headers.get('content-type')}`);

    const responseHeaders = new Headers(response.headers);
    // Don't forward content-encoding or content-length. Node's fetch decompresses
    // the body automatically, so the original content-length is no longer valid.
    responseHeaders.delete('content-encoding');
    responseHeaders.delete('content-length');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Proxy Error' },
      { status: 500 }
    );
  }
}
