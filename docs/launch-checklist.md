# Launch Checklist

## Before Deploy

- Confirm `npm run lint`, `npm run test`, and `npm run build` pass.
- Confirm `.env.local` contains no values that should be committed.
- Set `NEXT_PUBLIC_APP_URL` and `CONTACT_EMAIL` in Vercel.
- Decide whether to set `NEXT_PUBLIC_POSTHOG_KEY`.
- Decide whether to set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING`.
- Confirm the landing page says "Not affiliated with YouTube."
- Confirm copy avoids promising official YouTube traffic-split A/B testing.

## Vercel

- Import GitHub repo.
- Add environment variables.
- Deploy from `main`.
- Attach custom domain if ready.
- Run the smoke test in `docs/deployment.md`.

## First Outreach Batch

- Create a suppression list before sending.
- Fill `docs/outreach/prospects_template.csv` manually.
- Start with 50 prospects.
- Use UTM links per segment.
- Send one follow-up only.
- Stop contacting anyone who opts out.

## What To Measure

- Landing page conversion to `/test`.
- Test creation rate.
- Vote link creation rate.
- Vote submission rate.
- Replies from creators/designers.
- Qualitative objections: storage trust, pricing, upload friction, preview realism.

## After First 50 Sends

- Review replies and analytics.
- Fix obvious friction before scaling.
- If signals are positive, send 100 more.
- Consider durable storage before paid traffic.
