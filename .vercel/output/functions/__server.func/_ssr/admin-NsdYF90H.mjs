import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { fetchAdminStats, fetchAdminUsers, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery } from "../_libs/tanstack__react-query.mjs";
import { Database, MessageSquare, ShieldAlert, Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-NsdYF90H.js
var import_jsx_runtime = require_jsx_runtime();
function AdminScreen() {
	const fetchStatsFn = useServerFn(fetchAdminStats);
	const fetchUsersFn = useServerFn(fetchAdminUsers);
	const { data: stats, error: statsError, isLoading: loadingStats } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: () => fetchStatsFn()
	});
	const { data: users, error: usersError, isLoading: loadingUsers } = useQuery({
		queryKey: ["admin-users"],
		queryFn: () => fetchUsersFn()
	});
	if (statsError || usersError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-16 text-red-500 mx-auto mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Akses Ditolak"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-2",
				children: "Kamu tidak memiliki akses Admin untuk melihat halaman ini."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-red-400 mt-4",
				children: (statsError || usersError)?.message
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight font-display",
				children: "Admin Panel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Sistem overview & manajemen pengguna."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-blue-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Total Users"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-bold mt-2",
							children: loadingStats ? "..." : stats?.totalUsers ?? 0
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-emerald-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Total Life Logs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-bold mt-2",
							children: loadingStats ? "..." : stats?.totalLogs ?? 0
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-slate-200/70 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-grape",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-slate-500",
								children: "Total Messages"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-bold mt-2",
							children: loadingStats ? "..." : stats?.totalMessages ?? 0
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold mb-4 font-display",
					children: "Recent Users"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl overflow-hidden",
					children: loadingUsers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-10 text-center text-sm text-slate-400",
						children: "Memuat data user..."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4 font-medium",
										children: "User ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4 font-medium",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4 font-medium",
										children: "Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4 font-medium",
										children: "Joined"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-slate-100",
								children: users?.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-slate-50/50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 font-mono text-xs text-slate-500",
											children: u.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 font-medium",
											children: u.display_name || "Unknown"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold ${u.role === "admin" || u.role === "super_admin" ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"}`,
												children: u.role
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-slate-500",
											children: new Date(u.created_at).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "short",
												year: "numeric"
											})
										})
									]
								}, u.id))
							})]
						})
					})
				})]
			})
		]
	});
}
var SplitComponent = AdminScreen;
//#endregion
export { SplitComponent as component };
