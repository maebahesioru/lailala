#!/bin/sh
set -e

echo "Generating Prisma Client..."
npx prisma generate

echo "Deploying Prisma migrations..."
npx prisma migrate deploy

echo "Starting Next.js..."
exec "$@"
