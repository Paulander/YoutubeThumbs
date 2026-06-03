export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getDebugSummary } from "@/lib/db";

function isConfigured(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

export default async function AdminDebugPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  const token = process.env.ADMIN_DEBUG_TOKEN;
  const allowed = process.env.NODE_ENV !== "production" || (isConfigured(token) && params.token === token);

  if (!allowed) {
    notFound();
  }

  const summary = await getDebugSummary();
  const config = [
    { label: "App URL configured", value: isConfigured(process.env.NEXT_PUBLIC_APP_URL) },
    { label: "Analytics configured", value: isConfigured(process.env.NEXT_PUBLIC_POSTHOG_KEY) },
    { label: "Payment link configured", value: isConfigured(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_FOUNDING) },
    { label: "YouTube API configured", value: isConfigured(process.env.YOUTUBE_API_KEY) },
    { label: "Contact email configured", value: isConfigured(process.env.CONTACT_EMAIL) }
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Local/debug</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-ink">ThumbBattle admin debug</h1>
      <p className="mt-3 text-ink/62">Do not expose this page publicly without `ADMIN_DEBUG_TOKEN` protection.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-ink/55">Tests</p>
          <p className="mt-2 text-4xl font-black">{summary.counts.tests}</p>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-ink/55">Votes</p>
          <p className="mt-2 text-4xl font-black">{summary.counts.votes}</p>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-ink/55">Event counts</p>
          <p className="mt-2 text-sm font-bold text-ink/62">Not stored locally. PostHog is optional.</p>
        </div>
      </div>

      <section className="mt-8 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">Config status</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {config.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-md bg-paper px-3 py-2 text-sm font-bold">
              <span>{item.label}</span>
              <span className={item.value ? "text-mint" : "text-coral"}>{item.value ? "yes" : "no"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">Recent tests</h2>
          <div className="mt-4 grid gap-3">
            {summary.tests.map((test) => (
              <div key={test.id} className="rounded-md bg-paper p-3 text-sm">
                <p className="font-black">{test.title}</p>
                <p className="mt-1 text-ink/55">{test.variants.length} variants • {test.createdAt}</p>
              </div>
            ))}
            {summary.tests.length === 0 ? <p className="text-sm text-ink/55">No tests yet.</p> : null}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">Recent votes</h2>
          <div className="mt-4 grid gap-3">
            {summary.votes.map((vote) => (
              <div key={vote.id} className="rounded-md bg-paper p-3 text-sm">
                <p className="font-black">Variant {vote.variantId}</p>
                <p className="mt-1 text-ink/55">{vote.createdAt}</p>
              </div>
            ))}
            {summary.votes.length === 0 ? <p className="text-sm text-ink/55">No votes yet.</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
