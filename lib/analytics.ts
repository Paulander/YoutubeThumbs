import posthog from "posthog-js";

export type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

const attributionKey = "thumbbattle.first_touch";
const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_segment"] as const;

type Attribution = Partial<Record<(typeof utmKeys)[number], string>> & {
  landing_path?: string;
  first_seen_at?: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function captureAttribution() {
  if (!isBrowser()) {
    return {};
  }

  const existing = window.localStorage.getItem(attributionKey);
  if (existing) {
    try {
      return JSON.parse(existing) as Attribution;
    } catch {
      window.localStorage.removeItem(attributionKey);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    landing_path: window.location.pathname,
    first_seen_at: new Date().toISOString()
  };

  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) {
      attribution[key] = value.slice(0, 120);
    }
  }

  window.localStorage.setItem(attributionKey, JSON.stringify(attribution));
  return attribution;
}

export function getAttribution() {
  if (!isBrowser()) {
    return {};
  }

  const existing = window.localStorage.getItem(attributionKey);
  if (!existing) {
    return captureAttribution();
  }

  try {
    return JSON.parse(existing) as Attribution;
  } catch {
    window.localStorage.removeItem(attributionKey);
    return captureAttribution();
  }
}

let posthogReady = false;

function ensurePostHog() {
  if (!isBrowser() || posthogReady) {
    return posthogReady;
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    return false;
  }

  posthog.init(apiKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    autocapture: false,
    capture_pageview: false,
    disable_session_recording: true,
    persistence: "localStorage+cookie",
    loaded: () => {
      posthogReady = true;
    }
  });

  posthogReady = true;
  return true;
}

export async function trackEvent(event: string, properties: AnalyticsProperties = {}) {
  if (!ensurePostHog()) {
    return;
  }

  posthog.capture(event, {
    ...getAttribution(),
    ...properties,
    path: window.location.pathname,
    href: window.location.href
  });
}
