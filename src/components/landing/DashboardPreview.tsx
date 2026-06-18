import { useState } from "react";
import { Activity, Bell, Brain, Calendar, Coffee, Dumbbell, Heart, Sparkles, Wallet } from "lucide-react";

const TABS = [
  { label: "Home Dashboard", id: "home" },
  { label: "Finance Dashboard", id: "finance" },
  { label: "Activity Dashboard", id: "activity" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            See Your Life In{" "}
            <span className="bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent">
              One Dashboard.
            </span>
          </h2>
          <p className="mt-4 text-ink/60">
            Three views. Every metric that matters. Updated as you talk.
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-2" role="tablist" aria-label="Dashboard views">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActiveTab(t.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === t.id
                  ? "bg-ink text-white shadow-lg"
                  : "bg-surface text-ink/60 hover:bg-ink/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative rounded-[2rem] border border-black/5 bg-surface p-3 shadow-2xl shadow-black/10">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/10 to-grape/10 blur-3xl"
          />

          {activeTab === "home" && <HomeDashboard />}
          {activeTab === "finance" && <FinanceDashboard />}
          {activeTab === "activity" && <ActivityDashboard />}
        </div>
      </div>
    </section>
  );
}

/* ---- Home Dashboard (original content) ---- */
function HomeDashboard() {
  return (
    <div id="panel-home" role="tabpanel" className="rounded-3xl bg-canvas p-6">
      <div className="grid grid-cols-12 gap-4">
        <DashboardSidebar activeItem="Today" />

        <div className="col-span-12 space-y-4 md:col-span-9">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { l: "Today's Spending", v: "Rp 125k", c: "#EF4444" },
              { l: "Income MTD", v: "Rp 8.5M", c: "#10B981" },
              { l: "Activities", v: "12", c: "#3B82F6" },
              { l: "Goals Hit", v: "7/9", c: "#8B5CF6" },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl bg-surface p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{m.l}</div>
                <div className="mt-1 text-2xl font-extrabold">{m.v}</div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-canvas">
                  <div className="h-full w-2/3" style={{ background: m.c }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-surface p-4 md:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-ink/40">Spending This Week</div>
                <div className="text-[10px] font-bold text-emerald-600">−18% vs last</div>
              </div>
              <WeeklyChart />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-ink to-[#1e293b] p-4 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-grape" />
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">AI Insight</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                You're spending <span className="font-bold text-grape">30% less</span> on coffee this week. Nice
                streak — keep it up.
              </p>
            </div>
          </div>

          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

/* ---- Finance Dashboard ---- */
function FinanceDashboard() {
  return (
    <div id="panel-finance" role="tabpanel" className="rounded-3xl bg-canvas p-6">
      <div className="grid grid-cols-12 gap-4">
        <DashboardSidebar activeItem="Finance" />

        <div className="col-span-12 space-y-4 md:col-span-9">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { l: "Monthly Income", v: "Rp 8.5M", c: "#10B981" },
              { l: "Monthly Expense", v: "Rp 3.2M", c: "#EF4444" },
              { l: "Savings", v: "Rp 5.3M", c: "#3B82F6" },
              { l: "Budget Left", v: "62%", c: "#8B5CF6" },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl bg-surface p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{m.l}</div>
                <div className="mt-1 text-2xl font-extrabold">{m.v}</div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-canvas">
                  <div className="h-full w-2/3" style={{ background: m.c }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-surface p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/40">Expense Breakdown</div>
            <WeeklyChart />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Activity Dashboard ---- */
function ActivityDashboard() {
  return (
    <div id="panel-activity" role="tabpanel" className="rounded-3xl bg-canvas p-6">
      <div className="grid grid-cols-12 gap-4">
        <DashboardSidebar activeItem="Health" />

        <div className="col-span-12 space-y-4 md:col-span-9">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { l: "Total Activities", v: "47", c: "#3B82F6" },
              { l: "Active Days", v: "18/20", c: "#10B981" },
              { l: "Avg Duration", v: "42 min", c: "#8B5CF6" },
              { l: "Streak", v: "5 days", c: "#F59E0B" },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl bg-surface p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{m.l}</div>
                <div className="mt-1 text-2xl font-extrabold">{m.v}</div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-canvas">
                  <div className="h-full w-2/3" style={{ background: m.c }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-surface p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/40">Activity This Week</div>
            <WeeklyChart />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Shared Components ---- */

const SIDEBAR_ITEMS = [
  { icon: Activity, l: "Today" },
  { icon: Wallet, l: "Finance" },
  { icon: Calendar, l: "Calendar" },
  { icon: Bell, l: "Reminders" },
  { icon: Heart, l: "Health" },
  { icon: Brain, l: "Insights" },
];

function DashboardSidebar({ activeItem }: { activeItem: string }) {
  return (
    <nav
      aria-label="Dashboard navigation"
      className="col-span-3 hidden flex-col gap-2 rounded-2xl bg-surface p-3 md:flex"
    >
      {SIDEBAR_ITEMS.map((i) => (
        <button
          key={i.l}
          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
            i.l === activeItem ? "bg-ink text-white" : "text-ink/60 hover:bg-canvas"
          }`}
        >
          <i.icon className="size-4" />
          {i.l}
        </button>
      ))}
    </nav>
  );
}

function WeeklyChart() {
  return (
    <div className="flex h-32 items-end gap-2">
      {[55, 70, 40, 85, 60, 95, 50].map((h, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="w-full rounded-lg bg-gradient-to-t from-brand to-grape"
            style={{ height: `${h}%` }}
          />
          <span className="text-[9px] text-ink/40">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
        </div>
      ))}
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-bold uppercase tracking-wider text-ink/40">Recent Activity</div>
        <button className="text-[10px] font-bold text-brand">View all</button>
      </div>
      <div className="space-y-2">
        {[
          { i: Dumbbell, l: "Jogging 5 km · 45 min", t: "07:30", c: "emerald" as const },
          { i: Coffee, l: "Kopi · Rp 25.000", t: "08:15", c: "amber" as const },
          { i: Wallet, l: "Freelance payment +Rp 2.000.000", t: "14:20", c: "blue" as const },
          { i: Bell, l: "Reminder: Bayar listrik tanggal 10", t: "16:00", c: "violet" as const },
        ].map((r, idx) => {
          const colorMap = {
            emerald: "bg-emerald-100 text-emerald-600",
            amber: "bg-amber-100 text-amber-600",
            blue: "bg-blue-100 text-blue-600",
            violet: "bg-violet-100 text-violet-600",
          } as const;
          return (
            <div key={idx} className="flex items-center gap-3 rounded-xl bg-canvas p-2.5">
              <div className={`grid size-8 place-items-center rounded-lg ${colorMap[r.c]}`}>
                <r.i className="size-4" />
              </div>
              <div className="flex-1 text-sm font-semibold">{r.l}</div>
              <div className="text-[10px] font-bold text-ink/40">{r.t}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
