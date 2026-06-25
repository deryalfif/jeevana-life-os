import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchReminders, updateReminderStatus, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useMutation, useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { Bell, Check, CircleAlert, Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reminders-7L9hugnl.js
var import_jsx_runtime = require_jsx_runtime();
function RemindersScreen() {
	const qc = useQueryClient();
	const fetchFn = useServerFn(fetchReminders);
	const updateFn = useServerFn(updateReminderStatus);
	const { data: reminders = [], isLoading } = useQuery({
		queryKey: ["reminders"],
		queryFn: () => fetchFn()
	});
	const markDone = useMutation({
		mutationFn: (id) => updateFn({ data: {
			id,
			status: "completed"
		} }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["reminders"] })
	});
	const now = /* @__PURE__ */ new Date();
	const upcoming = reminders.filter((r) => r.status === "pending" && new Date(r.remind_at) > now);
	const overdue = reminders.filter((r) => r.status === "pending" && new Date(r.remind_at) <= now);
	const completed = reminders.filter((r) => r.status === "completed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight font-display",
				children: "Pengingat"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Biar gak lupa hal-hal penting."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-amber-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Mendatang"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold mt-2",
							children: upcoming.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-red-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Terlewat"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold mt-2",
							children: overdue.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-emerald-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Selesai"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold mt-2",
							children: completed.length
						})]
					})
				]
			}),
			overdue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs uppercase tracking-wider text-red-500 font-semibold mb-3",
					children: "⚠️ Terlewat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: overdue.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-9 rounded-xl bg-red-100 text-red-500 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-sm",
									children: r.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-red-400 mt-0.5",
									children: new Date(r.remind_at).toLocaleDateString("id-ID", {
										day: "numeric",
										month: "long",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => markDone.mutate(r.id),
								className: "text-xs bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors",
								children: "Selesai"
							})
						]
					}, r.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3",
					children: "Mendatang"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-10 text-center text-sm text-slate-400",
						children: "Memuat..."
					}) : upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-4xl",
								children: "🔔"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-semibold",
								children: "Tidak ada pengingat mendatang"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-500 mt-1",
								children: "Bilang ke AI, \"Ingatkan saya bayar listrik tanggal 10\"."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-slate-100",
						children: upcoming.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 py-4 flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-9 rounded-xl bg-amber-50 text-amber-600 grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-sm",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-500 mt-0.5",
										children: new Date(r.remind_at).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "long",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => markDone.mutate(r.id),
									className: "text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
								})
							]
						}, r.id))
					})
				})]
			}),
			completed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3",
					children: "Selesai"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-slate-100",
						children: completed.slice(0, 20).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 py-4 flex items-center gap-4 opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-9 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-sm line-through",
									children: r.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-slate-400 mt-0.5",
									children: new Date(r.remind_at).toLocaleDateString("id-ID", {
										day: "numeric",
										month: "short"
									})
								})]
							})]
						}, r.id))
					})
				})]
			})
		]
	});
}
var SplitComponent = RemindersScreen;
//#endregion
export { SplitComponent as component };
