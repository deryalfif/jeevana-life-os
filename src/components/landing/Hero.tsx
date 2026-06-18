import {
  ArrowRight,
  Bell,
  Check,
  Coffee,
  Dumbbell,
  type LucideIcon,
  MessageCircle,
  Play,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.18), transparent), radial-gradient(40% 40% at 80% 10%, rgba(59,130,246,0.18), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-surface px-4 py-1.5 text-xs font-semibold text-ink/70 shadow-sm">
            <span className="size-1.5 animate-pulse rounded-full bg-brand" />
            AI Life Operating System
          </div>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Your Entire Life,
            <br />
            Organized In{" "}
            <span className="bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent">
              One Conversation.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/60">
            Activities, expenses, reminders, habits, and goals. Just tell Jeevana what's
            happening, and AI takes care of the rest.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-xl shadow-brand/30 transition-all hover:bg-brand/90 hover:shadow-2xl"
            >
              Start Free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-surface px-7 py-4 font-semibold transition-all hover:bg-black/5">
              <Play className="size-4" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Split visual */}
        <div className="mt-20 grid items-start gap-6 lg:grid-cols-12">
          <ChatPanel />
          <DashboardCard />
        </div>
      </div>
    </section>
  );
}

function ChatPanel() {
  return (
    <div className="lg:col-span-5">
      <div className="rounded-3xl border border-black/5 bg-surface p-6 shadow-2xl shadow-black/5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-grape text-white">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Jeevana</div>
              <div className="text-[10px] text-ink/40">Online · Indonesian + English</div>
            </div>
          </div>
          <div className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
            LIVE
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-sm text-white">
              Hari ini jogging 5 km selama 45 menit.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-grape text-white">
              <Sparkles className="size-3.5" />
            </div>
            <div className="flex max-w-[85%] flex-col gap-2 rounded-2xl rounded-tl-sm bg-canvas px-4 py-3">
              <div className="text-xs font-medium text-ink/50">Got it — saved to your day:</div>
              {[
                { label: "Activity Logged", color: "bg-emerald-500" },
                { label: "Distance Recorded", color: "bg-brand" },
                { label: "Duration Saved", color: "bg-grape" },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2 text-sm font-semibold">
                  <span className={`grid size-4 place-items-center rounded-full ${r.color} text-white`}>
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {r.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-black/5 bg-canvas px-4 py-3">
          <MessageCircle className="size-4 text-ink/30" />
          <span className="flex-1 text-sm text-ink/40">Ceritakan harimu...</span>
          <button
            className="grid size-7 place-items-center rounded-full bg-brand text-white"
            aria-label="Send message"
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardCard() {
  return (
    <div className="relative lg:col-span-7">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/15 to-grape/15 blur-2xl"
      />
      <div className="rounded-3xl border border-white bg-white/70 p-4 shadow-2xl shadow-black/5 backdrop-blur">
        {/* browser chrome */}
        <div className="mb-3 flex items-center gap-2 px-2">
          <div className="size-2.5 rounded-full bg-red-400" />
          <div className="size-2.5 rounded-full bg-amber-400" />
          <div className="size-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 flex-1 rounded-md bg-canvas px-3 py-1 text-[10px] font-mono text-ink/40">
            jeevana.app / today
          </div>
        </div>

        <div className="rounded-2xl bg-canvas p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink/40">
                Today · Tuesday
              </div>
              <div className="text-lg font-bold">Good evening, Ammar</div>
            </div>
            <div className="rounded-full bg-surface px-3 py-1.5 text-[10px] font-bold shadow-sm">
              4 events
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Activity" value="5.0 km" sub="+12% vs week" color="#3B82F6" />
            <MiniStat label="Spending" value="Rp 25k" sub="under budget" color="#8B5CF6" />
          </div>

          <div className="mt-3 rounded-xl bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-ink/40">
                Weekly Activity
              </div>
              <TrendingUp className="size-3.5 text-emerald-500" />
            </div>
            <div className="flex h-20 items-end gap-2">
              {[40, 65, 30, 78, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-brand to-grape"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[9px] text-ink/40">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ActivityRow icon={Dumbbell} label="Jogging 5 km" time="07:30" tint="emerald" />
            <ActivityRow icon={Coffee} label="Kopi · Rp 25k" time="08:15" tint="amber" />
            <ActivityRow icon={Bell} label="Bayar listrik" time="10 Nov" tint="violet" />
            <ActivityRow icon={Wallet} label="Freelance +2M" time="14:20" tint="blue" />
          </div>
        </div>
      </div>

      {/* Floating Badges */}
      <FloatingBadge className="-left-2 top-6 sm:-left-6 sm:top-10" dot="bg-emerald-500" label="Activity Saved" />
      <FloatingBadge className="-right-2 top-32 sm:-right-6 animate-float" dot="bg-brand" label="Expense Recorded" />
      <FloatingBadge className="-left-2 bottom-24 sm:-left-8 animate-float-delay" dot="bg-grape" label="Reminder Created" />
      <FloatingBadge className="-right-2 -bottom-3 sm:-right-6" dot="bg-amber-500" label="Daily Summary Ready" />
    </div>
  );
}

function MiniStat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl bg-surface p-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{label}</div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold" style={{ color }}>
        <span className="size-1 rounded-full" style={{ background: color }} />
        {sub}
      </div>
    </div>
  );
}

function ActivityRow({
  icon: Icon,
  label,
  time,
  tint,
}: {
  icon: LucideIcon;
  label: string;
  time: string;
  tint: "emerald" | "amber" | "violet" | "blue";
}) {
  const tints = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
    blue: "bg-blue-50 text-blue-600",
  } as const;
  return (
    <div className="flex items-center gap-2 rounded-xl bg-surface p-2.5">
      <div className={`grid size-7 place-items-center rounded-lg ${tints[tint]}`}>
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold">{label}</div>
        <div className="text-[9px] text-ink/40">{time}</div>
      </div>
    </div>
  );
}

function FloatingBadge({ className = "", dot, label }: { className?: string; dot: string; label: string }) {
  return (
    <div
      className={`absolute z-10 hidden items-center gap-2 rounded-full border border-black/5 bg-surface px-3 py-2 text-xs font-bold shadow-xl shadow-black/5 sm:inline-flex ${className}`}
    >
      <span className={`size-2 rounded-full ${dot} animate-pulse`} />
      {label}
    </div>
  );
}
