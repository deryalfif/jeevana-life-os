import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { fetchLifeLogs } from "@/lib/jeevana.functions";
import { Activity, ShoppingBag, Bell, Sparkles, TrendingUp, MessageCircle } from "lucide-react";

type Log = {
  id: string;
  type: "activity" | "expense" | "income" | "reminder" | "note";
  category: string | null;
  title: string;
  amount: number | null;
  duration_minutes: number | null;
  occurred_at: string;
};

const fmtIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function DashboardScreen() {
  const fetch = useServerFn(fetchLifeLogs);
  const { data } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetch() as unknown as Promise<Log[]>,
  });
  const logs = data ?? [];
  const now = new Date();

  const today = logs.filter((l) => isSameDay(new Date(l.occurred_at), now));
  const todayExpense = today.filter((l) => l.type === "expense").reduce((s, l) => s + Number(l.amount ?? 0), 0);
  const todayActivities = today.filter((l) => l.type === "activity").length;

  // 7-day expense bars
  const days: { label: string; total: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const total = logs
      .filter((l) => l.type === "expense" && isSameDay(new Date(l.occurred_at), d))
      .reduce((s, l) => s + Number(l.amount ?? 0), 0);
    days.push({ label: ["Min","Sen","Sel","Rab","Kam","Jum","Sab"][d.getDay()], total });
  }
  const maxDay = Math.max(1, ...days.map((d) => d.total));

  const recentActs = logs.filter((l) => l.type === "activity").slice(0, 4);
  const upcoming = logs
    .filter((l) => l.type === "reminder" && new Date(l.occurred_at).getTime() >= now.getTime() - 60000)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Ringkasan hidupmu hari ini.</p>
        </div>
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 bg-ink text-white rounded-xl px-4 py-2 text-sm hover:bg-ink/90"
        >
          <MessageCircle className="size-4" /> Catat sesuatu
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today */}
        <div className="md:col-span-2 bg-gradient-to-br from-ink to-slate-800 text-white rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-wider text-white/60">Hari ini</div>
            <div className="text-4xl font-bold mt-2 tracking-tight">{today.length} entri</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-white/60">Pengeluaran</div>
                <div className="text-lg font-semibold mt-0.5">{fmtIDR(todayExpense)}</div>
              </div>
              <div>
                <div className="text-xs text-white/60">Aktivitas</div>
                <div className="text-lg font-semibold mt-0.5">{todayActivities}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-grape" />
            <div className="text-xs uppercase tracking-wider text-slate-500">Life Score</div>
          </div>
          <div className="text-4xl font-bold mt-2 tracking-tight">
            {Math.min(100, today.length * 12 + 40)}
          </div>
          <div className="text-xs text-slate-500 mt-1">Skor harian berdasarkan aktivitas.</div>
        </div>

        {/* Expense 7d bento */}
        <div className="md:col-span-2 bg-white border border-slate-200/70 rounded-3xl p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-brand" />
            <div className="text-xs uppercase tracking-wider text-slate-500">Pengeluaran 7 hari</div>
          </div>
          <div className="mt-5 flex items-end gap-2 h-32">
            {days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand to-grape transition-all"
                  style={{ height: `${(d.total / maxDay) * 100}%`, minHeight: d.total > 0 ? 6 : 2 }}
                />
                <div className="text-[10px] text-slate-400">{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming reminders */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-amber-600" />
            <div className="text-xs uppercase tracking-wider text-slate-500">Pengingat</div>
          </div>
          {upcoming.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">Belum ada pengingat.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {upcoming.map((r) => (
                <li key={r.id} className="text-sm">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(r.occurred_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent activities */}
        <div className="md:col-span-3 bg-white border border-slate-200/70 rounded-3xl p-6">
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-blue-600" />
            <div className="text-xs uppercase tracking-wider text-slate-500">Aktivitas terakhir</div>
          </div>
          {recentActs.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">Belum ada aktivitas tercatat.</p>
          ) : (
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {recentActs.map((a) => (
                <div key={a.id} className="bg-slate-50 rounded-2xl p-4">
                  <div className="text-xs text-slate-500">{a.category}</div>
                  <div className="font-medium text-sm mt-1">{a.title}</div>
                  {a.duration_minutes && (
                    <div className="text-xs text-slate-500 mt-1">{a.duration_minutes} mnt</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
