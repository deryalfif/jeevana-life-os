import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  stepCountIs,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { createAIProvider } from "@/lib/ai-gateway.server";

function isNewKey(v: string) {
  return v.startsWith("sb_publishable_") || v.startsWith("sb_secret_");
}
function makeFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined
    );
    if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
    if (isNewKey(key) && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

function getUserClient(token: string) {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        fetch: makeFetch(process.env.SUPABASE_PUBLISHABLE_KEY!),
        headers: { Authorization: `Bearer ${token}` },
      },
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    }
  );
}

async function loadUserMemories(supabase: ReturnType<typeof getUserClient>, userId: string) {
  const { data } = await supabase
    .from("memories")
    .select("content")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);
  return (data ?? []).map((m) => m.content);
}

async function loadUserPreferences(supabase: ReturnType<typeof getUserClient>, userId: string) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", userId)
    .single();
  const { data: prefs } = await supabase
    .from("user_preferences")
    .select("interests, timezone")
    .eq("user_id", userId)
    .single();
  return { name: profile?.display_name, interests: prefs?.interests, timezone: prefs?.timezone ?? "Asia/Jakarta" };
}

function buildSystemPrompt(memories: string[], prefs: { name?: string | null; interests?: string[] | null; timezone?: string }) {
  const memoryBlock = memories.length > 0
    ? `\n\nINGATAN TENTANG USER:\n${memories.map((m, i) => `${i + 1}. ${m}`).join("\n")}`
    : "";
  const nameBlock = prefs.name ? `\nNama panggilan user: ${prefs.name}` : "";
  const interestsBlock = prefs.interests?.length ? `\nUser tertarik pada: ${prefs.interests.join(", ")}` : "";

  return `Kamu adalah Jeevana, AI Life Operating System pribadi user. Gaya bicara: santai, hangat, Gen-Z Indonesia, singkat, sering pakai emoji yang relevan (tapi jangan berlebihan).
${nameBlock}${interestsBlock}${memoryBlock}

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

Tanggal hari ini: ${new Date().toISOString()}.`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization") ?? "";
        const token = authHeader.replace("Bearer ", "").trim();
        if (!token) return new Response("Unauthorized", { status: 401 });

        const supabase = getUserClient(token);
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData.user) return new Response("Unauthorized", { status: 401 });
        const userId = userData.user.id;

        const body = (await request.json()) as { messages?: UIMessage[] };
        const messages = body.messages;
        if (!Array.isArray(messages)) return new Response("messages required", { status: 400 });

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return new Response("Missing OPENAI_API_KEY", { status: 500 });
        const openai = createAIProvider();

        // Load user context
        const [memories, prefs] = await Promise.all([
          loadUserMemories(supabase, userId),
          loadUserPreferences(supabase, userId),
        ]);

        // Persist the latest user message
        const lastUser = [...messages].reverse().find((m) => m.role === "user");
        let userMessageId: string | null = null;
        if (lastUser) {
          const text = lastUser.parts
            .filter((p) => p.type === "text")
            .map((p) => ("text" in p ? p.text : ""))
            .join("");
          const { data: inserted } = await supabase
            .from("messages")
            .insert({ user_id: userId, role: "user", content: text, parts: lastUser.parts as any })
            .select("id")
            .single();
          userMessageId = inserted?.id ?? null;
        }

        const tools = {
          log_activity: tool({
            description: "Catat aktivitas user (olahraga, belajar, kerja, hobi, dll).",
            inputSchema: z.object({
              title: z.string().describe("Judul singkat aktivitas, mis. 'Jogging 5km'"),
              category: z.string().describe("Kategori: olahraga, belajar, kerja, hobi, sosial, kesehatan, lainnya"),
              duration_minutes: z.number().optional(),
              occurred_at: z.string().describe("ISO timestamp kapan aktivitas terjadi"),
            }),
            execute: async (args) => {
              const { data, error } = await supabase
                .from("life_logs")
                .insert({
                  user_id: userId,
                  type: "activity",
                  title: args.title,
                  category: args.category,
                  duration_minutes: args.duration_minutes ?? null,
                  occurred_at: args.occurred_at,
                  source_message_id: userMessageId,
                })
                .select("id, title, category, duration_minutes, occurred_at")
                .single();
              if (error) return { ok: false, error: error.message };
              return { ok: true, type: "activity", ...data };
            },
          }),
          log_expense: tool({
            description: "Catat pengeluaran user. Amount dalam Rupiah angka penuh.",
            inputSchema: z.object({
              description: z.string(),
              category: z.string().describe("Kategori: makanan, transportasi, belanja, tagihan, hiburan, lainnya"),
              amount: z.number().describe("Jumlah dalam Rupiah, contoh 25000"),
              occurred_at: z.string(),
            }),
            execute: async (args) => {
              const { data, error } = await supabase
                .from("life_logs")
                .insert({
                  user_id: userId,
                  type: "expense",
                  title: args.description,
                  category: args.category,
                  amount: args.amount,
                  occurred_at: args.occurred_at,
                  source_message_id: userMessageId,
                })
                .select("id, title, category, amount, occurred_at")
                .single();
              if (error) return { ok: false, error: error.message };
              return { ok: true, type: "expense", ...data };
            },
          }),
          log_income: tool({
            description: "Catat pemasukan user.",
            inputSchema: z.object({
              description: z.string(),
              amount: z.number(),
              occurred_at: z.string(),
            }),
            execute: async (args) => {
              const { data, error } = await supabase
                .from("life_logs")
                .insert({
                  user_id: userId,
                  type: "income",
                  title: args.description,
                  category: "pemasukan",
                  amount: args.amount,
                  occurred_at: args.occurred_at,
                  source_message_id: userMessageId,
                })
                .select("id, title, amount, occurred_at")
                .single();
              if (error) return { ok: false, error: error.message };
              return { ok: true, type: "income", ...data };
            },
          }),
          create_reminder: tool({
            description: "Bikin pengingat untuk user di waktu tertentu.",
            inputSchema: z.object({
              title: z.string(),
              remind_at: z.string().describe("ISO timestamp kapan harus diingatkan"),
              notes: z.string().optional(),
            }),
            execute: async (args) => {
              const { data: logRow, error: logErr } = await supabase
                .from("life_logs")
                .insert({
                  user_id: userId,
                  type: "reminder",
                  title: args.title,
                  category: "reminder",
                  occurred_at: args.remind_at,
                  metadata: { notes: args.notes ?? null },
                  source_message_id: userMessageId,
                })
                .select("id")
                .single();
              if (logErr) return { ok: false, error: logErr.message };
              const { error: remErr } = await supabase.from("reminders").insert({
                user_id: userId,
                life_log_id: logRow.id,
                title: args.title,
                remind_at: args.remind_at,
              });
              if (remErr) return { ok: false, error: remErr.message };
              return { ok: true, type: "reminder", title: args.title, remind_at: args.remind_at };
            },
          }),
          log_habit: tool({
            description: "Catat kebiasaan user atau buat habit baru. Jika habit sudah ada, tandai sebagai selesai hari ini.",
            inputSchema: z.object({
              title: z.string().describe("Nama habit, mis. 'Minum air', 'Olahraga', 'Membaca'"),
              completed: z.boolean().default(true).describe("Apakah habit sudah dilakukan hari ini"),
            }),
            execute: async (args) => {
              // Find or create habit
              let { data: habit } = await supabase
                .from("habits")
                .select("id, title")
                .eq("user_id", userId)
                .ilike("title", args.title)
                .single();

              if (!habit) {
                const { data: newHabit, error: createErr } = await supabase
                  .from("habits")
                  .insert({ user_id: userId, title: args.title })
                  .select("id, title")
                  .single();
                if (createErr) return { ok: false, error: createErr.message };
                habit = newHabit;
              }

              if (args.completed && habit) {
                const { error: compErr } = await supabase
                  .from("habit_completions")
                  .insert({ habit_id: habit.id, user_id: userId });
                if (compErr) return { ok: false, error: compErr.message };
              }

              // Also log to life_logs
              await supabase.from("life_logs").insert({
                user_id: userId,
                type: "activity",
                title: `Habit: ${args.title}`,
                category: "habit",
                occurred_at: new Date().toISOString(),
                source_message_id: userMessageId,
              });

              return { ok: true, type: "habit", title: habit?.title ?? args.title, completed: args.completed };
            },
          }),
          save_memory: tool({
            description: "Simpan informasi penting tentang user untuk diingat jangka panjang (pekerjaan, hobi, tujuan hidup, preferensi).",
            inputSchema: z.object({
              content: z.string().describe("Informasi yang perlu diingat, mis. 'Bekerja sebagai Data Analyst'"),
            }),
            execute: async (args) => {
              const { data, error } = await supabase
                .from("memories")
                .insert({ user_id: userId, content: args.content })
                .select("id, content")
                .single();
              if (error) return { ok: false, error: error.message };
              return { ok: true, type: "memory", ...data };
            },
          }),
          save_note: tool({
            description: "Simpan catatan / curhat / pemikiran user.",
            inputSchema: z.object({
              content: z.string(),
            }),
            execute: async (args) => {
              const { data, error } = await supabase
                .from("life_logs")
                .insert({
                  user_id: userId,
                  type: "note",
                  title: args.content.slice(0, 80),
                  category: "note",
                  metadata: { content: args.content },
                  source_message_id: userMessageId,
                })
                .select("id, title")
                .single();
              if (error) return { ok: false, error: error.message };
              return { ok: true, type: "note", ...data };
            },
          }),
        };

        const result = streamText({
          model: openai("gpt-4o-mini"),
          system: buildSystemPrompt(memories, prefs),
          messages: await convertToModelMessages(messages),
          tools,
          stopWhen: stepCountIs(50),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onFinish: async ({ messages: finalMessages }) => {
            const last = finalMessages[finalMessages.length - 1];
            if (last && last.role === "assistant") {
              const text = last.parts
                .filter((p) => p.type === "text")
                .map((p) => ("text" in p ? p.text : ""))
                .join("");
              await supabase.from("messages").insert({
                user_id: userId,
                role: "assistant",
                content: text,
                parts: last.parts as any,
              });
            }
          },
          onError: (err) => {
            console.error("[chat] stream error", err);
            return err instanceof Error ? err.message : "Stream error";
          },
        });
      },
    },
  },
});
