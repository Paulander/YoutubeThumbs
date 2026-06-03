"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsProperties } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: string;
  eventProperties?: AnalyticsProperties;
};

export function TrackedLink({ event, eventProperties, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        void trackEvent(event, eventProperties);
        onClick?.(clickEvent);
      }}
    />
  );
}
