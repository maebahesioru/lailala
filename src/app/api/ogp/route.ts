import { NextRequest, NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";
import { prisma } from "@/lib/prisma";

const USER_AGENT = "Mozilla/5.0 (compatible; LailalaBot/1.0)";
const MAX_HTML_BYTES = 512 * 1024;

function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    return false;
  }

  const low = ip.toLowerCase();
  if (low === "::1" || low === "::") return true;
  if (low.startsWith("fc") || low.startsWith("fd")) return true; // ULA
  if (low.startsWith("fe80")) return true; // link local
  if (low.startsWith("::ffff:")) return isPrivateIp(low.slice(7));
  return false;
}

/**
 * 内部ネットワーク宛の URL を弾く。
 *
 * 以前は任意 URL をそのまま fetch していたため、外部の誰でも
 * `/api/ogp/?url=http://192.168.1.73:8000/` のようにして LAN 内の
 * 管理画面（Coolify）へ到達でき、タイトル等のメタデータを取得できてしまっていた（SSRF）。
 */
async function assertPublicUrl(raw: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("URL の形式が不正です");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("http/https 以外は取得できません");
  }

  const host = parsed.hostname.replace(/^\[|\]$/g, "");

  if (/^(localhost|.*\.localhost|.*\.local|.*\.internal|.*\.home\.arpa)$/i.test(host)) {
    throw new Error("内部ホストは取得できません");
  }

  if (net.isIP(host)) {
    if (isPrivateIp(host)) throw new Error("内部アドレスは取得できません");
    return parsed;
  }

  let addresses: { address: string }[] = [];
  try {
    addresses = await dns.lookup(host, { all: true, verbatim: true });
  } catch {
    throw new Error("ホスト名を解決できません");
  }
  if (addresses.length === 0) throw new Error("ホスト名を解決できません");
  if (addresses.some((a) => isPrivateIp(a.address))) {
    throw new Error("内部アドレスは取得できません");
  }

  return parsed;
}

async function readLimited(res: Response, max = MAX_HTML_BYTES): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let html = "";
  let size = 0;

  try {
    while (size < max) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      html += decoder.decode(value, { stream: true });
    }
  } finally {
    try {
      await reader.cancel();
    } catch {}
  }

  return html;
}

function extractMeta(html: string, property: string): string | null {
  const og = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i").exec(html);
  if (og) return og[1];
  const name = new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i").exec(html);
  if (name) return name[1];
  return null;
}

async function fetchOgp(url: string) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await readLimited(res);
    return {
      title: extractMeta(html, "og:title") || extractMeta(html, "title") || null,
      description: extractMeta(html, "og:description") || extractMeta(html, "description") || null,
      image: extractMeta(html, "og:image") || null,
      siteName: extractMeta(html, "og:site_name") || null,
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  try {
    await assertPublicUrl(url);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "このURLは取得できません" }, { status: 400 });
  }

  // Check cache
  const cached = await prisma.ogpCache.findUnique({ where: { url } });
  if (cached && Date.now() - cached.updatedAt.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return NextResponse.json({
      url: cached.url,
      title: cached.title,
      description: cached.description,
      image: cached.image,
      siteName: cached.siteName,
    });
  }

  const ogp = await fetchOgp(url);
  if (!ogp) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
  }

  const saved = await prisma.ogpCache.upsert({
    where: { url },
    update: { ...ogp, updatedAt: new Date() },
    create: { url, ...ogp },
  });

  return NextResponse.json({
    url: saved.url,
    title: saved.title,
    description: saved.description,
    image: saved.image,
    siteName: saved.siteName,
  });
}
