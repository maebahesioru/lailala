import { prisma } from "./prisma";
import { saveCommentRows, toCommentRow } from "./comment-store";

/**
 * 返信チェーン専用の同期ワーカー。
 *
 * 一覧（TOP_COMMENTS / NEWEST_FIRST）の鎖は YouTube 側が早期に打ち切るため、
 * 「各スレッドの返信」を親コメント単位で並列に掘る。返信の続きトークンは
 * 親ごとに独立しているので、ここが唯一スケールする軸になる。
 */

const PAGE_DELAY_MS = 250;
const LOG_EVERY_PARENTS = 20;
const RETRY_DELAY_MS = 30_000;
const STALE_CLAIM_MS = 30 * 60_000;

let started = false;

function envInt(name: string, fallback: number): number {
  const raw = Number.parseInt(process.env[name] || "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : fallback;
}

interface Claimed {
  parentId: string;
  token: string | null;
  pages: number;
  comments: number;
}

/** まだ歩いていない親コメントを1件確保する（複数レーンが同時に来ても致命的ではない）。 */
async function claimParent(videoId: string): Promise<Claimed | null> {
  const rows = await prisma.$queryRawUnsafe<Array<{ parent_id: string }>>(
    `SELECT c.comment_id AS parent_id
       FROM comment_cache c
       LEFT JOIN comment_reply_sync s
              ON s.video_id = c.video_id AND s.parent_comment_id = c.comment_id
      WHERE c.video_id = $1
        AND c.parent_comment_id IS NULL
        AND c.reply_count > 0
        AND (s.id IS NULL OR (s.done = false AND s.updated_at < now() - ($2::bigint * interval '1 millisecond')))
      ORDER BY c.like_count DESC
      LIMIT 1`,
    videoId,
    STALE_CLAIM_MS
  );
  if (rows.length === 0) return null;
  const parentId = rows[0].parent_id;
  const row = await prisma.commentReplySync.upsert({
    where: { videoId_parentCommentId: { videoId, parentCommentId: parentId } },
    update: {},
    create: { videoId, parentCommentId: parentId },
  });
  if (row.done) return null;
  return { parentId, token: row.token, pages: row.pages, comments: row.comments };
}

/** 応答メモから「ページ全体の続き」トークンを取り出す（末尾の ContinuationItem が本体）。 */
function nextTokenFromMemo(memo: any): string | null {
  try {
    const items = memo?.getType?.("ContinuationItem") ?? [];
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      for (const endpoint of [item?.endpoint, item?.button?.endpoint]) {
        const payload = endpoint?.payload;
        const token = payload?.continuationCommand?.token ?? payload?.token;
        if (typeof token === "string" && token.length > 0) return token;
      }
    }
  } catch {
    /* 取れなければ null */
  }
  return null;
}

async function fetchReplyPage(innertube: any, videoId: string, parentId: string, token: string | null) {
  const { YT, YTNodes } = await import("youtubei.js");
  if (!token) {
    const comments = await innertube.getComments(videoId, "TOP_COMMENTS", parentId);
    const thread: any = (comments.contents as any[]).find((t) => t?.comment?.comment_id === parentId);
    if (!thread) return { comments: [] as any[], nextToken: null };
    thread.setActions(innertube.actions);
    const withReplies = await thread.getReplies();
    const { unwrapReplies } = await import("./youtube-comment-shape");
    return { comments: unwrapReplies(withReplies.replies) as any[], nextToken: (withReplies.continuation_token as string) || null };
  }

  const cmd = new YTNodes.NavigationEndpoint({
    continuationCommand: { request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT", token },
  });
  const response: any = await cmd.call(innertube.actions, { parse: true });
  const memo = response?.on_response_received_endpoints_memo;
  if (!memo) return { comments: [] as any[], nextToken: null };
  const items = memo.getType(YTNodes.CommentView) as any[];
  return { comments: items || [], nextToken: nextTokenFromMemo(memo) };
}

async function runParent(innertube: any, videoId: string, claim: Claimed): Promise<{ added: number; done: boolean }> {
  const { comments, nextToken } = await fetchReplyPage(innertube, videoId, claim.parentId, claim.token);

  const rows: any[] = [];
  for (const c of comments) {
    const row = toCommentRow(videoId, c?.comment ?? c, claim.parentId);
    if (row) rows.push(row);
  }

  let newRows = 0;
  if (rows.length > 0) {
    const ids = rows.map((r) => r.commentId);
    const existing = await prisma.commentCache.count({ where: { commentId: { in: ids } } });
    newRows = ids.length - existing;
    await saveCommentRows(rows);
  }

  const done = !nextToken || comments.length === 0;
  await prisma.commentReplySync.update({
    where: { videoId_parentCommentId: { videoId, parentCommentId: claim.parentId } },
    data: {
      token: nextToken,
      pages: { increment: 1 },
      comments: { increment: rows.length },
      done,
      lastError: null,
    },
  });
  return { added: newRows, done };
}

async function runLane(videoId: string, laneIndex: number): Promise<void> {
  const { getInnertube } = await import("./youtube");
  const innertube = await getInnertube();
  let handled = 0;
  let errors = 0;
  let totalAdded = 0;
  let current: Claimed | null = null;
  let sameFails = 0;

  for (;;) {
    try {
      const claim = await claimParent(videoId);
      if (!claim) {
        console.log(`[CommentReplySync] lane${laneIndex} no pending parents. handled=${handled} added=${totalAdded}`);
        return;
      }
      current = claim;
      const { added, done } = await runParent(innertube, videoId, claim);
      current = null;
      sameFails = 0;
      handled += 1;
      totalAdded += added;
      errors = 0;
      if (handled % LOG_EVERY_PARENTS === 0) {
        const dbTotal = await prisma.commentCache.count();
        console.log(
          `[CommentReplySync] lane${laneIndex} parents=${handled} added=${totalAdded} db_total=${dbTotal} last=${claim.parentId}${done ? " DONE" : ""}`
        );
      }
      await new Promise((r) => setTimeout(r, PAGE_DELAY_MS));
    } catch (e: any) {
      errors += 1;
      sameFails += 1;
      const message = e?.message || String(e);
      console.error(`[CommentReplySync] lane${laneIndex} error(${errors}): ${message}`);

      // 「返信が無い」等の終端エラーや、同一親で3回続けて失敗した場合は
      // その親を done にして先へ進む（同じ親で無限にループしてレーンが詰まるのを防ぐ）。
      const terminal = /no replies|not found|does not exist|unavailable|404/i.test(message);
      if (current && (terminal || sameFails >= 3)) {
        const parentId = current.parentId;
        current = null;
        sameFails = 0;
        errors = 0;
        await prisma.commentReplySync
          .update({
            where: { videoId_parentCommentId: { videoId, parentCommentId: parentId } },
            data: { done: true, lastError: message || "failed" },
          })
          .catch(() => {});
        console.log(`[CommentReplySync] lane${laneIndex} skip ${parentId}: ${message || "failed"}`);
        await new Promise((r) => setTimeout(r, PAGE_DELAY_MS));
        continue;
      }

      const wait = errors >= 3 ? RETRY_DELAY_MS * 4 : RETRY_DELAY_MS;
      if (errors >= 3) errors = 0;
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

export async function startCommentReplySyncWorker() {
  if (started) return;
  started = true;

  const videoIds = (process.env.TREND_VIDEO_IDS || "niKAylKNIEI")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const lanes = envInt("COMMENT_REPLY_SYNC_LANES", 4);

  (async () => {
    await new Promise((r) => setTimeout(r, 40_000));
    console.log(`[CommentReplySync] starting ${lanes} lane(s) for ${videoIds.join(",")}`);
    const jobs: Promise<void>[] = [];
    for (const videoId of videoIds) {
      for (let i = 0; i < lanes; i++) jobs.push(runLane(videoId, i));
    }
    await Promise.all(jobs);
    console.log(`[CommentReplySync] all lanes finished.`);
  })();
}
