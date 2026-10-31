import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mimeForFilename, readImage } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.commentImage.findUnique({
    where: { id },
    select: { filename: true },
  });
  if (!row) {
    return NextResponse.json({ error: "画像が見つかりません。" }, { status: 404 });
  }
  const buf = await readImage(row.filename);
  if (!buf) {
    return NextResponse.json({ error: "画像が見つかりません。" }, { status: 404 });
  }
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": mimeForFilename(row.filename),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
