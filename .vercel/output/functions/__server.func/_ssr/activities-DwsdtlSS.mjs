import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchLifeLogs, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { Activity, Clock, Flame, TrendingUp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activities-DwsdtlSS.js
var import_jsx_runtime = require_jsx_runtime();
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function ActivitiesScreen() {
	const fetch = useServerFn(fetchLifeLogs);
	const { data, isLoading } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetch()
	});
	const activities = (data ?? []).filter((l) => l.type === "activity");
	const now = /* @__PURE__ */ new Date();
	const todayActs = activities.filter((a) => isSameDay(new Date(a.occurred_at), now));
	const totalMinutes = activities.reduce((s, a) => s + (a.duration_minutes ?? 0), 0);
	const categories = [...new Set(activities.map((a) => a.category).filter(Boolean))];
	const weekAgo = /* @__PURE__ */ new Date();
	weekAgo.setDate(weekAgo.getDate() - 7);
	const weekActs = activities.filter((a) => new Date(a.occurred_at) >= weekAgo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end justify-between flex-wrap gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight font-display",
					children: "Aktivitas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 mt-1",
					children: "Semua aktivitas yang kamu lakukan."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-blue-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Hari ini"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold mt-2",
								children: todayActs.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: "aktivitas"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-emerald-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Minggu ini"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold mt-2",
								children: weekActs.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: "aktivitas"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-grape",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Total durasi"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-2xl font-bold mt-2",
								children: [
									Math.round(totalMinutes / 60),
									"j ",
									totalMinutes % 60,
									"m"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: "tercatat"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-amber-600",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-slate-500",
									children: "Kategori"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold mt-2",
								children: categories.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: "jenis"
							})
						]
					})
				]
			}),
			categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4",
					children: "Per Kategori"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-3 gap-3",
					children: categories.map((cat) => {
						const count = activities.filter((a) => a.category === cat).length;
						const mins = activities.filter((a) => a.category === cat).reduce((s, a) => s + (a.duration_minutes ?? 0), 0);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-50 rounded-2xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium capitalize",
								children: cat
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-500 mt-1",
								children: [
									count,
									" aktivitas · ",
									mins,
									" mnt"
								]
							})]
						}, cat);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-10 text-center text-sm text-slate-400",
					children: "Memuat..."
				}) : activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl",
							children: "🏃"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-semibold",
							children: "Belum ada aktivitas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500 mt-1",
							children: "Ceritakan aktivitasmu di Chat, nanti tercatat otomatis di sini."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-slate-100",
					children: activities.slice(0, 50).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-4 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-9 rounded-xl bg-blue-50 text-blue-600 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-sm",
									children: a.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-slate-500 mt-0.5 flex gap-2",
									children: [a.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: a.category
									}), a.duration_minutes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"· ",
										a.duration_minutes,
										" mnt"
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: new Date(a.occurred_at).toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short"
								})
							})
						]
					}, a.id))
				})
			})
		]
	});
}
var SplitComponent = ActivitiesScreen;
//#endregion
export { SplitComponent as component };
