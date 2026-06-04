import { describe, expect, it } from "vitest";
import { getMockCompetitors } from "@/lib/mock-data";

describe("mock competitor feed", () => {
  it("uses real Supabase example thumbnails instead of SVG placeholders", () => {
    const competitors = getMockCompetitors("YouTube growth");

    expect(competitors).toHaveLength(5);
    expect(competitors.every((competitor) => competitor.imageUrl.startsWith("https://vondxxiyuzlytgiwbsmj.supabase.co/storage/v1/object/public/examples/"))).toBe(true);
    expect(competitors.some((competitor) => competitor.imageUrl.startsWith("data:image/svg"))).toBe(false);
  });

  it("prioritizes tagged images when the keyword matches a niche", () => {
    const competitors = getMockCompetitors("fitness");

    expect(competitors[0].imageUrl).toContain("fitness/");
  });
});
