import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface EmbedPageProps {
  params: Promise<{ commentId: string }>;
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const { commentId } = await params;
  const cached = await prisma.commentCache.findUnique({
    where: { commentId },
    select: { authorName: true, content: true },
  });

  const title = cached ? `${cached.authorName}さんのコメント - ライララ` : "コメント - ライララ";
  const description = cached ? cached.content.slice(0, 160) : "ライララでコメントをチェック";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function formatCount(n: number): string {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + "億";
  if (n >= 10000) return (n / 10000).toFixed(1) + "万";
  if (n >= 1000) return (n / 1000).toFixed(1) + "千";
  return String(n);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { commentId } = await params;

  const cached = await prisma.commentCache.findUnique({
    where: { commentId },
  });

  if (!cached) {
    notFound();
  }

  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-transparent m-0 p-0">
        <div className="w-full max-w-[500px] mx-auto bg-background border border-border rounded-xl overflow-hidden shadow-sm">
          {/* Header: author */}
          <div className="flex items-center gap-3 p-4">
            {cached.authorThumb ? (
              <img
                src={cached.authorThumb}
                alt={cached.authorName}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold text-[15px] truncate">{cached.authorName}</p>
              <p className="text-[13px] text-muted">{formatDate(cached.publishedAt)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-3">
            <p className="text-[15px] whitespace-pre-wrap leading-relaxed">{cached.content}</p>
          </div>

          {/* Footer: stats + branding */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-white/[0.02]">
            <div className="flex items-center gap-4 text-[13px] text-muted">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                {formatCount(cached.likeCount)}
              </span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                {formatCount(cached.replyCount)}
              </span>
            </div>
            <Link
              href={`/thread/${encodeURIComponent(commentId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold text-primary hover:underline"
            >
              ライララで見る →
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
