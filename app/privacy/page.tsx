import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ThumbBattle MVP privacy policy.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink/55">Last updated: June 3, 2026</p>
      <div className="mt-8 grid gap-6 text-sm leading-7 text-ink/70">
        <p>ThumbBattle is an MVP for previewing and voting on YouTube thumbnail variants before publishing.</p>
        <p>For the current local-first implementation, uploaded thumbnails are stored as data URLs in the app&apos;s local JSON data file. On Vercel, this storage is not durable and should be replaced with durable database and object storage before relying on long-term history.</p>
        <p>The app may store anonymous session and voter IDs in localStorage to support saved tests and casual duplicate-vote prevention.</p>
        <p>If PostHog analytics is configured, the app may record product events such as page views, test creation, vote link creation, and vote submission. Do not send secrets or raw uploaded image data to analytics.</p>
        <p>If you contact us, we use your email address only to respond. Contact: {process.env.CONTACT_EMAIL || "hello@example.com"}.</p>
        <p>Not affiliated with YouTube.</p>
      </div>
    </main>
  );
}
