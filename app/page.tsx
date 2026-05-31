import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, MousePointerClick, Share2 } from "lucide-react";
import { TestWorkbench } from "@/components/test-workbench";

const proof = [
  {
    icon: MousePointerClick,
    title: "Judge at feed size",
    body: "See if the idea survives small images, crowded neighbors, title truncation, and metadata."
  },
  {
    icon: Share2,
    title: "Share voting links",
    body: "Send variants to clients, teammates, Discord communities, or beta audiences before publishing."
  },
  {
    icon: BarChart3,
    title: "Learn what wins",
    body: "Track votes, percentages, comments, and a current winner without overbuilding the MVP."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-6 pt-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pt-14">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">YouTube thumbnail preview</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Preview your YouTube thumbnail next to real competitors before you publish.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68">
            Isolated thumbnail design is misleading. ThumbBattle shows your thumbnail and title in realistic search,
            mobile, desktop, and home-feed contexts, then turns variants into a simple thumbnail A/B test.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#test"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-black text-white hover:bg-black"
            >
              Test a thumbnail
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-11 items-center rounded-md border border-black/12 bg-white px-5 py-3 text-sm font-black text-ink hover:bg-black/5"
            >
              See pricing
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proof.map((item) => (
              <div key={item.title} className="rounded-lg border border-black/10 bg-white/72 p-4">
                <item.icon className="h-5 w-5 text-cobalt" aria-hidden />
                <h2 className="mt-3 text-sm font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/62">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-black/10 bg-ink shadow-soft">
          <Image
            src="/mock/creator-lab-thumbnail.png"
            alt="Creator thumbnail testing workspace"
            fill
            priority
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 92vw, 48vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/28 to-transparent p-6 text-white">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-white/75">Thumbnail mockup tool</p>
            <h2 className="mt-2 max-w-md text-3xl font-black tracking-tight">Find the click before the upload.</h2>
          </div>
        </div>
      </section>

      <div id="test">
        <TestWorkbench compact />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-lg border border-black/10 bg-white p-6 shadow-soft md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Creator Pro is planned at $10-12/month.</h2>
            <p className="mt-2 text-ink/65">
              The local MVP keeps payment optional while the Stripe hooks are ready to connect.
            </p>
          </div>
          <Link href="/pricing" className="inline-flex min-h-11 items-center justify-center rounded-md bg-coral px-5 py-3 text-sm font-black text-white">
            View pricing teaser
          </Link>
        </div>
      </section>
    </main>
  );
}
