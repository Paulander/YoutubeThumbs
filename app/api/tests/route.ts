export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createThumbnailTest, listThumbnailTests } from "@/lib/db";
import { fetchCompetitorVideos } from "@/lib/youtube";
import type { Attribution, CompetitorVideo, ThumbnailVariant } from "@/lib/types";
import { makeId } from "@/lib/utils";

type CreateTestBody = {
  sessionId?: string;
  title?: string;
  channelName?: string;
  targetKeyword?: string;
  viewCount?: string;
  publishedAt?: string;
  variants?: ThumbnailVariant[];
  competitors?: CompetitorVideo[];
  attribution?: Attribution;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId") ?? undefined;
  const tests = await listThumbnailTests(sessionId);
  return NextResponse.json({ tests });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateTestBody;
  const title = body.title?.trim();
  const channelName = body.channelName?.trim();
  const variants = (body.variants ?? []).slice(0, 4).filter((variant) => variant.imageUrl && variant.name);

  if (!title || !channelName) {
    return NextResponse.json({ error: "Title and channel name are required." }, { status: 400 });
  }

  if (variants.length === 0) {
    return NextResponse.json({ error: "At least one thumbnail variant is required." }, { status: 400 });
  }

  const competitors = body.competitors?.length ? body.competitors.slice(0, 5) : await fetchCompetitorVideos(body.targetKeyword);

  const test = await createThumbnailTest({
    id: makeId("test"),
    shareId: makeId("share"),
    sessionId: body.sessionId || makeId("session"),
    title,
    channelName,
    targetKeyword: body.targetKeyword?.trim(),
    viewCount: body.viewCount?.trim() || "New upload",
    publishedAt: body.publishedAt?.trim() || "Just now",
    variants,
    competitors,
    attribution: body.attribution,
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ test }, { status: 201 });
}
