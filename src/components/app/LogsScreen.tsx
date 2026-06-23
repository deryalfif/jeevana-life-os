import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchLifeLogs, deleteLifeLog } from "@/lib/jeevana.functions";
import { Trash2, ShoppingBag, Activity, Wallet, Bell, StickyNote } from "lucide-react";

type Log = {
  id: string;
  type: "activity" | "expense" | "income" | "reminder" | "note";
  category: string | null;
  title: string;
  amount: number | null;
  duration_minutes: number | null;
  occurred_at: string;
};

const TYPES = [
  { v: "all", label: "Semua" },
  { v: "activity", label: "Aktivitas", Icon: Activity },
  { v: "expense", label: "Pengeluaran", Icon: ShoppingBag },
  { v: "income", label: "Pemasukan", Icon: Wallet },
  { v: "reminder", label: "Pengingat", Icon: Bell },
  { v: "note", label: "Catatan", Icon: StickyNote },
] as const;

const fmtIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export function LogsScreen() {
  const fetch = useServerFn(fetchLifeLogs);
  const del = useServerFn(deleteLifeLog);
  const qc = useQueryClient();
  const [filter, setFilter] = useState<string>("all");

  const { data } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetch() as unknown as Promise<Log[]>,
  });

  const mut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }) as Promise<unknown>,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["life-logs"] }),
  });

  const logs = (data ?? []).filter((l) => filter === "all" || l.type === filter);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Life Logs</h1>
      <p className="text-slate-500 mt-1">Database semua catatan kamu.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t.v}
            onClick={() => setFilter(t.v)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${
              filter === t.v
                ? "bg-ink text-white border-ink"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">Belum ada data.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left px-4 py-3">Tipe</th>
                <th className="text-left px-4 py-3">Judul</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Kategori</th>
                <th className="text-right px-4 py-3">Jumlah</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Waktu</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 capitalize text-slate-600">{l.type}</td>
                  <td className="px-4 py-3 font-medium">{l.title}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500">{l.category}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {l.amount != null ? fmtIDR(Number(l.amount)) : l.duration_minutes ? `${l.duration_minutes} mnt` : "—"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500">
                    {new Date(l.occurred_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => mut.mutate(l.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Hapus"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
