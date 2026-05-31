import { Check } from "lucide-react";
import { SectionTitle } from "@/components/ui";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For quick thumbnail sanity checks.",
    features: ["5 tests/month", "Desktop preview only", "Short-lived local project history"]
  },
  {
    name: "Creator Pro",
    price: "$10-12/mo",
    description: "For creators and thumbnail designers running repeat tests.",
    features: ["Unlimited previews", "Mobile and desktop contexts", "Voting links", "Inspiration library"]
  },
  {
    name: "Credit Pack",
    price: "$15",
    description: "For teams that prefer usage-based testing.",
    features: ["50 tests", "Never expires", "No subscription required"]
  }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Pricing teaser"
        title="Monetization is scaffolded, not enforced locally"
        body="Stripe keys are optional. The MVP is usable without payment, while upgrade surfaces and TODOs are ready for production billing."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">{plan.name}</h2>
            <p className="mt-3 text-4xl font-black tracking-tight">{plan.price}</p>
            <p className="mt-3 min-h-12 text-sm leading-6 text-ink/62">{plan.description}</p>
            <ul className="mt-5 grid gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm font-bold text-ink/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-black/10 bg-paper p-5 text-sm leading-6 text-ink/68">
        Stripe TODO: create checkout sessions when <code>STRIPE_SECRET_KEY</code>, <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>,
        and <code>STRIPE_PRICE_CREATOR_PRO</code> are present. Local testing remains free.
      </div>
    </main>
  );
}
