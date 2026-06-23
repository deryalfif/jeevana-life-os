
# Jeevana MVP — AI Life OS

Landing page yang sudah ada tetap di `/`. App-nya hidup di route terproteksi.

## Scope iterasi ini
- Auth email/password (Lovable Cloud)
- AI Chat sebagai core (satu conversation per user, terus-menerus)
- AI extraction pipeline → simpan ke `life_logs` otomatis
- Life Feed (timeline kronologis)
- Dashboard bento dasar (today summary, expense, activity, reminders)
- Bahasa Indonesia, casual Gen-Z, style melanjutkan landing (Swiss + bento, putih bersih, biru #3B82F6 + ungu #8B5CF6, Inter)

Tidak termasuk sekarang: Habits, Finance module lengkap, Reminders engine (notifikasi cuma list), Insights AI mingguan, Memory Center UI, Calendar, Admin panel, voice input, OAuth. Skema DB tetap disiapkan supaya gampang nyusul.

## Routing
```
/                       landing (existing, public)
/auth                   login + register (toggle)
/_authenticated/
  app                   redirect ke /chat
  chat                  AI Chat (core)
  feed                  Life Feed
  dashboard             Bento dashboard
  logs                  Life Logs (table sederhana)
  settings              profile + sign out
```
App shell: sidebar kiri (Chat, Feed, Dashboard, Logs, Settings) + topbar minimal. Mobile: bottom nav.

## Backend (Lovable Cloud)
Tabel di skema `public`, semua dengan RLS `user_id = auth.uid()` + GRANT ke `authenticated`.

- `profiles` — id (FK auth.users), display_name, created_at
- `messages` — id, user_id, role ('user'|'assistant'), content, created_at, extracted_log_ids uuid[]
- `life_logs` — id, user_id, type ('activity'|'expense'|'income'|'reminder'|'note'), category, title, amount numeric null, duration_minutes int null, occurred_at timestamptz, metadata jsonb, source_message_id, created_at
- `reminders` — id, user_id, life_log_id, remind_at, status, created_at
- `memories` — id, user_id, content, created_at (disiapkan, belum di-UI penuh)

Trigger: auto-insert profile on signup.

## AI pipeline
Server function `sendChatMessage({ text })`:
1. Insert user message
2. Panggil Lovable AI Gateway (`google/gemini-3-flash-preview`) dengan AI SDK `generateText` + tool calling. Tools:
   - `log_activity({ title, category, duration_minutes?, occurred_at })`
   - `log_expense({ description, category, amount, occurred_at })`
   - `log_income({ description, amount, occurred_at })`
   - `create_reminder({ title, remind_at, notes? })`
   - `save_note({ content })`
   Setiap tool `execute` insert ke `life_logs` (+ `reminders` kalau perlu) untuk user yang sedang login.
3. `stopWhen: stepCountIs(50)`. System prompt: balas singkat, ramah, bahasa Indonesia casual, konfirmasi apa yang dicatat.
4. Return assistant message + daftar log baru.

Streaming pakai route `src/routes/api/chat.ts` + `useChat` (DefaultChatTransport, id tetap = user id). Persist user + assistant message di `onFinish` server-side, tool results juga disimpan di message parts.

## UI utama
- **Chat**: AI Elements (`conversation`, `message`, `prompt-input`, `tool`, `shimmer`). Empty state dengan suggested prompts ("Hari ini jogging 5 km", "Beli kopi 25 ribu", "Ingatkan bayar listrik tgl 10"). Tool calls render sebagai kartu hijau kecil "✓ Dicatat: Beli kopi · Rp25.000".
- **Life Feed**: query `life_logs` order by `occurred_at desc`, dikelompokin per hari ("Hari ini", "Kemarin", tanggal). Tiap item: icon per type, judul, meta (amount/duration), waktu.
- **Dashboard**: bento grid — Today Summary (count log + total expense hari ini), Expense 7 hari (bar mini), Recent Activities, Upcoming Reminders, Quick log CTA ke chat.
- **Logs**: tabel + filter type, edit inline (judul/amount), delete.
- **Settings**: nama + sign out.

Style: lanjut token landing (canvas #F8FAFC, ink #0F172A, brand #3B82F6, grape #8B5CF6, rounded-3xl, soft shadow, Inter). Sidebar putih dengan border halus. Dark mode skip dulu.

## Technical notes
- TanStack Start + `_authenticated` layout (integration-managed) untuk gating.
- Install AI Elements: `bun x ai-elements@latest add conversation message prompt-input tool shimmer`.
- Server functions di `src/lib/*.functions.ts`; route `/api/chat.ts` untuk streaming.
- TanStack Query untuk feed/dashboard/logs (loader pakai `ensureQueryData`, komponen pakai `useSuspenseQuery`).
- Setelah chat selesai streaming → `queryClient.invalidateQueries(['life_logs'])` supaya feed/dashboard refresh.

## Out of scope (next iterations)
Habits engine, full Finance dengan budget & chart, Reminder notification delivery, Insights mingguan AI, Memory Center editable, Calendar, Voice input, Onboarding wizard, Admin panel, Google OAuth, Life Score.
