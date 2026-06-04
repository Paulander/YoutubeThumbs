"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { inspirationExamples } from "@/lib/example-images";
import { VideoThumb } from "./video-card";

export function InspirationLibrary() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const examples = useMemo(
    () =>
      inspirationExamples.filter((example) =>
        [example.niche, example.title, example.pattern, example.path, ...example.tags].join(" ").toLowerCase().includes(normalized)
      ),
    [normalized]
  );

  return (
    <>
      <label className="mt-6 flex max-w-xl items-center gap-3 rounded-md border border-black/12 bg-white px-3 py-2 shadow-sm">
        <Search className="h-4 w-4 text-ink/45" aria-hidden />
        <input
          className="min-h-8 w-full bg-transparent text-sm outline-none"
          placeholder="Search gaming, finance, fitness, tech, lifestyle"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <article key={`${example.niche}-${example.title}`} className="rounded-lg border border-black/10 bg-white p-3 shadow-soft">
            <VideoThumb item={{ imageUrl: example.imageUrl, title: example.title, duration: example.niche }} />
            <div className="p-2">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-coral">{example.niche}</p>
              <h2 className="mt-2 text-lg font-black">{example.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/62">{example.pattern}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {example.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded bg-black/5 px-2 py-1 text-[11px] font-bold text-ink/55">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {examples.length === 0 ? <p className="mt-8 rounded-md bg-white p-4 text-sm font-bold text-ink/62">No mock examples match that search.</p> : null}
    </>
  );
}
