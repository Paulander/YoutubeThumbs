export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getResultsForTest, getThumbnailTest } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = await getThumbnailTest(id);

  if (!test) {
    return NextResponse.json({ error: "Test not found." }, { status: 404 });
  }

  const results = await getResultsForTest(test);
  return NextResponse.json({ test, results });
}
