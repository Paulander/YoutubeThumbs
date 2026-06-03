# ThumbBattle

ThumbBattle is a launch-ready MVP for previewing YouTube thumbnail variants in realistic feed contexts and sharing lightweight voting links before publishing.

Core positioning: preview your YouTube thumbnail in context before you publish.

It is not an official YouTube traffic-split A/B testing tool and does not claim statistical certainty.

## Features

- Upload 1-4 thumbnail variants.
- Enter title, channel, mock view/date metadata, and an optional target keyword.
- Preview variants in desktop search, desktop feed, mobile feed, and home grid contexts.
- Use mock competitor/feed data by default. Optional YouTube Data API lookup is behind `YOUTUBE_API_KEY`.
- Create public voting links with vote totals, percentages, current winner, and optional comments.
- Prevent casual duplicate votes with localStorage-backed voter keys.
- Browse examples and an inspiration library.
- SEO pages for YouTube thumbnail preview and pre-publish thumbnail A/B voting.
- Optional PostHog analytics with no-op fallback.
- Optional Stripe Payment Link CTA for a founding creator offer.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local JSON persistence in `.data/thumbbattle.json`
- Vitest for focused tests

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` or the port printed by Next.js.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill only the keys you want to enable.

```bash
cp .env.example .env.local
```

Required for a real deploy:

- `NEXT_PUBLIC_APP_URL`
- `CONTACT_EMAIL`

Optional:

- `YOUTUBE_API_KEY`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING`
- Stripe, Supabase, Resend, and admin/debug placeholders listed in `.env.example`

## Deployment

See `docs/deployment.md` for Vercel setup and smoke tests.

Important: the current `.data/thumbbattle.json` storage is not durable on Vercel serverless infrastructure. Use it for demos and validation. Before relying on long-lived saved tests or paid usage, migrate records to Supabase/Postgres and thumbnails to object storage.

## Launch Docs

- `docs/launch-audit.md`
- `docs/launch-checklist.md`
- `docs/deployment.md`
- `docs/analytics.md`
- `docs/payments.md`
- `docs/outreach/`

## YouTube API

The app works without `YOUTUBE_API_KEY`. If the key exists, `lib/youtube.ts` uses the official YouTube Data API search endpoint for optional competitor lookup. Failed requests fall back to seeded mock competitors.

## Payments

The fastest launch path is `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING`. If it is not configured, pricing CTAs gracefully show coming soon/contact states.

Full subscriptions, credits, webhooks, and entitlements are documented TODOs in `docs/payments.md`.

## Privacy and Terms

MVP pages live at `/privacy` and `/terms`. Review them before launch with your real contact email and storage setup.

## Disclaimer

Not affiliated with YouTube. The UI uses YouTube-like feed conventions for contextual preview without implying affiliation.
