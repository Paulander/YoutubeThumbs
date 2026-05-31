import { describe, expect, it } from "vitest";
import { calculateVoteResults, truncateTitle } from "@/lib/utils";
import type { Vote } from "@/lib/types";

describe("truncateTitle", () => {
  it("keeps short titles unchanged", () => {
    expect(truncateTitle("A strong title", 20)).toBe("A strong title");
  });

  it("truncates long titles with an ellipsis", () => {
    expect(truncateTitle("This title is much too long for a compact feed card", 24)).toBe("This title is much too...");
  });
});

describe("calculateVoteResults", () => {
  it("returns vote counts and rounded percentages", () => {
    const votes: Vote[] = [
      { id: "1", testId: "t", variantId: "a", voterKey: "v1", createdAt: "" },
      { id: "2", testId: "t", variantId: "a", voterKey: "v2", createdAt: "" },
      { id: "3", testId: "t", variantId: "b", voterKey: "v3", createdAt: "" }
    ];

    expect(calculateVoteResults(["a", "b"], votes)).toEqual([
      { variantId: "a", votes: 2, percent: 67 },
      { variantId: "b", votes: 1, percent: 33 }
    ]);
  });
});
