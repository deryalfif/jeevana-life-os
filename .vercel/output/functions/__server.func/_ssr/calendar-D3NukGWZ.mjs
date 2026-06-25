import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchLifeLogs, fetchReminders, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { CalendarDays, ChevronLeft, ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-D3NukGWZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function CalendarScreen() {
	const fetchLogsFn = useServerFn(fetchLifeLogs);
	const fetchRemindersFn = useServerFn(fetchReminders);
	const { data: logs = [] } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetchLogsFn()
	});
	const { data: reminders = [] } = useQuery({
		queryKey: ["reminders"],
		queryFn: () => fetchRemindersFn()
	});
	const [view, setView] = (0, import_react.useState)("month");
	const [current, setCurrent] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const today = /* @__PURE__ */ new Date();
	const year = current.getFullYear();
	const month = current.getMonth();
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const startDow = firstDay.getDay();
	const daysInMonth = lastDay.getDate();
	const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
	const nextMonth = () => setCurrent(new Date(year, month + 1, 1));
	const eventsForDay = (d) => {
		return {
			logs: logs.filter((l) => isSameDay(new Date(l.occurred_at), d)),
			reminders: reminders.filter((r) => isSameDay(new Date(r.remind_at), d))
		};
	};
	const weekStart = (0, import_react.useMemo)(() => {
		const d = new Date(current);
		d.setDate(d.getDate() - d.getDay());
		return d;
	}, [current]);
	const weekDays = Array.from({ length: 7 }, (_, i) => {
		const d = new Date(weekStart);
		d.setDate(d.getDate() + i);
		return d;
	});
	const agendaDays = (0, import_react.useMemo)(() => {
		return Array.from({ length: 14 }, (_, i) => {
			const d = new Date(today);
			d.setDate(d.getDate() + i);
			return d;
		}).filter((d) => {
			const ev = eventsForDay(d);
			return ev.logs.length > 0 || ev.reminders.length > 0;
		});
	}, [logs, reminders]);
	const typeColors = {
		activity: "bg-blue-500",
		expense: "bg-red-400",
		income: "bg-emerald-500",
		reminder: "bg-amber-500",
		note: "bg-slate-400"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight font-display",
					children: "Kalender"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 mt-1",
					children: "Lihat aktivitas dan pengingat dalam tampilan kalender."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex bg-white border border-slate-200 rounded-xl overflow-hidden",
					children: [
						"month",
						"week",
						"agenda"
					].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setView(v),
						className: `px-4 py-2 text-xs font-medium capitalize transition-colors ${view === v ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-50"}`,
						children: v === "month" ? "Bulan" : v === "week" ? "Minggu" : "Agenda"
					}, v))
				})]
			}),
			view === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 border-b border-slate-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: prevMonth,
								className: "p-2 hover:bg-slate-100 rounded-xl transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display font-semibold",
								children: current.toLocaleDateString("id-ID", {
									month: "long",
									year: "numeric"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: nextMonth,
								className: "p-2 hover:bg-slate-100 rounded-xl transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 text-center text-xs text-slate-500 font-medium border-b border-slate-100",
						children: [
							"Min",
							"Sen",
							"Sel",
							"Rab",
							"Kam",
							"Jum",
							"Sab"
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-2",
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-7",
						children: [Array.from({ length: startDow }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-[80px] border-b border-r border-slate-50" }, `e-${i}`)), Array.from({ length: daysInMonth }, (_, i) => {
							const d = new Date(year, month, i + 1);
							const ev = eventsForDay(d);
							const isToday = isSameDay(d, today);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `min-h-[80px] p-1.5 border-b border-r border-slate-50 ${isToday ? "bg-blue-50/50" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-xs font-medium mb-1 ${isToday ? "text-white bg-brand size-6 rounded-full grid place-items-center" : "text-slate-600 pl-1"}`,
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [
										ev.logs.slice(0, 2).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-[10px] px-1.5 py-0.5 rounded truncate text-white ${typeColors[l.type] ?? "bg-slate-400"}`,
											children: l.title
										}, l.id)),
										ev.reminders.slice(0, 1).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] px-1.5 py-0.5 rounded truncate text-white bg-amber-500",
											children: ["🔔 ", r.title]
										}, r.id)),
										ev.logs.length + ev.reminders.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-slate-400 pl-1",
											children: [
												"+",
												ev.logs.length + ev.reminders.length - 3,
												" lagi"
											]
										})
									]
								})]
							}, i);
						})]
					})
				]
			}),
			view === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 border-b border-slate-100",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								const d = new Date(current);
								d.setDate(d.getDate() - 7);
								setCurrent(d);
							},
							className: "p-2 hover:bg-slate-100 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display font-semibold text-sm",
							children: [
								weekDays[0].toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short"
								}),
								" — ",
								weekDays[6].toLocaleDateString("id-ID", {
									day: "numeric",
									month: "short",
									year: "numeric"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								const d = new Date(current);
								d.setDate(d.getDate() + 7);
								setCurrent(d);
							},
							className: "p-2 hover:bg-slate-100 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-slate-100",
					children: weekDays.map((d) => {
						const ev = eventsForDay(d);
						const isToday = isSameDay(d, today);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-4 ${isToday ? "bg-blue-50/30" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-sm font-semibold ${isToday ? "text-brand" : "text-slate-600"}`,
									children: d.toLocaleDateString("id-ID", {
										weekday: "short",
										day: "numeric",
										month: "short"
									})
								}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] bg-brand text-white px-2 py-0.5 rounded-full",
									children: "Hari ini"
								})]
							}), ev.logs.length === 0 && ev.reminders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400",
								children: "Tidak ada event"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1",
								children: [...ev.logs, ...ev.reminders.map((r) => ({
									id: r.id,
									type: "reminder",
									title: `🔔 ${r.title}`,
									occurred_at: r.remind_at
								}))].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-2 rounded-full ${typeColors[e.type] ?? "bg-slate-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.title })]
								}, e.id))
							})]
						}, d.toISOString());
					})
				})]
			}),
			view === "agenda" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-b border-slate-100 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-semibold text-sm",
						children: "14 Hari ke Depan"
					})]
				}), agendaDays.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-10 text-center text-sm text-slate-400",
					children: "Tidak ada event dalam 14 hari ke depan"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-slate-100",
					children: agendaDays.map((d) => {
						const ev = eventsForDay(d);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-slate-500 uppercase mb-2",
								children: d.toLocaleDateString("id-ID", {
									weekday: "long",
									day: "numeric",
									month: "long"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [ev.logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `size-2 rounded-full ${typeColors[l.type] ?? "bg-slate-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.title })]
								}, l.id)), ev.reminders.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2 rounded-full bg-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["🔔 ", r.title] })]
								}, r.id))]
							})]
						}, d.toISOString());
					})
				})]
			})
		]
	});
}
var SplitComponent = CalendarScreen;
//#endregion
export { SplitComponent as component };
