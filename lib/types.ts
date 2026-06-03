export type PreviewContext = "desktop-search" | "mobile-feed" | "home-grid" | "desktop-feed";

export type ThumbnailVariant = {
  id: string;
  name: string;
  imageUrl: string;
  notes?: string;
};

export type CompetitorVideo = {
  id: string;
  title: string;
  channelName: string;
  imageUrl: string;
  views: string;
  publishedAt: string;
  duration: string;
};

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_segment?: string;
  landing_path?: string;
  first_seen_at?: string;
};

export type ThumbnailTest = {
  id: string;
  shareId: string;
  sessionId: string;
  title: string;
  channelName: string;
  targetKeyword?: string;
  viewCount: string;
  publishedAt: string;
  variants: ThumbnailVariant[];
  competitors: CompetitorVideo[];
  attribution?: Attribution;
  createdAt: string;
};

export type Vote = {
  id: string;
  testId: string;
  variantId: string;
  voterKey: string;
  comment?: string;
  createdAt: string;
};

export type VoteResult = {
  variantId: string;
  votes: number;
  percent: number;
};

export type DbShape = {
  tests: ThumbnailTest[];
  votes: Vote[];
};
