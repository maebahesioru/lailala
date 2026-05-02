import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const USER_AGENT = "Mozilla/5.0 (compatible; LailalaBot/1.0)";

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
    });
    if (!res.ok) return null;
    const html = await res.text();
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
