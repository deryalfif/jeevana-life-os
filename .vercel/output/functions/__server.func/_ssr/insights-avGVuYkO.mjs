import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchGoals, fetchHabitCompletions, fetchHabits, fetchLifeLogs, fetchReminders, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { Activity, Brain, Calendar, Flame, Target, TrendingUp, Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-avGVuYkO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatRp(n) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(n);
}
function InsightsScreen() {
	const fetchLogsFn = useServerFn(fetchLifeLogs);
	const fetchHabitsFn = useServerFn(fetchHabits);
	const fetchCompFn = useServerFn(fetchHabitCompletions);
	const fetchRemindersFn = useServerFn(fetchReminders);
	const fetchGoalsFn = useServerFn(fetchGoals);
	const { data: logs = [] } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetchLogsFn()
	});
	const { data: habits = [] } = useQuery({
		queryKey: ["habits"],
		queryFn: () => fetchHabitsFn()
	});
	const { data: completions = [] } = useQuery({
		queryKey: ["habit-completions"],
		queryFn: () => fetchCompFn()
	});
	const { data: reminders = [] } = useQuery({
		queryKey: ["reminders"],
		queryFn: () => fetchRemindersFn()
	});
	const { data: goals = [] } = useQuery({
		queryKey: ["goals"],
		queryFn: () => fetchGoalsFn()
	});
	const now = /* @__PURE__ */ new Date();
	const thisMonth = now.getMonth();
	const thisYear = now.getFullYear();
	const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
	const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
	const insights = (0, import_react.useMemo)(() => {
		const cards = [];
		const thisMonthExpenses = logs.filter((l) => l.type === "expense" && new Date(l.occurred_at).getMonth() === thisMonth && new Date(l.occurred_at).getFullYear() === thisYear);
		const lastMonthExpenses = logs.filter((l) => l.type === "expense" && new Date(l.occurred_at).getMonth() === lastMonth && new Date(l.occurred_at).getFullYear() === lastMonthYear);
		const thisTotal = thisMonthExpenses.reduce((s, l) => s + (l.amount ?? 0), 0);
		const lastTotal = lastMonthExpenses.reduce((s, l) => s + (l.amount ?? 0), 0);
		if (lastTotal > 0 && thisTotal > 0) {
			const pct = Math.round((thisTotal - lastTotal) / lastTotal * 100);
			if (pct > 0) cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5" }),
				title: `Pengeluaran naik ${pct}% bulan ini`,
				detail: `${formatRp(thisTotal)} vs ${formatRp(lastTotal)} bulan lalu.`,
				color: "from-red-50 to-orange-50 border-red-200"
			});
			else if (pct < 0) cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
				title: `Hemat ${Math.abs(pct)}% dari bulan lalu! 🎉`,
				detail: `${formatRp(thisTotal)} vs ${formatRp(lastTotal)} bulan lalu.`,
				color: "from-emerald-50 to-green-50 border-emerald-200"
			});
		}
		const catMap = /* @__PURE__ */ new Map();
		thisMonthExpenses.forEach((e) => catMap.set(e.category ?? "lainnya", (catMap.get(e.category ?? "lainnya") ?? 0) + (e.amount ?? 0)));
		const topCat = [...catMap.entries()].sort((a, b) => b[1] - a[1])[0];
		if (topCat) {
			const pct = thisTotal > 0 ? Math.round(topCat[1] / thisTotal * 100) : 0;
			cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
				title: `${topCat[0]} = ${pct}% pengeluaran`,
				detail: `Kategori terbesarmu bulan ini adalah ${topCat[0]} (${formatRp(topCat[1])}).`,
				color: "from-blue-50 to-indigo-50 border-blue-200"
			});
		}
		const dayCount = /* @__PURE__ */ new Map();
		logs.filter((l) => l.type === "activity").forEach((l) => {
			const day = new Date(l.occurred_at).getDay();
			dayCount.set(day, (dayCount.get(day) ?? 0) + 1);
		});
		const topDay = [...dayCount.entries()].sort((a, b) => b[1] - a[1])[0];
		if (topDay) {
			const dayNames = [
				"Minggu",
				"Senin",
				"Selasa",
				"Rabu",
				"Kamis",
				"Jumat",
				"Sabtu"
			];
			cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5" }),
				title: `Paling produktif hari ${dayNames[topDay[0]]}`,
				detail: `${topDay[1]} aktivitas tercatat di hari ${dayNames[topDay[0]]}.`,
				color: "from-purple-50 to-pink-50 border-purple-200"
			});
		}
		if (habits.length > 0) {
			const uniqueDays = new Set(completions.map((c) => new Date(c.completed_at).toDateString()));
			const rate = Math.round(uniqueDays.size / 30 * 100);
			cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-5" }),
				title: `Konsistensi habit: ${rate}%`,
				detail: `Kamu menyelesaikan habit di ${uniqueDays.size} dari 30 hari terakhir.`,
				color: rate >= 70 ? "from-emerald-50 to-green-50 border-emerald-200" : "from-amber-50 to-orange-50 border-amber-200"
			});
		}
		const activeGoals = goals.filter((g) => g.status === "active");
		if (activeGoals.length > 0) cards.push({
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5" }),
			title: `${activeGoals.length} target aktif`,
			detail: activeGoals.map((g) => g.title).join(", "),
			color: "from-cyan-50 to-blue-50 border-cyan-200"
		});
		const weekAgo = /* @__PURE__ */ new Date();
		weekAgo.setDate(weekAgo.getDate() - 7);
		const weekActs = logs.filter((l) => l.type === "activity" && new Date(l.occurred_at) >= weekAgo);
		if (weekActs.length > 0) {
			const totalMins = weekActs.reduce((s, l) => s + (l.duration_minutes ?? 0), 0);
			cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5" }),
				title: `${weekActs.length} aktivitas minggu ini`,
				detail: totalMins > 0 ? `Total durasi: ${Math.round(totalMins / 60)} jam ${totalMins % 60} menit.` : "Terus semangat! 💪",
				color: "from-blue-50 to-sky-50 border-blue-200"
			});
		}
		const doneReminders = reminders.filter((r) => r.status === "completed").length;
		const totalReminders = reminders.length;
		if (totalReminders > 0) {
			const rate = Math.round(doneReminders / totalReminders * 100);
			cards.push({
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-5" }),
				title: `${rate}% pengingat selesai`,
				detail: `${doneReminders} dari ${totalReminders} pengingat sudah ditandai selesai.`,
				color: rate >= 80 ? "from-emerald-50 to-green-50 border-emerald-200" : "from-amber-50 to-yellow-50 border-amber-200"
			});
		}
		return cards;
	}, [
		logs,
		habits,
		completions,
		reminders,
		goals
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight font-display",
			children: "Insights"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-slate-500 mt-1",
			children: "Analisis kehidupanmu, dihasilkan dari datamu."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4",
			children: insights.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-2 bg-white border border-slate-200/70 rounded-3xl p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl",
						children: "📊"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-semibold",
						children: "Belum cukup data untuk insight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500 mt-1",
						children: "Mulai catat aktivitas, pengeluaran, dan kebiasaanmu lewat Chat."
					})
				]
			}) : insights.map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `bg-gradient-to-br ${card.color} border rounded-2xl p-6 transition-all hover:shadow-md hover:-translate-y-0.5`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-slate-600 mb-3",
						children: card.icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg",
						children: card.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-600 mt-1",
						children: card.detail
					})
				]
			}, i))
		})]
	});
}
var SplitComponent = InsightsScreen;
//#endregion
export { SplitComponent as component };
