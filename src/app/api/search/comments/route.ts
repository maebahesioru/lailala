import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { intParam } from "@/lib/query-params";
import { internalError } from "@/lib/api-error";
import { escapeLike } from "@/lib/like-escape";

function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
  if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  return "just now";
}

// 2文字程度の短い検索語（例: "a*"）だと ILIKE の候補が膨らみ、1リクエストで
// 数秒ワーカーを占有できてしまう（実測 3.7〜7.6 秒）。トランザクション内で
// SET LOCAL statement_timeout を掛け、上限を超えたら 503 で打ち切る。
const SEARCH_TIMEOUT_MS = 3000;

type CommentRow = NonNullable<Awaited<ReturnType<typeof prisma.commentCache.findFirst>>>;
type AccountRow = { authorChannelId: string | null; authorName: string; authorThumb: string | null };

async function withSearchTimeout<T>(
  run: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  // prisma.$transaction の戻り型が unknown に落ちるため、呼び出し側の型で確定させる
  return prisma.$transaction(
    async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL statement_timeout = ${SEARCH_TIMEOUT_MS}`);
      return run(tx);
    },
    { timeout: 10_000, maxWait: 5_000 }
  ) as Promise<T>;
}

function isStatementTimeout(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("statement timeout") || message.includes("57014");
}

// Postgres は同じプリペアドステートメントの初回実行でプランを立てるため、
// デプロイ直後の「最初の検索」だけが極端に遅い（実測 2.1〜2.9 秒、2 回目以降は
// 0.03 秒）。3 秒の statement_timeout とぶつかると、ありふれた日本語の語でも
// 503「検索に時間がかかりすぎました」になってしまっていた（実測で再現）。
// プロセス起動後 1 回だけ、タイムアウトした検索をそのまま引き直す
// ＝プランが温まった状態で再実行される。悪性クエリの増幅を避けるため
// 再試行はプロセスごとに 1 度だけに限定する。
let planRetryUsed = false;

async function retryOnceAfterPlanWarmup<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (e) {
    if (!isStatementTimeout(e) || planRetryUsed) throw e;
    planRetryUsed = true;
    return run();
  }
}

const MAX_QUERY_LENGTH = 100;

// OFFSET は読み飛ばした行だけコストが増えるため、深いページほど遅い。
// 実測（本番）: offset=0 は 0.03 秒、offset=99,000 は 1.7 秒。未認証で
// 叩けるので、深いページを連打されると DB を占有できてしまう。
// 実用上 5,000 件（50 件×100 ページ）より先を人が読むことはないため、
// それ以降は「検索結果の終わり」として空で返す（エラーにはしない）。
const MAX_OFFSET = 5000;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "top";
  const limit = intParam(searchParams, "limit", 50, 1, 200);
  const requestedOffset = intParam(searchParams, "offset", 0, 0, 1_000_000);
  const period = searchParams.get("period") || "all"; // today / week / month / all
  // minLikes は上限を明示する。intParam の既定上限は MAX_SAFE_INTEGER なので
  // それだと PostgreSQL の int4 範囲外になり Prisma が落ちて 500 になっていた
  // （例: ?minLikes=99999999999）。
  const minLikes = intParam(searchParams, "minLikes", 0, 0, 10_000_000);
  const sort = searchParams.get("sort") || "relevance"; // relevance / newest / oldest / likes
  const userFilter = searchParams.get("user") || ""; // channelId or author name

  // 検索語が長すぎると ILIKE の全件走査で 3 秒の statement_timeout に達し、
  // 利用者には「検索に時間がかかりすぎました」(503) という無関係なエラーが返る。
  // さらに数千文字を超えると URL 自体が大きすぎて proxy が 431 を返す。
  // 実用上の上限を作り、意味の通る 400 で返す。
  if (q.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `検索語が長すぎます（${MAX_QUERY_LENGTH}文字以内にしてください）。` },
      { status: 400 }
    );
  }
  // 記号を含む「実質 2 文字以下」の検索語は pg_trgm の trigram が取れず、
  // 全件走査になって 3 秒の statement_timeout に当たる（実測: "a*" 6.0 秒、
  // "ab*" 6.0 秒、いずれも 503）。記号だけでは索引が使えないため、
  // 記号を落とした文字列で検索する（落としたことは note で伝える）。
  let symbolStripped = false;
  {
    const rawQuery = q.trim();
    const wordChars = rawQuery.replace(/[^\p{L}\p{N}]/gu, "");
    const hasSymbol = /[^\p{L}\p{N}\s]/u.test(rawQuery);
    if (hasSymbol && wordChars.length > 0 && wordChars.length < 3) {
      q = wordChars;
      symbolStripped = true;
    } else if (hasSymbol && wordChars.length === 0) {
      return NextResponse.json(
        { error: "記号だけでは検索できません。文字を含めて指定してください。" },
        { status: 400 }
      );
    }
  }
  if (userFilter.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `ユーザー指定が長すぎます（${MAX_QUERY_LENGTH}文字以内にしてください）。` },
      { status: 400 }
    );
  }

  if (!q.trim() && !userFilter.trim()) {
    return NextResponse.json({ threads: [] });
  }

  if (requestedOffset > MAX_OFFSET) {
    return NextResponse.json({
      threads: [],
      hasMore: false,
      offset: requestedOffset,
      note: `検索結果は先頭から ${MAX_OFFSET.toLocaleString("ja-JP")} 件までさかのぼれます。`,
    });
  }
  const offset = requestedOffset;
  // 「全N件中の先頭5,000件」を出せるように、明示された時だけ総数を数える。
  const withTotal = searchParams.get("withTotal") === "1";

  try {
    const userId = await getSessionUserId();
    let blockedIds = new Set<string>();
    if (userId) {
      const [blocked, muted] = await Promise.all([
        prisma.blockedUser.findMany({ where: { userId }, select: { channelId: true } }),
        prisma.mutedUser.findMany({ where: { userId }, select: { channelId: true } }),
      ]);
      blockedIds = new Set([...blocked.map((b) => b.channelId), ...muted.map((m) => m.channelId)]);
    }

    // Date range filter
    let dateFilter: any = {};
    const now = new Date();
    if (period === "today") {
      dateFilter = { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) };
    } else if (period === "week") {
      dateFilter = { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
    } else if (period === "month") {
      dateFilter = { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
    }

    if (type === "accounts") {
      // 高度な検索の「期間」「最低いいね」はアカウントタブでも表示されているのに
      // これまで完全に無視されていた（画面では絞り込み済みに見える）。
      const comments = await retryOnceAfterPlanWarmup(() => withSearchTimeout<AccountRow[]>((tx) => tx.commentCache.findMany({
        where: {
          authorName: { contains: escapeLike(q), mode: "insensitive" },
          ...(minLikes > 0 ? { likeCount: { gte: minLikes } } : {}),
          ...(Object.keys(dateFilter).length > 0 ? { publishedAt: dateFilter } : {}),
          ...(blockedIds.size > 0 ? { NOT: { authorChannelId: { in: Array.from(blockedIds) } } } : {}),
        },
        select: { authorChannelId: true, authorName: true, authorThumb: true },
        // 並べ替えを外している。以前は publishedAt desc で 500 件に絞っていたが、
        // これは「13万行を全部並べてから 500 件」に等しく、2文字検索だと
        // statement_timeout(3秒) に当たって 503 になっていた。
        // 並べ替えを外すと GIN(trgm) 索引で 500 件そろった時点で打ち切れる。
        take: 500,
      })));

      const grouped = new Map<string, AccountResult>();
      for (const c of comments) {
        if (!c.authorChannelId) continue;
        const existing = grouped.get(c.authorChannelId);
        if (existing) {
          existing.count++;
        } else {
          grouped.set(c.authorChannelId, {
            channelId: c.authorChannelId,
            authorName: c.authorName,
            authorThumb: c.authorThumb,
            count: 1,
          });
        }
      }
      const accounts = Array.from(grouped.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      return NextResponse.json({
        accounts,
        ...(symbolStripped ? { note: "記号は検索語から取り除いて検索しました。" } : {}),
      });
    }

    // Build where clause for comments
    const where: any = {
      ...(blockedIds.size > 0 ? { NOT: { authorChannelId: { in: Array.from(blockedIds) } } } : {}),
      ...(minLikes > 0 ? { likeCount: { gte: minLikes } } : {}),
      ...(Object.keys(dateFilter).length > 0 ? { publishedAt: dateFilter } : {}),
    };

    if (userFilter.trim()) {
      where.authorName = { contains: escapeLike(userFilter), mode: "insensitive" };
    }

    if (q.trim()) {
      where.OR = [
        { content: { contains: escapeLike(q), mode: "insensitive" } },
        { authorName: { contains: escapeLike(q), mode: "insensitive" } },
      ];
    }

    // Sort order based on tab type
    let orderBy: any = {};
    if (type === "latest") {
      orderBy = { publishedAt: "desc" };
    } else if (type === "accounts") {
      orderBy = { likeCount: "desc" };
    } else if (sort === "oldest") {
      orderBy = { publishedAt: "asc" };
    } else if (sort === "newest") {
      orderBy = { publishedAt: "desc" };
    } else if (sort === "likes") {
      orderBy = { likeCount: "desc" };
    } else {
      // top / relevance: prioritize like count
      orderBy = { likeCount: "desc" };
    }

    // 総数は「あれば嬉しい」情報なので、数え上げがタイムアウトしても
    // 検索そのものは成功させる（以前は count の失敗で 503 になっていた）。
    let total: number | undefined;
    if (withTotal) {
      try {
        total = await retryOnceAfterPlanWarmup(() =>
          withSearchTimeout<number>((tx) => tx.commentCache.count({ where }))
        );
      } catch (e) {
        if (!isStatementTimeout(e)) throw e;
        total = undefined;
      }
    }

    const comments = await retryOnceAfterPlanWarmup(() =>
      withSearchTimeout<CommentRow[]>((tx) =>
        tx.commentCache.findMany({
          where,
          orderBy,
          take: limit,
          skip: offset,
        })
      )
    );

    const threads = comments.map((c) => ({
      comment: {
        commentId: c.commentId,
        author: {
          name: c.authorName,
          channelId: c.authorChannelId || undefined,
          thumbnail: c.authorThumb || undefined,
          isChannelOwner: false,
          isMember: false,
        },
        content: c.content,
        publishedTime: getRelativeTimeString(c.publishedAt),
        likeCount: String(c.likeCount),
        replyCount: String(c.replyCount),
        isLiked: false,
        isDisliked: false,
        isPinned: false,
        isHearted: false,
      },
      replies: [],
      hasRepliesContinuation: false,
      videoId: c.videoId,
    }));

    // 50件で打ち切られていたので、続きがあるかを返して
    // UI 側が「もっと見る」を出せるようにする。
    return NextResponse.json({
      threads,
      hasMore: comments.length === limit,
      offset,
      ...(total !== undefined ? { total } : {}),
      ...(symbolStripped ? { note: "記号は検索語から取り除いて検索しました。" } : {}),
    });
  } catch (e) {
    if (isStatementTimeout(e)) {
      return NextResponse.json(
        {
          error:
            "検索に時間がかかりすぎました。検索語を長くするか、絞り込み条件を追加してください。",
        },
        { status: 503 }
      );
    }
    return internalError("api/search/comments", e);
  }
}

interface AccountResult {
  channelId: string;
  authorName: string;
  authorThumb: string | null;
  count: number;
}
