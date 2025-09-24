import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || request.headers.get("x-real-ip") || "anonymous";
  return new NextResponse(ip, { status: 200 });
}

