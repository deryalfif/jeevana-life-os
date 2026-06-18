import { Instagram, Sparkles, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: Twitter, label: "Follow us on Twitter", href: "#" },
  { Icon: Instagram, label: "Follow us on Instagram", href: "#" },
];

const PRODUCT_LINKS = ["Features", "Use Cases", "Pricing", "FAQ"];
const COMPANY_LINKS = ["Contact", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-surface px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-grape text-white">
                <Sparkles className="size-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Jeevana</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink/60">
              Your Life. Organized. An AI Life Operating System that turns conversations into a
              structured, insightful life log.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-xl border border-black/5 bg-canvas text-ink/60 transition-colors hover:bg-ink hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-ink/40">
              Product
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {PRODUCT_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-ink/70 hover:text-ink"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-ink/40">
              Company
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className="text-ink/70 hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-6 text-xs text-ink/40 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Jeevana. All Rights Reserved.</div>
          <div>Ceritakan harimu, Jeevana akan mengurus sisanya.</div>
        </div>
      </div>
    </footer>
  );
}
