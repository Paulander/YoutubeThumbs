# Analytics

Analytics is optional. If `NEXT_PUBLIC_POSTHOG_KEY` is missing, all event calls are no-ops and the app keeps working.

## Provider

- `lib/analytics.ts` contains the client-side abstraction.
- PostHog capture is sent to `NEXT_PUBLIC_POSTHOG_HOST` or `https://us.i.posthog.com`.
- No PostHog dependency is required for the MVP scaffold.

## UTM Capture

The first visit stores these values in localStorage:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_segment`
- `landing_path`
- `first_seen_at`

The values are attached to key events and to test creation requests as `attribution`.

## Tracked Events

- `landing_view`
- `cta_clicked`
- `thumbnail_uploaded`
- `test_created`
- `vote_link_created`
- `vote_submitted`
- `results_viewed`
- `pricing_viewed`
- `checkout_clicked`
- `outbound_email_link_clicked`

## Privacy Note

Do not send secrets or raw uploaded images to analytics. Keep event properties small and operational.
