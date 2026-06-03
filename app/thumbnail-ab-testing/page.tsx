import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thumbnail A/B Testing Before Publishing",
  description: "Use ThumbBattle for pre-publish thumbnail voting and previewing. It is not official YouTube traffic-split A/B testing.",
  alternates: { canonical: "/thumbnail-ab-testing" }
};

export default function ThumbnailAbTestingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Careful A/B testing copy</p>
      <h1 className="mt-3 text-5xl font-black tracking-tight text-ink">Pre-publish thumbnail A/B voting, not official YouTube split testing</h1>
      <p className="mt-5 text-lg leading-8 text-ink/68">
        ThumbBattle lets you compare thumbnail variants before publishing by previewing them in context and collecting votes from people you trust. It does not split real YouTube traffic, change live thumbnails, or claim statistical certainty.
      </p>
      <div className="mt-8 rounded-lg border border-black/10 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-black">Use it for</h2>
        <ul className="mt-4 grid gap-3 text-ink/68">
          <li>Choosing between 2-4 thumbnail directions.</li>
          <li>Getting client or community feedback through one link.</li>
          <li>Checking whether a title and thumbnail work together at feed size.</li>
        </ul>
      </div>
      <Link href="/test" className="mt-8 inline-flex min-h-11 items-center rounded-md bg-ink px-5 py-3 text-sm font-black text-white">Create a voting link</Link>
    </main>
  );
}
