import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ThumbBattle | YouTube thumbnail preview and A/B voting",
  description:
    "Preview YouTube thumbnails in realistic feed contexts, run thumbnail A/B tests, and share voting links before publishing.",
  keywords: [
    "YouTube thumbnail preview",
    "thumbnail A/B test",
    "YouTube CTR thumbnail test",
    "thumbnail mockup tool"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-sm text-white">TB</span>
              <span>ThumbBattle</span>
            </Link>
            <div className="flex items-center gap-1 text-sm font-semibold text-ink/70 sm:gap-3">
              <Link className="rounded-md px-3 py-2 hover:bg-black/5" href="/create">
                Test
              </Link>
              <Link className="rounded-md px-3 py-2 hover:bg-black/5" href="/inspiration">
                Inspiration
              </Link>
              <Link className="rounded-md px-3 py-2 hover:bg-black/5" href="/pricing">
                Pricing
              </Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t border-black/10 bg-white/65">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>ThumbBattle helps judge thumbnails in context before publishing.</p>
            <p>Not affiliated with YouTube.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
