const STATS = [
  ["10,000+", "Life Events Recorded"],
  ["95%", "AI Understanding Accuracy"],
  ["30+", "Hours Saved Every Month"],
  ["4.9/5", "User Satisfaction"],
];

export function Stats() {
  return (
    <section className="border-y border-black/5 bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
          Your Life, Backed By Data
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="bg-gradient-to-br from-ink to-brand bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
                {v}
              </div>
              <div className="mt-2 text-xs font-medium text-ink/50 md:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
