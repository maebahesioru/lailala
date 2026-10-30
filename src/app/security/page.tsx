import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { Shield, Lock, Eye, Key, FileCode } from "lucide-react";

export const metadata: Metadata = {
  title: "セキュリティ",
  description: "ライララ(仮)のログイン仕組みとセキュリティについて",
};

export default function SecurityPage() {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield size={28} className="text-primary" />
          セキュリティについて
        </h1>

        <div className="space-y-6">
          <section className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Key size={20} className="text-primary" />
              YouTube OAuth（パスワード不要）
            </h2>
            <p className="text-[15px] text-muted leading-relaxed">
              ログイン時、あなたのGoogleパスワードを<b>このサイトが知ることはありません</b>。
              代わりにYouTube公式の「TVデバイス用ログイン」を使用します。
            </p>
            <ol className="mt-3 space-y-2 text-[15px]">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>google.com/device にアクセス</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>表示された8桁コードを入力（YouTube側で入力）</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>完了。パスワードはYouTubeにのみ入力されます</span>
              </li>
            </ol>
          </section>

          <section className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Lock size={20} className="text-primary" />
              認証情報の保存
            </h2>
            <p className="text-[15px] text-muted leading-relaxed">
              あなたの<b>Googleパスワードはこのサイトに入力されません</b>。
              YouTubeの公式画面で入力されるため、このサービスがパスワードを知ることはありません。
            </p>
            <p className="text-[15px] text-muted leading-relaxed mt-3">
              YouTubeから発行された認証トークンは、データベースに保存する前に <b>AES-256-GCM</b> で暗号化します。
              鍵はデータベースではなくサーバーの環境変数に置いているため、<b>データベースのバックアップが流出しても、それだけでは復号できません</b>。
            </p>
            <p className="text-[15px] text-muted leading-relaxed mt-3">
              ただし、投稿・予約投稿・通知のためにサーバー自身がトークンを使う必要があるため、
              <b>鍵とデータベースの両方を管理する運営者は、原理的に復号できます</b>。
              ここだけは仕組み上どうしても避けられません。
              なお、<b>ログアウトすると暗号化された認証情報もサーバーから削除</b>します（再ログインが必要になります）。
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Eye size={20} className="text-primary" />
              セッション管理
            </h2>
            <ul className="space-y-2 text-[15px] text-muted">
              <li>Cookieは <code className="bg-background px-1.5 py-0.5 rounded text-[13px]">httpOnly</code>（JavaScriptからアクセス不可）</li>
              <li>HTTPS通信時のみ送信（<code className="bg-background px-1.5 py-0.5 rounded text-[13px]">secure</code>）</li>
              <li>30日で自動削除</li>
              <li>ログアウトでCookieを削除し、保存していた認証情報もサーバーから消します</li>
            </ul>
          </section>

          <section className="bg-card rounded-2xl border border-border p-5">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <FileCode size={20} className="text-primary" />
              オープンソース
            </h2>
            <p className="text-[15px] text-muted leading-relaxed">
              このプロジェクトのソースコードはすべて公開されています。
              誰でも認証処理を確認・監査できます。
            </p>
            <a
              href="https://github.com/maebahesioru/lailala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-primary hover:underline text-[15px]"
            >
              GitHubでソースを確認 →
            </a>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
