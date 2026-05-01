import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, MessageSquare, Heart, ThumbsDown, Trash2 } from "lucide-react";

export default async function MyProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const actions = await prisma.userAction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const grouped = actions.reduce((acc, action) => {
    if (!acc[action.actionType]) acc[action.actionType] = [];
    acc[action.actionType].push(action);
    return acc;
  }, {} as Record<string, typeof actions>);

  const actionLabels: Record<string, string> = {
    comment: "コメント",
    reply: "返信",
    like: "高評価",
    dislike: "低評価",
    delete: "削除",
  };

  const actionIcons: Record<string, any> = {
    comment: MessageSquare,
    reply: MessageSquare,
    like: Heart,
    dislike: ThumbsDown,
    delete: Trash2,
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-[#2f3336] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">マイプロフィール</h1>
      </div>

      <div className="px-4 py-6 border-b border-[#2f3336]">
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name || ""} className="w-20 h-20 rounded-full object-cover border border-[#2f3336]" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#2f3336] flex items-center justify-center">
              <User size={32} className="text-[#71767b]" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{session.user.name || "ユーザー"}</h2>
            <p className="text-[13px] text-[#71767b]">{session.user.email}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#2f3336]">
        {actions.length === 0 ? (
          <div className="p-12 text-center text-[#71767b]">
            <p>まだアクションがありません</p>
          </div>
        ) : (
          actions.map((action) => {
            const Icon = actionIcons[action.actionType] || MessageSquare;
            return (
              <div key={action.id} className="p-4 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#202327] rounded-full">
                    <Icon size={16} className="text-[#71767b]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-medium text-[#1d9bf0]">{actionLabels[action.actionType] || action.actionType}</span>
                      <span className="text-[13px] text-[#71767b]">
                        {new Date(action.createdAt).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                    {action.content && (
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{action.content}</p>
                    )}
                    <Link href={`/?v=${action.videoId}`} className="text-[13px] text-[#1d9bf0] hover:underline mt-1 block">
                      動画を見る
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
