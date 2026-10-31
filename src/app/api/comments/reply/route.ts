import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { safeNotify, actorChannelIdOf } from "@/lib/notify";
import { z } from "zod";
import { unwrapComment } from "@/lib/youtube-comment-shape";

const schema = z.object({
  videoId: z.string(),
  commentId: z.string(),
  text: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });

  const limit = await rateLimit(`reply:${userId}`, 10, 60);
  if (!limit.success) return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "リクエストの内容が不正です。" }, { status: 400 });

  const { videoId, commentId, text } = parsed.data;

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
    const response = await targetComment.reply(text);

    await prisma.userAction.create({
      data: { userId, videoId, commentId, actionType: "reply", content: text },
    });

    // Send notification to comment author
    const authorChannelId = targetComment.author?.id;
    const me = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, channelId: true, image: true, email: true },
    });
    const actorChannelId = actorChannelIdOf(me);
    if (authorChannelId && actorChannelId && authorChannelId !== actorChannelId) {
      await safeNotify({
        recipientChannelId: authorChannelId,
        type: "reply",
        actorName: me?.name || "Unknown",
        actorChannelId,
        actorThumb: me?.image || undefined,
        commentId,
        videoId,
        content: text,
      });
    } else if (!authorChannelId) {
      console.warn("[notify] reply: 親コメントの投稿者IDが取れず通知できません comment=" + commentId);
    }

    return NextResponse.json({ success: true, data: response });
  } catch (e: any) {
    const msg = e.code === "YOUTUBE_AUTH_REQUIRED" ? "YouTube認証が必要です" : "処理に失敗しました。時間をおいて再試行してください。";
    return NextResponse.json({ error: msg }, { status: e.code === "YOUTUBE_AUTH_REQUIRED" ? 401 : 500 });
  }
}
