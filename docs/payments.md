# Payments

## Current State

Payments are scaffolded for launch, not enforced. The app remains usable without Stripe.

## Fastest MVP Path

Set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING` to a Stripe Payment Link. When present, pricing CTAs send users to that link and track `checkout_clicked`.

If it is not set, pricing buttons show a coming-soon/contact state.

## Future Stripe TODOs

- Add credit balance storage.
- Add Stripe Checkout session route for credit packs and Pro.
- Add webhook fulfillment using `STRIPE_WEBHOOK_SECRET`.
- Add Pro entitlement checks.
- Add customer portal link.
- Move billing records to durable storage.

## Manual Stripe Setup

1. Create products for credit packs and Pro.
2. Create a founding creator Payment Link if using the fast path.
3. Add the public Payment Link to Vercel as `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING`.
4. Keep secret keys server-side only.
