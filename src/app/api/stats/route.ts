import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const API_URL = process.env.API_BASE_URL || "https://logistics-backend-jyz7.onrender.com/api/v1";

  try {
    const res = await fetch(`${API_URL}/stats`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        return NextResponse.json(json);
      }
    }
  } catch (err) {
    console.warn("Public stats fetch from backend failed; defaulting to zero values", err);
  }

  // If backend is unreachable or data is empty, return exact zero values, no placeholder mock data
  return NextResponse.json({
    success: true,
    data: {
      totalShipments: 0,
      deliveredShipments: 0,
      onTimeRate: 0,
      countries: 1,
      tracking: "24/7",
    },
  });
}
