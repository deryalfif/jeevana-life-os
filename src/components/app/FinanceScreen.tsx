import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchLifeLogs } from "@/lib/jeevana.functions";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, ShoppingBag } from "lucide-react";

type Log = {
  id: string;
  type: string;
  category: string | null;
  title: string;
  amount: number | null;
  occurred_at: string;
};

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export function FinanceScreen() {
  const fetch = useServerFn(fetchLifeLogs);
  const { data, isLoading } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetch() as unknown as Promise<Log[]>,
  });

  const logs = data ?? [];
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthLogs = logs.filter((l) => {
    const d = new Date(l.occurred_at);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const expenses = monthLogs.filter((l) => l.type === "expense");
  const incomes = monthLogs.filter((l) => l.type === "income");
  const totalExpense = expenses.reduce((s, l) => s + (l.amount ?? 0), 0);
  const totalIncome = incomes.reduce((s, l) => s + (l.amount ?? 0), 0);
  const balance = totalIncome - totalExpense;

  // Category breakdown for expenses
  const catMap = new Map<string, number>();
  expenses.forEach((e) => {
    const cat = e.category ?? "lainnya";
    catMap.set(cat, (catMap.get(cat) ?? 0) + (e.amount ?? 0));
  });
  const categories = [...catMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amt]) => ({ cat, amt, pct: totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0 }));

  // Daily spending (last 7 days)
  const dailyData: { label: string; amount: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayExpenses = logs
      .filter((l) => l.type === "expense" && new Date(l.occurred_at).toDateString() === d.toDateString())
      .reduce((s, l) => s + (l.amount ?? 0), 0);
    dailyData.push({
      label: d.toLocaleDateString("id-ID", { weekday: "short" }),
      amount: dayExpenses,
    });
  }
  const maxDaily = Math.max(...dailyData.map((d) => d.amount), 1);

  const catColors = ["bg-blue-500", "bg-grape", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500", "bg-indigo-500"];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Keuangan</h1>
        <p className="text-slate-500 mt-1">
          Ringkasan keuanganmu bulan {now.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Pemasukan</span>
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-700">{formatRp(totalIncome)}</div>
          <div className="text-xs text-slate-400">{incomes.length} transaksi</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-red-500">
            <TrendingDown className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Pengeluaran</span>
          </div>
          <div className="text-2xl font-bold mt-2 text-red-600">{formatRp(totalExpense)}</div>
          <div className="text-xs text-slate-400">{expenses.length} transaksi</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-brand">
            <Wallet className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Saldo</span>
          </div>
          <div className={`text-2xl font-bold mt-2 ${balance >= 0 ? "text-emerald-700" : "text-red-600"}`}>
            {formatRp(balance)}
          </div>
          <div className="text-xs text-slate-400">pemasukan - pengeluaran</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily spending chart */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">Pengeluaran 7 Hari Terakhir</h2>
          <div className="flex items-end gap-2 h-32">
            {dailyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[10px] text-slate-400 font-medium">{d.amount > 0 ? `${Math.round(d.amount / 1000)}k` : ""}</div>
                <div
                  className="w-full bg-brand/80 rounded-t-lg transition-all"
                  style={{ height: `${(d.amount / maxDaily) * 100}%`, minHeight: d.amount > 0 ? "4px" : "2px" }}
                />
                <div className="text-[10px] text-slate-500">{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category pie simulation */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">Kategori Pengeluaran</h2>
          {categories.length === 0 ? (
            <div className="text-center text-sm text-slate-400 py-8">Belum ada data</div>
          ) : (
            <div className="space-y-3">
              {categories.map((c, i) => (
                <div key={c.cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize font-medium">{c.cat}</span>
                    <span className="text-slate-500">{formatRp(c.amt)} ({c.pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${catColors[i % catColors.length]}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Transaksi Terbaru</h2>
        </div>
        {isLoading ? (
          <div className="p-10 text-center text-sm text-slate-400">Memuat...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {[...expenses, ...incomes]
              .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime())
              .slice(0, 30)
              .map((t) => (
                <div key={t.id} className="px-5 py-4 flex items-center gap-4">
                  <div className={`size-9 rounded-xl grid place-items-center ${t.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                    {t.type === "income" ? <PiggyBank className="size-4" /> : <ShoppingBag className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{t.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 capitalize">{t.category}</div>
                  </div>
                  <div className={`font-semibold text-sm ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                    {t.type === "income" ? "+" : "-"}{formatRp(t.amount ?? 0)}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(t.occurred_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </div>
                </div>
              ))}
            {expenses.length === 0 && incomes.length === 0 && (
              <div className="p-10 text-center">
                <div className="text-4xl">💰</div>
                <p className="mt-3 font-semibold">Belum ada transaksi</p>
                <p className="text-sm text-slate-500 mt-1">Bilang ke AI, "Beli kopi 25 ribu" atau "Dibayar freelance 2 juta".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
