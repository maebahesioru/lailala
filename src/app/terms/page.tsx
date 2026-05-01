import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";

export const metadata: Metadata = {
  title: "利用規約",
  description: "ライララ(仮)の利用規約",
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold">利用規約</h1>
      </div>
      <div className="p-4 max-w-2xl space-y-6 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold mb-2">第1条（適用）</h2>
          <p className="text-muted">
            本利用規約（以下「本規約」といいます。）は、ユーザーが「ライララ(仮)」（以下「本サービス」といいます。）を利用する際の一切の行為に適用されます。ユーザーは本規約に同意の上、本サービスを利用するものとします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">第2条（利用登録）</h2>
          <p className="text-muted">
            本サービスでは、YouTubeアカウントとの連携により利用登録が完了します。ユーザーは、自己の責任において本サービスを利用するものとし、第三者に対して利用権限を譲渡・貸与することはできません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">第3条（禁止事項）</h2>
          <p className="text-muted mb-2">
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>他のユーザーまたは第三者の権利を侵害する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>不正アクセス、スクリプト実行、その他の技術的な攻撃</li>
            <li>スパム、過度な投稿、その他の迷惑行為</li>
            <li>虚偽の情報を投稿する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">第4条（コンテンツの取り扱い）</h2>
          <p className="text-muted">
            ユーザーが本サービスに投稿したコメント等のコンテンツについて、本サービスは保存・表示・検索インデックス作成のために利用することがあります。ただし、投稿内容の著作権はユーザーに帰属します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">第5条（免責事項）</h2>
          <p className="text-muted">
            本サービスは、YouTubeの非公式APIを利用しており、今後の仕様変更等により機能が制限される可能性があります。運営者はこれに伴う損害について一切の責任を負いません。また、ユーザー間のトラブルについても関知しません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">第6条（サービスの変更・停止）</h2>
          <p className="text-muted">
            運営者は、ユーザーへの事前通知なくして、本サービスの内容を変更し、または提供を停止することができるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2">第7条（準拠法・管轄）</h2>
          <p className="text-muted">
            本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
