import { describe, expect, it } from "vitest";
import { exampleImages, getExampleImagesByTag, getSupabasePublicObjectUrl } from "@/lib/example-images";

describe("example image catalog", () => {
  it("builds encoded public Supabase object URLs", () => {
    expect(
      getSupabasePublicObjectUrl("ai-tech/ai tech.png", {
        projectUrl: "https://demo.supabase.co/",
        bucket: "examples bucket"
      })
    ).toBe("https://demo.supabase.co/storage/v1/object/public/examples%20bucket/ai-tech/ai%20tech.png");
  });

  it("contains the uploaded example objects with searchable tags", () => {
    expect(exampleImages).toHaveLength(13);
    expect(getExampleImagesByTag("productivity").length).toBeGreaterThan(1);
    expect(getExampleImagesByTag("travel").some((image) => image.path === "travel/paradise.png")).toBe(true);
  });
});
