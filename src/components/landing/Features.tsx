import { Activity, Bell, DollarSign, type LucideIcon, Moon, Wallet } from "lucide-react";

const FEATURES = [
  {
    n: "01",
    title: "AI Daily Logging",
    input: "Hari ini jogging 5 km.",
    output: [{ label: "ACTIVITY", v: "Running" }, { label: "DISTANCE", v: "5 km" }],
    color: "#3B82F6",
    icon: Activity,
  },
  {
    n: "02",
    title: "Expense Tracking",
    input: "Beli kopi 25 ribu.",
    output: [{ label: "TYPE", v: "Expense" }, { label: "AMOUNT", v: "Rp 25.000" }],
    color: "#EF4444",
    icon: Wallet,
  },
  {
    n: "03",
    title: "Income Tracking",
    input: "Project freelance dibayar 2 juta.",
    output: [{ label: "TYPE", v: "Income" }, { label: "AMOUNT", v: "Rp 2.000.000" }],
    color: "#10B981",
    icon: DollarSign,
  },
  {
    n: "04",
    title: "Reminder & Task",
    input: "Ingatkan saya bayar listrik tanggal 10.",
    output: [{ label: "TASK", v: "Bayar listrik" }, { label: "DATE", v: "10 Nov" }],
    color: "#8B5CF6",
    icon: Bell,
  },
  {
    n: "05",
    title: "Daily Summary",
    input: "[Auto · 21:00]",
    output: [{ label: "EVENTS", v: "12 logged" }, { label: "INSIGHT", v: "Active day" }],
    color: "#F59E0B",
    icon: Moon,
  },
];

type FeatureData = {
  n: string;
  title: string;
  input: string;
  output: { label: string; v: string }[];
  color: string;
  icon: LucideIcon;
};

export function Features() {
  return (
    <section id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/60">
            Features
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Talk to Jeevana. <span className="text-ink/40">Watch it work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[260px]">
          <FeatureCard f={FEATURES[0]} className="md:col-span-3 md:row-span-2" tall />
          <FeatureCard f={FEATURES[1]} className="md:col-span-3" />
          <FeatureCard f={FEATURES[2]} className="md:col-span-3" />
          <FeatureCard f={FEATURES[3]} className="md:col-span-3" />
          <FeatureCard f={FEATURES[4]} className="md:col-span-3" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  f,
  className = "",
  tall = false,
}: {
  f: FeatureData;
  className?: string;
  tall?: boolean;
}) {
  const Icon = f.icon;
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-surface p-6 transition-shadow hover:shadow-xl md:p-8 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="grid size-10 place-items-center rounded-xl text-white"
            style={{ background: f.color }}
          >
            <Icon className="size-5" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/40">
            Feature {f.n}
          </span>
        </div>
      </div>

      <h3 className={`mt-6 font-bold tracking-tight ${tall ? "text-3xl md:text-4xl" : "text-xl"}`}>
        {f.title}
      </h3>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl bg-canvas p-4">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-ink/40">
            You say
          </div>
          <div className="text-sm font-medium">"{f.input}"</div>
        </div>
        <div className="my-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">
          <div className="h-px flex-1 bg-black/5" />
          AI structures it
          <div className="h-px flex-1 bg-black/5" />
        </div>
        <div className="flex flex-wrap gap-2">
          {f.output.map((o) => (
            <div key={o.label} className="rounded-xl border border-black/5 bg-surface px-3 py-2 text-xs">
              <span className="font-mono font-bold" style={{ color: f.color }}>
                {o.label}:
              </span>{" "}
              <span className="font-semibold">{o.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
