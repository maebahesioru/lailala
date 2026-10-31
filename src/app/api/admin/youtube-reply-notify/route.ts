import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { internalError } from "@/lib/api-error";
import { scanUserReplies } from "@/lib/youtube-reply-notify-worker";

export const dynamic = "force-dynamic";

/**
 * YouTube 側で付いた返信の通知化を手動で走らせる（管理用）。
 * POST { userId?: string, dryRun?: boolean }
 * userId を省略すると全ユーザー（通知ONかつ最大50人）を走査する。
 */
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await req.json().catch(() => ({}));
    const dryRun = body?.dryRun === true;
    const userId = typeof body?.userId === "string" ? body.userId : null;

    const { prisma } = await import("@/lib/prisma");
    let ids: string[] = [];
    if (userId) {
      ids = [userId];
    } else {
      const users = await prisma.user.findMany({
        where: { notifyReplies: true },
        select: { id: true },
        take: 50,
      });
      ids = users.map((u) => u.id);
    }

    const results = [];
    for (const id of ids) {
      const scanned = await scanUserReplies(id, dryRun);
      for (const r of scanned) results.push(r);
    }

    const created = results.reduce((n, r) => n + r.created, 0);
    const candidates = results.reduce((n, r) => n + r.candidates, 0);
    return NextResponse.json({
      dryRun,
      usersScanned: ids.length,
      channels: results.length,
      candidates,
      created,
      results: results.slice(0, 50),
    });
  } catch (e) {
    return internalError("api/admin/youtube-reply-notify", e);
  }
}
