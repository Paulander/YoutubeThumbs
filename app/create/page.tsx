import { TestWorkbench } from "@/components/test-workbench";

export default function CreatePage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Thumbnail A/B test</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-ink">Create a thumbnail test</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Upload variants, set the publishing context, then preview your packaging against competitors before sharing a vote link.
        </p>
      </section>
      <TestWorkbench />
    </main>
  );
}
