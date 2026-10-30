"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** 戻るボタンを出すか（X はポスト詳細/プロフィール/通知などで表示） */
  back?: boolean;
  /** 戻る先が決まっている場合のフォールバック */
  backHref?: string;
  /** 右側に置く操作 */
  action?: React.ReactNode;
}

/**
 * X のページヘッダー相当。高さ 53px / 20px 太字タイトル / 半透明+ブラー / 下線。
 * 参考: X のヘッダーは h-[53px] px-4、戻るボタンは 36px の円形ホバー。
 */
export function PageHeader({ title, subtitle, back, backHref = "/", action }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(backHref);
  };

  return (
    <div className="sticky top-0 z-30 h-[53px] shrink-0 bg-background/80 backdrop-blur-md flex items-center gap-6 px-4 border-b border-border">
      {back && (
        <button
          type="button"
          onClick={handleBack}
          aria-label="戻る"
          className="-ml-2 p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="text-[20px] font-bold leading-6 truncate">{title}</h1>
        {subtitle && <p className="text-[13px] text-muted leading-4 truncate">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
