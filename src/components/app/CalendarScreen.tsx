import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchLifeLogs, fetchReminders } from "@/lib/jeevana.functions";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

type Log = { id: string; type: string; title: string; occurred_at: string };
type Reminder = { id: string; title: string; remind_at: string; status: string };

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

type ViewMode = "month" | "week" | "agenda";

export function CalendarScreen() {
  const fetchLogsFn = useServerFn(fetchLifeLogs);
  const fetchRemindersFn = useServerFn(fetchReminders);

  const { data: logs = [] } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetchLogsFn() as unknown as Promise<Log[]>,
  });
  const { data: reminders = [] } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => fetchRemindersFn() as unknown as Promise<Reminder[]>,
  });

  const [view, setView] = useState<ViewMode>("month");
  const [current, setCurrent] = useState(new Date());
  const today = new Date();

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const eventsForDay = (d: Date) => {
    const dayLogs = logs.filter((l) => isSameDay(new Date(l.occurred_at), d));
    const dayReminders = reminders.filter((r) => isSameDay(new Date(r.remind_at), d));
    return { logs: dayLogs, reminders: dayReminders };
  };

  // Week view
  const weekStart = useMemo(() => {
    const d = new Date(current);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }, [current]);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Agenda view - next 14 days
  const agendaDays = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return d;
    }).filter((d) => {
      const ev = eventsForDay(d);
      return ev.logs.length > 0 || ev.reminders.length > 0;
    });
  }, [logs, reminders]);

  const typeColors: Record<string, string> = {
    activity: "bg-blue-500",
    expense: "bg-red-400",
    income: "bg-emerald-500",
    reminder: "bg-amber-500",
    note: "bg-slate-400",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Kalender</h1>
          <p className="text-slate-500 mt-1">Lihat aktivitas dan pengingat dalam tampilan kalender.</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
          {(["month", "week", "agenda"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${view === v ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {v === "month" ? "Bulan" : v === "week" ? "Minggu" : "Agenda"}
            </button>
          ))}
        </div>
      </div>

      {/* Month View */}
      {view === "month" && (
        <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronLeft className="size-4" />
            </button>
            <h2 className="font-display font-semibold">
              {current.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-slate-500 font-medium border-b border-slate-100">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: startDow }).map((_, i) => (
              <div key={`e-${i}`} className="min-h-[80px] border-b border-r border-slate-50" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = new Date(year, month, i + 1);
              const ev = eventsForDay(d);
              const isToday = isSameDay(d, today);
              return (
                <div key={i} className={`min-h-[80px] p-1.5 border-b border-r border-slate-50 ${isToday ? "bg-blue-50/50" : ""}`}>
                  <div className={`text-xs font-medium mb-1 ${isToday ? "text-white bg-brand size-6 rounded-full grid place-items-center" : "text-slate-600 pl-1"}`}>
                    {i + 1}
                  </div>
                  <div className="space-y-0.5">
                    {ev.logs.slice(0, 2).map((l) => (
                      <div key={l.id} className={`text-[10px] px-1.5 py-0.5 rounded truncate text-white ${typeColors[l.type] ?? "bg-slate-400"}`}>
                        {l.title}
                      </div>
                    ))}
                    {ev.reminders.slice(0, 1).map((r) => (
                      <div key={r.id} className="text-[10px] px-1.5 py-0.5 rounded truncate text-white bg-amber-500">
                        🔔 {r.title}
                      </div>
                    ))}
                    {(ev.logs.length + ev.reminders.length > 3) && (
                      <div className="text-[10px] text-slate-400 pl-1">+{ev.logs.length + ev.reminders.length - 3} lagi</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === "week" && (
        <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <button onClick={() => { const d = new Date(current); d.setDate(d.getDate() - 7); setCurrent(d); }} className="p-2 hover:bg-slate-100 rounded-xl">
              <ChevronLeft className="size-4" />
            </button>
            <h2 className="font-display font-semibold text-sm">
              {weekDays[0].toLocaleDateString("id-ID", { day: "numeric", month: "short" })} — {weekDays[6].toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
            </h2>
            <button onClick={() => { const d = new Date(current); d.setDate(d.getDate() + 7); setCurrent(d); }} className="p-2 hover:bg-slate-100 rounded-xl">
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {weekDays.map((d) => {
              const ev = eventsForDay(d);
              const isToday = isSameDay(d, today);
              return (
                <div key={d.toISOString()} className={`p-4 ${isToday ? "bg-blue-50/30" : ""}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`text-sm font-semibold ${isToday ? "text-brand" : "text-slate-600"}`}>
                      {d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" })}
                    </div>
                    {isToday && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full">Hari ini</span>}
                  </div>
                  {ev.logs.length === 0 && ev.reminders.length === 0 ? (
                    <div className="text-xs text-slate-400">Tidak ada event</div>
                  ) : (
                    <div className="space-y-1">
                      {[...ev.logs, ...ev.reminders.map((r) => ({ id: r.id, type: "reminder" as const, title: `🔔 ${r.title}`, occurred_at: r.remind_at }))].map((e) => (
                        <div key={e.id} className="flex items-center gap-2 text-sm">
                          <div className={`size-2 rounded-full ${typeColors[e.type] ?? "bg-slate-400"}`} />
                          <span>{e.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Agenda View */}
      {view === "agenda" && (
        <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2">
            <CalendarDays className="size-4 text-brand" />
            <h2 className="font-display font-semibold text-sm">14 Hari ke Depan</h2>
          </div>
          {agendaDays.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">Tidak ada event dalam 14 hari ke depan</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {agendaDays.map((d) => {
                const ev = eventsForDay(d);
                return (
                  <div key={d.toISOString()} className="p-4">
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                      {d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
                    </div>
                    <div className="space-y-1">
                      {ev.logs.map((l) => (
                        <div key={l.id} className="flex items-center gap-2 text-sm">
                          <div className={`size-2 rounded-full ${typeColors[l.type] ?? "bg-slate-400"}`} />
                          <span>{l.title}</span>
                        </div>
                      ))}
                      {ev.reminders.map((r) => (
                        <div key={r.id} className="flex items-center gap-2 text-sm">
                          <div className="size-2 rounded-full bg-amber-500" />
                          <span>🔔 {r.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
