const STEPS = [
  { t: "Tell Jeevana About Your Day", d: "Speak or type naturally — no forms, no setup.", c: "#3B82F6" },
  { t: "AI Understands Context", d: "Jeevana parses intent, entities, dates, amounts.", c: "#8B5CF6" },
  { t: "Data Is Structured Automatically", d: "Categorized and timestamped in the right place.", c: "#3B82F6" },
  { t: "Dashboard Updates Instantly", d: "Charts and logs reflect your words in realtime.", c: "#8B5CF6" },
  { t: "Receive Insights And Recommendations", d: "Patterns surface so you can act on them.", c: "#10B981" },
];

export function HowItWorks() {
  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-canvas px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/60">
            How it works
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Five steps. <span className="text-ink/40">Zero friction.</span>
          </h2>
        </div>
        <ol className="relative space-y-3 border-l-2 border-dashed border-black/10 pl-8">
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative pb-6">
              <div
                className="absolute -left-[2.6rem] grid size-10 place-items-center rounded-full text-sm font-extrabold text-white ring-4 ring-white"
                style={{ background: s.c }}
              >
                {i + 1}
              </div>
              <div className="rounded-2xl border border-black/5 bg-canvas p-5">
                <h4 className="font-bold">{s.t}</h4>
                <p className="mt-1 text-sm text-ink/60">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
