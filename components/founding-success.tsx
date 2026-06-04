import { CheckCircle2, Mail, Sparkles } from "lucide-react";

export function FoundingSuccess() {
  const contactEmail = process.env.CONTACT_EMAIL || "hello@example.com";

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-mint/35 bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-mint">
              <CheckCircle2 className="h-5 w-5" />
              Payment received
            </div>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-ink">
              Welcome, Founding Creator.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/68">
              Thanks for backing ThumbBattle early. You can start creating thumbnail tests below. While the MVP is still being wired to automated accounts and credits, your purchase is recorded in Stripe and founding access will be honored manually if anything needs adjusting.
            </p>
            <div className="mt-5 grid gap-3 text-sm font-bold text-ink/72 sm:grid-cols-3">
              <div className="rounded-md bg-paper p-3">100 founding tests</div>
              <div className="rounded-md bg-paper p-3">Voting links included</div>
              <div className="rounded-md bg-paper p-3">Early feedback priority</div>
            </div>
          </div>
          <aside className="border-t border-black/10 bg-mint/10 p-6 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2 text-lg font-black text-ink">
              <Sparkles className="h-5 w-5 text-mint" />
              Next steps
            </div>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-ink/70">
              <li>1. Create your first thumbnail test below.</li>
              <li>2. Share the voting link with a client, teammate, or trusted viewers.</li>
              <li>3. Reply to your Stripe receipt or email us if you need help.</li>
            </ol>
            <a
              href={`mailto:${contactEmail}?subject=ThumbBattle Founding Creator`}
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-black text-white"
            >
              <Mail className="h-4 w-4" />
              Contact support
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
