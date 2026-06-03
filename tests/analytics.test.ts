import { describe, expect, it } from "vitest";
import { captureAttribution, getAttribution, trackEvent } from "@/lib/analytics";

describe("analytics no-op", () => {
  it("does not crash outside the browser", async () => {
    expect(captureAttribution()).toEqual({});
    expect(getAttribution()).toEqual({});
    await expect(trackEvent("landing_view")).resolves.toBeUndefined();
  });
});
