import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { internalError } from "@/lib/api-error";

const MAX_KEYWORDS = 10;
const MAX_WORD_LENGTH = 40;

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });

  const keywords = await prisma.egoKeyword.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ keywords });
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = await rateLimit(`ego-keyword:${ip}`, 30, 60);
  if (!limit.success) {
    return NextResponse.json(
      { error: "登録が多すぎます。しばらく待ってから再試行してください。" },
      { status: 429, headers: { "Retry-After": String(limit.reset - Math.floor(Date.now() / 1000)) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの内容が不正です。" }, { status: 400 });
  }

  const raw = typeof body === "object" && body !== null ? (body as { word?: unknown }).word : undefined;
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return NextResponse.json({ error: "エゴサ語を入力してください。" }, { status: 400 });
  }

  const word = raw.trim().slice(0, MAX_WORD_LENGTH);

  try {
    const count = await prisma.egoKeyword.count({ where: { userId } });
    if (count >= MAX_KEYWORDS) {
      return NextResponse.json(
        { error: `登録できるエゴサ語は ${MAX_KEYWORDS} 件までです。` },
        { status: 400 }
      );
    }

    const keyword = await prisma.egoKeyword.create({ data: { userId, word } });
    return NextResponse.json({ keyword });
  } catch (e) {
    const code = (e as { code?: string })?.code;
    if (code === "P2002") {
      return NextResponse.json({ error: "その語はすでに登録されています。" }, { status: 409 });
    }
    return internalError("api/ego/keywords", e);
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID が必要です。" }, { status: 400 });

  await prisma.egoKeyword.deleteMany({ where: { id, userId } });
  return NextResponse.json({ success: true });
}
