import type { CompetitorVideo, PreviewContext, ThumbnailTest, ThumbnailVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GridVideoCard, MobileVideoCard, SearchResultCard, variantToFeedItem, type FeedItem } from "./video-card";

const tabs: { id: PreviewContext; label: string }[] = [
  { id: "desktop-search", label: "Search" },
  { id: "home-grid", label: "Home" },
  { id: "mobile-feed", label: "Mobile" },
  { id: "desktop-feed", label: "Desktop" }
];

function buildFeedItems(test: Pick<ThumbnailTest, "title" | "channelName" | "viewCount" | "publishedAt">, variant: ThumbnailVariant, competitors: CompetitorVideo[]) {
  const userItem = variantToFeedItem(variant, test);
  const feed = [competitors[0], competitors[1], userItem, competitors[2], competitors[3], competitors[4]].filter(
    (item): item is FeedItem => Boolean(item)
  );
  return feed;
}

export function PreviewTabs({
  value,
  onChange
}: {
  value: PreviewContext;
  onChange: (value: PreviewContext) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-black/10 bg-white p-1 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "min-h-9 rounded px-3 text-sm font-bold transition",
            value === tab.id ? "bg-ink text-white" : "text-ink/62 hover:bg-black/5"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function ContextPreview({
  context,
  variant,
  test,
  competitors,
  theme = "light"
}: {
  context: PreviewContext;
  variant: ThumbnailVariant;
  test: Pick<ThumbnailTest, "title" | "channelName" | "viewCount" | "publishedAt">;
  competitors: CompetitorVideo[];
  theme?: "light" | "dark";
}) {
  const items = buildFeedItems(test, variant, competitors);
  const dark = theme === "dark";

  if (context === "mobile-feed") {
    return (
      <div className={cn("mx-auto w-full max-w-[390px] overflow-hidden rounded-[28px] border-8 shadow-soft", dark ? "border-zinc-800 bg-zinc-950 text-white" : "border-zinc-900 bg-white text-ink")}>
        <div className="flex h-12 items-center justify-between px-4 text-sm font-black">
          <span>Feed</span>
          <span className="h-2 w-16 rounded-full bg-current/18" />
        </div>
        <div className="grid gap-4 pb-3">
          {items.slice(0, 4).map((item) => (
            <MobileVideoCard key={`${item.id}-${item.variantId ?? ""}`} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (context === "home-grid") {
    return (
      <div className={cn("rounded-lg border p-4 shadow-soft", dark ? "border-white/10 bg-zinc-950 text-white" : "border-black/10 bg-white text-ink")}>
        <div className="mb-4 flex items-center gap-3">
          {["All", "Recently uploaded", "Watched", "For you"].map((label, index) => (
            <span key={label} className={cn("rounded-md px-3 py-1 text-xs font-bold", index === 0 ? "bg-current text-white mix-blend-difference" : "bg-current/8")}>
              {label}
            </span>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GridVideoCard key={`${item.id}-${item.variantId ?? ""}`} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (context === "desktop-feed") {
    return (
      <div className={cn("rounded-lg border p-5 shadow-soft", dark ? "border-white/10 bg-zinc-950 text-white" : "border-black/10 bg-white text-ink")}>
        <div className="grid gap-5 md:grid-cols-[190px_1fr]">
          <aside className="hidden border-r border-current/10 pr-4 text-sm font-bold text-current/60 md:block">
            <div className="rounded-md bg-current/8 px-3 py-2 text-current">Home</div>
            <div className="px-3 py-2">Subscriptions</div>
            <div className="px-3 py-2">Library</div>
          </aside>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <GridVideoCard key={`${item.id}-${item.variantId ?? ""}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border p-4 shadow-soft sm:p-6", dark ? "border-white/10 bg-zinc-950 text-white" : "border-black/10 bg-white text-ink")}>
      <div className="mb-5 h-10 rounded-full border border-current/12 bg-current/5 px-5 py-2 text-sm text-current/50">
        Search results for thumbnail strategy
      </div>
      <div className="grid gap-5">
        {items.slice(0, 5).map((item) => (
          <SearchResultCard key={`${item.id}-${item.variantId ?? ""}`} item={item} />
        ))}
      </div>
    </div>
  );
}
