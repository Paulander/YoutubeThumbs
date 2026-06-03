import { describe, expect, it } from "vitest";
import { addVote, createThumbnailTest, getResultsForTest, getThumbnailTest, getThumbnailTestByShareId } from "@/lib/db";
import { getMockCompetitors } from "@/lib/mock-data";
import type { ThumbnailTest } from "@/lib/types";
import { makeId } from "@/lib/utils";

function makeTest(): ThumbnailTest {
  const id = makeId("test_case");
  return {
    id,
    shareId: makeId("share_case"),
    sessionId: makeId("session_case"),
    title: "Launch test thumbnail",
    channelName: "ThumbBattle QA",
    targetKeyword: "thumbnail preview",
    viewCount: "1K views",
    publishedAt: "today",
    variants: [
      { id: `${id}_a`, name: "Variant A", imageUrl: "/mock/creator-lab-thumbnail.png" },
      { id: `${id}_b`, name: "Variant B", imageUrl: "/mock/creator-lab-thumbnail.png" }
    ],
    competitors: getMockCompetitors("thumbnail preview"),
    attribution: { utm_source: "test" },
    createdAt: new Date().toISOString()
  };
}

describe("local persistence", () => {
  it("creates and loads a thumbnail test and vote link", async () => {
    const test = makeTest();
    await createThumbnailTest(test);

    await expect(getThumbnailTest(test.id)).resolves.toMatchObject({ id: test.id, title: test.title });
    await expect(getThumbnailTestByShareId(test.shareId)).resolves.toMatchObject({ id: test.id });
  });

  it("records votes and prevents duplicate voter keys", async () => {
    const test = makeTest();
    await createThumbnailTest(test);

    const first = await addVote({ testId: test.id, variantId: test.variants[0].id, voterKey: "same-voter" });
    const second = await addVote({ testId: test.id, variantId: test.variants[1].id, voterKey: "same-voter" });
    const results = await getResultsForTest(test);

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(true);
    expect(results).toEqual([
      { variantId: test.variants[0].id, votes: 1, percent: 100 },
      { variantId: test.variants[1].id, votes: 0, percent: 0 }
    ]);
  });

  it("returns null for an invalid voting link", async () => {
    await expect(getThumbnailTestByShareId(makeId("missing_share"))).resolves.toBeNull();
  });
});
