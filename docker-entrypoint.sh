#!/bin/sh
set -e

echo "Generating Prisma Client..."
pnpm prisma generate

echo "Deploying Prisma migrations..."
pnpm prisma migrate deploy

echo "Starting Next.js..."
exec "$@"
