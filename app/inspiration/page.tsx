import { InspirationLibrary } from "@/components/inspiration-library";
import { SectionTitle } from "@/components/ui";

export default function InspirationPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Inspiration library"
        title="Mock high-performing thumbnail patterns by niche"
        body="This MVP uses seeded examples. The structure is ready for curated data or official API-backed research later."
      />
      <InspirationLibrary />
    </main>
  );
}
