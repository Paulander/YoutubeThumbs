import type { Metadata } from "next";
import { exampleBattles, getExampleImageById } from "@/lib/example-images";
import { VideoThumb } from "@/components/video-card";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thumbnail Battle Examples",
  description: "Realistic mocked thumbnail preview examples by niche for AI, fitness, finance, gaming, travel, and education creators.",
  alternates: { canonical: "/examples" }
};

export default function ExamplesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Examples"
        title="Mock thumbnail battles by niche"
        body="These are seeded examples from the public Supabase examples bucket. They are tagged in code, so images can be reused across niches without duplicating front-end logic."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {exampleBattles.map((example) => {
          const images = example.imageIds.map((id) => getExampleImageById(id)).filter(Boolean);

          return (
            <article key={example.niche} className="rounded-lg border border-black/10 bg-white p-4 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-coral">{example.niche}</p>
              <h2 className="mt-2 text-xl font-black">{example.title}</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {images.map((item, index) => (
                  <div key={item!.id}>
                    <VideoThumb item={{ imageUrl: item!.imageUrl, title: item!.title, duration: `Option ${index + 1}`, isUser: true }} />
                    <p className="mt-2 text-sm font-bold text-ink/70">{item!.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/62">{example.note}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
