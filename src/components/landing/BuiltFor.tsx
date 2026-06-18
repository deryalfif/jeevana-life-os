const PERSONAS = [
  { l: "Young Professionals", e: "👔" },
  { l: "Students", e: "🎓" },
  { l: "Freelancers", e: "💻" },
  { l: "Creators", e: "🎨" },
  { l: "Entrepreneurs", e: "🚀" },
  { l: "Remote Workers", e: "🌍" },
];

export function BuiltFor() {
  return (
    <section id="use-cases" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Built For People Who Have <span className="text-ink/40">A Lot Going On.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {PERSONAS.map((p) => (
            <div
              key={p.l}
              className="group flex flex-col items-center gap-3 rounded-3xl border border-black/5 bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-canvas to-surface text-3xl">
                {p.e}
              </div>
              <div className="text-sm font-bold">{p.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
