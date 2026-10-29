import { prisma } from "./prisma";
import { parseCount } from "./parse-count";

export const UPSERT_CHUNK = 50;

export function parsePublishedTime(text: string): Date | null {
  if (!text || text.trim() === "") return null;
  const now = new Date();
  // Support both English ("2 hours ago") and Japanese ("2時間前")
  const match = text.match(
    /(\d+)\s*(年|ヶ月|週間|日|時間|分|秒|year|month|week|day|hour|minute|second)s?\s*(前|ago)?/
  );
  if (!match) return now;
  const num = parseInt(match[1], 10);
  const unit = match[2];
  const d = new Date(now);
  switch (unit) {
    case "year":
    case "年":
      d.setFullYear(d.getFullYear() - num);
      break;
    case "month":
    case "ヶ月":
      d.setMonth(d.getMonth() - num);
      break;
    case "week":
    case "週間":
      d.setDate(d.getDate() - num * 7);
      break;
    case "day":
    case "日":
      d.setDate(d.getDate() - num);
      break;
    case "hour":
    case "時間":
      d.setHours(d.getHours() - num);
      break;
    case "minute":
    case "分":
      d.setMinutes(d.getMinutes() - num);
      break;
    case "second":
    case "秒":
      d.setSeconds(d.getSeconds() - num);
      break;
  }
  return d;
}

export interface CommentRow {
  commentId: string;
  videoId: string;
  content: string;
  likeCount: number;
  replyCount: number;
  authorName: string;
  authorChannelId: string | null;
  authorThumb: string | null;
  publishedAt: Date;
  parentCommentId: string | null;
}

export function toCommentRow(
  videoId: string,
  comment: any,
  parentCommentId: string | null = null
): CommentRow | null {
  if (!comment?.comment_id) return null;
  const publishedText = comment.published_time?.text || String(comment.published_time || "");
  const authorName =
    typeof comment.author?.name === "string"
      ? comment.author.name
      : comment.author?.name?.text || "Unknown";
  return {
    commentId: comment.comment_id,
    videoId,
    content: comment.content?.text || "",
    likeCount: parseCount(comment.like_count),
    replyCount: parseCount(comment.reply_count),
    authorName,
    authorChannelId: comment.author?.id || comment.author?.channel_id || null,
    authorThumb: comment.author?.thumbnails?.[0]?.url || comment.author?.thumbnail?.url || null,
    publishedAt: parsePublishedTime(publishedText) || new Date(),
    parentCommentId,
  };
}

/** コメント行を 50 件ずつ upsert する（P2024 のときは 1 秒待って 1 回だけ再試行）。 */
export async function saveCommentRows(rows: CommentRow[]): Promise<number> {
  let saved = 0;
  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const chunk = rows.slice(i, i + UPSERT_CHUNK);
    const run = () =>
      prisma.$transaction(
        chunk.map((op) =>
          prisma.commentCache.upsert({
            where: { commentId: op.commentId },
            update: {
              content: op.content,
              likeCount: op.likeCount,
              replyCount: op.replyCount,
              authorName: op.authorName,
              authorChannelId: op.authorChannelId,
              authorThumb: op.authorThumb,
              publishedAt: op.publishedAt,
              parentCommentId: op.parentCommentId,
            },
            create: op,
          })
        ) as any,
        { timeout: 30_000 }
      );
    try {
      await run();
    } catch (e: any) {
      if (e?.code === "P2024") {
        await new Promise((r) => setTimeout(r, 1_000));
        await run();
      } else {
        throw e;
      }
    }
    saved += chunk.length;
  }
  return saved;
}
