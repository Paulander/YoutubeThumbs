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

export async function trackEvent(event: string, properties: AnalyticsProperties = {}) {
  if (!isBrowser()) {
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    return;
  }

  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  const payload = {
    api_key: apiKey,
    event,
    properties: {
      ...getAttribution(),
      ...properties,
      path: window.location.pathname,
      href: window.location.href
    }
  };

  const body = JSON.stringify(payload);
  const url = `${host.replace(/\/$/, "")}/capture/`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    return;
  }

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => undefined);
}
