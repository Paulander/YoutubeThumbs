# ThumbBattle Launch Audit

## Current State

ThumbBattle is a Next.js App Router MVP with TypeScript, Tailwind CSS, local JSON persistence, and a no-signup creator flow. The core positioning is: preview your YouTube thumbnail in context before you publish.

## Working User Flow

1. Creator opens `/test` or `/create`.
2. Creator uploads 1-4 thumbnail variants.
3. Creator enters a title, channel name, optional keyword, and mock metadata.
4. App renders desktop search, desktop feed, home grid, and mobile feed contexts.
5. Creator creates a test and gets a public voting link.
6. Public voter opens `/vote/[shareId]`, votes without login, and can leave an optional comment.
7. Creator opens `/test/[id]` to view preview snapshots and vote results.

## Stack

- Framework: Next.js App Router.
- Package manager: npm.
- Styling: Tailwind CSS.
- Persistence: `.data/thumbbattle.json` through `lib/db.ts`.
- Auth: none. Anonymous session IDs live in localStorage.
- Payments: payment-link scaffold only.
- Analytics: no-op by default, optional PostHog client capture.
- YouTube API: optional adapter, mock feed data by default.

## Launch Gaps Addressed

- Added Vercel deployment docs and launch checklist.
- Added SEO pages, privacy, terms, sitemap, robots, and canonical metadata.
- Added PostHog/no-op analytics abstraction and UTM capture.
- Added payment-link scaffolding without requiring Stripe for the MVP.
- Added outreach assets for manual first-batch outreach.
- Added local/protected debug page for recent tests and config status.

## Known Limitations

- Local JSON persistence is not durable on Vercel serverless deployments. It is acceptable for demos and local testing, but launch traffic should move to Supabase, Postgres, or another durable store before relying on long-lived project history.
- Uploaded thumbnails are currently stored as data URLs inside the JSON record. This keeps the MVP simple, but production should move uploads to object storage.
- Duplicate voting prevention is intentionally casual and browser-based. It is not anti-fraud.
- This product does not run official YouTube traffic-split A/B tests and should not be positioned that way.
