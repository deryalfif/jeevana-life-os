import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchLifeLogs, fetchHabits, fetchHabitCompletions, fetchReminders, fetchGoals } from "@/lib/jeevana.functions";
import { TrendingUp, Brain, Flame, Target, Calendar, Wallet, Activity } from "lucide-react";

type Log = { id: string; type: string; category: string | null; title: string; amount: number | null; duration_minutes: number | null; occurred_at: string };

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export function InsightsScreen() {
  const fetchLogsFn = useServerFn(fetchLifeLogs);
  const fetchHabitsFn = useServerFn(fetchHabits);
  const fetchCompFn = useServerFn(fetchHabitCompletions);
  const fetchRemindersFn = useServerFn(fetchReminders);
  const fetchGoalsFn = useServerFn(fetchGoals);

  const { data: logs = [] } = useQuery({ queryKey: ["life-logs"], queryFn: () => fetchLogsFn() as unknown as Promise<Log[]> });
  const { data: habits = [] } = useQuery({ queryKey: ["habits"], queryFn: () => fetchHabitsFn() });
  const { data: completions = [] } = useQuery({ queryKey: ["habit-completions"], queryFn: () => fetchCompFn() });
  const { data: reminders = [] } = useQuery({ queryKey: ["reminders"], queryFn: () => fetchRemindersFn() });
  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: () => fetchGoalsFn() });

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  const insights = useMemo(() => {
    const cards: { icon: React.ReactNode; title: string; detail: string; color: string }[] = [];

    // Expense trend
    const thisMonthExpenses = logs.filter((l) => l.type === "expense" && new Date(l.occurred_at).getMonth() === thisMonth && new Date(l.occurred_at).getFullYear() === thisYear);
    const lastMonthExpenses = logs.filter((l) => l.type === "expense" && new Date(l.occurred_at).getMonth() === lastMonth && new Date(l.occurred_at).getFullYear() === lastMonthYear);
    const thisTotal = thisMonthExpenses.reduce((s, l) => s + (l.amount ?? 0), 0);
    const lastTotal = lastMonthExpenses.reduce((s, l) => s + (l.amount ?? 0), 0);

    if (lastTotal > 0 && thisTotal > 0) {
      const pct = Math.round(((thisTotal - lastTotal) / lastTotal) * 100);
      if (pct > 0) {
        cards.push({
          icon: <TrendingUp className="size-5" />,
          title: `Pengeluaran naik ${pct}% bulan ini`,
          detail: `${formatRp(thisTotal)} vs ${formatRp(lastTotal)} bulan lalu.`,
          color: "from-red-50 to-orange-50 border-red-200",
        });
      } else if (pct < 0) {
        cards.push({
          icon: <Wallet className="size-5" />,
          title: `Hemat ${Math.abs(pct)}% dari bulan lalu! 🎉`,
          detail: `${formatRp(thisTotal)} vs ${formatRp(lastTotal)} bulan lalu.`,
          color: "from-emerald-50 to-green-50 border-emerald-200",
        });
      }
    }

    // Top expense category
    const catMap = new Map<string, number>();
    thisMonthExpenses.forEach((e) => catMap.set(e.category ?? "lainnya", (catMap.get(e.category ?? "lainnya") ?? 0) + (e.amount ?? 0)));
    const topCat = [...catMap.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topCat) {
      const pct = thisTotal > 0 ? Math.round((topCat[1] / thisTotal) * 100) : 0;
      cards.push({
        icon: <Wallet className="size-5" />,
        title: `${topCat[0]} = ${pct}% pengeluaran`,
        detail: `Kategori terbesarmu bulan ini adalah ${topCat[0]} (${formatRp(topCat[1])}).`,
        color: "from-blue-50 to-indigo-50 border-blue-200",
      });
    }

    // Most productive day
    const dayCount = new Map<number, number>();
    logs.filter((l) => l.type === "activity").forEach((l) => {
      const day = new Date(l.occurred_at).getDay();
      dayCount.set(day, (dayCount.get(day) ?? 0) + 1);
    });
    const topDay = [...dayCount.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topDay) {
      const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      cards.push({
        icon: <Calendar className="size-5" />,
        title: `Paling produktif hari ${dayNames[topDay[0]]}`,
        detail: `${topDay[1]} aktivitas tercatat di hari ${dayNames[topDay[0]]}.`,
        color: "from-purple-50 to-pink-50 border-purple-200",
      });
    }

    // Habit completion rate
    if (habits.length > 0) {
      const uniqueDays = new Set(completions.map((c) => new Date(c.completed_at).toDateString()));
      const rate = Math.round((uniqueDays.size / 30) * 100);
      cards.push({
        icon: <Flame className="size-5" />,
        title: `Konsistensi habit: ${rate}%`,
        detail: `Kamu menyelesaikan habit di ${uniqueDays.size} dari 30 hari terakhir.`,
        color: rate >= 70 ? "from-emerald-50 to-green-50 border-emerald-200" : "from-amber-50 to-orange-50 border-amber-200",
      });
    }

    // Goal progress
    const activeGoals = goals.filter((g) => g.status === "active");
    if (activeGoals.length > 0) {
      cards.push({
        icon: <Target className="size-5" />,
        title: `${activeGoals.length} target aktif`,
        detail: activeGoals.map((g) => g.title).join(", "),
        color: "from-cyan-50 to-blue-50 border-cyan-200",
      });
    }

    // Activity frequency
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    const weekActs = logs.filter((l) => l.type === "activity" && new Date(l.occurred_at) >= weekAgo);
    if (weekActs.length > 0) {
      const totalMins = weekActs.reduce((s, l) => s + (l.duration_minutes ?? 0), 0);
      cards.push({
        icon: <Activity className="size-5" />,
        title: `${weekActs.length} aktivitas minggu ini`,
        detail: totalMins > 0 ? `Total durasi: ${Math.round(totalMins / 60)} jam ${totalMins % 60} menit.` : "Terus semangat! 💪",
        color: "from-blue-50 to-sky-50 border-blue-200",
      });
    }

    // Reminder completion rate
    const doneReminders = reminders.filter((r) => r.status === "completed").length;
    const totalReminders = reminders.length;
    if (totalReminders > 0) {
      const rate = Math.round((doneReminders / totalReminders) * 100);
      cards.push({
        icon: <Brain className="size-5" />,
        title: `${rate}% pengingat selesai`,
        detail: `${doneReminders} dari ${totalReminders} pengingat sudah ditandai selesai.`,
        color: rate >= 80 ? "from-emerald-50 to-green-50 border-emerald-200" : "from-amber-50 to-yellow-50 border-amber-200",
      });
    }

    return cards;
  }, [logs, habits, completions, reminders, goals]);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Insights</h1>
        <p className="text-slate-500 mt-1">Analisis kehidupanmu, dihasilkan dari datamu.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.length === 0 ? (
          <div className="col-span-2 bg-white border border-slate-200/70 rounded-3xl p-10 text-center">
            <div className="text-4xl">📊</div>
            <p className="mt-3 font-semibold">Belum cukup data untuk insight</p>
            <p className="text-sm text-slate-500 mt-1">Mulai catat aktivitas, pengeluaran, dan kebiasaanmu lewat Chat.</p>
          </div>
        ) : (
          insights.map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} border rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5`}>
              <div className="text-slate-600 mb-3">{card.icon}</div>
              <h3 className="font-semibold text-lg">{card.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{card.detail}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
