import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchLifeLogs, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { Activity, Bell, ShoppingBag, StickyNote, Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-BHAsPXRr.js
var import_jsx_runtime = require_jsx_runtime();
function formatIDR(n) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(n);
}
function iconFor(t) {
	switch (t) {
		case "activity": return {
			Icon: Activity,
			bg: "bg-blue-50 text-blue-600"
		};
		case "expense": return {
			Icon: ShoppingBag,
			bg: "bg-rose-50 text-rose-600"
		};
		case "income": return {
			Icon: Wallet,
			bg: "bg-emerald-50 text-emerald-600"
		};
		case "reminder": return {
			Icon: Bell,
			bg: "bg-amber-50 text-amber-700"
		};
		case "note": return {
			Icon: StickyNote,
			bg: "bg-slate-100 text-slate-600"
		};
	}
}
function groupLabel(date) {
	const today = /* @__PURE__ */ new Date();
	const yest = /* @__PURE__ */ new Date();
	yest.setDate(yest.getDate() - 1);
	const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
	if (sameDay(date, today)) return "Hari ini";
	if (sameDay(date, yest)) return "Kemarin";
	return new Intl.DateTimeFormat("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(date);
}
function FeedScreen() {
	const fetch = useServerFn(fetchLifeLogs);
	const { data, isLoading } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetch()
	});
	const groups = /* @__PURE__ */ new Map();
	(data ?? []).forEach((log) => {
		const k = groupLabel(new Date(log.occurred_at));
		if (!groups.has(k)) groups.set(k, []);
		groups.get(k).push(log);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Life Feed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Semua momen hidupmu, tersusun rapi."
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-slate-400",
				children: "Memuat..."
			}),
			!isLoading && (data?.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 bg-white border border-slate-200/70 rounded-3xl p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl",
						children: "📭"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-semibold",
						children: "Belum ada cerita"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500 mt-1",
						children: "Mulai ngobrol di tab Chat — entri akan muncul di sini otomatis."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-8",
				children: Array.from(groups.entries()).map(([day, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold uppercase tracking-wider text-slate-400",
					children: day
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 space-y-2",
					children: items.map((log) => {
						const { Icon, bg } = iconFor(log.type);
						const time = new Date(log.occurred_at).toLocaleTimeString("id-ID", {
							hour: "2-digit",
							minute: "2-digit"
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "bg-white border border-slate-200/70 rounded-2xl p-4 flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `size-9 rounded-xl grid place-items-center ${bg}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-sm",
										children: log.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-slate-500 mt-0.5 flex flex-wrap gap-x-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: time }),
											log.category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", log.category] }),
											log.duration_minutes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"· ",
												log.duration_minutes,
												" mnt"
											] })
										]
									})]
								}),
								log.amount != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `text-sm font-semibold ${log.type === "income" ? "text-emerald-600" : "text-rose-600"}`,
									children: [log.type === "income" ? "+" : "−", formatIDR(Number(log.amount))]
								})
							]
						}, log.id);
					})
				})] }, day))
			})
		]
	});
}
var SplitComponent = FeedScreen;
//#endregion
export { SplitComponent as component };
