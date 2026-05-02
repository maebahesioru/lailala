#!/bin/sh
set -e

echo "Deploying Prisma migrations..."
npx prisma@6.19.3 migrate deploy

echo "Starting Next.js..."
exec "$@"
