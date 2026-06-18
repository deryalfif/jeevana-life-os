import { Check } from "lucide-react";

const BENEFITS = [
  "Save Time Every Day",
  "Understand Your Habits Better",
  "Manage Finances Effortlessly",
  "Never Miss Important Tasks",
  "Build Better Daily Routines",
  "See Your Entire Life In One Place",
];

export function Benefits() {
  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              What You Gain <br />
              <span className="bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent">
                With Jeevana
              </span>
            </h2>
            <p className="mt-6 max-w-md text-ink/60">
              Less app-switching. More understanding. Better days, one conversation at a time.
            </p>
          </div>
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-center gap-4 rounded-2xl border border-black/5 bg-canvas p-4 transition-colors hover:bg-surface"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-grape text-white">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="font-semibold">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
