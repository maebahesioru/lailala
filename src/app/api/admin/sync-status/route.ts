import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { internalError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

/** 全件同期の進捗を返す（管理者のみ）。 */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const states = await prisma.commentSyncState.findMany({ orderBy: { updatedAt: "desc" } });
    const total = await prisma.commentCache.count();

    // 返信チェーン同期の在庫（親コメント数）と進捗
    const [parentsTotal, replyRows, replyDone, replyPending] = await Promise.all([
      prisma.commentCache.count({ where: { parentCommentId: null, replyCount: { gt: 0 } } }),
      prisma.commentCache.count({ where: { parentCommentId: { not: null } } }),
      prisma.commentReplySync.count({ where: { done: true } }),
      prisma.commentReplySync.count({ where: { done: false } }),
    ]);

    return NextResponse.json({
      dbTotal: total,
      replySync: {
        parentsTotal,
        replyRows,
        done: replyDone,
        pending: replyPending,
        remain: Math.max(0, parentsTotal - replyDone - replyPending),
      },
      states: states.map((s) => ({
        videoId: s.videoId,
        sortBy: s.sortBy,
        pages: s.pages,
        fetched: s.comments,
        done: s.done,
        hasToken: Boolean(s.token),
        lastError: s.lastError,
        updatedAt: s.updatedAt,
      })),
    });
  } catch (e) {
    return internalError("api/admin/sync-status", e);
  }
}
