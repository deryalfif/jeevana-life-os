import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { deleteLifeLog, fetchLifeLogs, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useMutation, useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { Activity, Bell, ShoppingBag, StickyNote, Trash2, Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logs-BCXaQRyb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES = [
	{
		v: "all",
		label: "Semua"
	},
	{
		v: "activity",
		label: "Aktivitas",
		Icon: Activity
	},
	{
		v: "expense",
		label: "Pengeluaran",
		Icon: ShoppingBag
	},
	{
		v: "income",
		label: "Pemasukan",
		Icon: Wallet
	},
	{
		v: "reminder",
		label: "Pengingat",
		Icon: Bell
	},
	{
		v: "note",
		label: "Catatan",
		Icon: StickyNote
	}
];
var fmtIDR = (n) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(n);
function LogsScreen() {
	const fetch = useServerFn(fetchLifeLogs);
	const del = useServerFn(deleteLifeLog);
	const qc = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data } = useQuery({
		queryKey: ["life-logs"],
		queryFn: () => fetch()
	});
	const mut = useMutation({
		mutationFn: (id) => del({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["life-logs"] })
	});
	const logs = (data ?? []).filter((l) => filter === "all" || l.type === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Life Logs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Database semua catatan kamu."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(t.v),
					className: `text-xs px-3 py-1.5 rounded-full border transition ${filter === t.v ? "bg-ink text-white border-ink" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`,
					children: t.label
				}, t.v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
				children: logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-10 text-center text-sm text-slate-400",
					children: "Belum ada data."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-slate-50 text-xs uppercase tracking-wider text-slate-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-3",
								children: "Tipe"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-3",
								children: "Judul"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-3 hidden md:table-cell",
								children: "Kategori"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-right px-4 py-3",
								children: "Jumlah"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-3 hidden md:table-cell",
								children: "Waktu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-slate-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 capitalize text-slate-600",
								children: l.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-medium",
								children: l.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 hidden md:table-cell text-slate-500",
								children: l.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right font-medium",
								children: l.amount != null ? fmtIDR(Number(l.amount)) : l.duration_minutes ? `${l.duration_minutes} mnt` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 hidden md:table-cell text-slate-500",
								children: new Date(l.occurred_at).toLocaleString("id-ID", {
									dateStyle: "short",
									timeStyle: "short"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => mut.mutate(l.id),
									className: "text-slate-400 hover:text-red-600 p-1",
									title: "Hapus",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							})
						]
					}, l.id)) })]
				})
			})
		]
	});
}
var SplitComponent = LogsScreen;
//#endregion
export { SplitComponent as component };
