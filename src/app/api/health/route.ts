import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "BFF Proxy Health Check Passed",
    data: {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    }
  });
}
