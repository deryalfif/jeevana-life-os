import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bell,
  Brain,
  Calendar,
  Check,
  Coffee,
  DollarSign,
  Dumbbell,
  FileText,
  Heart,
  Instagram,
  ListChecks,
  type LucideIcon,
  MessageCircle,
  Moon,
  Play,
  Sparkles,
  TrendingUp,
  Twitter,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jeevana — Your Entire Life, Organized In One Conversation" },
      {
        name: "description",
        content:
          "Jeevana is an AI Life Operating System. Log activities, expenses, reminders, and habits through natural conversation.",
      },
      { property: "og:title", content: "Jeevana — AI Life Operating System" },
      {
        property: "og:description",
        content: "Ceritakan harimu, Jeevana akan mengurus sisanya.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div
      className="min-h-screen text-[#0F172A] selection:bg-[#3B82F6]/20"
      style={{ background: "#F8FAFC", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <Nav />
      <Hero />
      <Stats />
      <Problem />
      <ValueProps />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <BuiltFor />
      <Benefits />
      <Roadmap />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const items = ["Features", "Use Cases", "Roadmap", "Pricing", "FAQ"];
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#F8FAFC]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white shadow-md shadow-[#3B82F6]/30">
            <Sparkles className="size-4" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">Jeevana</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#0F172A]/60 md:flex">
          {items.map((i) => (
            <a
              key={i}
              href={`#${i.toLowerCase().replace(/\s+/g, "-")}`}
              className="transition-colors hover:text-[#0F172A]"
            >
              {i}
            </a>
          ))}
        </div>
        <button className="rounded-full bg-[#0F172A] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#0F172A]/10 transition-all hover:scale-105 active:scale-95">
          Start Free
        </button>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-1.5 text-xs font-semibold text-[#0F172A]/70 shadow-sm">
            <span className="size-1.5 animate-pulse rounded-full bg-[#3B82F6]" />
            AI Life Operating System
          </div>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Your Entire Life,
            <br />
            Organized In{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              One Conversation.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[#0F172A]/60">
            Activities, expenses, reminders, habits, and goals. Just tell Jeevana what's
            happening, and AI takes care of the rest.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-7 py-4 font-semibold text-white shadow-xl shadow-[#3B82F6]/30 transition-all hover:bg-[#3B82F6]/90 hover:shadow-2xl">
              Start Free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 font-semibold transition-all hover:bg-black/5">
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
      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-2xl shadow-black/5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Jeevana</div>
              <div className="text-[10px] text-[#0F172A]/40">Online · Indonesian + English</div>
            </div>
          </div>
          <div className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
            LIVE
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0F172A] px-4 py-3 text-sm text-white">
              Hari ini jogging 5 km selama 45 menit.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white">
              <Sparkles className="size-3.5" />
            </div>
            <div className="flex max-w-[85%] flex-col gap-2 rounded-2xl rounded-tl-sm bg-[#F8FAFC] px-4 py-3">
              <div className="text-xs font-medium text-[#0F172A]/50">Got it — saved to your day:</div>
              {[
                { label: "Activity Logged", color: "bg-emerald-500" },
                { label: "Distance Recorded", color: "bg-[#3B82F6]" },
                { label: "Duration Saved", color: "bg-[#8B5CF6]" },
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

        <div className="mt-5 flex items-center gap-2 rounded-full border border-black/5 bg-[#F8FAFC] px-4 py-3">
          <MessageCircle className="size-4 text-[#0F172A]/30" />
          <span className="flex-1 text-sm text-[#0F172A]/40">Ceritakan harimu...</span>
          <button className="grid size-7 place-items-center rounded-full bg-[#3B82F6] text-white">
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
        className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/15 blur-2xl"
      />
      <div className="rounded-3xl border border-white bg-white/70 p-4 shadow-2xl shadow-black/5 backdrop-blur">
        {/* browser chrome */}
        <div className="mb-3 flex items-center gap-2 px-2">
          <div className="size-2.5 rounded-full bg-red-400" />
          <div className="size-2.5 rounded-full bg-amber-400" />
          <div className="size-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 flex-1 rounded-md bg-[#F8FAFC] px-3 py-1 text-[10px] font-mono text-[#0F172A]/40">
            jeevana.app / today
          </div>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#0F172A]/40">
                Today · Tuesday
              </div>
              <div className="text-lg font-bold">Good evening, Ammar</div>
            </div>
            <div className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold shadow-sm">
              4 events
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Activity" value="5.0 km" sub="+12% vs week" color="#3B82F6" />
            <MiniStat label="Spending" value="Rp 25k" sub="under budget" color="#8B5CF6" />
          </div>

          <div className="mt-3 rounded-xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40">
                Weekly Activity
              </div>
              <TrendingUp className="size-3.5 text-emerald-500" />
            </div>
            <div className="flex h-20 items-end gap-2">
              {[40, 65, 30, 78, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-[#3B82F6] to-[#8B5CF6]"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[9px] text-[#0F172A]/40">
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
      <FloatingBadge
        className="-left-2 top-6 sm:-left-6 sm:top-10"
        dot="bg-emerald-500"
        label="Activity Saved"
      />
      <FloatingBadge
        className="-right-2 top-32 sm:-right-6 animate-float"
        dot="bg-[#3B82F6]"
        label="Expense Recorded"
      />
      <FloatingBadge
        className="-left-2 bottom-24 sm:-left-8 animate-float-delay"
        dot="bg-[#8B5CF6]"
        label="Reminder Created"
      />
      <FloatingBadge
        className="-right-2 -bottom-3 sm:-right-6"
        dot="bg-amber-500"
        label="Daily Summary Ready"
      />
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A]/40">
        {label}
      </div>
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
    <div className="flex items-center gap-2 rounded-xl bg-white p-2.5">
      <div className={`grid size-7 place-items-center rounded-lg ${tints[tint]}`}>
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold">{label}</div>
        <div className="text-[9px] text-[#0F172A]/40">{time}</div>
      </div>
    </div>
  );
}

function FloatingBadge({
  className = "",
  dot,
  label,
}: {
  className?: string;
  dot: string;
  label: string;
}) {
  return (
    <div
      className={`absolute z-10 hidden items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-2 text-xs font-bold shadow-xl shadow-black/5 sm:inline-flex ${className}`}
    >
      <span className={`size-2 rounded-full ${dot} animate-pulse`} />
      {label}
    </div>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    ["10,000+", "Life Events Recorded"],
    ["95%", "AI Understanding Accuracy"],
    ["30+", "Hours Saved Every Month"],
    ["4.9/5", "User Satisfaction"],
  ];
  return (
    <section className="border-y border-black/5 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/40">
          Your Life, Backed By Data
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="bg-gradient-to-br from-[#0F172A] to-[#3B82F6] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
                {v}
              </div>
              <div className="mt-2 text-xs font-medium text-[#0F172A]/50 md:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const items = [
    { icon: FileText, name: "Notes App", desc: "Scattered journals and lost ideas.", span: "md:col-span-2 md:row-span-2", rotate: "-rotate-2" },
    { icon: Wallet, name: "Finance App", desc: "Manual entry. Static spreadsheets.", span: "md:col-span-2", rotate: "rotate-1" },
    { icon: Calendar, name: "Calendar", desc: "Silent blocks of time.", span: "md:col-span-2", rotate: "-rotate-1" },
    { icon: ListChecks, name: "Task Manager", desc: "Forgotten reminders.", span: "md:col-span-3", rotate: "rotate-1" },
    { icon: Heart, name: "Health App", desc: "Ignored habits & stats.", span: "md:col-span-3", rotate: "-rotate-1" },
  ];
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Your Life Is Scattered Across <br />
            <span className="text-[#0F172A]/40">Too Many Apps.</span>
          </h2>
          <p className="mt-4 text-pretty text-lg text-[#0F172A]/60">
            Most people manage their lives using separate tools that never work together.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[140px]">
          {items.map((it) => (
            <div
              key={it.name}
              className={`group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-transform hover:!rotate-0 hover:shadow-xl ${it.span} ${it.rotate}`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F172A]/40">
                  <it.icon className="size-5" />
                </div>
                <div>
                  <div className="font-bold">{it.name}</div>
                  <div className="text-sm text-[#0F172A]/50">{it.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- VALUE PROPS ---------------- */
function ValueProps() {
  return (
    <section className="mx-4 rounded-[2.5rem] bg-[#0F172A] px-6 py-24 text-white md:mx-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
            The Jeevana Way
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            One Conversation.
            <br />
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              One Organized Life.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[200px]">
          <ValueTile
            className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]"
            icon={MessageCircle}
            title="Natural Language First"
            desc="Tidak perlu form. Tidak perlu kategori. Just talk to Jeevana like you'd text a friend — in Indonesian or English."
            big
          />
          <ValueTile
            className="md:col-span-3 bg-white/5 border border-white/10"
            icon={Zap}
            title="Automatic Structuring"
            desc="AI mengubah percakapan menjadi data terstruktur — categorized, timestamped, ready to analyze."
          />
          <ValueTile
            className="md:col-span-2 bg-white/5 border border-white/10"
            icon={Activity}
            title="Life Data Hub"
            desc="Semua aspek kehidupan tersimpan dalam satu tempat."
          />
          <ValueTile
            className="md:col-span-1 bg-white text-[#0F172A]"
            icon={Brain}
            title="Smart Insights"
            desc="Memahami pola hidupmu."
            invert
          />
        </div>
      </div>
    </section>
  );
}

function ValueTile({
  className = "",
  icon: Icon,
  title,
  desc,
  big = false,
  invert = false,
}: {
  className?: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  big?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={`flex flex-col justify-between rounded-3xl p-6 md:p-8 ${className}`}>
      <div
        className={`grid size-10 place-items-center rounded-xl ${
          invert ? "bg-[#0F172A]/5 text-[#0F172A]" : "bg-white/10 text-white"
        }`}
      >
        <Icon className="size-5" />
      </div>
      <div className="mt-8">
        <h3 className={`font-bold ${big ? "text-2xl md:text-3xl" : "text-lg"}`}>{title}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${invert ? "text-[#0F172A]/60" : "text-white/70"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const features = [
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
  return (
    <section id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/60">
            Features
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Talk to Jeevana. <span className="text-[#0F172A]/40">Watch it work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[260px]">
          <FeatureCard f={features[0]} className="md:col-span-3 md:row-span-2" tall />
          <FeatureCard f={features[1]} className="md:col-span-3" />
          <FeatureCard f={features[2]} className="md:col-span-3" />
          <FeatureCard f={features[3]} className="md:col-span-3" />
          <FeatureCard f={features[4]} className="md:col-span-3" />
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
  f: {
    n: string;
    title: string;
    input: string;
    output: { label: string; v: string }[];
    color: string;
    icon: LucideIcon;
  };
  className?: string;
  tall?: boolean;
}) {
  const Icon = f.icon;
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-6 transition-shadow hover:shadow-xl md:p-8 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="grid size-10 place-items-center rounded-xl text-white"
            style={{ background: f.color }}
          >
            <Icon className="size-5" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0F172A]/40">
            Feature {f.n}
          </span>
        </div>
      </div>

      <h3 className={`mt-6 font-bold tracking-tight ${tall ? "text-3xl md:text-4xl" : "text-xl"}`}>
        {f.title}
      </h3>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl bg-[#F8FAFC] p-4">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/40">
            You say
          </div>
          <div className="text-sm font-medium">"{f.input}"</div>
        </div>
        <div className="my-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/40">
          <div className="h-px flex-1 bg-black/5" />
          AI structures it
          <div className="h-px flex-1 bg-black/5" />
        </div>
        <div className="flex flex-wrap gap-2">
          {f.output.map((o) => (
            <div
              key={o.label}
              className="rounded-xl border border-black/5 bg-white px-3 py-2 text-xs"
            >
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

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { t: "Tell Jeevana About Your Day", d: "Speak or type naturally — no forms, no setup.", c: "#3B82F6" },
    { t: "AI Understands Context", d: "Jeevana parses intent, entities, dates, amounts.", c: "#8B5CF6" },
    { t: "Data Is Structured Automatically", d: "Categorized and timestamped in the right place.", c: "#3B82F6" },
    { t: "Dashboard Updates Instantly", d: "Charts and logs reflect your words in realtime.", c: "#8B5CF6" },
    { t: "Receive Insights And Recommendations", d: "Patterns surface so you can act on them.", c: "#10B981" },
  ];
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-[#F8FAFC] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/60">
            How it works
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Five steps. <span className="text-[#0F172A]/40">Zero friction.</span>
          </h2>
        </div>
        <ol className="relative space-y-3 border-l-2 border-dashed border-black/10 pl-8">
          {steps.map((s, i) => (
            <li key={s.t} className="relative pb-6">
              <div
                className="absolute -left-[2.6rem] grid size-10 place-items-center rounded-full text-sm font-extrabold text-white ring-4 ring-white"
                style={{ background: s.c }}
              >
                {i + 1}
              </div>
              <div className="rounded-2xl border border-black/5 bg-[#F8FAFC] p-5">
                <h4 className="font-bold">{s.t}</h4>
                <p className="mt-1 text-sm text-[#0F172A]/60">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- DASHBOARD PREVIEW ---------------- */
function DashboardPreview() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            See Your Life In <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">One Dashboard.</span>
          </h2>
          <p className="mt-4 text-[#0F172A]/60">
            Three views. Every metric that matters. Updated as you talk.
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {[
            { label: "Home Dashboard", active: true },
            { label: "Finance Dashboard" },
            { label: "Activity Dashboard" },
          ].map((t) => (
            <button
              key={t.label}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                t.active
                  ? "bg-[#0F172A] text-white shadow-lg"
                  : "bg-white text-[#0F172A]/60 hover:bg-[#0F172A]/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative rounded-[2rem] border border-black/5 bg-white p-3 shadow-2xl shadow-black/10">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 blur-3xl"
          />
          <div className="rounded-3xl bg-[#F8FAFC] p-6">
            <div className="grid grid-cols-12 gap-4">
              {/* Left sidebar */}
              <div className="col-span-3 hidden flex-col gap-2 rounded-2xl bg-white p-3 md:flex">
                {[
                  { icon: Activity, l: "Today", active: true },
                  { icon: Wallet, l: "Finance" },
                  { icon: Calendar, l: "Calendar" },
                  { icon: Bell, l: "Reminders" },
                  { icon: Heart, l: "Health" },
                  { icon: Brain, l: "Insights" },
                ].map((i) => (
                  <div
                    key={i.l}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
                      i.active ? "bg-[#0F172A] text-white" : "text-[#0F172A]/60"
                    }`}
                  >
                    <i.icon className="size-4" />
                    {i.l}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="col-span-12 space-y-4 md:col-span-9">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { l: "Today's Spending", v: "Rp 125k", c: "#EF4444" },
                    { l: "Income MTD", v: "Rp 8.5M", c: "#10B981" },
                    { l: "Activities", v: "12", c: "#3B82F6" },
                    { l: "Goals Hit", v: "7/9", c: "#8B5CF6" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-2xl bg-white p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A]/40">
                        {m.l}
                      </div>
                      <div className="mt-1 text-2xl font-extrabold">{m.v}</div>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[#F8FAFC]">
                        <div className="h-full w-2/3" style={{ background: m.c }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-white p-4 md:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40">
                        Spending This Week
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600">−18% vs last</div>
                    </div>
                    <div className="flex h-32 items-end gap-2">
                      {[55, 70, 40, 85, 60, 95, 50].map((h, i) => (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                          <div
                            className="w-full rounded-lg bg-gradient-to-t from-[#3B82F6] to-[#8B5CF6]"
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[9px] text-[#0F172A]/40">
                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-[#8B5CF6]" />
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                        AI Insight
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">
                      You're spending <span className="font-bold text-[#8B5CF6]">30% less</span> on
                      coffee this week. Nice streak — keep it up.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0F172A]/40">
                      Recent Activity
                    </div>
                    <button className="text-[10px] font-bold text-[#3B82F6]">View all</button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { i: Dumbbell, l: "Jogging 5 km · 45 min", t: "07:30", c: "emerald" },
                      { i: Coffee, l: "Kopi · Rp 25.000", t: "08:15", c: "amber" },
                      { i: Wallet, l: "Freelance payment +Rp 2.000.000", t: "14:20", c: "blue" },
                      { i: Bell, l: "Reminder: Bayar listrik tanggal 10", t: "16:00", c: "violet" },
                    ].map((r, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-2.5"
                      >
                        <div
                          className={`grid size-8 place-items-center rounded-lg ${
                            r.c === "emerald"
                              ? "bg-emerald-100 text-emerald-600"
                              : r.c === "amber"
                                ? "bg-amber-100 text-amber-600"
                                : r.c === "blue"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-violet-100 text-violet-600"
                          }`}
                        >
                          <r.i className="size-4" />
                        </div>
                        <div className="flex-1 text-sm font-semibold">{r.l}</div>
                        <div className="text-[10px] font-bold text-[#0F172A]/40">{r.t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BUILT FOR ---------------- */
function BuiltFor() {
  const personas = [
    { l: "Young Professionals", e: "👔" },
    { l: "Students", e: "🎓" },
    { l: "Freelancers", e: "💻" },
    { l: "Creators", e: "🎨" },
    { l: "Entrepreneurs", e: "🚀" },
    { l: "Remote Workers", e: "🌍" },
  ];
  return (
    <section id="use-cases" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Built For People Who Have <span className="text-[#0F172A]/40">A Lot Going On.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {personas.map((p) => (
            <div
              key={p.l}
              className="group flex flex-col items-center gap-3 rounded-3xl border border-black/5 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-white text-3xl">
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

/* ---------------- BENEFITS ---------------- */
function Benefits() {
  const benefits = [
    "Save Time Every Day",
    "Understand Your Habits Better",
    "Manage Finances Effortlessly",
    "Never Miss Important Tasks",
    "Build Better Daily Routines",
    "See Your Entire Life In One Place",
  ];
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              What You Gain <br />
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                With Jeevana
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[#0F172A]/60">
              Less app-switching. More understanding. Better days, one conversation at a time.
            </p>
          </div>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-4 rounded-2xl border border-black/5 bg-[#F8FAFC] p-4 transition-colors hover:bg-white"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white">
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

/* ---------------- ROADMAP ---------------- */
function Roadmap() {
  const phases = [
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
  return (
    <section id="roadmap" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Growing With <span className="text-[#0F172A]/40">Your Life.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <div
              key={p.label}
              className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/40">
                  {p.label.split("—")[0]}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${p.tagColor}`}>
                  {p.tag}
                </span>
              </div>
              <div className="font-bold">{p.label.split("—")[1]?.trim()}</div>
              <ul className="space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-[#0F172A]/70">
                    <span className="size-1.5 rounded-full bg-[#3B82F6]" />
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

/* ---------------- PRICING ---------------- */
function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Pricing that respects <span className="text-[#0F172A]/40">your wallet.</span>
          </h2>
          <p className="mt-4 text-[#0F172A]/60">Start free. Upgrade when Jeevana becomes essential.</p>
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
          ? "bg-[#0F172A] text-white shadow-2xl shadow-[#3B82F6]/30 ring-4 ring-[#3B82F6]/20 md:-translate-y-4"
          : "border border-black/5 bg-white"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
          Most Popular
        </div>
      )}
      <div
        className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
          highlight ? "text-[#8B5CF6]" : "text-[#0F172A]/40"
        }`}
      >
        {tier}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className={highlight ? "text-sm text-white/50" : "text-sm text-[#0F172A]/40"}>
          /{subtitle.includes("month") ? "mo" : ""}
        </span>
      </div>
      <div className={highlight ? "text-xs text-white/50" : "text-xs text-[#0F172A]/40"}>
        {subtitle}
      </div>

      <ul className="my-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full ${
                highlight ? "bg-[#3B82F6]" : "bg-[#3B82F6]/10 text-[#3B82F6]"
              }`}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className={highlight ? "text-white/90" : ""}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-auto w-full rounded-full py-3 text-sm font-bold transition-all ${
          highlight
            ? "bg-white text-[#0F172A] hover:bg-white/90"
            : "border border-black/10 bg-white text-[#0F172A] hover:bg-black/5"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    {
      q: "How secure is my data?",
      a: "Your data is encrypted at rest and in transit. Jeevana follows industry-standard security practices, and your conversations are never used to train third-party models.",
    },
    {
      q: "Can Jeevana track expenses automatically?",
      a: "Yes. Just mention an expense in chat — 'Beli kopi 25 ribu' — and Jeevana extracts the amount, category, and timestamp into your finance dashboard.",
    },
    {
      q: "Can I use Jeevana as a daily journal?",
      a: "Absolutely. Anything you tell Jeevana becomes part of your life log. You can search, reflect, and review past days anytime.",
    },
    {
      q: "Does Jeevana support reminders?",
      a: "Yes. Natural-language reminders like 'Ingatkan saya bayar listrik tanggal 10' are scheduled automatically and pushed when due.",
    },
    {
      q: "Will there be a mobile app?",
      a: "A native mobile app is on the roadmap for Phase 4. For now, Jeevana works beautifully as a responsive web app on every device.",
    },
    {
      q: "Can Jeevana understand Indonesian?",
      a: "Yes — Jeevana is bilingual by design. Bahasa Indonesia and English work equally well. Mix them in the same sentence if you want.",
    },
  ];
  return (
    <section id="faq" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Frequently asked.
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-black/5 bg-[#F8FAFC] px-5"
            >
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#0F172A]/60">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F172A] via-[#1e1b4b] to-[#3B0764] p-12 md:p-20">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(50% 50% at 80% 20%, rgba(139,92,246,0.6), transparent), radial-gradient(40% 40% at 20% 80%, rgba(59,130,246,0.5), transparent)",
            }}
          />
          <div className="relative grid items-center gap-12 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                Start Understanding <br />
                Your Life Better.
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg text-white/70">
                Stop switching between apps. Let Jeevana organize your life through simple
                conversations.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-[#0F172A] shadow-xl transition-transform hover:scale-105">
                  Start Free Today <ArrowRight className="size-4" />
                </button>
                <span className="text-sm text-white/50">No credit card · Free forever</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-[#3B82F6]/40 to-[#8B5CF6]/40 blur-3xl" />
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] shadow-2xl">
                  <div className="absolute inset-3 rounded-full border border-white/20 backdrop-blur-xl" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Sparkles className="size-24 text-white" strokeWidth={1.2} />
                  </div>
                </div>
                {/* orbiting badges */}
                <div className="absolute -right-2 top-8 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur">
                  ✓ Logged
                </div>
                <div className="absolute -left-2 bottom-12 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur">
                  ✓ Organized
                </div>
                <div className="absolute -bottom-2 right-12 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur">
                  ✓ Insightful
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white">
                <Sparkles className="size-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Jeevana</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-[#0F172A]/60">
              Your Life. Organized. An AI Life Operating System that turns conversations into a
              structured, insightful life log.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-9 place-items-center rounded-xl border border-black/5 bg-[#F8FAFC] text-[#0F172A]/60 transition-colors hover:bg-[#0F172A] hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0F172A]/40">
              Product
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {["Features", "Use Cases", "Pricing", "FAQ"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-[#0F172A]/70 hover:text-[#0F172A]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#0F172A]/40">
              Company
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {["Contact", "Privacy", "Terms"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#0F172A]/70 hover:text-[#0F172A]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-6 text-xs text-[#0F172A]/40 md:flex-row md:items-center">
          <div>© 2026 Jeevana. All Rights Reserved.</div>
          <div>Ceritakan harimu, Jeevana akan mengurus sisanya.</div>
        </div>
      </div>
    </footer>
  );
}
