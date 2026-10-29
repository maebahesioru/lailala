import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Bucket = { count: number; reset: number };

const ipStore = new Map<string, Bucket>();
let lastCleanup = 0;

/**
 * 固定ウィンドウの IP 単位レート制限。
 * 上限を超えていれば 429 レスポンスを返し、そうでなければ null。
 */
function exceeded(
  ip: string,
  scope: string,
  windowSeconds: number,
  maxRequests: number
): NextResponse | null {
  const now = Math.floor(Date.now() / 1000);

  if (now - lastCleanup > 60) {
    lastCleanup = now;
    for (const [k, entry] of ipStore) {
      if (entry.reset < now) ipStore.delete(k);
    }
  }

  const windowStart = Math.floor(now / windowSeconds) * windowSeconds;
  const reset = windowStart + windowSeconds;
  const key = `${scope}:${ip}:${windowStart}`;
  const entry = ipStore.get(key);

  if (!entry || entry.reset !== reset) {
    ipStore.set(key, { count: 1, reset });
    return null;
  }

  entry.count++;
  if (entry.count > maxRequests) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらく待ってから再試行してください。" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.max(1, reset - now)) },
      }
    );
  }

  return null;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-API requests entirely
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // 認証系はエンドポイント自身が IP 単位の上限を持っている
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // 動画情報はキャッシュミスのたびに上流 YouTube を叩く。動画IDを毎回変えれば
  // キャッシュをすり抜けられるので、通常の API とは別に厳しめの上限を置く。
  if (pathname.startsWith("/api/youtube/")) {
    return exceeded(ip, "youtube", 60, 60) ?? NextResponse.next();
  }

  return exceeded(ip, "api", 10, 300) ?? NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
