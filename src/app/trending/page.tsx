import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { CommentCard } from "@/components/comment-card";
import { RefreshTrends } from "@/components/refresh-trends";
import { prisma } from "@/lib/prisma";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "トレンド",
  description: "人気の高いYouTubeコメントをランキング形式でチェック。",
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {

  const cached = await prisma.commentCache.findMany({
    orderBy: { likeCount: "desc" },
    take: 50,
  });

  const threads = cached.map((c) => ({
    comment: {
      commentId: c.commentId,
      author: {
        name: c.authorName,
        thumbnail: c.authorThumb || undefined,
        isChannelOwner: false,
        isMember: false,
      },
      content: c.content,
      publishedTime: c.publishedAt.toLocaleString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      likeCount: String(c.likeCount),
      replyCount: String(c.replyCount),
      isLiked: false,
      isDisliked: false,
      isPinned: false,
      isHearted: false,
    },
    replies: [],
    hasRepliesContinuation: false,
  }));

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-4 flex items-center gap-2">
        <Flame className="text-[#f91880]" size={24} />
        <h1 className="text-xl font-bold">トレンドコメント</h1>
        <RefreshTrends />
      </div>
      {threads.length === 0 && (
        <div className="p-12 text-center text-muted">
          <p className="mb-4">トレンドデータがまだありません</p>
          <p className="text-sm">右上の「キャッシュ更新」ボタンを押してデータを取得してください</p>
        </div>
      )}
      <div className="divide-y divide-border">
        {threads.map((thread) => (
          <CommentCard key={thread.comment.commentId} thread={thread as any} videoId="niKAylKNIEI" voteCounts={{ likes: 0, dislikes: 0 }} />
        ))}
      </div>
    </MainLayout>
  );
}
