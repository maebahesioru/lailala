import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { MainLayout } from "@/components/main-layout";
import { ThreadView } from "@/components/thread-view";
import { buildReplyTree } from "@/lib/reply-tree";

export async function generateMetadata({ params }: { params: Promise<{ commentId: string }> }): Promise<Metadata> {
  const segments = await params;
  const commentId = segments.commentId;

  // Fast path: try cache first
  const cached = await prisma.commentCache.findUnique({
    where: { commentId },
    select: { authorName: true, content: true },
  });

  if (cached) {
    return {
      title: `${cached.authorName}さんのコメント`,
      description: cached.content.slice(0, 120),
    };
  }

  return {
    title: "スレッド",
    description: "コメントスレッド",
  };
}

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

interface PageProps {
  params: Promise<{ commentId: string }>;
}

export default async function ThreadPage({ params }: PageProps) {
  const segments = await params;
  const commentId = segments.commentId;
  const videoId = "niKAylKNIEI";

  const userId = await getSessionUserId();
  const innertube = await getInnertube();

  // Fast path: check cache first for root comment
  const cached = await prisma.commentCache.findUnique({
    where: { commentId },
  });

  let parent: any = null;
  let isReplyThread = false;
  let loadedReplies: any[] = [];
  let nextToken: string | null = null;
  let replyError: string | null = null;
  let targetReply: any = null;

  if (cached) {
    // Cached comment found - build response from cache
    parent = {
      commentId: cached.commentId,
      author: {
        name: cached.authorName,
        channelId: cached.authorChannelId,
        thumbnail: cached.authorThumb,
        isChannelOwner: false,
        isMember: false,
      },
      content: cached.content,
      publishedTime: "",
      likeCount: String(cached.likeCount),
      replyCount: String(cached.replyCount),
      isLiked: false,
      isDisliked: false,
      isPinned: false,
      isHearted: false,
    };

    // Try to get replies from cache
    const cachedReplies = await prisma.commentCache.findMany({
      where: { parentCommentId: commentId },
    });

    if (cachedReplies.length > 0) {
      loadedReplies = cachedReplies.map((r) => ({
        comment_id: r.commentId,
        author: { name: r.authorName, id: r.authorChannelId, thumbnails: r.authorThumb ? [{ url: r.authorThumb }] : [] },
        content: { text: r.content },
        published_time: "",
        like_count: String(r.likeCount),
        reply_count: "0",
        is_liked: false,
        is_disliked: false,
        is_pinned: false,
        is_hearted: false,
        author_is_channel_owner: false,
        is_member: false,
      }));
    }
  }

  // If no cache, fall back to YouTube API
  if (!parent) {
    try {
      const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);
      const thread = comments.contents.find((t: any) => t.comment?.comment_id === commentId);
      if (thread) {
        parent = parseRoot(thread.comment);
      }
    } catch {}
  }

  // If still not found, try fetching all comments and scanning replies
  if (!parent) {
    try {
      const allComments = await innertube.getComments(videoId, "TOP_COMMENTS");
      for (const t of allComments.contents) {
        if (!t.has_replies) continue;
        try {
          t.setActions(innertube.actions);
          const withReplies = await t.getReplies();
          const found = withReplies.replies?.find((r: any) => r.comment_id === commentId);
          if (found) {
            parent = parseRoot(t.comment);
            targetReply = found;
            loadedReplies = withReplies.replies || [];
            nextToken = (withReplies as any).continuation_token || null;
            isReplyThread = true;
            break;
          }
        } catch {}
      }
    } catch {}
  }

  if (!parent) notFound();

  // If root comment found but no replies loaded yet, fetch them
  if (!isReplyThread && loadedReplies.length === 0) {
    try {
      const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);
      const thread = comments.contents.find((t: any) => t.comment?.comment_id === commentId);
      if (thread?.has_replies) {
        thread.setActions(innertube.actions);
        const withReplies = await thread.getReplies();
        loadedReplies = withReplies.replies || [];
        nextToken = (withReplies as any).continuation_token || null;
      }
    } catch (e: any) {
      replyError = e.message || "返信の読み込みに失敗しました";
    }
  }

  const filteredReplies = isReplyThread && targetReply
    ? loadedReplies.filter((r: any) => r.comment_id !== commentId)
    : loadedReplies;

  const parsedReplies = filteredReplies.map(parseReply);
  const replyTree = buildReplyTree(parsedReplies);

  let highlightedReply: any = null;

  if (isReplyThread && targetReply) {
    highlightedReply = parseReply(targetReply);
  }

  let userVote: string | undefined;
  if (userId) {
    const like = await prisma.commentLike.findUnique({
      where: { commentId_userId: { commentId, userId } },
    });
    userVote = like?.type;
  }

  return (
    <MainLayout>
      <ThreadView
        parent={parent}
        highlightedReply={highlightedReply}
        initialReplies={replyTree}
        replyError={replyError}
        initialContinuationToken={nextToken}
        videoId={videoId}
        commentId={commentId}
        userVote={userVote}
      />
    </MainLayout>
  );
}

function parseRoot(c: any) {
  return {
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
}
