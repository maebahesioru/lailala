#!/bin/sh
set -e

echo "Applying Prisma schema..."
npx prisma@6.19.3 db push --skip-generate

echo "Starting Next.js..."
exec "$@"
