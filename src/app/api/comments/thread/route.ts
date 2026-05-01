import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertube } from "@/lib/youtube";
import { YTNodes } from "youtubei.js";

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

function extractContinuationToken(memo: any): string | null {
  const cont = memo?.getType(YTNodes.ContinuationItem)?.[0];
  if (!cont) return null;
  const payload = (cont as any).endpoint?.payload;
  return payload?.continuationCommand?.token || payload?.token || null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const commentId = searchParams.get("commentId");
  const continuationToken = searchParams.get("continuationToken");

  if (!videoId || !commentId) {
    return NextResponse.json({ error: "videoId and commentId required" }, { status: 400 });
  }

  try {
    const innertube = await getInnertube();
    const userId = await getSessionUserId();

    if (continuationToken) {
      const cmd = new YTNodes.NavigationEndpoint({
        continuationCommand: { request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT", token: continuationToken },
      });
      const response = await cmd.call(innertube.actions, { parse: true });
      if (!response.on_response_received_endpoints_memo) {
        return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
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
    if (!thread) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

    const info = await innertube.getInfo(videoId);
    const channelId = info.basic_info.channel_id;

    let replies: any[] = [];
    let replyError: string | null = null;
    let nextToken: string | null = null;

    try {
      thread.setActions(innertube.actions);
      (thread as any).__videoId = videoId;
      (thread as any).__videoChannelId = channelId;
      const withReplies = await thread.getReplies();
      replies = withReplies.replies?.map(parseReply) || [];
      nextToken = (withReplies as any).continuation_token || null;
    } catch (e: any) {
      replyError = e.message || "Failed to load replies";
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

    return NextResponse.json({ parent, replies, replyError, continuationToken: nextToken });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
