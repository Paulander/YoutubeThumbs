import { clsx, type ClassValue } from "clsx";
import type { Vote, VoteResult } from "./types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function makeId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export function truncateTitle(title: string, max = 84) {
  if (title.length <= max) {
    return title;
  }

  return `${title.slice(0, max - 1).trimEnd()}...`;
}

export function formatKeyword(keyword?: string) {
  return keyword?.trim() || "creator growth";
}

export function calculateVoteResults(variantIds: string[], votes: Vote[]): VoteResult[] {
  const total = votes.length;

  return variantIds.map((variantId) => {
    const count = votes.filter((vote) => vote.variantId === variantId).length;

    return {
      variantId,
      votes: count,
      percent: total === 0 ? 0 : Math.round((count / total) * 100)
    };
  });
}

export function getWinner(results: VoteResult[]) {
  return [...results].sort((a, b) => b.votes - a.votes)[0];
}
