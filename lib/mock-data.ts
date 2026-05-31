import type { CompetitorVideo } from "./types";

const colors = [
  ["#ef5b45", "#15161a"],
  ["#57c7a3", "#265dff"],
  ["#f2b84b", "#513c17"],
  ["#7c3aed", "#111827"],
  ["#06b6d4", "#0f172a"],
  ["#f97316", "#1f2937"]
];

function svgThumbnail(index: number, label: string) {
  const [start, end] = colors[index % colors.length];
  const safeLabel = label.replace(/[<>&"]/g, "");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${start}" />
        <stop offset="1" stop-color="${end}" />
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#g)" />
    <circle cx="1040" cy="150" r="190" fill="rgba(255,255,255,0.20)" />
    <rect x="72" y="88" width="510" height="548" rx="42" fill="rgba(255,255,255,0.16)" />
    <circle cx="326" cy="264" r="118" fill="rgba(255,255,255,0.82)" />
    <path d="M170 608c35-118 115-178 238-178s205 60 246 178" fill="rgba(255,255,255,0.82)" />
    <rect x="650" y="150" width="480" height="80" rx="18" fill="rgba(255,255,255,0.88)" />
    <rect x="650" y="276" width="390" height="62" rx="18" fill="rgba(255,255,255,0.72)" />
    <rect x="650" y="382" width="458" height="62" rx="18" fill="rgba(255,255,255,0.72)" />
    <text x="650" y="560" fill="white" font-size="56" font-weight="900" font-family="Arial, sans-serif">${safeLabel}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getMockCompetitors(keyword = "creator growth"): CompetitorVideo[] {
  const niche = keyword.trim() || "creator growth";

  return [
    {
      id: "mock-1",
      title: `I Tested 27 ${niche} Ideas So You Do Not Have To`,
      channelName: "Creator Lab",
      imageUrl: "/mock/creator-lab-thumbnail.png",
      views: "482K views",
      publishedAt: "2 weeks ago",
      duration: "12:44"
    },
    {
      id: "mock-2",
      title: `The Simple ${niche} Framework That Changed My Channel`,
      channelName: "Signal Studio",
      imageUrl: svgThumbnail(1, "FRAMEWORK"),
      views: "218K views",
      publishedAt: "5 days ago",
      duration: "9:18"
    },
    {
      id: "mock-3",
      title: `Why Most Creators Get ${niche} Completely Wrong`,
      channelName: "Clickcraft",
      imageUrl: svgThumbnail(2, "MISTAKES"),
      views: "91K views",
      publishedAt: "1 month ago",
      duration: "15:02"
    },
    {
      id: "mock-4",
      title: `I Spent $500 Testing Thumbnails for ${niche}`,
      channelName: "A/B Room",
      imageUrl: svgThumbnail(3, "TESTED"),
      views: "744K views",
      publishedAt: "3 weeks ago",
      duration: "18:37"
    },
    {
      id: "mock-5",
      title: `${niche}: The Before and After Nobody Shows You`,
      channelName: "Retention House",
      imageUrl: svgThumbnail(4, "BEFORE"),
      views: "63K views",
      publishedAt: "Yesterday",
      duration: "7:55"
    }
  ];
}

export const inspirationExamples = [
  {
    niche: "gaming",
    title: "Boss Fight Reveal",
    pattern: "Huge character silhouette, one clear emotion, high contrast hazard color.",
    imageUrl: svgThumbnail(5, "BOSS")
  },
  {
    niche: "finance",
    title: "Portfolio Reset",
    pattern: "Simple number cue, credible face, one visual metaphor for risk.",
    imageUrl: svgThumbnail(2, "$10K")
  },
  {
    niche: "fitness",
    title: "30-Day Change",
    pattern: "Before/after structure, bright background, body shape readable at phone size.",
    imageUrl: svgThumbnail(1, "30 DAYS")
  },
  {
    niche: "tech",
    title: "New Tool Breakdown",
    pattern: "Product UI crop, strong arrow cue, promise in the title instead of crowded text.",
    imageUrl: svgThumbnail(3, "TOOL")
  },
  {
    niche: "lifestyle",
    title: "Room Reset",
    pattern: "Warm human scene, strong depth, one aspirational outcome.",
    imageUrl: svgThumbnail(0, "RESET")
  }
];
