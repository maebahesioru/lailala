import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "ライララ(仮)のプライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold">プライバシーポリシー</h1>
      </div>
      <div className="p-4 max-w-2xl space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold mb-2">1. 基本方針</h2>
          <p className="text-muted">
            「ライララ(仮)」（以下「本サービス」といいます。）は、ユーザーの個人情報の重要性を認識し、適切な取り扱いと保護に努めます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">2. 収集する情報</h2>
          <p className="text-muted mb-2">本サービスでは、以下の情報を収集する場合があります。</p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>YouTubeアカウント情報（名前、プロフィール画像、チャンネルID）</li>
            <li>投稿したコメントの内容</li>
            <li>高評価・低評価・ブックマーク等のアクション履歴</li>
            <li>アクセスログ（IPアドレス、ブラウザ情報等）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">3. 利用目的</h2>
          <p className="text-muted mb-2">収集した情報は、以下の目的で利用します。</p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>本サービスの提供・運営</li>
            <li>ユーザーの認証・識別</li>
            <li>コメントの投稿・表示</li>
            <li>サービス改善のための分析</li>
            <li>不正利用の防止</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">4. 第三者提供</h2>
          <p className="text-muted">
            本サービスは、ユーザーの個人情報を、法令に基づく場合を除き、ユーザーの同意なく第三者に提供しません。ただし、YouTube APIを通じてGoogleに情報が送信される場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">5. Cookieの使用</h2>
          <p className="text-muted">
            本サービスでは、認証状態の保持や利用状況の分析のためにCookieを使用しています。ブラウザの設定でCookieを無効化することができますが、その場合一部の機能が利用できなくなることがあります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">6. データの保存期間</h2>
          <p className="text-muted">
            ユーザーの個人情報は、本サービスの提供に必要な期間、および法令で定められた保存期間を超えない範囲で保存します。アカウント削除を希望する場合は、お問い合わせください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">7. お問い合わせ</h2>
          <p className="text-muted">
            プライバシーポリシーに関するお問い合わせは、本サービスの運営者までお願いいたします。
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
