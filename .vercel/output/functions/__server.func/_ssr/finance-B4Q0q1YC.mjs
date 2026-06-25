import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchLifeLogs, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { PiggyBank, ShoppingBag, TrendingDown, TrendingUp, Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance-B4Q0q1YC.js
var import_jsx_runtime = require_jsx_runtime();
function formatRp(n) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(n);
}
function FinanceScreen() {
	const fetch = useServerFn(fetchLifeLogs);
	const { data, isLoading } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetch()
	});
	const logs = data ?? [];
	const now = /* @__PURE__ */ new Date();
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
	const catMap = /* @__PURE__ */ new Map();
	expenses.forEach((e) => {
		const cat = e.category ?? "lainnya";
		catMap.set(cat, (catMap.get(cat) ?? 0) + (e.amount ?? 0));
	});
	const categories = [...catMap.entries()].sort((a, b) => b[1] - a[1]).map(([cat, amt]) => ({
		cat,
		amt,
		pct: totalExpense > 0 ? Math.round(amt / totalExpense * 100) : 0
	}));
	const dailyData = [];
	for (let i = 6; i >= 0; i--) {
		const d = new Date(now);
		d.setDate(d.getDate() - i);
		const dayExpenses = logs.filter((l) => l.type === "expense" && new Date(l.occurred_at).toDateString() === d.toDateString()).reduce((s, l) => s + (l.amount ?? 0), 0);
		dailyData.push({
			label: d.toLocaleDateString("id-ID", { weekday: "short" }),
			amount: dayExpenses
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
		"bg-indigo-500"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight font-display",
				children: "Keuangan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-slate-500 mt-1",
				children: [
					"Ringkasan keuanganmu bulan ",
					now.toLocaleDateString("id-ID", {
						month: "long",
						year: "numeric"
					}),
					"."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-emerald-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Pemasukan"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold mt-2 text-emerald-700",
								children: formatRp(totalIncome)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-400",
								children: [incomes.length, " transaksi"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-red-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Pengeluaran"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold mt-2 text-red-600",
								children: formatRp(totalExpense)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-400",
								children: [expenses.length, " transaksi"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-brand",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Saldo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-2xl font-bold mt-2 ${balance >= 0 ? "text-emerald-700" : "text-red-600"}`,
								children: formatRp(balance)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: "pemasukan - pengeluaran"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4",
						children: "Pengeluaran 7 Hari Terakhir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end gap-2 h-32",
						children: dailyData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-slate-400 font-medium",
									children: d.amount > 0 ? `${Math.round(d.amount / 1e3)}k` : ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-brand/80 rounded-t-lg transition-all",
									style: {
										height: `${d.amount / maxDaily * 100}%`,
										minHeight: d.amount > 0 ? "4px" : "2px"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-slate-500",
									children: d.label
								})
							]
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4",
						children: "Kategori Pengeluaran"
					}), categories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-sm text-slate-400 py-8",
						children: "Belum ada data"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: categories.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize font-medium",
								children: c.cat
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-500",
								children: [
									formatRp(c.amt),
									" (",
									c.pct,
									"%)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 bg-slate-100 rounded-full overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full rounded-full ${catColors[i % catColors.length]}`,
								style: { width: `${c.pct}%` }
							})
						})] }, c.cat))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 py-3 border-b border-slate-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs uppercase tracking-wider text-slate-500 font-semibold",
						children: "Transaksi Terbaru"
					})
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-10 text-center text-sm text-slate-400",
					children: "Memuat..."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-slate-100",
					children: [[...expenses, ...incomes].sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()).slice(0, 30).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-4 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `size-9 rounded-xl grid place-items-center ${t.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`,
								children: t.type === "income" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-sm truncate",
									children: t.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-slate-500 mt-0.5 capitalize",
									children: t.category
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `font-semibold text-sm ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`,
								children: [t.type === "income" ? "+" : "-", formatRp(t.amount ?? 0)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: new Date(t.occurred_at).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short"
								})
							})
						]
					}, t.id)), expenses.length === 0 && incomes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-4xl",
								children: "💰"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-semibold",
								children: "Belum ada transaksi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-500 mt-1",
								children: "Bilang ke AI, \"Beli kopi 25 ribu\" atau \"Dibayar freelance 2 juta\"."
							})
						]
					})]
				})]
			})
		]
	});
}
var SplitComponent = FinanceScreen;
//#endregion
export { SplitComponent as component };
