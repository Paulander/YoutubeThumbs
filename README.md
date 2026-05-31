# ThumbBattle

ThumbBattle is a production-ready MVP for previewing YouTube thumbnail variants in realistic feed contexts and sharing lightweight A/B voting links before publishing.

## Features

- Upload 1-4 thumbnail variants.
- Enter title, channel, mock view/date metadata, and an optional target keyword.
- Preview variants in desktop search, desktop feed, mobile feed, and home grid contexts.
- Fetch competitor videos through the YouTube Data API when `YOUTUBE_API_KEY` is present.
- Fall back to seeded mock competitors when secrets are missing.
- Create public voting links with vote totals, percentages, current winner, and optional comments.
- Prevent casual duplicate votes with browser localStorage.
- Browse a mock inspiration library by niche.
- View pricing scaffolding for Free, Creator Pro, and credit-pack monetization.
- Keep Stripe optional for local MVP usage.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local JSON persistence in `.data/thumbbattle.json`
- Vitest for focused utility tests

The local JSON store keeps the MVP easy to run. The data shape is intentionally close to tables you could later move into Postgres or Supabase.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill only the keys you want to enable.

```bash
cp .env.example .env.local
```

All integrations are optional. Without secrets, the app runs with mock competitor data and no payment enforcement.

## YouTube API

Set `YOUTUBE_API_KEY` to enable competitor lookup for a target keyword.

The adapter lives in `lib/youtube.ts` and calls the official YouTube Data API search endpoint. If the request fails, quota is exhausted, or no key is present, the app falls back to `getMockCompetitors()`.

## Stripe

Stripe is scaffolded as a monetization surface only. Add these values when implementing checkout:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_CREATOR_PRO`

Recommended next implementation step: add a `/api/checkout` route that creates a Stripe Checkout session for Creator Pro and redirects from the pricing page.

## DB Schema

Local persistence is stored in `.data/thumbbattle.json`:

- `tests`: saved thumbnail tests with `id`, `shareId`, anonymous `sessionId`, title metadata, variants, competitor videos, and `createdAt`.
- `votes`: public vote records with `testId`, `variantId`, `voterKey`, optional comment, and timestamp.

Future migration path:

- `thumbnail_tests`
- `thumbnail_variants`
- `competitor_videos`
- `votes`
- optional `users` table linked to `sessionId` once auth is added.

## Notes

ThumbBattle is not affiliated with YouTube. The UI uses YouTube-like feed conventions for contextual preview without implying affiliation.
