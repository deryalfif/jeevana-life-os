import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  fetchLifeLogs,
  fetchBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "@/lib/jeevana.functions";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  ShoppingBag,
  Target,
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
} from "lucide-react";

type Log = {
  id: string;
  type: string;
  category: string | null;
  title: string;
  amount: number | null;
  occurred_at: string;
};

type Budget = {
  id: string;
  category: string;
  amount_limit: number;
  period: string;
  created_at: string;
};

function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function BudgetProgressBar({ pct, label }: { pct: number; label?: string }) {
  const clamp = Math.min(pct, 100);
  const color = clamp >= 90 ? "bg-red-500" : clamp >= 70 ? "bg-amber-400" : "bg-emerald-500";
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden" title={label}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${clamp}%` }}
      />
    </div>
  );
}

export function FinanceScreen() {
  const qc = useQueryClient();

  // Server function hooks
  const fetchLogsFn = useServerFn(fetchLifeLogs);
  const fetchBudgetsFn = useServerFn(fetchBudgets);
  const createBudgetFn = useServerFn(createBudget);
  const updateBudgetFn = useServerFn(updateBudget);
  const deleteBudgetFn = useServerFn(deleteBudget);

  const { data, isLoading } = useQuery({
    queryKey: ["life-logs"],
    queryFn: () => fetchLogsFn() as unknown as Promise<Log[]>,
  });

  const { data: budgetsData, isLoading: loadingBudgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => fetchBudgetsFn() as unknown as Promise<Budget[]>,
  });

  // Budget form state
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newPeriod, setNewPeriod] = useState<"monthly" | "weekly">("monthly");
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [editLimit, setEditLimit] = useState("");

  const createBudgetMut = useMutation({
    mutationFn: () =>
      createBudgetFn({
        data: {
          category: newCategory.trim().toLowerCase(),
          amount_limit: Number(newLimit),
          period: newPeriod,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budgets"] });
      setShowBudgetForm(false);
      setNewCategory("");
      setNewLimit("");
    },
  });

  const updateBudgetMut = useMutation({
    mutationFn: (b: Budget) =>
      updateBudgetFn({ data: { id: b.id, amount_limit: Number(editLimit) } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budgets"] });
      setEditingBudget(null);
    },
  });

  const deleteBudgetMut = useMutation({
    mutationFn: (id: string) => deleteBudgetFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["budgets"] }),
  });

  const logs = data ?? [];
  const budgets = budgetsData ?? [];
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

  // Category breakdown for expenses (monthly)
  const catMap = new Map<string, number>();
  expenses.forEach((e) => {
    const cat = e.category ?? "lainnya";
    catMap.set(cat, (catMap.get(cat) ?? 0) + (e.amount ?? 0));
  });
  const categories = [...catMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amt]) => ({
      cat,
      amt,
      pct: totalExpense > 0 ? Math.round((amt / totalExpense) * 100) : 0,
    }));

  // Budget with spent amount
  const budgetsWithSpent = budgets.map((b) => {
    let spent = 0;
    if (b.period === "monthly") {
      spent = expenses
        .filter((e) => (e.category ?? "lainnya") === b.category)
        .reduce((s, e) => s + (e.amount ?? 0), 0);
    } else {
      // weekly: last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      spent = logs
        .filter(
          (l) =>
            l.type === "expense" &&
            (l.category ?? "lainnya") === b.category &&
            new Date(l.occurred_at) >= sevenDaysAgo,
        )
        .reduce((s, l) => s + (l.amount ?? 0), 0);
    }
    return {
      ...b,
      spent,
      pct: b.amount_limit > 0 ? Math.round((spent / b.amount_limit) * 100) : 0,
    };
  });

  // Daily spending (last 7 days)
  const dailyData: { label: string; amount: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayExpenses = logs
      .filter(
        (l) => l.type === "expense" && new Date(l.occurred_at).toDateString() === d.toDateString(),
      )
      .reduce((s, l) => s + (l.amount ?? 0), 0);
    dailyData.push({
      label: d.toLocaleDateString("id-ID", { weekday: "short" }),
      amount: dayExpenses,
    });
  }
  const maxDaily = Math.max(...dailyData.map((d) => d.amount), 1);

  const catColors = [
    "bg-blue-500",
    "bg-grape",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-indigo-500",
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Keuangan</h1>
        <p className="text-slate-500 mt-1">
          Ringkasan keuanganmu bulan{" "}
          {now.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}.
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
          <div
            className={`text-2xl font-bold mt-2 ${balance >= 0 ? "text-emerald-700" : "text-red-600"}`}
          >
            {formatRp(balance)}
          </div>
          <div className="text-xs text-slate-400">pemasukan - pengeluaran</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily spending chart */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">
            Pengeluaran 7 Hari Terakhir
          </h2>
          <div className="flex items-end gap-2 h-32">
            {dailyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[10px] text-slate-400 font-medium">
                  {d.amount > 0 ? `${Math.round(d.amount / 1000)}k` : ""}
                </div>
                <div
                  className="w-full bg-brand/80 rounded-t-lg transition-all"
                  style={{
                    height: `${(d.amount / maxDaily) * 100}%`,
                    minHeight: d.amount > 0 ? "4px" : "2px",
                  }}
                />
                <div className="text-[10px] text-slate-500">{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white border border-slate-200/70 rounded-3xl p-6">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">
            Kategori Pengeluaran
          </h2>
          {categories.length === 0 ? (
            <div className="text-center text-sm text-slate-400 py-8">Belum ada data</div>
          ) : (
            <div className="space-y-3">
              {categories.map((c, i) => (
                <div key={c.cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize font-medium">{c.cat}</span>
                    <span className="text-slate-500">
                      {formatRp(c.amt)} ({c.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${catColors[i % catColors.length]}`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ============================
          BUDGET SECTION (Fase 3)
          ============================ */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="size-5 text-brand" />
            <h2 className="text-xl font-bold font-display">Budget</h2>
          </div>
          <button
            onClick={() => setShowBudgetForm(!showBudgetForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            {showBudgetForm ? (
              <>
                <X className="size-4" /> Batal
              </>
            ) : (
              <>
                <Plus className="size-4" /> Tambah Budget
              </>
            )}
          </button>
        </div>

        {/* Add budget form */}
        {showBudgetForm && (
          <div className="bg-white border border-brand/30 rounded-2xl p-5 mb-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-3 text-slate-700">Budget Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kategori</label>
                <input
                  type="text"
                  placeholder="Contoh: makan, transport..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Limit (Rp)</label>
                <input
                  type="number"
                  placeholder="500000"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Periode</label>
                <select
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value as "monthly" | "weekly")}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 bg-white"
                >
                  <option value="monthly">Bulanan</option>
                  <option value="weekly">Mingguan</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => createBudgetMut.mutate()}
              disabled={
                !newCategory.trim() ||
                !newLimit ||
                Number(newLimit) <= 0 ||
                createBudgetMut.isPending
              }
              className="mt-3 px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createBudgetMut.isPending ? "Menyimpan..." : "Simpan Budget"}
            </button>
          </div>
        )}

        {/* Budget cards */}
        {loadingBudgets ? (
          <div className="text-center text-sm text-slate-400 py-8">Memuat budget...</div>
        ) : budgetsWithSpent.length === 0 ? (
          <div className="bg-white border border-slate-200/70 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <p className="font-semibold">Belum ada budget</p>
            <p className="text-sm text-slate-500 mt-1">
              Tambah budget untuk pantau pengeluaran per kategori.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetsWithSpent.map((b) => (
              <div
                key={b.id}
                className={`bg-white border rounded-2xl p-5 transition-all ${b.pct >= 90 ? "border-red-200" : b.pct >= 70 ? "border-amber-200" : "border-slate-200/70"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="capitalize font-semibold text-slate-800">{b.category}</span>
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
                      {b.period === "monthly" ? "Bulanan" : "Mingguan"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingBudget(b);
                        setEditLimit(String(b.amount_limit));
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand transition-colors"
                      title="Edit"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => deleteBudgetMut.mutate(b.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Edit mode */}
                {editingBudget?.id === b.id ? (
                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      value={editLimit}
                      onChange={(e) => setEditLimit(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                      autoFocus
                    />
                    <button
                      onClick={() => updateBudgetMut.mutate(editingBudget)}
                      disabled={updateBudgetMut.isPending}
                      className="p-2 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors"
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      onClick={() => setEditingBudget(null)}
                      className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">
                      Terpakai:{" "}
                      <span
                        className={`font-semibold ${b.pct >= 90 ? "text-red-600" : b.pct >= 70 ? "text-amber-600" : "text-emerald-700"}`}
                      >
                        {formatRp(b.spent)}
                      </span>
                    </span>
                    <span className="text-slate-400 text-xs">dari {formatRp(b.amount_limit)}</span>
                  </div>
                )}

                <BudgetProgressBar pct={b.pct} label={`${b.pct}% terpakai`} />

                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-medium ${b.pct >= 90 ? "text-red-500" : b.pct >= 70 ? "text-amber-500" : "text-emerald-600"}`}
                  >
                    {b.pct >= 100
                      ? "⚠️ Melebihi budget!"
                      : b.pct >= 90
                        ? "🔴 Hampir habis"
                        : b.pct >= 70
                          ? "🟡 Waspada"
                          : "🟢 Aman"}
                  </span>
                  <span className="text-slate-400">{b.pct}% terpakai</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent transactions */}
      <div className="mt-8 bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Transaksi Terbaru
          </h2>
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
                  <div
                    className={`size-9 rounded-xl grid place-items-center ${t.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}
                  >
                    {t.type === "income" ? (
                      <PiggyBank className="size-4" />
                    ) : (
                      <ShoppingBag className="size-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{t.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 capitalize">{t.category}</div>
                  </div>
                  <div
                    className={`font-semibold text-sm ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatRp(t.amount ?? 0)}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(t.occurred_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              ))}
            {expenses.length === 0 && incomes.length === 0 && (
              <div className="p-10 text-center">
                <div className="text-4xl">💰</div>
                <p className="mt-3 font-semibold">Belum ada transaksi</p>
                <p className="text-sm text-slate-500 mt-1">
                  Bilang ke AI, "Beli kopi 25 ribu" atau "Dibayar freelance 2 juta".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
