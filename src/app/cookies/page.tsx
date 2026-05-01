import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";

export const metadata: Metadata = {
  title: "Cookieポリシー",
  description: "ライララ(仮)のCookieポリシー",
};

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold">Cookieポリシー</h1>
      </div>
      <div className="p-4 max-w-2xl space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold mb-2">1. Cookieとは</h2>
          <p className="text-muted">
            Cookieとは、ウェブサイトがユーザーのブラウザに保存する小さなテキストファイルです。本サービスでは、ユーザーの利便性向上やサービス改善のためにCookieを使用しています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">2. 使用するCookieの種類</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold mb-1">必須Cookie</h3>
              <p className="text-muted">
                ログイン状態の保持など、本サービスの基本的な機能を提供するために必要なCookieです。これらのCookieを無効にすると、サービスが正常に動作しない場合があります。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-1">分析Cookie</h3>
              <p className="text-muted">
                ユーザーの利用状況を匿名で収集し、サービス改善に役立てるために使用します。個人を特定する情報は含まれません。
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-1">設定Cookie</h3>
              <p className="text-muted">
                テーマ設定など、ユーザーが選択した設定を記憶するために使用します。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">3. サードパーティCookie</h2>
          <p className="text-muted">
            本サービスでは、YouTube/GoogleのAPIを利用しており、これに関連してGoogleのCookieが使用される場合があります。詳細はGoogleのプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">4. Cookieの管理</h2>
          <p className="text-muted">
            ユーザーはブラウザの設定からCookieを無効化したり、保存されているCookieを削除したりすることができます。ただし、必須Cookieを無効化すると本サービスが正常に利用できなくなる場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">5. ポリシーの変更</h2>
          <p className="text-muted">
            本ポリシーは、必要に応じて変更される場合があります。変更後は、本サービス上で告知します。
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
