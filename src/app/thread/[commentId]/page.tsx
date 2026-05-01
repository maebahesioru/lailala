import { notFound } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { MainLayout } from "@/components/main-layout";
import { ThreadView } from "@/components/thread-view";
import { buildReplyTree } from "@/lib/reply-tree";

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
  const { commentId } = await params;
  const videoId = "niKAylKNIEI";

  const userId = await getSessionUserId();
  const innertube = await getInnertube();
  const info = await innertube.getInfo(videoId);
  const channelId = info.basic_info.channel_id;

  let thread: any = null;
  let targetReply: any = null;
  let isReplyThread = false;
  let loadedReplies: any[] = [];
  let nextToken: string | null = null;
  let replyError: string | null = null;

  // Strategy 1: Try as top-level comment
  try {
    const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);
    thread = comments.contents.find((t: any) => t.comment?.comment_id === commentId);
  } catch {}

  // Strategy 2: Search through visible top-level threads for this reply
  if (!thread) {
    try {
      const allComments = await innertube.getComments(videoId, "TOP_COMMENTS");

      for (const t of allComments.contents) {
        if (!t.has_replies) continue;

        try {
          t.setActions(innertube.actions);
          (t as any).__videoId = videoId;
          (t as any).__videoChannelId = channelId;

          const withReplies = await t.getReplies();
          const found = withReplies.replies?.find((r: any) => r.comment_id === commentId);

          if (found) {
            thread = t;
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

  if (!thread) notFound();

  // Strategy 3: If it's a top-level comment, load its replies
  if (!isReplyThread) {
    if (thread.has_replies) {
      try {
        thread.setActions(innertube.actions);
        (thread as any).__videoId = videoId;
        (thread as any).__videoChannelId = channelId;

        const withReplies = await thread.getReplies();
        loadedReplies = withReplies.replies || [];
        nextToken = (withReplies as any).continuation_token || null;
      } catch (e: any) {
        // Fallback: fetch all comments and find this thread's replies manually
        try {
          const allComments = await innertube.getComments(videoId, "TOP_COMMENTS");
          const foundThread = allComments.contents.find(
            (t: any) => t.comment?.comment_id === commentId
          );
          if (foundThread?.replies) {
            loadedReplies = foundThread.replies;
          }
        } catch {
          replyError = e.message || "Failed to load replies";
        }
      }
    }
  }

  // Build reply tree
  const parsedReplies = loadedReplies.map(parseReply);
  const replyTree = buildReplyTree(parsedReplies);

  let parent: any;
  let displayReplies = replyTree;

  if (isReplyThread && targetReply) {
    // Show ALL replies in the thread, not just the subtree of the target reply
    parent = parseReply(targetReply);
    displayReplies = replyTree;
  } else {
    const c = thread.comment as any;
    parent = {
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

  // Fetch user's vote from DB if authenticated
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
        initialReplies={displayReplies}
        replyError={replyError}
        initialContinuationToken={nextToken}
        videoId={videoId}
        commentId={commentId}
        userVote={userVote}
      />
    </MainLayout>
  );
}
