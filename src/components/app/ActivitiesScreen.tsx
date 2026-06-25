import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchLifeLogs } from "@/lib/jeevana.functions";
import { Activity, Clock, Flame, TrendingUp } from "lucide-react";

type Log = {
  id: string;
  type: "activity" | "expense" | "income" | "reminder" | "note";
  category: string | null;
  title: string;
  amount: number | null;
  duration_minutes: number | null;
  occurred_at: string;
};

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function ActivitiesScreen() {
  const fetch = useServerFn(fetchLifeLogs);
  const { data, isLoading } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetch() as unknown as Promise<Log[]>,
  });

  const activities = (data ?? []).filter((l) => l.type === "activity");
  const now = new Date();
  const todayActs = activities.filter((a) => isSameDay(new Date(a.occurred_at), now));
  const totalMinutes = activities.reduce((s, a) => s + (a.duration_minutes ?? 0), 0);
  const categories = [...new Set(activities.map((a) => a.category).filter(Boolean))];

  // Weekly frequency
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekActs = activities.filter((a) => new Date(a.occurred_at) >= weekAgo);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Aktivitas</h1>
          <p className="text-slate-500 mt-1">Semua aktivitas yang kamu lakukan.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-blue-600">
            <Activity className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Hari ini</span>
          </div>
          <div className="text-2xl font-bold mt-2">{todayActs.length}</div>
          <div className="text-xs text-slate-400">aktivitas</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-600">
            <Flame className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Minggu ini</span>
          </div>
          <div className="text-2xl font-bold mt-2">{weekActs.length}</div>
          <div className="text-xs text-slate-400">aktivitas</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-grape">
            <Clock className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total durasi</span>
          </div>
          <div className="text-2xl font-bold mt-2">{Math.round(totalMinutes / 60)}j {totalMinutes % 60}m</div>
          <div className="text-xs text-slate-400">tercatat</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-600">
            <TrendingUp className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Kategori</span>
          </div>
          <div className="text-2xl font-bold mt-2">{categories.length}</div>
          <div className="text-xs text-slate-400">jenis</div>
        </div>
      </div>

      {/* Category breakdown */}
      {categories.length > 0 && (
        <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl p-6">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">Per Kategori</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const count = activities.filter((a) => a.category === cat).length;
              const mins = activities.filter((a) => a.category === cat).reduce((s, a) => s + (a.duration_minutes ?? 0), 0);
              return (
                <div key={cat} className="bg-slate-50 rounded-2xl p-4">
                  <div className="text-sm font-medium capitalize">{cat}</div>
                  <div className="text-xs text-slate-500 mt-1">{count} aktivitas · {mins} mnt</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity list */}
      <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-slate-400">Memuat...</div>
        ) : activities.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-4xl">🏃</div>
            <p className="mt-3 font-semibold">Belum ada aktivitas</p>
            <p className="text-sm text-slate-500 mt-1">Ceritakan aktivitasmu di Chat, nanti tercatat otomatis di sini.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {activities.slice(0, 50).map((a) => (
              <div key={a.id} className="px-5 py-4 flex items-center gap-4">
                <div className="size-9 rounded-xl bg-blue-50 text-blue-600 grid place-items-center">
                  <Activity className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{a.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5 flex gap-2">
                    {a.category && <span className="capitalize">{a.category}</span>}
                    {a.duration_minutes && <span>· {a.duration_minutes} mnt</span>}
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(a.occurred_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
