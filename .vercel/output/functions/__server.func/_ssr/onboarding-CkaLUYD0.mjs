import { __toESM } from "../_runtime.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { createGoal, createMemory, saveUserPreferences, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useMutation } from "../_libs/tanstack__react-query.mjs";
import { Brain, Check, ChevronRight, Sparkles, Target } from "../_libs/lucide-react.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CkaLUYD0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INTEREST_OPTIONS = [
	{
		id: "activities",
		label: "Aktivitas Harian",
		emoji: "🏃"
	},
	{
		id: "finance",
		label: "Keuangan",
		emoji: "💰"
	},
	{
		id: "habits",
		label: "Kebiasaan",
		emoji: "🔥"
	},
	{
		id: "productivity",
		label: "Produktivitas",
		emoji: "⚡"
	},
	{
		id: "health",
		label: "Kesehatan",
		emoji: "🏥"
	},
	{
		id: "everything",
		label: "Semuanya!",
		emoji: "✨"
	}
];
function OnboardingScreen() {
	const navigate = useNavigate();
	const savePrefsFn = useServerFn(saveUserPreferences);
	const createGoalFn = useServerFn(createGoal);
	const createMemoryFn = useServerFn(createMemory);
	const [step, setStep] = (0, import_react.useState)(1);
	const [interests, setInterests] = (0, import_react.useState)([]);
	const [goals, setGoals] = (0, import_react.useState)([""]);
	const [memories, setMemories] = (0, import_react.useState)([""]);
	const saveMut = useMutation({
		mutationFn: async () => {
			await savePrefsFn({ data: {
				interests,
				onboarding_completed: true
			} });
			for (const g of goals.filter(Boolean)) await createGoalFn({ data: { title: g } });
			for (const m of memories.filter(Boolean)) await createMemoryFn({ data: { content: m } });
		},
		onSuccess: () => navigate({ to: "/chat" })
	});
	const toggleInterest = (id) => {
		if (id === "everything") {
			setInterests(INTEREST_OPTIONS.map((o) => o.id));
			return;
		}
		setInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5 mb-8",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 flex-1 rounded-full transition-all ${s <= step ? "bg-brand" : "bg-slate-200"}` }, s))
				}),
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-6xl mb-6",
							children: "✨"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold font-display tracking-tight",
							children: "Selamat Datang di Jeevana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-500 mt-3 text-lg",
							children: "AI yang bantu kamu mencatat dan memahami hidupmu, cukup lewat chat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setStep(2),
							className: "mt-8 rounded-xl gap-2 px-8 py-3 text-base",
							children: ["Mulai ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})
					]
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-grape" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold font-display tracking-tight",
							children: "Mau Jeevana bantu apa?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500 mb-6",
						children: "Pilih yang sesuai kebutuhanmu."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3",
						children: INTEREST_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggleInterest(o.id),
							className: `p-4 rounded-2xl border text-left transition-all ${interests.includes(o.id) ? "border-brand bg-blue-50 ring-2 ring-brand/20" : "border-slate-200 bg-white hover:border-slate-300"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl",
									children: o.emoji
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 font-medium text-sm",
									children: o.label
								}),
								interests.includes(o.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-brand mt-1" })
							]
						}, o.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setStep(1),
							className: "rounded-xl",
							children: "Kembali"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setStep(3),
							disabled: interests.length === 0,
							className: "rounded-xl gap-2",
							children: ["Lanjut ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})]
					})
				] }),
				step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold font-display tracking-tight",
							children: "Apa target-mu?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500 mb-6",
						children: "Contoh: Menabung Rp1.000.000/bulan, Olahraga 3x seminggu."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [goals.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: g,
							onChange: (e) => {
								const n = [...goals];
								n[i] = e.target.value;
								setGoals(n);
							},
							placeholder: `Target ${i + 1}`,
							className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
						}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setGoals([...goals, ""]),
							className: "text-sm text-brand hover:underline",
							children: "+ Tambah target"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setStep(2),
							className: "rounded-xl",
							children: "Kembali"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setStep(4),
							className: "rounded-xl gap-2",
							children: ["Lanjut ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})]
					})
				] }),
				step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-5 text-grape" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold font-display tracking-tight",
							children: "Ceritakan tentang dirimu"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500 mb-6",
						children: "Biar Jeevana lebih kenal kamu. Contoh: \"Saya Data Analyst di startup.\""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [memories.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: m,
							onChange: (e) => {
								const n = [...memories];
								n[i] = e.target.value;
								setMemories(n);
							},
							placeholder: `Info tentang kamu ${i + 1}`,
							className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
						}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMemories([...memories, ""]),
							className: "text-sm text-grape hover:underline",
							children: "+ Tambah info"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setStep(3),
							className: "rounded-xl",
							children: "Kembali"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setStep(5),
							className: "rounded-xl gap-2",
							children: ["Lanjut ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})]
					})
				] }),
				step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-6xl mb-6",
							children: "🚀"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold font-display tracking-tight",
							children: "Siap dipakai!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-500 mt-3 text-lg",
							children: "Workspace personalmu sudah siap. Sekarang, cukup ngobrol dan biarkan Jeevana mengurus sisanya."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 bg-white border border-slate-200 rounded-2xl p-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3",
								children: "Ringkasan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"✅ ",
										interests.length,
										" bidang minat dipilih"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"🎯 ",
										goals.filter(Boolean).length,
										" target dibuat"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"🧠 ",
										memories.filter(Boolean).length,
										" memory disimpan"
									] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMut.mutate(),
							disabled: saveMut.isPending,
							className: "mt-8 rounded-xl gap-2 px-8 py-3 text-base",
							children: saveMut.isPending ? "Menyiapkan..." : "Mulai Chat dengan Jeevana ✨"
						})
					]
				})
			]
		})
	});
}
var SplitComponent = OnboardingScreen;
//#endregion
export { SplitComponent as component };
