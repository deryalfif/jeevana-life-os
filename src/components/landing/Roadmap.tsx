const PHASES = [
  {
    label: "Phase 1 — Current MVP",
    tag: "Shipping",
    tagColor: "bg-emerald-100 text-emerald-700",
    items: ["Daily Logging", "Expense Tracking", "Income Tracking", "Reminder", "Daily Summary"],
  },
  {
    label: "Phase 2 — Social Finance",
    tag: "Q1 2026",
    tagColor: "bg-blue-100 text-blue-700",
    items: ["Split Bill", "Debt Tracking", "Shared Expenses"],
  },
  {
    label: "Phase 3 — Health Tracking",
    tag: "Q2 2026",
    tagColor: "bg-violet-100 text-violet-700",
    items: ["Nutrition Tracking", "Water Intake", "Weight Tracking"],
  },
  {
    label: "Phase 4 — Integrations",
    tag: "Q3 2026",
    tagColor: "bg-amber-100 text-amber-700",
    items: ["Google Calendar", "Smart Scheduling", "Workflow Automation"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Growing With <span className="text-ink/40">Your Life.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p) => (
            <div key={p.label} className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-surface p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-ink/40">
                  {p.label.split("—")[0]}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${p.tagColor}`}>
                  {p.tag}
                </span>
              </div>
              <div className="font-bold">{p.label.split("—")[1]?.trim()}</div>
              <ul className="space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-ink/70">
                    <span className="size-1.5 rounded-full bg-brand" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
