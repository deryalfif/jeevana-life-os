import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { completeHabit, createHabit, deleteHabit, fetchHabitCompletions, fetchHabits, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useMutation, useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { Check, Flame, Plus, Target, Trash2 } from "../_libs/lucide-react.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/habits-zdxsp-ct.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function HabitsScreen() {
	const qc = useQueryClient();
	const fetchHabitsFn = useServerFn(fetchHabits);
	const fetchCompFn = useServerFn(fetchHabitCompletions);
	const createFn = useServerFn(createHabit);
	const completeFn = useServerFn(completeHabit);
	const deleteFn = useServerFn(deleteHabit);
	const { data: habits = [] } = useQuery({
		queryKey: ["habits"],
		queryFn: () => fetchHabitsFn()
	});
	const { data: completions = [] } = useQuery({
		queryKey: ["habit-completions"],
		queryFn: () => fetchCompFn()
	});
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const createMut = useMutation({
		mutationFn: (title) => createFn({ data: { title } }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["habits"] });
			setShowAdd(false);
			setNewTitle("");
		}
	});
	const completeMut = useMutation({
		mutationFn: (habit_id) => completeFn({ data: { habit_id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["habit-completions"] })
	});
	const deleteMut = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] })
	});
	const today = /* @__PURE__ */ new Date();
	function getStreak(habitId) {
		const sorted = completions.filter((c) => c.habit_id === habitId).map((c) => new Date(c.completed_at)).sort((a, b) => b.getTime() - a.getTime());
		if (sorted.length === 0) return 0;
		let streak = 0;
		let check = new Date(today);
		for (const d of sorted) if (isSameDay(d, check)) {
			streak++;
			check.setDate(check.getDate() - 1);
		} else if (d < check) break;
		return streak;
	}
	function isCompletedToday(habitId) {
		return completions.some((c) => c.habit_id === habitId && isSameDay(new Date(c.completed_at), today));
	}
	function getRate(habitId) {
		const last30 = completions.filter((c) => c.habit_id === habitId);
		const uniqueDays = new Set(last30.map((c) => new Date(c.completed_at).toDateString()));
		return Math.round(uniqueDays.size / 30 * 100);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight font-display",
					children: "Habits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 mt-1",
					children: "Bangun kebiasaan baik, satu hari pada satu waktu."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setShowAdd(true),
					className: "rounded-xl gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Habit Baru"]
				})]
			}),
			showAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 bg-white border border-slate-200/70 rounded-2xl p-5 flex gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: newTitle,
						onChange: (e) => setNewTitle(e.target.value),
						placeholder: "Nama habit, mis. Minum Air...",
						className: "flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm border-none outline-none focus:ring-2 focus:ring-brand/30",
						onKeyDown: (e) => e.key === "Enter" && newTitle && createMut.mutate(newTitle),
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => newTitle && createMut.mutate(newTitle),
						disabled: !newTitle || createMut.isPending,
						className: "rounded-xl",
						children: "Simpan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setShowAdd(false),
						className: "rounded-xl",
						children: "Batal"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4",
				children: habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 bg-white border border-slate-200/70 rounded-3xl p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl",
							children: "🔥"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-semibold",
							children: "Belum ada habit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500 mt-1",
							children: "Buat habit baru atau bilang ke AI Chat, \"Mau tracking olahraga setiap hari\"."
						})
					]
				}) : habits.map((h) => {
					const done = isCompletedToday(h.id);
					const streak = getStreak(h.id);
					const rate = getRate(h.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-white border rounded-2xl p-5 transition-all ${done ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200/70"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => !done && completeMut.mutate(h.id),
										disabled: done || completeMut.isPending,
										className: `size-10 rounded-xl grid place-items-center transition-all ${done ? "bg-emerald-500 text-white" : "bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-medium ${done ? "line-through text-slate-400" : ""}`,
											children: h.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-slate-500 capitalize",
											children: h.frequency
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (confirm("Hapus habit ini?")) deleteMut.mutate(h.id);
										},
										className: "text-slate-300 hover:text-red-400 transition-colors p-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-slate-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5 text-orange-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-slate-700",
											children: streak
										}),
										" hari streak"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs text-slate-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3.5 text-blue-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-slate-700",
											children: [rate, "%"]
										}),
										" completion rate"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex gap-1",
								children: Array.from({ length: 7 }).map((_, i) => {
									const d = new Date(today);
									d.setDate(d.getDate() - (6 - i));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `size-5 rounded-md text-[9px] grid place-items-center font-medium ${completions.some((c) => c.habit_id === h.id && isSameDay(new Date(c.completed_at), d)) ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`,
										children: d.getDate()
									}, i);
								})
							})
						]
					}, h.id);
				})
			})
		]
	});
}
var SplitComponent = HabitsScreen;
//#endregion
export { SplitComponent as component };
