/* eslint-disable @next/next/no-img-element */
import { Clock3 } from "lucide-react";
import type { CompetitorVideo, ThumbnailVariant } from "@/lib/types";
import { cn, truncateTitle } from "@/lib/utils";

export type FeedItem = CompetitorVideo & {
  isUser?: boolean;
  variantId?: string;
};

export function variantToFeedItem(
  variant: ThumbnailVariant,
  test: {
    title: string;
    channelName: string;
    viewCount: string;
    publishedAt: string;
  }
): FeedItem {
  return {
    id: variant.id,
    variantId: variant.id,
    isUser: true,
    title: test.title,
    channelName: test.channelName,
    imageUrl: variant.imageUrl,
    views: test.viewCount,
    publishedAt: test.publishedAt,
    duration: "Mock"
  };
}

export function VideoThumb({
  item,
  className,
  priority = false
}: {
  item: Pick<FeedItem, "imageUrl" | "title" | "duration" | "isUser">;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-md bg-black", className)}>
      <img
        src={item.imageUrl}
        alt={item.title}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
      <span className="absolute bottom-1.5 right-1.5 rounded bg-black/85 px-1.5 py-0.5 text-[11px] font-bold text-white">
        {item.duration}
      </span>
      {item.isUser ? (
        <span className="absolute left-1.5 top-1.5 rounded bg-coral px-2 py-1 text-[11px] font-black uppercase text-white">
          Your test
        </span>
      ) : null}
    </div>
  );
}

export function SearchResultCard({ item, compact = false }: { item: FeedItem; compact?: boolean }) {
  return (
    <article className={cn("grid gap-3", compact ? "grid-cols-[148px_1fr]" : "grid-cols-[240px_1fr]")}>
      <VideoThumb item={item} />
      <div className="min-w-0 pt-1">
        <h3 className={cn("font-bold leading-snug text-current", compact ? "text-sm line-clamp-2" : "text-base line-clamp-2")}>
          {truncateTitle(item.title, compact ? 64 : 86)}
        </h3>
        <p className="mt-1 text-xs text-current/58">
          {item.views} • {item.publishedAt}
        </p>
        <p className="mt-2 text-xs font-semibold text-current/68">{item.channelName}</p>
        {!compact ? <p className="mt-3 text-sm text-current/50">Judged beside competing packaging at real feed scale.</p> : null}
      </div>
    </article>
  );
}

export function GridVideoCard({ item }: { item: FeedItem }) {
  return (
    <article className="min-w-0">
      <VideoThumb item={item} />
      <div className="mt-2 flex gap-2">
        <div className="h-8 w-8 shrink-0 rounded-full bg-current/12" />
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-current">{truncateTitle(item.title, 70)}</h3>
          <p className="mt-1 text-xs text-current/56">{item.channelName}</p>
          <p className="text-xs text-current/50">
            {item.views} • {item.publishedAt}
          </p>
        </div>
      </div>
    </article>
  );
}

export function MobileVideoCard({ item }: { item: FeedItem }) {
  return (
    <article className="min-w-0">
      <VideoThumb item={item} className="rounded-none" />
      <div className="flex gap-3 px-3 py-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-current/12" />
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-current">{truncateTitle(item.title, 78)}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-current/56">
            <Clock3 className="h-3 w-3" />
            {item.channelName} • {item.views}
          </p>
        </div>
      </div>
    </article>
  );
}
