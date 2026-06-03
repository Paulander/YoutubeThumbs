"use client";

import { useEffect } from "react";
import { captureAttribution, trackEvent, type AnalyticsProperties } from "@/lib/analytics";

export function PageEvent({ event, properties = {} }: { event: string; properties?: AnalyticsProperties }) {
  useEffect(() => {
    captureAttribution();
    void trackEvent(event, properties);
  }, [event, properties]);

  return null;
}
