import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchLifeLogs, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { Activity, Bell, MessageCircle, Sparkles, TrendingUp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-0ed6PdZE.js
var import_jsx_runtime = require_jsx_runtime();
var fmtIDR = (n) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(n);
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function DashboardScreen() {
	const fetch = useServerFn(fetchLifeLogs);
	const { data } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetch()
	});
	const logs = data ?? [];
	const now = /* @__PURE__ */ new Date();
	const today = logs.filter((l) => isSameDay(new Date(l.occurred_at), now));
	const todayExpense = today.filter((l) => l.type === "expense").reduce((s, l) => s + Number(l.amount ?? 0), 0);
	const todayActivities = today.filter((l) => l.type === "activity").length;
	const days = [];
	for (let i = 6; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - i);
		const total = logs.filter((l) => l.type === "expense" && isSameDay(new Date(l.occurred_at), d)).reduce((s, l) => s + Number(l.amount ?? 0), 0);
		days.push({
			label: [
				"Min",
				"Sen",
				"Sel",
				"Rab",
				"Kam",
				"Jum",
				"Sab"
			][d.getDay()],
			total
		});
	}
	const maxDay = Math.max(1, ...days.map((d) => d.total));
	const recentActs = logs.filter((l) => l.type === "activity").slice(0, 4);
	const upcoming = logs.filter((l) => l.type === "reminder" && new Date(l.occurred_at).getTime() >= now.getTime() - 6e4).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto p-6 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Ringkasan hidupmu hari ini."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/chat",
				className: "inline-flex items-center gap-2 bg-ink text-white rounded-xl px-4 py-2 text-sm hover:bg-ink/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Catat sesuatu"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2 bg-gradient-to-br from-ink to-slate-800 text-white rounded-3xl p-6 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-10 -right-10 size-40 rounded-full bg-brand/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-white/60",
								children: "Hari ini"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-4xl font-bold mt-2 tracking-tight",
								children: [today.length, " entri"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-white/60",
									children: "Pengeluaran"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-semibold mt-0.5",
									children: fmtIDR(todayExpense)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-white/60",
									children: "Aktivitas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-semibold mt-0.5",
									children: todayActivities
								})] })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-grape" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Life Score"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl font-bold mt-2 tracking-tight",
							children: Math.min(100, today.length * 12 + 40)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-500 mt-1",
							children: "Skor harian berdasarkan aktivitas."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2 bg-white border border-slate-200/70 rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-slate-500",
							children: "Pengeluaran 7 hari"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex items-end gap-2 h-32",
						children: days.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-t-lg bg-gradient-to-t from-brand to-grape transition-all",
								style: {
									height: `${d.total / maxDay * 100}%`,
									minHeight: d.total > 0 ? 6 : 2
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-400",
								children: d.label
							})]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-slate-500",
							children: "Pengingat"
						})]
					}), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-slate-400",
						children: "Belum ada pengingat."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: upcoming.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium truncate",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-500",
								children: new Date(r.occurred_at).toLocaleString("id-ID", {
									dateStyle: "medium",
									timeStyle: "short"
								})
							})]
						}, r.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-3 bg-white border border-slate-200/70 rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-slate-500",
							children: "Aktivitas terakhir"
						})]
					}), recentActs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-slate-400",
						children: "Belum ada aktivitas tercatat."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3",
						children: recentActs.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50 rounded-2xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-slate-500",
									children: a.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-sm mt-1",
									children: a.title
								}),
								a.duration_minutes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-slate-500 mt-1",
									children: [a.duration_minutes, " mnt"]
								})
							]
						}, a.id))
					})]
				})
			]
		})]
	});
}
var SplitComponent = DashboardScreen;
//#endregion
export { SplitComponent as component };
