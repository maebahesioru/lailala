#!/bin/sh
set -e

echo "Applying Prisma schema..."
npx prisma@6.19.3 db push --skip-generate --accept-data-loss

# 検索用の trigram インデックス（Prisma schema では表現できないので SQL で作る）。
# db push のあとに毎回実行する: 冪等（IF NOT EXISTS）だが、db push が
# schema に無いインデックスを落とした場合はここで復元される。
# 失敗してもサイト自体は動くので起動は止めない。
echo "Applying search indexes..."
npx prisma@6.19.3 db execute --file prisma/sql/comment-search-indexes.sql --schema prisma/schema.prisma \
  || echo "WARN: search index setup failed (search will still work, just slower)"

echo "Starting Next.js..."
exec "$@"
