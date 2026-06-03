export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { PageEvent } from "@/components/analytics/page-event";
import { ContextPreview } from "@/components/preview-shell";
import { getResultsForTest, getThumbnailTest } from "@/lib/db";

export default async function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = await getThumbnailTest(id);

  if (!test) {
    notFound();
  }

  const results = await getResultsForTest(test);
  const sharePath = `/vote/${test.shareId}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageEvent event="results_viewed" properties={{ variants: test.variants.length }} />
      <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Saved test</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-black tracking-tight text-ink">{test.title}</h1>
          <p className="mt-2 text-ink/62">
            {test.channelName} • {test.targetKeyword || "No keyword"}
          </p>
        </div>
        <Link href={sharePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-black text-white">
          Open public vote
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-8">
          {test.variants.map((variant) => (
            <section key={variant.id}>
              <h2 className="mb-3 text-lg font-black">{variant.name}</h2>
              <ContextPreview context="desktop-search" variant={variant} test={test} competitors={test.competitors} />
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-black">Vote results</h2>
          <div className="mt-4 grid gap-3">
            {test.variants.map((variant) => {
              const result = results.find((entry) => entry.variantId === variant.id);

              return (
                <div key={variant.id}>
                  <div className="flex justify-between gap-3 text-sm font-bold">
                    <span className="truncate">{variant.name}</span>
                    <span>{result?.percent ?? 0}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-black/8">
                    <div className="h-full rounded-full bg-cobalt" style={{ width: `${result?.percent ?? 0}%` }} />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-ink/55">{result?.votes ?? 0} votes</p>
                </div>
              );
            })}
          </div>
          <p className="mt-5 rounded-md bg-paper p-3 text-sm text-ink/65">
            Duplicate voting is lightly discouraged with browser localStorage. This is intentionally simple for the MVP.
          </p>
        </aside>
      </div>
    </main>
  );
}
