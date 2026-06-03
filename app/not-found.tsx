import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-coral">Missing link</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">That ThumbBattle page is not available.</h1>
      <p className="mt-4 text-ink/65">The test or vote link may have been deleted, mistyped, or created in another environment.</p>
      <Link href="/test" className="mt-8 inline-flex min-h-11 items-center rounded-md bg-ink px-5 py-3 text-sm font-black text-white">
        Create a new test
      </Link>
    </main>
  );
}
