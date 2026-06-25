import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchHabits, fetchHabitCompletions, createHabit, completeHabit, deleteHabit } from "@/lib/jeevana.functions";
import { Plus, Check, Flame, Target, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function HabitsScreen() {
  const qc = useQueryClient();
  const fetchHabitsFn = useServerFn(fetchHabits);
  const fetchCompFn = useServerFn(fetchHabitCompletions);
  const createFn = useServerFn(createHabit);
  const completeFn = useServerFn(completeHabit);
  const deleteFn = useServerFn(deleteHabit);

  const { data: habits = [] } = useQuery({ queryKey: ["habits"], queryFn: () => fetchHabitsFn() });
  const { data: completions = [] } = useQuery({ queryKey: ["habit-completions"], queryFn: () => fetchCompFn() });

  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const createMut = useMutation({
    mutationFn: (title: string) => createFn({ data: { title } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["habits"] }); setShowAdd(false); setNewTitle(""); },
  });

  const completeMut = useMutation({
    mutationFn: (habit_id: string) => completeFn({ data: { habit_id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habit-completions"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });

  const today = new Date();

  function getStreak(habitId: string) {
    const sorted = completions
      .filter((c) => c.habit_id === habitId)
      .map((c) => new Date(c.completed_at))
      .sort((a, b) => b.getTime() - a.getTime());
    if (sorted.length === 0) return 0;
    let streak = 0;
    let check = new Date(today);
    for (const d of sorted) {
      if (isSameDay(d, check)) {
        streak++;
        check.setDate(check.getDate() - 1);
      } else if (d < check) {
        break;
      }
    }
    return streak;
  }

  function isCompletedToday(habitId: string) {
    return completions.some((c) => c.habit_id === habitId && isSameDay(new Date(c.completed_at), today));
  }

  // 30 day completion rate
  function getRate(habitId: string) {
    const last30 = completions.filter((c) => c.habit_id === habitId);
    const uniqueDays = new Set(last30.map((c) => new Date(c.completed_at).toDateString()));
    return Math.round((uniqueDays.size / 30) * 100);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Habits</h1>
          <p className="text-slate-500 mt-1">Bangun kebiasaan baik, satu hari pada satu waktu.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="rounded-xl gap-2">
          <Plus className="size-4" /> Habit Baru
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="mt-4 bg-white border border-slate-200/70 rounded-2xl p-5 flex gap-3">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nama habit, mis. Minum Air..."
            className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm border-none outline-none focus:ring-2 focus:ring-brand/30"
            onKeyDown={(e) => e.key === "Enter" && newTitle && createMut.mutate(newTitle)}
            autoFocus
          />
          <Button onClick={() => newTitle && createMut.mutate(newTitle)} disabled={!newTitle || createMut.isPending} className="rounded-xl">
            Simpan
          </Button>
          <Button variant="outline" onClick={() => setShowAdd(false)} className="rounded-xl">
            Batal
          </Button>
        </div>
      )}

      {/* Habits grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.length === 0 ? (
          <div className="col-span-2 bg-white border border-slate-200/70 rounded-3xl p-10 text-center">
            <div className="text-4xl">🔥</div>
            <p className="mt-3 font-semibold">Belum ada habit</p>
            <p className="text-sm text-slate-500 mt-1">Buat habit baru atau bilang ke AI Chat, "Mau tracking olahraga setiap hari".</p>
          </div>
        ) : (
          habits.map((h) => {
            const done = isCompletedToday(h.id);
            const streak = getStreak(h.id);
            const rate = getRate(h.id);
            return (
              <div key={h.id} className={`bg-white border rounded-2xl p-5 transition-all ${done ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200/70"}`}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => !done && completeMut.mutate(h.id)}
                    disabled={done || completeMut.isPending}
                    className={`size-10 rounded-xl grid place-items-center transition-all ${done ? "bg-emerald-500 text-white" : "bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600"}`}
                  >
                    <Check className="size-5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${done ? "line-through text-slate-400" : ""}`}>{h.title}</div>
                    <div className="text-xs text-slate-500 capitalize">{h.frequency}</div>
                  </div>
                  <button
                    onClick={() => { if (confirm("Hapus habit ini?")) deleteMut.mutate(h.id); }}
                    className="text-slate-300 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Flame className="size-3.5 text-orange-500" />
                    <span className="font-semibold text-slate-700">{streak}</span> hari streak
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Target className="size-3.5 text-blue-500" />
                    <span className="font-semibold text-slate-700">{rate}%</span> completion rate
                  </div>
                </div>
                {/* Mini streak dots (last 7 days) */}
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const d = new Date(today);
                    d.setDate(d.getDate() - (6 - i));
                    const done7 = completions.some((c) => c.habit_id === h.id && isSameDay(new Date(c.completed_at), d));
                    return <div key={i} className={`size-5 rounded-md text-[9px] grid place-items-center font-medium ${done7 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>{d.getDate()}</div>;
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
