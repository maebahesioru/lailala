export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ipStore = new Map<string, { count: number; reset: number }>();
let lastCleanup = 0;

const BYPASSED_PATHS = [
  "/api/auth/",
  "/api/youtube/",
  "/api/trending/",
  "/api/profile/heatmap",
];

export function middleware(request: NextRequest) {
  // Skip static assets entirely
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/static") ||
    /\.(jpg|jpeg|png|gif|ico|svg|css|js|woff|woff2|ttf|eot)$/i.test(
      request.nextUrl.pathname
    )
  ) {
    return NextResponse.next();
  }

  // Bypass rate limit for auth and read-heavy public endpoints
  if (BYPASSED_PATHS.some((p) => request.nextUrl.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Math.floor(Date.now() / 1000);

  // Cleanup expired entries every 60 seconds
  if (now - lastCleanup > 60) {
    lastCleanup = now;
    for (const [k, entry] of ipStore) {
      if (entry.reset < now) ipStore.delete(k);
    }
  }

  const isApi = request.nextUrl.pathname.startsWith("/api/");
  const windowSeconds = isApi ? 10 : 15;
  const maxRequests = isApi ? 150 : 200;
  const key = `${ip}:${Math.floor(now / windowSeconds)}`;
  const reset = Math.floor(now / windowSeconds) * windowSeconds + windowSeconds;

  const entry = ipStore.get(key);
  if (!entry || entry.reset !== reset) {
    ipStore.set(key, { count: 1, reset });
  } else {
    entry.count++;
    if (entry.count > maxRequests) {
      if (isApi) {
        return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
      }
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
