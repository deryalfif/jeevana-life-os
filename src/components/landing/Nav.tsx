import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const NAV_ITEMS = ["Features", "Use Cases", "Roadmap", "Pricing", "FAQ"];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Skip-to-content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 w-full border-b border-black/5 bg-canvas/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2" aria-label="Jeevana home">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-grape text-white shadow-md shadow-brand/30">
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">Jeevana</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 text-sm font-medium text-ink/60 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="transition-colors hover:text-ink"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/auth"
              className="px-3 py-2 text-sm font-semibold text-ink/70 hover:text-ink transition-colors hidden sm:block"
            >
              Masuk
            </a>
            <a
              href="/auth"
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition-all hover:scale-105 active:scale-95"
            >
              Mulai Gratis
            </a>

            {/* Mobile hamburger */}
            <button
              className="grid size-9 place-items-center rounded-lg border border-black/10 bg-surface text-ink/60 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-black/5 bg-surface px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-canvas hover:text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
