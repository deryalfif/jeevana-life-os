import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Pricing that respects <span className="text-ink/40">your wallet.</span>
          </h2>
          <p className="mt-4 text-ink/60">Start free. Upgrade when Jeevana becomes essential.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PricingCard
            tier="FREE"
            price="Rp 0"
            subtitle="Forever free"
            features={["Basic Logging", "Expense Tracking", "Daily Summary"]}
            cta="Get Started"
          />
          <PricingCard
            tier="PRO"
            price="Rp 10.000"
            subtitle="per month"
            features={[
              "Unlimited Logs",
              "Advanced Insights",
              "Smart Reminders",
              "Full Dashboard Analytics",
            ]}
            cta="Choose Pro"
            highlight
          />
          <PricingCard
            tier="PREMIUM"
            price="Rp 20.000"
            subtitle="per month"
            features={[
              "Health Tracking",
              "Calendar Integration",
              "AI Planning Assistant",
              "Early Access Features",
            ]}
            cta="Go Premium"
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  price,
  subtitle,
  features,
  cta,
  highlight = false,
}: {
  tier: string;
  price: string;
  subtitle: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-8 ${
        highlight
          ? "bg-ink text-white shadow-2xl shadow-brand/30 ring-4 ring-brand/20 md:-translate-y-4"
          : "border border-black/5 bg-surface"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-grape px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
          Most Popular
        </div>
      )}
      <div
        className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
          highlight ? "text-grape" : "text-ink/40"
        }`}
      >
        {tier}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className={highlight ? "text-sm text-white/50" : "text-sm text-ink/40"}>
          /{subtitle.includes("month") ? "mo" : ""}
        </span>
      </div>
      <div className={highlight ? "text-xs text-white/50" : "text-xs text-ink/40"}>{subtitle}</div>

      <ul className="my-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full ${
                highlight ? "bg-brand" : "bg-brand/10 text-brand"
              }`}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className={highlight ? "text-white/90" : ""}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`mt-auto block w-full rounded-full py-3 text-center text-sm font-bold transition-all ${
          highlight
            ? "bg-white text-ink hover:bg-white/90"
            : "border border-black/10 bg-surface text-ink hover:bg-black/5"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}
