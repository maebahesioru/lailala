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
    return NextResponse.json({
      dbTotal: total,
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
