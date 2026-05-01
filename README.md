# YTX - YouTube Comments X

YouTube動画のコメント欄をX/Twitter風のUIで閲覧・操作できるWebアプリケーション。

対象動画: [https://www.youtube.com/watch?v=niKAylKNIEI](https://www.youtube.com/watch?v=niKAylKNIEI)

## 機能

- X/Twitter風タイムラインUI
- コメント閲覧（人気順・新着順）
- コメント投稿・返信・削除
- 高評価・低評価（低評価数も自前表示）
- 無限スクロール
- 検索機能
- トレンド機能（高評価コメントランキング）
- プロフィール（過去の活動履歴）
- リアルタイム同期（SSE）
- クライアントサイド読み取り分散（レート制限対策）

## 技術スタック

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS
- Prisma / PostgreSQL
- Redis
- Auth.js v5 (Google OAuth)
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
4. PostgreSQLとRedisサービスを追加
