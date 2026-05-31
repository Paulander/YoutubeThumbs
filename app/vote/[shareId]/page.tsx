export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { VoteClient } from "@/components/vote-client";
import { getResultsForTest, getThumbnailTestByShareId } from "@/lib/db";

export default async function VotePage({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params;
  const test = await getThumbnailTestByShareId(shareId);

  if (!test) {
    notFound();
  }

  const results = await getResultsForTest(test);
  return <VoteClient test={test} initialResults={results} />;
}
