export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ipStore = new Map<string, { count: number; reset: number }>();
let lastCleanup = 0;

export function middleware(request: NextRequest) {
  // Skip non-API requests entirely
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Skip auth and read-heavy endpoints
  if (
    request.nextUrl.pathname.startsWith("/api/auth/") ||
    request.nextUrl.pathname.startsWith("/api/youtube/") ||
    request.nextUrl.pathname.startsWith("/api/trending/")
  ) {
    return NextResponse.next();
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Math.floor(Date.now() / 1000);

  if (now - lastCleanup > 60) {
    lastCleanup = now;
    for (const [k, entry] of ipStore) {
      if (entry.reset < now) ipStore.delete(k);
    }
  }

  const windowSeconds = 10;
  const maxRequests = 300;
  const key = `${ip}:${Math.floor(now / windowSeconds)}`;
  const reset = Math.floor(now / windowSeconds) * windowSeconds + windowSeconds;

  const entry = ipStore.get(key);
  if (!entry || entry.reset !== reset) {
    ipStore.set(key, { count: 1, reset });
  } else {
    entry.count++;
    if (entry.count > maxRequests) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
