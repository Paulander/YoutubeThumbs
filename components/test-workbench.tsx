"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, ImagePlus, Loader2, Moon, Send, Sun, UploadCloud } from "lucide-react";
import type { CompetitorVideo, PreviewContext, ThumbnailTest, ThumbnailVariant } from "@/lib/types";
import { formatKeyword, makeId } from "@/lib/utils";
import { getMockCompetitors } from "@/lib/mock-data";
import { Button, Field, inputClass } from "./ui";
import { ContextPreview, PreviewTabs } from "./preview-shell";
import { VideoThumb } from "./video-card";

const maxFileSize = 4 * 1024 * 1024;

function getSessionId() {
  const key = "thumbbattle.session";
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const created = makeId("session");
  window.localStorage.setItem(key, created);
  return created;
}

async function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function TestWorkbench({ compact = false }: { compact?: boolean }) {
  const [title, setTitle] = useState("I Tested 100 Thumbnail Ideas: This One Won");
  const [channelName, setChannelName] = useState("Your Channel");
  const [targetKeyword, setTargetKeyword] = useState("YouTube growth");
  const [viewCount, setViewCount] = useState("12K views");
  const [publishedAt, setPublishedAt] = useState("2 hours ago");
  const [variants, setVariants] = useState<ThumbnailVariant[]>([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [context, setContext] = useState<PreviewContext>("desktop-search");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [competitors, setCompetitors] = useState<CompetitorVideo[]>(() => getMockCompetitors(targetKeyword));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedTest, setSavedTest] = useState<ThumbnailTest | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      const response = await fetch(`/api/youtube?keyword=${encodeURIComponent(targetKeyword)}`);
      const data = (await response.json()) as { competitors: CompetitorVideo[] };
      setCompetitors(data.competitors);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [targetKeyword]);

  const fallbackVariant = useMemo<ThumbnailVariant>(
    () => ({
      id: "sample",
      name: "Sample variant",
      imageUrl: "/mock/creator-lab-thumbnail.png"
    }),
    []
  );

  const selectedVariant = variants[activeVariant] ?? fallbackVariant;
  const shareUrl = savedTest ? `${window.location.origin}/vote/${savedTest.shareId}` : "";

  async function handleUpload(files: FileList | null) {
    setError("");

    if (!files?.length) {
      return;
    }

    const remainingSlots = 4 - variants.length;
    const nextFiles = Array.from(files).slice(0, remainingSlots);

    if (nextFiles.length === 0) {
      setError("You can compare up to 4 thumbnail variants per test.");
      return;
    }

    const oversized = nextFiles.find((file) => file.size > maxFileSize);

    if (oversized) {
      setError(`${oversized.name} is larger than 4MB. Export a smaller JPG or PNG and try again.`);
      return;
    }

    const uploaded = await Promise.all(
      nextFiles.map(async (file, index) => ({
        id: makeId("variant"),
        name: file.name.replace(/\.[^.]+$/, "") || `Variant ${variants.length + index + 1}`,
        imageUrl: await readFileAsDataUrl(file)
      }))
    );

    setVariants((current) => [...current, ...uploaded]);
    setActiveVariant(variants.length);
  }

  async function createTest() {
    setError("");

    if (!title.trim() || !channelName.trim()) {
      setError("Add a title and channel name before creating a test.");
      return;
    }

    if (variants.length === 0) {
      setError("Upload at least one thumbnail variant before creating a test.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          title,
          channelName,
          targetKeyword,
          viewCount,
          publishedAt,
          variants,
          competitors
        })
      });

      if (!response.ok) {
        throw new Error("Could not create test.");
      }

      const data = (await response.json()) as { test: ThumbnailTest };
      setSavedTest(data.test);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create test.");
    } finally {
      setSaving(false);
    }
  }

  async function copyShareUrl() {
    if (!shareUrl) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section className={compact ? "mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" : "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"}>
      <div className="grid gap-6 lg:grid-cols-[430px_1fr]">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Create test</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Thumbnail mockup</h2>
            </div>
            <ImagePlus className="h-6 w-6 text-cobalt" aria-hidden />
          </div>

          <div className="grid gap-4">
            <Field label="Thumbnail variants" hint="Upload 1-4 JPG, PNG, or WebP files.">
              <div className="rounded-md border border-dashed border-black/20 bg-paper p-4 text-center">
                <UploadCloud className="mx-auto h-8 w-8 text-ink/45" aria-hidden />
                <p className="mt-2 text-sm font-semibold text-ink/70">Drop or choose thumbnail files</p>
                <input
                  className="mt-3 block w-full cursor-pointer rounded-md border border-black/10 bg-white text-sm file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={(event) => handleUpload(event.target.files)}
                />
              </div>
            </Field>

            {variants.length ? (
              <div className="grid grid-cols-2 gap-2">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setActiveVariant(index)}
                    className={`rounded-md border p-1 text-left transition ${
                      activeVariant === index ? "border-cobalt bg-cobalt/8" : "border-black/10 hover:border-black/25"
                    }`}
                  >
                    <VideoThumb item={{ ...variant, title: variant.name, duration: `V${index + 1}` }} />
                    <span className="mt-1 block truncate px-1 text-xs font-bold">{variant.name}</span>
                  </button>
                ))}
              </div>
            ) : null}

            <Field label="Video title">
              <textarea className={`${inputClass} min-h-[88px] resize-none`} value={title} onChange={(event) => setTitle(event.target.value)} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Channel">
                <input className={inputClass} value={channelName} onChange={(event) => setChannelName(event.target.value)} />
              </Field>
              <Field label="Target keyword">
                <input className={inputClass} value={targetKeyword} onChange={(event) => setTargetKeyword(event.target.value)} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Mock views">
                <input className={inputClass} value={viewCount} onChange={(event) => setViewCount(event.target.value)} />
              </Field>
              <Field label="Mock date">
                <input className={inputClass} value={publishedAt} onChange={(event) => setPublishedAt(event.target.value)} />
              </Field>
            </div>

            {error ? <p className="rounded-md bg-coral/10 px-3 py-2 text-sm font-semibold text-coral">{error}</p> : null}

            <Button onClick={createTest} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Create voting link
            </Button>

            {savedTest ? (
              <div className="rounded-md border border-mint/35 bg-mint/10 p-3">
                <p className="flex items-center gap-2 text-sm font-black text-ink">
                  <Check className="h-4 w-4 text-mint" /> Test saved
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/test/${savedTest.id}`}
                    className="inline-flex min-h-10 items-center rounded-md bg-ink px-3 py-2 text-sm font-bold text-white"
                  >
                    Open test
                  </Link>
                  <Button type="button" variant="secondary" onClick={copyShareUrl}>
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied" : "Copy vote link"}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PreviewTabs value={context} onChange={setContext} />
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-ink/62">Competitors: {formatKeyword(targetKeyword)}</span>
              <button
                type="button"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="grid h-10 w-10 place-items-center rounded-md border border-black/10 bg-white text-ink shadow-sm"
                title={theme === "light" ? "Switch to dark preview" : "Switch to light preview"}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <ContextPreview
            context={context}
            variant={selectedVariant}
            test={{ title, channelName, viewCount, publishedAt }}
            competitors={competitors}
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
}
