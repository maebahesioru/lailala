#!/bin/sh
set -e

echo "Applying Prisma schema..."
npx prisma@6.19.3 db push --skip-generate --accept-data-loss

# 検索用の trigram インデックス（pg_trgm）は prisma/schema.prisma 側で管理している
# （CommentCache の @@index(..., type: Gin, ops: raw("gin_trgm_ops")) と datasource の extensions）。
# 以前はこのスクリプトで生 SQL を流していたが、`db push` が毎回インデックスを落として
# 起動のたびに再構築（13万行で約2分のダウンタイム）になっていたため Prisma 管理へ移した。

echo "Starting Next.js..."
exec "$@"
