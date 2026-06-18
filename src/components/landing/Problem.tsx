import { Calendar, FileText, Heart, ListChecks, Wallet } from "lucide-react";

const ITEMS = [
  { icon: FileText, name: "Notes App", desc: "Scattered journals and lost ideas.", span: "md:col-span-2 md:row-span-2", rotate: "-rotate-2" },
  { icon: Wallet, name: "Finance App", desc: "Manual entry. Static spreadsheets.", span: "md:col-span-2", rotate: "rotate-1" },
  { icon: Calendar, name: "Calendar", desc: "Silent blocks of time.", span: "md:col-span-2", rotate: "-rotate-1" },
  { icon: ListChecks, name: "Task Manager", desc: "Forgotten reminders.", span: "md:col-span-3", rotate: "rotate-1" },
  { icon: Heart, name: "Health App", desc: "Ignored habits & stats.", span: "md:col-span-3", rotate: "-rotate-1" },
];

export function Problem() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Your Life Is Scattered Across <br />
            <span className="text-ink/40">Too Many Apps.</span>
          </h2>
          <p className="mt-4 text-pretty text-lg text-ink/60">
            Most people manage their lives using separate tools that never work together.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[140px]">
          {ITEMS.map((it) => (
            <div
              key={it.name}
              className={`group relative overflow-hidden rounded-3xl border border-black/5 bg-surface p-6 shadow-sm transition-transform hover:!rotate-0 hover:shadow-xl ${it.span} ${it.rotate}`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-canvas text-ink/40">
                  <it.icon className="size-5" />
                </div>
                <div>
                  <div className="font-bold">{it.name}</div>
                  <div className="text-sm text-ink/50">{it.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
