import { NextResponse } from "next/server";
import { fetchCompetitorVideos } from "@/lib/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? undefined;
  const competitors = await fetchCompetitorVideos(keyword);

  return NextResponse.json({
    source: process.env.YOUTUBE_API_KEY ? "youtube-api" : "mock",
    competitors
  });
}
