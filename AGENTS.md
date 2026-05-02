# YTX - YouTube Comments X

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Prisma 6 + PostgreSQL
- Custom YouTube OAuth session system (TV/Web OAuth flow)
- youtubei.js (InnerTube API)

## Project Structure
- `src/app/` - Next.js App Router pages & API routes
- `src/components/` - React components (X/Twitter-like UI)
- `src/lib/` - Utilities (prisma, redis, youtube, crypto)
- `src/types/` - TypeScript types
- `prisma/` - Prisma schema

## Important Notes
- Prisma 7 caused compatibility issues with Turbopack; downgraded to Prisma 6
- youtubei.js browser import: `from "youtubei.js/web"`
- YouTube write operations require auth (cookie or OAuth TV/Web flow)
- `ENCRYPTION_KEY` must be exactly 32 bytes for AES-256-GCM

## Build & Dev
```bash
pnpm install
npx prisma generate
pnpm dev
```

## Docker / Coolify
```bash
docker-compose up --build
```

## Environment Variables
See `.env.example`
