import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { channelIdsOfUser, ownsComment } from "@/lib/user-channels";
import { getSessionUserId } from "@/lib/session";
import { getInnertube } from "@/lib/youtube";
import { YTNodes } from "youtubei.js";
import { unwrapReplies } from "@/lib/youtube-comment-shape";

const parseReply = (r: any) => ({
  commentId: r.comment_id,
  author: {
    name: typeof r.author?.name === "string" ? r.author.name : (r.author?.name?.text || "Unknown"),
    channelId: r.author?.id,
    thumbnail: r.author?.thumbnails?.[0]?.url,
    isChannelOwner: r.author_is_channel_owner || false,
    isMember: r.is_member || false,
  },
  content: r.content?.text || "",
  publishedTime: r.published_time || "",
  likeCount: r.like_count || "0",
  replyCount: r.reply_count || "0",
  isLiked: r.is_liked || false,
  isDisliked: r.is_disliked || false,
  isPinned: r.is_pinned || false,
  isHearted: r.is_hearted || false,
});

function tokenOf(cont: any): string | null {
  // 返信の続きは「もっと見る」ボタンの endpoint に載ることが多く、
  // continuationEndpoint 側は payload が空のことがある。両方見る。
  const endpoints = [cont?.endpoint, cont?.button?.endpoint];
  for (const ep of endpoints) {
    const payload = ep?.payload;
    const token = payload?.continuationCommand?.token || payload?.token;
    if (typeof token === "string" && token.length > 0) return token;
  }
  return null;
}

function extractContinuationToken(memo: any): string | null {
  const conts: any[] = memo?.getType(YTNodes.ContinuationItem) ?? [];
  // getType は入れ子も含めて全部拾う。返信ページでは
  // 「各返信の中にある孫返信の続き（短いトークン）」と
  // 「ページ全体の続き（長いトークン・末尾に付く）」が混在するので、
  // 末尾から探して最初に見つかったものをページの続きとして扱う。
  // 先頭を掴むと 3 ページ目で打ち切られる（実測: 21件で停止）。
  for (let i = conts.length - 1; i >= 0; i--) {
    const token = tokenOf(conts[i]);
    if (token) return token;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const commentId = searchParams.get("commentId");
  const continuationToken = searchParams.get("continuationToken");

  if (!videoId || !commentId) {
    return NextResponse.json({ error: "videoId と commentId が必要です。" }, { status: 400 });
  }

  try {
    const innertube = await getInnertube();
    const userId = await getSessionUserId();

    if (continuationToken) {
      const cmd = new YTNodes.NavigationEndpoint({
        continuationCommand: { request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT", token: continuationToken },
      });
      let response: any;
      try {
        response = await cmd.call(innertube.actions, { parse: true });
      } catch {
        return NextResponse.json(
          { error: "続きの返信を読み込めませんでした。ページを再読み込みしてください。" },
          { status: 400 }
        );
      }
      if (!response?.on_response_received_endpoints_memo) {
        // 期限切れ・不正なトークン。500 ではなく 400 にして
        // クライアント側が「最初から読み直す」判断をできるようにする。
        return NextResponse.json(
          { error: "続きの返信を読み込めませんでした。ページを再読み込みしてください。" },
          { status: 400 }
        );
      }
      const moreReplies = response.on_response_received_endpoints_memo.getType(YTNodes.CommentView).map(parseReply) || [];
      const nextToken = extractContinuationToken(response.on_response_received_endpoints_memo);
      return NextResponse.json({ replies: moreReplies, continuationToken: nextToken });
    }

    const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);

    let thread: any = null;
    for (const t of comments.contents) {
      if (t.comment?.comment_id === commentId) { thread = t; break; }
    }
    if (!thread) {
      // 上流の英語メッセージをそのまま画面に出さない（他ルートと文言を揃える）
      return NextResponse.json(
        { error: "このコメントは取得できませんでした（非公開・削除の可能性があります）" },
        { status: 404 }
      );
    }

    let replies: any[] = [];
    let replyError: string | null = null;
    let nextToken: string | null = null;

    try {
      thread.setActions(innertube.actions);
      // 18.x では getReplies() が引数なしで「もっと見る」ボタン側の
      // endpoint を内部で解決する（旧フォークで必要だった videoId の
      // 注入は上流で修正済み）。
      const withReplies = await thread.getReplies();
      replies = unwrapReplies(withReplies.replies).map(parseReply);
      nextToken = withReplies.continuation_token;
    } catch (e) {
      // 上流 YouTube の英語メッセージを画面に出さない（他ルートと方針を揃える）
      console.error("[api/comments/thread] getReplies failed:", e);
      replyError = "時間をおいて再試行してください。";
    }

    const c = thread.comment;
    const parent = {
      commentId: c.comment_id,
      author: {
        name: typeof c.author?.name === "string" ? c.author.name : (c.author?.name?.text || "Unknown"),
        channelId: c.author?.id,
        thumbnail: c.author?.thumbnails?.[0]?.url,
        isChannelOwner: c.author_is_channel_owner || false,
        isMember: c.is_member || false,
      },
      content: c.content?.text || "",
      publishedTime: c.published_time || "",
      likeCount: c.like_count || "0",
      replyCount: c.reply_count || "0",
      isLiked: c.is_liked || false,
      isDisliked: c.is_disliked || false,
      isPinned: c.is_pinned || false,
      isHearted: c.is_hearted || false,
    };

    try {
      const ids = [parent?.commentId, ...replies.map((r: any) => r.commentId)].filter(Boolean) as string[];
      if (ids.length > 0) {
        const imageRows = await prisma.commentImage.findMany({
          where: { commentId: { in: ids } },
          orderBy: { createdAt: "asc" },
          select: { id: true, commentId: true },
        });
        const byComment = new Map<string, { id: string; url: string }[]>();
        for (const row of imageRows) {
          const list = byComment.get(row.commentId) ?? [];
          list.push({ id: row.id, url: `/api/images/${row.id}/` });
          byComment.set(row.commentId, list);
        }
        if (parent) (parent as any).images = byComment.get(parent.commentId) ?? [];
        for (const r of replies as any[]) r.images = byComment.get(r.commentId) ?? [];
      }
      const viewerId = await getSessionUserId();
      const myChannels = viewerId ? await channelIdsOfUser(viewerId) : [];
      if (parent) (parent as any).canAttach = ownsComment(myChannels, (parent as any).author?.channelId);
      for (const r of replies as any[]) r.canAttach = ownsComment(myChannels, r.author?.channelId);
    } catch (e) {
      console.error("[api/comments/thread] images attach failed", e);
    }
    return NextResponse.json({ parent, replies, replyError, continuationToken: nextToken });
  } catch (e: any) {
    const raw = e?.message || "";
    if (/unavailable|did not have any content|private|removed/i.test(raw)) {
      return NextResponse.json(
        { error: "このコメントは取得できませんでした（非公開・削除の可能性があります）" },
        { status: 404 }
      );
    }
    return NextResponse.json({ error: raw || "Failed" }, { status: 500 });
  }
}
