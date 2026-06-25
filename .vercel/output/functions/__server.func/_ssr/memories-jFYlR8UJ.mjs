import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { createMemory, deleteMemory, fetchMemories, updateMemory, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useMutation, useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { Brain, Pencil, Plus, Save, Trash2, X } from "../_libs/lucide-react.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/memories-jFYlR8UJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MemoriesScreen() {
	const qc = useQueryClient();
	const fetchFn = useServerFn(fetchMemories);
	const createFn = useServerFn(createMemory);
	const deleteFn = useServerFn(deleteMemory);
	const updateFn = useServerFn(updateMemory);
	const { data: memories = [], isLoading } = useQuery({
		queryKey: ["memories"],
		queryFn: () => fetchFn()
	});
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [newContent, setNewContent] = (0, import_react.useState)("");
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [editContent, setEditContent] = (0, import_react.useState)("");
	const createMut = useMutation({
		mutationFn: (content) => createFn({ data: { content } }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["memories"] });
			setShowAdd(false);
			setNewContent("");
		}
	});
	const deleteMut = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["memories"] })
	});
	const updateMut = useMutation({
		mutationFn: ({ id, content }) => updateFn({ data: {
			id,
			content
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["memories"] });
			setEditId(null);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight font-display",
					children: "Memory Center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 mt-1",
					children: "Hal-hal penting tentangmu yang diingat Jeevana."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setShowAdd(true),
					className: "rounded-xl gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Tambah Memory"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 bg-gradient-to-r from-grape/10 to-brand/10 border border-grape/20 rounded-2xl p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-5 text-grape mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-sm",
						children: "Apa itu Memory?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-600 mt-1",
						children: "Memory adalah informasi tentang dirimu yang diingat AI secara jangka panjang — pekerjaanmu, hobimu, tujuan hidupmu. Semakin banyak memory, semakin personal AI-nya. Kamu bisa menambah, edit, atau hapus memory kapan saja."
					})] })]
				})
			}),
			showAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 bg-white border border-slate-200/70 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: newContent,
					onChange: (e) => setNewContent(e.target.value),
					placeholder: "Contoh: \"Saya bekerja sebagai Data Analyst di startup fintech.\"",
					className: "w-full bg-slate-50 rounded-xl px-4 py-3 text-sm border-none outline-none focus:ring-2 focus:ring-brand/30 resize-none",
					rows: 3,
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 mt-3 justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setShowAdd(false),
						className: "rounded-xl",
						children: "Batal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => newContent && createMut.mutate(newContent),
						disabled: !newContent || createMut.isPending,
						className: "rounded-xl",
						children: "Simpan"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-3",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl p-10 text-center text-sm text-slate-400",
					children: "Memuat..."
				}) : memories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-slate-200/70 rounded-3xl p-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl",
							children: "🧠"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-semibold",
							children: "Belum ada memory"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500 mt-1",
							children: "Ceritakan tentang dirimu di AI Chat, misalnya \"Saya bekerja sebagai developer\" — AI akan otomatis menyimpannya."
						})
					]
				}) : memories.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-slate-200/70 rounded-2xl p-5 group",
					children: editId === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: editContent,
						onChange: (e) => setEditContent(e.target.value),
						className: "w-full bg-slate-50 rounded-xl px-4 py-3 text-sm border-none outline-none focus:ring-2 focus:ring-brand/30 resize-none",
						rows: 3,
						autoFocus: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mt-2 justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setEditId(null),
							className: "text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), " Batal"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => updateMut.mutate({
								id: m.id,
								content: editContent
							}),
							className: "text-xs text-brand hover:text-brand/80 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3" }), " Simpan"]
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-9 rounded-xl bg-grape/10 text-grape grid place-items-center shrink-0 mt-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: m.content
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-400 mt-2",
									children: ["Disimpan ", new Date(m.created_at).toLocaleDateString("id-ID", {
										day: "numeric",
										month: "long",
										year: "numeric"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setEditId(m.id);
										setEditContent(m.content);
									},
									className: "p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (confirm("Hapus memory ini?")) deleteMut.mutate(m.id);
									},
									className: "p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							})
						]
					})
				}, m.id))
			})
		]
	});
}
var SplitComponent = MemoriesScreen;
//#endregion
export { SplitComponent as component };
