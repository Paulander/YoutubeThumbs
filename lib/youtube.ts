import type { CompetitorVideo } from "./types";
import { getMockCompetitors } from "./mock-data";

type YouTubeSearchItem = {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
};

export async function fetchCompetitorVideos(keyword?: string): Promise<CompetitorVideo[]> {
  const query = keyword?.trim();
  const key = process.env.YOUTUBE_API_KEY;

  if (!key || !query) {
    return getMockCompetitors(query);
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "5");
  url.searchParams.set("q", query);
  url.searchParams.set("key", key);

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 30 } });

    if (!response.ok) {
      return getMockCompetitors(query);
    }

    const data = (await response.json()) as { items?: YouTubeSearchItem[] };

    return (data.items ?? []).map((item, index) => ({
      id: item.id?.videoId ?? `yt-${index}`,
      title: item.snippet?.title ?? `Top result for ${query}`,
      channelName: item.snippet?.channelTitle ?? "YouTube creator",
      imageUrl:
        item.snippet?.thumbnails?.high?.url ??
        item.snippet?.thumbnails?.medium?.url ??
        item.snippet?.thumbnails?.default?.url ??
        getMockCompetitors(query)[index]?.imageUrl ??
        "/mock/creator-lab-thumbnail.png",
      views: "Competitive result",
      publishedAt: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt).toLocaleDateString() : "Recent",
      duration: "--:--"
    }));
  } catch {
    return getMockCompetitors(query);
  }
}
