import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { PaymentCta } from "@/components/marketing/payment-cta";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ThumbBattle pricing for free tests, credits, Pro, and a founding creator offer when configured.",
  alternates: { canonical: "/pricing" }
};

const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING;
const contactEmail = process.env.CONTACT_EMAIL || "hello@example.com";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For trying the workflow before launch.",
    features: ["3 tests/month", "Desktop and mobile preview", "Voting links during MVP"]
  },
  {
    name: "Credits",
    price: "$9+",
    description: "For creators who test in batches.",
    features: ["$9 for 20 tests", "$19 for 60 tests", "$39 for 150 tests"],
    disabled: true
  },
  {
    name: "Pro",
    price: "$9/mo",
    description: "For repeat creators and thumbnail designers.",
    features: ["Unlimited previews", "$79/year planned", "Client voting links", "Inspiration library"],
    disabled: true
  },
  {
    name: "Founding Creator",
    price: "$19 lifetime",
    description: "Fast MVP payment-link offer if configured.",
    features: ["100 tests", "Early feedback channel", "No subscription"],
    founding: true
  }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageEvent event="pricing_viewed" />
      <SectionTitle
        eyebrow="Pricing"
        title="Start free, upgrade when payment links are configured"
        body="The MVP does not require payment locally. The fastest launch path is a Stripe Payment Link for the founding creator offer."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-4">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">{plan.name}</h2>
            <p className="mt-3 text-4xl font-black tracking-tight">{plan.price}</p>
            <p className="mt-3 min-h-16 text-sm leading-6 text-ink/62">{plan.description}</p>
            <ul className="mt-5 grid gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm font-bold text-ink/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                  {feature}
                </li>
              ))}
            </ul>
            {plan.founding ? (
              <PaymentCta href={paymentLink} label="Get founding access" plan="founding_creator" />
            ) : plan.disabled ? (
              <button disabled className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-black/12 bg-black/5 px-4 py-3 text-sm font-black text-ink/45">Coming soon</button>
            ) : (
              <Link href="/test" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ink px-4 py-3 text-sm font-black text-white">Start free</Link>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-black/10 bg-paper p-5 text-sm leading-6 text-ink/68">
        Full Stripe subscriptions, credit balance, webhook fulfillment, Pro entitlement, and customer portal are documented TODOs. For manual setup or early access questions, contact <a className="font-bold text-cobalt" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </div>
    </main>
  );
}
