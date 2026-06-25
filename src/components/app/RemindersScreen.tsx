import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchReminders, updateReminderStatus } from "@/lib/jeevana.functions";
import { Bell, Check, Clock, AlertCircle } from "lucide-react";

export function RemindersScreen() {
  const qc = useQueryClient();
  const fetchFn = useServerFn(fetchReminders);
  const updateFn = useServerFn(updateReminderStatus);

  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => fetchFn(),
  });

  const markDone = useMutation({
    mutationFn: (id: string) => updateFn({ data: { id, status: "completed" } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reminders"] }),
  });

  const now = new Date();
  const upcoming = reminders.filter((r) => r.status === "pending" && new Date(r.remind_at) > now);
  const overdue = reminders.filter((r) => r.status === "pending" && new Date(r.remind_at) <= now);
  const completed = reminders.filter((r) => r.status === "completed");

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Pengingat</h1>
        <p className="text-slate-500 mt-1">Biar gak lupa hal-hal penting.</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-amber-600">
            <Clock className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Mendatang</span>
          </div>
          <div className="text-2xl font-bold mt-2">{upcoming.length}</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Terlewat</span>
          </div>
          <div className="text-2xl font-bold mt-2">{overdue.length}</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-emerald-600">
            <Check className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Selesai</span>
          </div>
          <div className="text-2xl font-bold mt-2">{completed.length}</div>
        </div>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs uppercase tracking-wider text-red-500 font-semibold mb-3">⚠️ Terlewat</h2>
          <div className="space-y-2">
            {overdue.map((r) => (
              <div key={r.id} className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className="size-9 rounded-xl bg-red-100 text-red-500 grid place-items-center">
                  <AlertCircle className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{r.title}</div>
                  <div className="text-xs text-red-400 mt-0.5">
                    {new Date(r.remind_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <button
                  onClick={() => markDone.mutate(r.id)}
                  className="text-xs bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors"
                >
                  Selesai
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="mt-6">
        <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Mendatang</h2>
        <div className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-slate-400">Memuat...</div>
          ) : upcoming.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl">🔔</div>
              <p className="mt-3 font-semibold">Tidak ada pengingat mendatang</p>
              <p className="text-sm text-slate-500 mt-1">Bilang ke AI, "Ingatkan saya bayar listrik tanggal 10".</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {upcoming.map((r) => (
                <div key={r.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="size-9 rounded-xl bg-amber-50 text-amber-600 grid place-items-center">
                    <Bell className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{r.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {new Date(r.remind_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <button
                    onClick={() => markDone.mutate(r.id)}
                    className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    <Check className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Selesai</h2>
          <div className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
            <div className="divide-y divide-slate-100">
              {completed.slice(0, 20).map((r) => (
                <div key={r.id} className="px-5 py-4 flex items-center gap-4 opacity-60">
                  <div className="size-9 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center">
                    <Check className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-through">{r.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {new Date(r.remind_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
