import { Link, Outlet, useNavigate, useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { Activity, Bell, Brain, Calendar, Database, Flame, LayoutGrid, LogOut, MessageCircle, Newspaper, ShieldAlert, Sparkles, TrendingUp, Wallet } from "../_libs/lucide-react.mjs";
import { supabase } from "./client-DFhTWwuO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CGBYTwN-.js
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/chat",
		label: "Chat",
		icon: MessageCircle
	},
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutGrid
	},
	{
		to: "/calendar",
		label: "Kalender",
		icon: Calendar
	},
	{
		to: "/activities",
		label: "Aktivitas",
		icon: Activity
	},
	{
		to: "/habits",
		label: "Habits",
		icon: Flame
	},
	{
		to: "/finance",
		label: "Keuangan",
		icon: Wallet
	},
	{
		to: "/reminders",
		label: "Pengingat",
		icon: Bell
	},
	{
		to: "/memories",
		label: "Memories",
		icon: Brain
	},
	{
		to: "/insights",
		label: "Insights",
		icon: TrendingUp
	},
	{
		to: "/feed",
		label: "Life Feed",
		icon: Newspaper
	},
	{
		to: "/logs",
		label: "Data Mentah",
		icon: Database
	},
	{
		to: "/admin",
		label: "Admin Panel",
		icon: ShieldAlert
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const qc = useQueryClient();
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas font-sans text-ink flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:flex w-60 shrink-0 flex-col border-r border-slate-200/70 bg-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/chat",
					className: "flex items-center gap-2 px-5 h-16 border-b border-slate-200/70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-8 rounded-xl bg-gradient-to-br from-brand to-grape grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold tracking-tight",
						children: "Jeevana"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-3 space-y-1",
					children: nav.map((item) => {
						const active = pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${active ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: signOut,
					className: "m-3 flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-100 hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Keluar"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 min-h-0 pb-16 md:pb-0",
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around py-2 z-30",
				children: nav.slice(0, 4).map((item) => {
					const active = pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: `flex flex-col items-center gap-0.5 text-[10px] px-3 py-1 rounded-lg ${active ? "text-ink" : "text-slate-400"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
					}, item.to);
				})
			})]
		})]
	});
}
function AuthedLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AuthedLayout as component };
