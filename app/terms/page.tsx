import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "ThumbBattle MVP terms of use.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight text-ink">Terms of Use</h1>
      <p className="mt-4 text-sm text-ink/55">Last updated: June 3, 2026</p>
      <div className="mt-8 grid gap-6 text-sm leading-7 text-ink/70">
        <p>ThumbBattle is provided as an MVP tool for thumbnail previewing and pre-publish voting. Use it responsibly and only upload images you have the right to use.</p>
        <p>ThumbBattle does not provide official YouTube traffic-split A/B testing, guaranteed click-through-rate improvement, or publishing automation.</p>
        <p>The current MVP may use local-first storage and optional third-party services for analytics or payments when configured. Availability and saved history are not guaranteed until durable storage is connected.</p>
        <p>You may not use ThumbBattle to upload illegal, infringing, deceptive, or harmful content.</p>
        <p>Not affiliated with YouTube. YouTube is a trademark of its respective owner.</p>
        <p>Contact: {process.env.CONTACT_EMAIL || "hello@example.com"}.</p>
      </div>
    </main>
  );
}
