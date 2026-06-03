import type { Metadata } from "next";
import { getMockCompetitors } from "@/lib/mock-data";
import { VideoThumb } from "@/components/video-card";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thumbnail Battle Examples",
  description: "Realistic mocked thumbnail preview examples by niche for AI, fitness, finance, gaming, and education creators.",
  alternates: { canonical: "/examples" }
};

const examples = [
  { niche: "AI/tech", title: "I Replaced My Editing Workflow With AI", keyword: "AI creator tools" },
  { niche: "fitness", title: "The 20-Minute Routine I Actually Stuck With", keyword: "fitness routine" },
  { niche: "finance", title: "I Audited My Budget After 90 Days", keyword: "personal finance" },
  { niche: "gaming guide", title: "The Build That Finally Beat Ranked", keyword: "gaming guide" },
  { niche: "education/productivity", title: "How I Plan a Week in 12 Minutes", keyword: "productivity system" }
];

export default function ExamplesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Examples"
        title="Mock thumbnail battles by niche"
        body="These are seeded examples to show how ThumbBattle frames a pre-publish decision in context. They do not use scraped YouTube data."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {examples.map((example) => {
          const competitors = getMockCompetitors(example.keyword);
          return (
            <article key={example.niche} className="rounded-lg border border-black/10 bg-white p-4 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-coral">{example.niche}</p>
              <h2 className="mt-2 text-xl font-black">{example.title}</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {competitors.slice(0, 2).map((item, index) => (
                  <div key={item.id}>
                    <VideoThumb item={{ ...item, duration: `Option ${index + 1}`, isUser: true }} />
                    <p className="mt-2 text-sm font-bold text-ink/70">Variant {index + 1}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/62">Use this kind of battle to check readability, contrast, emotion, and title fit before publishing.</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
