"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, MessageSquare, Trophy } from "lucide-react";
import type { ThumbnailTest, VoteResult } from "@/lib/types";
import { calculateVoteResults, getWinner, makeId } from "@/lib/utils";
import { Button } from "./ui";
import { VideoThumb } from "./video-card";

function voterKey(shareId: string) {
  const key = `thumbbattle.voter.${shareId}`;
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const created = makeId("voter");
  window.localStorage.setItem(key, created);
  return created;
}

export function VoteClient({
  test,
  initialResults
}: {
  test: ThumbnailTest;
  initialResults: VoteResult[];
}) {
  const [results, setResults] = useState(initialResults);
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const winner = useMemo(() => getWinner(results), [results]);

  async function submitVote(variantId: string) {
    setSelected(variantId);
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shareId: test.shareId,
          variantId,
          voterKey: voterKey(test.shareId),
          comment
        })
      });

      const data = (await response.json()) as { results?: VoteResult[]; duplicate?: boolean; error?: string };

      if (!response.ok || !data.results) {
        throw new Error(data.error ?? "Could not save vote.");
      }

      setResults(data.results);
      setMessage(data.duplicate ? "You already voted on this link, so the original vote is still counted." : "Vote counted.");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Could not save vote.");
    } finally {
      setSubmitting(false);
    }
  }

  function resultFor(variantId: string) {
    return results.find((result) => result.variantId === variantId) ?? calculateVoteResults([variantId], [])[0];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Public vote</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-ink">{test.title}</h1>
        <p className="mt-3 text-ink/65">Pick the thumbnail you would be most likely to click in a feed.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {test.variants.map((variant, index) => {
          const result = resultFor(variant.id);
          const isWinner = winner?.variantId === variant.id && winner.votes > 0;

          return (
            <article key={variant.id} className="rounded-lg border border-black/10 bg-white p-3 shadow-soft">
              <VideoThumb item={{ imageUrl: variant.imageUrl, title: variant.name, duration: `V${index + 1}`, isUser: true }} priority={index === 0} />
              <div className="mt-3 flex items-center justify-between gap-3">
                <h2 className="truncate text-sm font-black">{variant.name}</h2>
                {isWinner ? <Trophy className="h-4 w-4 text-gold" aria-label="Current winner" /> : null}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/8">
                <div className="h-full bg-cobalt" style={{ width: `${result.percent}%` }} />
              </div>
              <p className="mt-2 text-sm font-bold text-ink/62">
                {result.votes} votes • {result.percent}%
              </p>
              <Button className="mt-3 w-full" onClick={() => submitVote(variant.id)} disabled={submitting}>
                {submitting && selected === variant.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Vote
              </Button>
            </article>
          );
        })}
      </div>

      <label className="mt-6 grid max-w-2xl gap-2 text-sm font-bold">
        <span className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Optional comment
        </span>
        <textarea
          className="min-h-[96px] rounded-md border border-black/12 bg-white px-3 py-2 text-sm shadow-sm"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="What made one thumbnail stand out?"
        />
      </label>

      {message ? <p className="mt-4 rounded-md bg-mint/10 px-3 py-2 text-sm font-bold text-ink">{message}</p> : null}
    </div>
  );
}
