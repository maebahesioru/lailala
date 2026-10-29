import { prisma } from "./prisma";
import { saveCommentRows, toCommentRow } from "./comment-store";

/**
 * YouTube のコメントを「続きトークン」で最後まで辿る全件同期ワーカー。
 *
 * 設計上の要点:
 * - 続きトークンを DB (CommentSyncState) に保存するので、**再デプロイしても続きから再開**できる
 * - 1 ページ 20 件 × 1.2 秒間隔。上流のレート制限を踏まない範囲で淡々と進める
 * - トークンが尽きたら done=true にして停止（＝YouTube が公開している範囲の終端）
 * - 途中で落ちても、次回起動時に token から再開する
 */

const PAGE_DELAY_MS = 400;
const LOG_EVERY_PAGES = 25;
const RETRY_DELAY_MS = 30_000;
const MAX_ERRORS_BEFORE_BACKOFF = 3;

let started = false;

interface SyncStateRow {
  token: string | null;
  pages: number;
  comments: number;
  done: boolean;
}

async function loadState(videoId: string, sortBy: string): Promise<SyncStateRow> {
  const row = await prisma.commentSyncState.upsert({
    where: { videoId_sortBy: { videoId, sortBy } },
    update: {},
    create: { videoId, sortBy },
  });
  return { token: row.token, pages: row.pages, comments: row.comments, done: row.done };
}

async function fetchPage(innertube: any, videoId: string, sortBy: string, token: string | null) {
  const { YT, YTNodes } = await import("youtubei.js");
  if (!token) {
    const first = await innertube.getComments(videoId, sortBy as any);
    return { contents: first.contents as any[], nextToken: first.continuation_token as string | null };
  }
  const cmd = new YTNodes.NavigationEndpoint({
    continuationCommand: {
      request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT",
      token,
    },
  });
  const response: any = await cmd.call(innertube.actions, { parse: true });
  if (!response?.on_response_received_endpoints?.length) {
    return { contents: [], nextToken: null };
  }
  const page = new YT.Comments(
    innertube.actions,
    { on_response_received_endpoints: [undefined, response.on_response_received_endpoints[0]] },
    true
  );
  return { contents: (page.contents as any[]) || [], nextToken: page.continuation_token as string | null };
}

function pageSignature(contents: any[]): string {
  const ids = contents
    .map((t) => (t?.comment ?? t)?.comment_id)
    .filter((id: any) => typeof id === "string");
  if (ids.length === 0) return "";
  return `${ids[0]}..${ids[ids.length - 1]}`;
}

async function runSlice(
  videoId: string,
  sortBy: string
): Promise<{ added: number; done: boolean; signature: string }> {
  const { getInnertube } = await import("./youtube");
  const innertube = await getInnertube();
  const state = await loadState(videoId, sortBy);
  if (state.done) return { added: 0, done: true, signature: "" };

  const { contents, nextToken } = await fetchPage(innertube, videoId, sortBy, state.token);

  const rows: any[] = [];
  for (const thread of contents) {
    const own = toCommentRow(videoId, thread?.comment ?? thread, null);
    if (own) rows.push(own);
    const replies = Array.isArray(thread?.replies) ? thread.replies : [];
    for (const reply of replies) {
      const row = toCommentRow(videoId, reply?.comment ?? reply, own?.commentId ?? null);
      if (row) rows.push(row);
    }
  }

  const saved = rows.length > 0 ? await saveCommentRows(rows) : 0;
  const done = !nextToken || contents.length === 0;

  await prisma.commentSyncState.update({
    where: { videoId_sortBy: { videoId, sortBy } },
    data: {
      token: nextToken,
      pages: { increment: 1 },
      comments: { increment: saved },
      done,
      lastError: null,
    },
  });

  return { added: saved, done, signature: pageSignature(contents) };
}

export async function startCommentSyncWorker() {
  if (started) return;
  started = true;

  const videoIds = (process.env.TREND_VIDEO_IDS || "niKAylKNIEI")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const sortBy = (process.env.COMMENT_SYNC_SORT || "NEWEST_FIRST").trim();

  (async () => {
    // 起動直後は他の初期化とぶつかるので少し待つ
    await new Promise((r) => setTimeout(r, 20_000));
    let errors = 0;

    for (const videoId of videoIds) {
      console.log(`[CommentSync] started for ${videoId} (sort=${sortBy})`);
      let lastSignature = "";
      let repeats = 0;
      for (;;) {
        try {
          const { added, done, signature } = await runSlice(videoId, sortBy);

          // 同じページが返り続けている＝トークンが進んでいない（無限ループ）検知
          if (signature && signature === lastSignature) {
            repeats += 1;
            if (repeats >= 3) {
              throw new Error(`continuation token is not advancing (page=${signature})`);
            }
          } else {
            repeats = 0;
            lastSignature = signature;
          }
          const state = await prisma.commentSyncState.findUnique({
            where: { videoId_sortBy: { videoId, sortBy } },
          });
          // 毎ページの count() は 170万行では重いので 100 ページに 1 回だけ測る
          const pages = state?.pages ?? 0;
          const shouldLog = done || pages % LOG_EVERY_PAGES === 0;
          if (shouldLog) {
            const dbTotal = pages % 100 === 0 || done ? await prisma.commentCache.count() : null;
            console.log(
              `[CommentSync] ${videoId} pages=${pages} fetched=${state?.comments ?? 0} added=${added} page=${signature}` +
                (dbTotal === null ? "" : ` db_total=${dbTotal}`) +
                (done ? " DONE" : "")
            );
          }
          errors = 0;
          if (done) {
            console.log(`[CommentSync] ${videoId} reached the end of YouTube's comments.`);
            break;
          }
          await new Promise((r) => setTimeout(r, PAGE_DELAY_MS));
        } catch (e: any) {
          errors += 1;
          const message = e?.message || String(e);
          console.error(`[CommentSync] ${videoId} error(${errors}): ${message}`);
          try {
            await prisma.commentSyncState.update({
              where: { videoId_sortBy: { videoId, sortBy } },
              data: { lastError: message.slice(0, 500) },
            });
          } catch {
            /* 状態更新に失敗しても止めない */
          }
          const wait = errors >= MAX_ERRORS_BEFORE_BACKOFF ? RETRY_DELAY_MS * 4 : RETRY_DELAY_MS;
          if (errors >= MAX_ERRORS_BEFORE_BACKOFF) errors = 0;
          await new Promise((r) => setTimeout(r, wait));
        }
      }
    }
  })();
}
