import type { Metadata } from "next";
import { FoundingSuccess } from "@/components/founding-success";
import { TestWorkbench } from "@/components/test-workbench";

export const metadata: Metadata = {
  title: "Test a Thumbnail",
  description: "Upload thumbnail variants, preview desktop and mobile feed contexts, and create a public voting link.",
  alternates: { canonical: "/test" }
};

export default async function TestPage({
  searchParams
}: {
  searchParams: Promise<{ paid?: string }>;
}) {
  const params = await searchParams;
  const isFoundingSuccess = params.paid === "founding";

  return (
    <main>
      {isFoundingSuccess ? <FoundingSuccess /> : null}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">
          {isFoundingSuccess ? "Start your first founding test" : "No signup required"}
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-ink">Test a thumbnail before you publish</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Upload 2-4 variants, preview them in realistic desktop and mobile contexts, then share a voting link.
        </p>
      </section>
      <TestWorkbench />
    </main>
  );
}
