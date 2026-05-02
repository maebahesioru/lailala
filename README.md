# ライララ (Lailala)

YouTube動画のコメント欄をX/Twitter風のUIで閲覧・操作できるWebアプリケーション。

対象動画: [https://www.youtube.com/watch?v=niKAylKNIEI](https://www.youtube.com/watch?v=niKAylKNIEI)

## 機能

- X/Twitter風タイムラインUI
- コメント閲覧（人気順・新着順）
- コメント投稿・返信・削除
- 高評価・低評価（低評価数も自前表示）
- 無限スクロール
- 検索機能
- トレンド機能（ワードランキング）
- プロフィール（過去の活動履歴）
- リアルタイム同期（SSE）
- クライアントサイド読み取り分散（レート制限対策）

## 技術スタック

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS v4
- Prisma 6 / PostgreSQL
- Custom YouTube OAuth session system (TV/Web OAuth flow via youtubei.js)
- youtubei.js (InnerTube API)

## セットアップ

```bash
pnpm install
npx prisma migrate dev
npx prisma generate
pnpm dev
```

## 環境変数

`.env.example` を参照。

## Docker

```bash
docker-compose up --build
```

## Coolifyデプロイ

1. リポジトリを連携
2. ビルド設定で `Dockerfile` を選択
3. 環境変数を設定
4. PostgreSQLサービスを追加

## ライセンス

[MIT](./LICENSE)

## コントリビューター

- [maebahesioru](https://github.com/maebahesioru) - 作者・メンテナ

## セキュリティ

脆弱性の報告は [GitHub Security Advisories](https://github.com/maebahesioru/lailala/security/advisories/new) からお願いします。
