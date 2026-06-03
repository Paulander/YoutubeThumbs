import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Preview Tool",
  description: "Preview a YouTube thumbnail with title and feed context before you publish. No signup required for the MVP flow.",
  alternates: { canonical: "/youtube-thumbnail-preview" }
};

export default function YoutubeThumbnailPreviewPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">SEO guide</p>
      <h1 className="mt-3 text-5xl font-black tracking-tight text-ink">YouTube thumbnail preview in realistic context</h1>
      <p className="mt-5 text-lg leading-8 text-ink/68">
        ThumbBattle helps creators preview thumbnail variants with a video title, channel metadata, and surrounding feed cards before publishing. It is built for the moment before upload, when a creator needs to pick the strongest packaging.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Check small-size readability",
          "Compare variants against competing-looking cards",
          "Share a voting link for fast feedback"
        ].map((item) => (
          <div key={item} className="rounded-lg border border-black/10 bg-white p-5 font-bold shadow-soft">{item}</div>
        ))}
      </div>
      <p className="mt-8 text-sm leading-6 text-ink/60">Not affiliated with YouTube. Competitor cards use mock data unless an optional YouTube API key is configured.</p>
      <Link href="/test" className="mt-8 inline-flex min-h-11 items-center rounded-md bg-ink px-5 py-3 text-sm font-black text-white">Test a thumbnail</Link>
    </main>
  );
}
