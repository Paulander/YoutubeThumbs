"use client";

import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function PaymentCta({ href, label, plan }: { href?: string; label: string; plan: string }) {
  if (!href) {
    return (
      <button disabled className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-black/12 bg-black/5 px-4 py-3 text-sm font-black text-ink/45">
        Coming soon
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={() => void trackEvent("checkout_clicked", { plan })}
      className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-black text-white hover:bg-black"
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
