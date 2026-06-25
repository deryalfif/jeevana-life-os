import { __toESM } from "../_runtime.mjs";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { convertToModelMessages, require_react, stepCountIs, streamText } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { supabase } from "./client-DFhTWwuO.mjs";
import { boolean, number, object, string, tool } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { createOpenAI } from "../_libs/ai-sdk__openai+zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cfdc3kxs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-VkJQCHX8.css";
function reportError(error, context = {}) {
	if (typeof window === "undefined") return;
	console.error("[Jeevana Error]", error, context);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Jeevana — Your Entire Life, Organized In One Conversation" },
			{
				name: "description",
				content: "Jeevana is an AI Life Operating System. Capture activities, expenses, reminders, and habits through natural conversation."
			},
			{
				name: "author",
				content: "Jeevana"
			},
			{
				property: "og:title",
				content: "Jeevana — Your Entire Life, Organized In One Conversation"
			},
			{
				property: "og:description",
				content: "Jeevana is an AI Life Operating System. Capture activities, expenses, reminders, and habits through natural conversation."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "https://jeevana.app"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Jeevana — Your Entire Life, Organized In One Conversation"
			},
			{
				name: "twitter:description",
				content: "Jeevana is an AI Life Operating System. Capture activities, expenses, reminders, and habits through natural conversation."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "canonical",
				href: "https://jeevana.app"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$17 = () => import("./reset-password-EgUA7LcC.mjs");
var Route$18 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset Password — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./auth-D87Y_572.mjs");
var Route$17 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Masuk — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./route-CGBYTwN-.mjs");
var Route$16 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./routes-BrbL2tRJ.mjs");
var Route$15 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Jeevana — Your Entire Life, Organized In One Conversation" },
		{
			name: "description",
			content: "Jeevana is an AI Life Operating System. Log activities, expenses, reminders, and habits through natural conversation."
		},
		{
			property: "og:title",
			content: "Jeevana — AI Life Operating System"
		},
		{
			property: "og:description",
			content: "Ceritakan harimu, Jeevana akan mengurus sisanya."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
function createAIProvider() {
	return createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
function isNewKey(v) {
	return v.startsWith("sb_publishable_") || v.startsWith("sb_secret_");
}
function makeFetch(key) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
		if (isNewKey(key) && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
		headers.set("apikey", key);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function getUserClient(token) {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
		global: {
			fetch: makeFetch(process.env.SUPABASE_PUBLISHABLE_KEY),
			headers: { Authorization: `Bearer ${token}` }
		},
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
async function loadUserMemories(supabase, userId) {
	const { data } = await supabase.from("memories").select("content").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
	return (data ?? []).map((m) => m.content);
}
async function loadUserPreferences(supabase, userId) {
	const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", userId).single();
	const { data: prefs } = await supabase.from("user_preferences").select("interests, timezone").eq("user_id", userId).single();
	return {
		name: profile?.display_name,
		interests: prefs?.interests,
		timezone: prefs?.timezone ?? "Asia/Jakarta"
	};
}
function buildSystemPrompt(memories, prefs) {
	const memoryBlock = memories.length > 0 ? `\n\nINGATAN TENTANG USER:\n${memories.map((m, i) => `${i + 1}. ${m}`).join("\n")}` : "";
	return `Kamu adalah Jeevana, AI Life Operating System pribadi user. Gaya bicara: santai, hangat, Gen-Z Indonesia, singkat, sering pakai emoji yang relevan (tapi jangan berlebihan).
${prefs.name ? `\nNama panggilan user: ${prefs.name}` : ""}${prefs.interests?.length ? `\nUser tertarik pada: ${prefs.interests.join(", ")}` : ""}${memoryBlock}

Tugas utama: dengerin cerita user dan otomatis catat ke "life log" pakai tools yang tersedia.

Aturan:
- Kalau user cerita aktivitas (olahraga, belajar, kerja, dll) → panggil log_activity.
- Kalau ada pengeluaran (beli sesuatu, bayar) → panggil log_expense. Amount dalam Rupiah angka penuh (25000 bukan 25).
- Kalau ada pemasukan (gaji, freelance, transfer masuk) → panggil log_income.
- Kalau user minta diingatkan → panggil create_reminder. Parse waktu jadi ISO timestamp (timezone ${prefs.timezone ?? "Asia/Jakarta"}, asumsi user di Indonesia).
- Kalau user ngomong tentang kebiasaan (habit) yang mau dilacak atau yang sudah dikerjakan → panggil log_habit.
- Kalau user bilang info penting tentang dirinya yang perlu diingat jangka panjang (pekerjaan, hobi, target hidup, preferensi) → panggil save_memory.
- Kalau cuma curhat / catatan singkat → panggil save_note.
- Boleh panggil beberapa tools sekaligus kalau satu pesan berisi beberapa hal.
- Setelah catat, balas singkat & ramah konfirmasi apa yang udah dicatat. Jangan ulang detail panjang lebar.
- Kalau user cuma tanya / ngobrol biasa tanpa info untuk dicatat, jawab aja normal tanpa panggil tool.
- Kalau user minta insight atau ringkasan, berikan analisis berdasarkan data yang ada.

Tanggal hari ini: ${(/* @__PURE__ */ new Date()).toISOString()}.`;
}
var Route$14 = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const token = (request.headers.get("authorization") ?? "").replace("Bearer ", "").trim();
	if (!token) return new Response("Unauthorized", { status: 401 });
	const supabase = getUserClient(token);
	const { data: userData, error: userErr } = await supabase.auth.getUser();
	if (userErr || !userData.user) return new Response("Unauthorized", { status: 401 });
	const userId = userData.user.id;
	const messages = (await request.json()).messages;
	if (!Array.isArray(messages)) return new Response("messages required", { status: 400 });
	if (!process.env.OPENAI_API_KEY) return new Response("Missing OPENAI_API_KEY", { status: 500 });
	const openai = createAIProvider();
	const [memories, prefs] = await Promise.all([loadUserMemories(supabase, userId), loadUserPreferences(supabase, userId)]);
	const lastUser = [...messages].reverse().find((m) => m.role === "user");
	let userMessageId = null;
	if (lastUser) {
		const text = lastUser.parts.filter((p) => p.type === "text").map((p) => "text" in p ? p.text : "").join("");
		const { data: inserted } = await supabase.from("messages").insert({
			user_id: userId,
			role: "user",
			content: text,
			parts: lastUser.parts
		}).select("id").single();
		userMessageId = inserted?.id ?? null;
	}
	const tools = {
		log_activity: tool({
			description: "Catat aktivitas user (olahraga, belajar, kerja, hobi, dll).",
			inputSchema: object({
				title: string().describe("Judul singkat aktivitas, mis. 'Jogging 5km'"),
				category: string().describe("Kategori: olahraga, belajar, kerja, hobi, sosial, kesehatan, lainnya"),
				duration_minutes: number().optional(),
				occurred_at: string().describe("ISO timestamp kapan aktivitas terjadi")
			}),
			execute: async (args) => {
				const { data, error } = await supabase.from("life_logs").insert({
					user_id: userId,
					type: "activity",
					title: args.title,
					category: args.category,
					duration_minutes: args.duration_minutes ?? null,
					occurred_at: args.occurred_at,
					source_message_id: userMessageId
				}).select("id, title, category, duration_minutes, occurred_at").single();
				if (error) return {
					ok: false,
					error: error.message
				};
				return {
					ok: true,
					type: "activity",
					...data
				};
			}
		}),
		log_expense: tool({
			description: "Catat pengeluaran user. Amount dalam Rupiah angka penuh.",
			inputSchema: object({
				description: string(),
				category: string().describe("Kategori: makanan, transportasi, belanja, tagihan, hiburan, lainnya"),
				amount: number().describe("Jumlah dalam Rupiah, contoh 25000"),
				occurred_at: string()
			}),
			execute: async (args) => {
				const { data, error } = await supabase.from("life_logs").insert({
					user_id: userId,
					type: "expense",
					title: args.description,
					category: args.category,
					amount: args.amount,
					occurred_at: args.occurred_at,
					source_message_id: userMessageId
				}).select("id, title, category, amount, occurred_at").single();
				if (error) return {
					ok: false,
					error: error.message
				};
				return {
					ok: true,
					type: "expense",
					...data
				};
			}
		}),
		log_income: tool({
			description: "Catat pemasukan user.",
			inputSchema: object({
				description: string(),
				amount: number(),
				occurred_at: string()
			}),
			execute: async (args) => {
				const { data, error } = await supabase.from("life_logs").insert({
					user_id: userId,
					type: "income",
					title: args.description,
					category: "pemasukan",
					amount: args.amount,
					occurred_at: args.occurred_at,
					source_message_id: userMessageId
				}).select("id, title, amount, occurred_at").single();
				if (error) return {
					ok: false,
					error: error.message
				};
				return {
					ok: true,
					type: "income",
					...data
				};
			}
		}),
		create_reminder: tool({
			description: "Bikin pengingat untuk user di waktu tertentu.",
			inputSchema: object({
				title: string(),
				remind_at: string().describe("ISO timestamp kapan harus diingatkan"),
				notes: string().optional()
			}),
			execute: async (args) => {
				const { data: logRow, error: logErr } = await supabase.from("life_logs").insert({
					user_id: userId,
					type: "reminder",
					title: args.title,
					category: "reminder",
					occurred_at: args.remind_at,
					metadata: { notes: args.notes ?? null },
					source_message_id: userMessageId
				}).select("id").single();
				if (logErr) return {
					ok: false,
					error: logErr.message
				};
				const { error: remErr } = await supabase.from("reminders").insert({
					user_id: userId,
					life_log_id: logRow.id,
					title: args.title,
					remind_at: args.remind_at
				});
				if (remErr) return {
					ok: false,
					error: remErr.message
				};
				return {
					ok: true,
					type: "reminder",
					title: args.title,
					remind_at: args.remind_at
				};
			}
		}),
		log_habit: tool({
			description: "Catat kebiasaan user atau buat habit baru. Jika habit sudah ada, tandai sebagai selesai hari ini.",
			inputSchema: object({
				title: string().describe("Nama habit, mis. 'Minum air', 'Olahraga', 'Membaca'"),
				completed: boolean().default(true).describe("Apakah habit sudah dilakukan hari ini")
			}),
			execute: async (args) => {
				let { data: habit } = await supabase.from("habits").select("id, title").eq("user_id", userId).ilike("title", args.title).single();
				if (!habit) {
					const { data: newHabit, error: createErr } = await supabase.from("habits").insert({
						user_id: userId,
						title: args.title
					}).select("id, title").single();
					if (createErr) return {
						ok: false,
						error: createErr.message
					};
					habit = newHabit;
				}
				if (args.completed && habit) {
					const { error: compErr } = await supabase.from("habit_completions").insert({
						habit_id: habit.id,
						user_id: userId
					});
					if (compErr) return {
						ok: false,
						error: compErr.message
					};
				}
				await supabase.from("life_logs").insert({
					user_id: userId,
					type: "activity",
					title: `Habit: ${args.title}`,
					category: "habit",
					occurred_at: (/* @__PURE__ */ new Date()).toISOString(),
					source_message_id: userMessageId
				});
				return {
					ok: true,
					type: "habit",
					title: habit?.title ?? args.title,
					completed: args.completed
				};
			}
		}),
		save_memory: tool({
			description: "Simpan informasi penting tentang user untuk diingat jangka panjang (pekerjaan, hobi, tujuan hidup, preferensi).",
			inputSchema: object({ content: string().describe("Informasi yang perlu diingat, mis. 'Bekerja sebagai Data Analyst'") }),
			execute: async (args) => {
				const { data, error } = await supabase.from("memories").insert({
					user_id: userId,
					content: args.content
				}).select("id, content").single();
				if (error) return {
					ok: false,
					error: error.message
				};
				return {
					ok: true,
					type: "memory",
					...data
				};
			}
		}),
		save_note: tool({
			description: "Simpan catatan / curhat / pemikiran user.",
			inputSchema: object({ content: string() }),
			execute: async (args) => {
				const { data, error } = await supabase.from("life_logs").insert({
					user_id: userId,
					type: "note",
					title: args.content.slice(0, 80),
					category: "note",
					metadata: { content: args.content },
					source_message_id: userMessageId
				}).select("id, title").single();
				if (error) return {
					ok: false,
					error: error.message
				};
				return {
					ok: true,
					type: "note",
					...data
				};
			}
		})
	};
	return streamText({
		model: openai("gpt-4o-mini"),
		system: buildSystemPrompt(memories, prefs),
		messages: await convertToModelMessages(messages),
		tools,
		stopWhen: stepCountIs(50)
	}).toUIMessageStreamResponse({
		originalMessages: messages,
		onFinish: async ({ messages: finalMessages }) => {
			const last = finalMessages[finalMessages.length - 1];
			if (last && last.role === "assistant") {
				const text = last.parts.filter((p) => p.type === "text").map((p) => "text" in p ? p.text : "").join("");
				await supabase.from("messages").insert({
					user_id: userId,
					role: "assistant",
					content: text,
					parts: last.parts
				});
			}
		},
		onError: (err) => {
			console.error("[chat] stream error", err);
			return err instanceof Error ? err.message : "Stream error";
		}
	});
} } } });
var $$splitComponentImporter$13 = () => import("./settings-CZqrdRea.mjs");
var Route$13 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Pengaturan — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./reminders-7L9hugnl.mjs");
var Route$12 = createFileRoute("/_authenticated/reminders")({
	head: () => ({ meta: [{ title: "Pengingat — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./onboarding-CkaLUYD0.mjs");
var Route$11 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [{ title: "Selamat Datang — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./memories-jFYlR8UJ.mjs");
var Route$10 = createFileRoute("/_authenticated/memories")({
	head: () => ({ meta: [{ title: "Memory Center — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./logs-BCXaQRyb.mjs");
var Route$9 = createFileRoute("/_authenticated/logs")({
	head: () => ({ meta: [{ title: "Life Logs — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./insights-avGVuYkO.mjs");
var Route$8 = createFileRoute("/_authenticated/insights")({
	head: () => ({ meta: [{ title: "Insights — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./habits-zdxsp-ct.mjs");
var Route$7 = createFileRoute("/_authenticated/habits")({
	head: () => ({ meta: [{ title: "Habits — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./finance-B4Q0q1YC.mjs");
var Route$6 = createFileRoute("/_authenticated/finance")({
	head: () => ({ meta: [{ title: "Keuangan — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./feed-BHAsPXRr.mjs");
var Route$5 = createFileRoute("/_authenticated/feed")({
	head: () => ({ meta: [{ title: "Life Feed — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-0ed6PdZE.mjs");
var Route$4 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./chat-C9P7iXO5.mjs");
var Route$3 = createFileRoute("/_authenticated/chat")({
	head: () => ({ meta: [{ title: "Chat — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./calendar-D3NukGWZ.mjs");
var Route$2 = createFileRoute("/_authenticated/calendar")({
	head: () => ({ meta: [{ title: "Kalender — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin-NsdYF90H.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Admin Panel — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./activities-DwsdtlSS.mjs");
var Route = createFileRoute("/_authenticated/activities")({
	head: () => ({ meta: [{ title: "Aktivitas — Jeevana" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ResetPasswordRoute = Route$18.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$19
});
var AuthRoute = Route$17.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRoute = Route$16.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var ApiChatRoute = Route$14.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$19
});
var AuthenticatedSettingsRoute = Route$13.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRemindersRoute = Route$12.update({
	id: "/reminders",
	path: "/reminders",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$11.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMemoriesRoute = Route$10.update({
	id: "/memories",
	path: "/memories",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLogsRoute = Route$9.update({
	id: "/logs",
	path: "/logs",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInsightsRoute = Route$8.update({
	id: "/insights",
	path: "/insights",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHabitsRoute = Route$7.update({
	id: "/habits",
	path: "/habits",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceRoute = Route$6.update({
	id: "/finance",
	path: "/finance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFeedRoute = Route$5.update({
	id: "/feed",
	path: "/feed",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedChatRoute = Route$3.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCalendarRoute = Route$2.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedActivitiesRoute: Route.update({
		id: "/activities",
		path: "/activities",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedAdminRoute,
	AuthenticatedCalendarRoute,
	AuthenticatedChatRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedFeedRoute,
	AuthenticatedFinanceRoute,
	AuthenticatedHabitsRoute,
	AuthenticatedInsightsRoute,
	AuthenticatedLogsRoute,
	AuthenticatedMemoriesRoute,
	AuthenticatedOnboardingRoute,
	AuthenticatedRemindersRoute,
	AuthenticatedSettingsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ResetPasswordRoute,
	ApiChatRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
