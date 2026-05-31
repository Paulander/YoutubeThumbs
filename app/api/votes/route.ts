export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { addVote, getResultsForTest, getThumbnailTestByShareId } from "@/lib/db";

type VoteBody = {
  shareId?: string;
  variantId?: string;
  voterKey?: string;
  comment?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as VoteBody;

  if (!body.shareId || !body.variantId || !body.voterKey) {
    return NextResponse.json({ error: "Share ID, variant ID, and voter key are required." }, { status: 400 });
  }

  const test = await getThumbnailTestByShareId(body.shareId);

  if (!test) {
    return NextResponse.json({ error: "Voting link not found." }, { status: 404 });
  }

  if (!test.variants.some((variant) => variant.id === body.variantId)) {
    return NextResponse.json({ error: "Variant does not belong to this test." }, { status: 400 });
  }

  const { duplicate } = await addVote({
    testId: test.id,
    variantId: body.variantId,
    voterKey: body.voterKey,
    comment: body.comment?.trim().slice(0, 500)
  });
  const results = await getResultsForTest(test);

  return NextResponse.json({ duplicate, results }, { status: duplicate ? 200 : 201 });
}
