import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { createNotification } from "@/lib/notifications";
import { z } from "zod";
import { unwrapComment } from "@/lib/youtube-comment-shape";

const schema = z.object({
  videoId: z.string(),
  commentId: z.string(),
  action: z.enum(["like", "dislike", "unlike", "undislike"]),
});

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });

  const limit = await rateLimit(`vote:${userId}`, 30, 60);
  if (!limit.success) return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "リクエストの内容が不正です。" }, { status: 400 });

  const { videoId, commentId, action } = parsed.data;

  try {
    const innertube = await getInnertubeWithAuth(userId);
    const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);

    let targetComment: any = null;
    for (const thread of comments.contents) {
      if (thread.comment?.comment_id === commentId) { targetComment = thread.comment; break; }
      if (thread.replies) {
        for (const reply of thread.replies) {
          // 18.x では返信も CommentThread なので、実体は .comment 側。
          const replyComment = unwrapComment(reply);
          if (replyComment?.comment_id === commentId) { targetComment = replyComment; break; }
        }
      }
      if (targetComment) break;
    }
    if (!targetComment) return NextResponse.json({ error: "コメントが見つかりませんでした。" }, { status: 404 });

    targetComment.setActions(innertube.actions);
    if (action === "like") await targetComment.like();
    else if (action === "dislike") await targetComment.dislike();
    else if (action === "unlike") await targetComment.unlike();
    else if (action === "undislike") await targetComment.undislike();

    if (action === "like" || action === "dislike") {
      await prisma.commentLike.upsert({
        where: { commentId_userId: { commentId, userId } },
        update: { type: action },
        create: { commentId, videoId, userId, type: action },
      });

      // Send notification to comment author.
      // 付け外しのたびに通知していたため「いいね→解除→いいね」で 3 件増えていた。
      // ①取り消し（unlike / undislike）は通知しない
      // ②同じ人が同じコメントへ 24 時間以内に既に通知を作っていたら作らない
      const authorChannelId = targetComment.author?.id;
      const notifyType = action === "like" || action === "dislike" ? action : null;
      const me = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, channelId: true, image: true } });
      if (notifyType && authorChannelId && me?.channelId && authorChannelId !== me.channelId) {
        await createNotification({
          recipientChannelId: authorChannelId,
          type: notifyType,
          actorName: me.name || "Unknown",
          actorChannelId: me.channelId,
          actorThumb: me.image || undefined,
          commentId,
          videoId,
          content: targetComment.content?.text || "",
          dedupeWindowMs: 24 * 60 * 60 * 1000,
        });
      }
    } else {
      await prisma.commentLike.deleteMany({ where: { commentId, userId } });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    const msg = e.code === "YOUTUBE_AUTH_REQUIRED" ? "YouTube認証が必要です" : "処理に失敗しました。時間をおいて再試行してください。";
    return NextResponse.json({ error: msg }, { status: e.code === "YOUTUBE_AUTH_REQUIRED" ? 401 : 500 });
  }
}
