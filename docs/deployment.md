# Deployment Guide

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. If that port is busy, Next.js will choose the next available port.

## Vercel Deployment

1. Push `main` to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js framework settings.
4. Add environment variables from `.env.example`.
5. Deploy.
6. Run the post-deploy smoke test below.

## Required Environment Variables

For a basic deploy, set:

- `NEXT_PUBLIC_APP_URL`: production URL, for example `https://thumbbattle.example.com`.
- `CONTACT_EMAIL`: public support/contact email.

## Optional Environment Variables

- `DATABASE_URL`: future durable database connection.
- `NEXT_PUBLIC_SUPABASE_URL`: future Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: future Supabase public key.
- `SUPABASE_SERVICE_ROLE_KEY`: future server-side Supabase service key. Never expose it client-side.
- `YOUTUBE_API_KEY`: optional YouTube Data API key. The app works without it.
- `NEXT_PUBLIC_POSTHOG_KEY`: optional PostHog project key.
- `NEXT_PUBLIC_POSTHOG_HOST`: optional PostHog host, defaults to `https://us.i.posthog.com`.
- `STRIPE_SECRET_KEY`: optional future Stripe server integration.
- `STRIPE_WEBHOOK_SECRET`: optional future webhook verification.
- `STRIPE_PRICE_PRO_MONTHLY`: future Pro monthly price ID.
- `STRIPE_PRICE_CREDITS_SMALL`: future small credit pack price ID.
- `STRIPE_PRICE_CREDITS_MEDIUM`: future medium credit pack price ID.
- `STRIPE_PRICE_CREDITS_LARGE`: future large credit pack price ID.
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING`: fastest MVP payment path.
- `RESEND_API_KEY`: optional future email sending.
- `ADMIN_DEBUG_TOKEN`: optional token for `/admin/debug` in production.

## Persistence Warning

The current app uses `.data/thumbbattle.json`. That file is not durable on Vercel serverless infrastructure. Use it for demos and early validation only. Before relying on long-lived saved tests, migrate test records and uploaded images to Supabase/Postgres plus object storage.

## DNS and Domain

1. Add the production domain in Vercel.
2. Follow Vercel's DNS instructions for your registrar.
3. Set `NEXT_PUBLIC_APP_URL` to the final HTTPS URL.
4. Re-deploy after changing environment variables.

## Post-Deploy Smoke Test

- Landing page loads at `/`.
- `/test` opens the app flow.
- Upload 2 thumbnails below 4 MB.
- Enter title and channel metadata.
- Switch desktop and mobile previews.
- Create a voting link.
- Open the public voting link in a private window.
- Submit a vote.
- Try voting again and confirm duplicate handling.
- Open creator results page.
- Visit `/pricing`, `/examples`, `/privacy`, `/terms`, `/sitemap.xml`, and `/robots.txt`.
- Confirm no secrets appear in rendered HTML or logs.
