import type { Metadata } from "next";
import { NotFoundActions } from "@/components/not-found-actions";

// クライアントコンポーネントのままだと metadata を export できず、
// 404 ページのタイトルがサイト既定のままになっていた。
export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted mb-8">ページが見つかりませんでした</p>
      <NotFoundActions />
    </div>
  );
}
