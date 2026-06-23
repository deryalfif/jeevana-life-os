import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchLifeLogs } from "@/lib/jeevana.functions";
import { Activity, ShoppingBag, Wallet, Bell, StickyNote } from "lucide-react";

type Log = {
  id: string;
  type: "activity" | "expense" | "income" | "reminder" | "note";
  category: string | null;
  title: string;
  amount: number | null;
  duration_minutes: number | null;
  occurred_at: string;
};

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function iconFor(t: Log["type"]) {
  switch (t) {
    case "activity": return { Icon: Activity, bg: "bg-blue-50 text-blue-600" };
    case "expense": return { Icon: ShoppingBag, bg: "bg-rose-50 text-rose-600" };
    case "income": return { Icon: Wallet, bg: "bg-emerald-50 text-emerald-600" };
    case "reminder": return { Icon: Bell, bg: "bg-amber-50 text-amber-700" };
    case "note": return { Icon: StickyNote, bg: "bg-slate-100 text-slate-600" };
  }
}

function groupLabel(date: Date) {
  const today = new Date();
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (sameDay(date, today)) return "Hari ini";
  if (sameDay(date, yest)) return "Kemarin";
  return new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

export function FeedScreen() {
  const fetch = useServerFn(fetchLifeLogs);
  const { data, isLoading } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetch() as unknown as Promise<Log[]>,
  });

  const groups = new Map<string, Log[]>();
  (data ?? []).forEach((log) => {
    const k = groupLabel(new Date(log.occurred_at));
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(log);
  });

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Life Feed</h1>
      <p className="text-slate-500 mt-1">Semua momen hidupmu, tersusun rapi.</p>

      {isLoading && <p className="mt-8 text-slate-400">Memuat...</p>}

      {!isLoading && (data?.length ?? 0) === 0 && (
        <div className="mt-10 bg-white border border-slate-200/70 rounded-3xl p-10 text-center">
          <div className="text-4xl">📭</div>
          <p className="mt-3 font-semibold">Belum ada cerita</p>
          <p className="text-sm text-slate-500 mt-1">Mulai ngobrol di tab Chat — entri akan muncul di sini otomatis.</p>
        </div>
      )}

      <div className="mt-8 space-y-8">
        {Array.from(groups.entries()).map(([day, items]) => (
          <section key={day}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{day}</h2>
            <ol className="mt-3 space-y-2">
              {items.map((log) => {
                const { Icon, bg } = iconFor(log.type);
                const time = new Date(log.occurred_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
                return (
                  <li key={log.id} className="bg-white border border-slate-200/70 rounded-2xl p-4 flex items-start gap-3">
                    <div className={`size-9 rounded-xl grid place-items-center ${bg}`}>
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{log.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-x-2">
                        <span>{time}</span>
                        {log.category && <span>· {log.category}</span>}
                        {log.duration_minutes && <span>· {log.duration_minutes} mnt</span>}
                      </div>
                    </div>
                    {log.amount != null && (
                      <div className={`text-sm font-semibold ${log.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                        {log.type === "income" ? "+" : "−"}{formatIDR(Number(log.amount))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
