import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, CheckCircle2, MousePointerClick, Share2 } from "lucide-react";
import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TestWorkbench } from "@/components/test-workbench";

const proof = [
  {
    icon: MousePointerClick,
    title: "Preview in context",
    body: "Judge thumbnails at realistic feed size with title truncation, metadata, and competing-looking cards."
  },
  {
    icon: Share2,
    title: "Share a vote link",
    body: "Send options to clients, teammates, Discord communities, or trusted viewers before publishing."
  },
  {
    icon: BarChart3,
    title: "Pick the strongest version",
    body: "See votes, percentages, comments, and a current winner without pretending it is official split testing."
  }
];

const faqs = [
  {
    question: "Is this official YouTube A/B testing?",
    answer: "No. ThumbBattle is for pre-publish previewing and voting. It does not split real YouTube traffic or modify live videos."
  },
  {
    question: "Do I need a YouTube API key?",
    answer: "No. The core flow uses mock competitor/feed data. A YouTube API key can be added later for optional competitor lookup."
  },
  {
    question: "Do voters need accounts?",
    answer: "No. Public voting links work without login, with simple localStorage duplicate-vote prevention."
  }
];

export default function HomePage() {
  return (
    <main>
      <PageEvent event="landing_view" />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-6 pt-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pt-14">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-coral">No signup required</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Preview your YouTube thumbnail in context before you publish.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68">
            Upload thumbnail variants, see them in a realistic YouTube-style feed, and share a voting link to pick the strongest version. Built for pre-publish decisions, not overclaimed statistical testing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackedLink
              href="/test"
              event="cta_clicked"
              eventProperties={{ cta: "hero_test_thumbnail" }}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-black text-white hover:bg-black"
            >
              Test a thumbnail
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <Link
              href="/examples"
              className="inline-flex min-h-11 items-center rounded-md border border-black/12 bg-white px-5 py-3 text-sm font-black text-ink hover:bg-black/5"
            >
              See examples
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">How it works</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">A fast pre-publish loop</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Upload 2-4 thumbnail variants", "Preview desktop and mobile feed contexts", "Share a voting link and review results"].map((step, index) => (
            <div key={step} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-cobalt text-sm font-black text-white">{index + 1}</span>
              <p className="mt-4 font-black">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="test">
        <TestWorkbench compact />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Pricing teaser</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Free to start, paid plans ready for launch.</h2>
            <p className="mt-2 text-ink/65">Use the local MVP without payment. Pricing surfaces support credits, Pro, and an optional founding creator Payment Link.</p>
            <Link href="/pricing" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-coral px-5 py-3 text-sm font-black text-white">View pricing</Link>
          </div>
          <div className="rounded-lg border border-black/10 bg-paper p-6">
            <h2 className="text-xl font-black">FAQ</h2>
            <div className="mt-4 grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <p className="flex items-center gap-2 font-black"><CheckCircle2 className="h-4 w-4 text-mint" />{faq.question}</p>
                  <p className="mt-1 text-sm leading-6 text-ink/62">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
