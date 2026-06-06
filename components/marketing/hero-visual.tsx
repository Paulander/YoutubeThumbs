"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const heroVariants = [
  {
    id: "context-lab",
    src: "/mock/creator-lab-thumbnail.png",
    alt: "Creator thumbnail testing workspace"
  },
  {
    id: "thumbnail-battle",
    src: "/mock/thumbbattle-hero-alt.png",
    alt: "ThumbBattle thumbnail preview and voting concept"
  }
];

const storageKey = "thumbbattle.hero_variant";

function pickVariant() {
  if (typeof window === "undefined") {
    return heroVariants[0];
  }

  const existing = window.localStorage.getItem(storageKey);
  const matched = heroVariants.find((variant) => variant.id === existing);
  if (matched) {
    return matched;
  }

  const selected = heroVariants[Math.floor(Math.random() * heroVariants.length)];
  window.localStorage.setItem(storageKey, selected.id);
  return selected;
}

export function HeroVisual() {
  const [variant, setVariant] = useState(heroVariants[0]);

  useEffect(() => {
    const selected = pickVariant();
    const timeout = window.setTimeout(() => setVariant(selected), 0);
    void trackEvent("hero_variant_viewed", { variant: selected.id });

    return () => window.clearTimeout(timeout);
  }, []);

  const caption = useMemo(
    () => (variant.id === "thumbnail-battle" ? "Compare the packaging before it goes live." : "Find the click before the upload."),
    [variant.id]
  );

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-black/10 bg-ink shadow-soft">
      <Image
        src={variant.src}
        alt={variant.alt}
        fill
        priority
        className="object-cover opacity-90"
        sizes="(max-width: 1024px) 92vw, 48vw"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/28 to-transparent p-6 text-white">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-white/75">Thumbnail mockup tool</p>
        <h2 className="mt-2 max-w-md text-3xl font-black tracking-tight">{caption}</h2>
      </div>
    </div>
  );
}
