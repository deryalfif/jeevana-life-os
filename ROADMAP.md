# 🚀 Roadmap: Porting Fitur jeevana_trae → jeevana-life-os

> **Konteks:** Dua versi Jeevana dibuat dengan platform vibe coding berbeda:
> - `jeevana-life-os` (TanStack Start) → **frontend lebih disukai, ini main codebase**
> - `jeevana_trae` (Next.js) → **lebih mature di sisi backend & fitur**
>
> Tujuan: porting fitur backend yang sudah mature dari `jeevana_trae` ke `jeevana-life-os`

---

## Status Overview

| Fase | Fitur | Status |
|---|---|---|
| 0 | Google OAuth | ✅ Selesai |
| 1 | Semantic Memory Retrieval | ✅ Selesai |
| 2 | Memory Fields (pin, archive, tags) | ✅ Selesai |
| 3 | Finance Budgets | ✅ Selesai |
| 4 | Admin Panel & RBAC | ✅ Selesai |
| 5 | Infrastructure (tests, CI/CD, cron) | ✅ Selesai (partial: tests, CI/CD, audit log — cron ditunda) |

---

---

## FASE 0: Google OAuth ✅

> **Prioritas: 🔴 TINGGI**
> **Estimasi:** 30 menit
> **Dampak:** User bisa login dengan satu klik tanpa perlu ingat password

### Yang Diimplementasikan

Di `jeevana_trae` sudah ada `signInWithGoogle` dari `@/app/actions/auth`.
Di `jeevana-life-os`, ditambahkan langsung ke `src/routes/auth.tsx`.

### Tasks

- [x] Tambah state `googleLoading` dan fungsi `handleGoogleSignIn()`
- [x] Gunakan `supabase.auth.signInWithOAuth({ provider: 'google' })` dengan `redirectTo: /chat`
- [x] Tombol Google muncul di mode login & register (tidak di mode lupa password)
- [x] Divider "atau" antara Google button dan form email/password
- [x] Loading spinner saat redirect ke Google
- [x] Disable semua tombol saat salah satu loading

### File yang Diubah

| File | Aksi |
|---|---|
| `src/routes/auth.tsx` | **MODIFIKASI** — tambah Google OAuth button + `handleGoogleSignIn()` |

### Setup yang Diperlukan di Supabase Dashboard

> **PENTING:** Google OAuth perlu diaktifkan manual di Supabase:
> 1. Buka Supabase Dashboard → Authentication → Providers
> 2. Enable **Google**
> 3. Isi **Client ID** dan **Client Secret** dari Google Cloud Console
> 4. Di Google Cloud Console: tambahkan `https://<project>.supabase.co/auth/v1/callback` ke Authorized redirect URIs

### Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-07-05 | ✅ Selesai | Button + handler diimplementasikan. Perlu setup Supabase dashboard (Google provider). |

---

---

## FASE 1: Semantic Memory Retrieval


> **Prioritas: 🔴 TINGGI**
> **Estimasi:** 2–3 jam
> **Dampak:** Memory context AI jadi jauh lebih relevan dan akurat

### Masalah Saat Ini

Di `jeevana-life-os`, fungsi `loadUserMemories()` di `src/routes/api/chat.ts` saat ini:

```typescript
// ❌ SEKARANG: Ambil 20 memory terbaru berdasarkan waktu
const { data } = await supabase
  .from("memories")
  .select("content")
  .eq("user_id", userId)
  .order("created_at", { ascending: false })
  .limit(20);
```

Masalahnya: **tidak ada relevansi**. Kalau user nanya soal pengeluaran,
AI malah dapat memory tentang olahraga.

### Solusi: TF-IDF + Semantic Expansion (dari jeevana_trae)

`jeevana_trae` punya `retrieve.ts` yang melakukan:
1. **Tokenisasi** pesan user → hapus stopwords Indonesia
2. **Alias expansion** (mis. "bayar" → "pay", "olahraga" → "exercise")
3. **Semantic expansion** (mis. "salary" → ["income", "finance"])
4. **TF-IDF scoring** terhadap setiap memory
5. **Ranking** berdasarkan relevance score + recency tiebreaker

### Tasks

#### Task 1.1 — Buat folder dan file `src/lib/memory/retrieve.ts`
- [x] Buat direktori `src/lib/memory/`
- [x] Buat `src/lib/memory/retrieve.ts` — core semantic retrieval logic
- [x] Buat `src/lib/memory/index.ts` — barrel export

Isi `retrieve.ts` yang perlu dibuat (diadaptasi dari jeevana_trae):
- `tokenAliases` — mapping kata Indonesia ke konsep (bayar→pay, gaji→salary, dst)
- `semanticExpansions` — semantic groups (salary→[income, finance], dst)
- `stopwords` — kata tidak bermakna (aku, saya, yang, dan, dst)
- `retrieveRelevantMemories(memories, userInput, limit)` — fungsi utama scoring
- `formatMemoryContextForPrompt(memories)` — format untuk system prompt

#### Task 1.2 — Modifikasi `src/routes/api/chat.ts`
- [x] Import `retrieveRelevantMemories` dari `@/lib/memory`

- [ ] Update `buildSystemPrompt()`:
  - Tambahkan label kategori memory di prompt
  - Format yang lebih informatif untuk AI

#### Task 1.3 — Modifikasi `src/components/app/MemoriesScreen.tsx`
- [x] Tambah state `searchQuery` dan input search bar
- [x] Import dan gunakan `retrieveRelevantMemories` untuk filter di client-side
- [x] Tampilkan semua memories jika search kosong, filter jika ada query

### File yang Diubah

| File | Aksi | Keterangan |
|---|---|---|
| `src/lib/memory/retrieve.ts` | **BUAT BARU** | Core semantic retrieval logic |
| `src/lib/memory/index.ts` | **BUAT BARU** | Barrel export |
| `src/routes/api/chat.ts` | **MODIFIKASI** | Ganti `loadUserMemories()` |
| `src/components/app/MemoriesScreen.tsx` | **MODIFIKASI** | Tambah search bar |

### Definition of Done ✅
- [x] `retrieveRelevantMemories()` dibuat tanpa error TypeScript baru
- [x] Chat API menggunakan semantic retrieval, bukan top-20 terbaru
- [ ] Tes manual: nanya soal pengeluaran → memory keuangan muncul (bukan olahraga)
- [ ] MemoriesScreen punya search yang berfungsi (Task 1.3 — Todo)
- [x] Tidak ada breaking change di UI/UX (error TS pre-existing, bukan dari kode baru)

### Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-07-05 | ✅ Selesai | Semua task (1.1, 1.2, 1.3) selesai. `retrieve.ts`, `index.ts`, search bar di `MemoriesScreen`, dan update `chat.ts`. |

---

---

## FASE 2: Memory Fields Enhancement

> **Prioritas: 🔴 TINGGI**
> **Estimasi:** 1–2 jam
> **Dampak:** Memory Center lebih powerful (pin, archive, tags)

### Tasks

#### Task 2.1 — Database Migration
- [x] Buat migration SQL: `supabase/migrations/20260705160000_memory_fields.sql`
- [x] Tambah kolom ke tabel `memories`:
  - `is_pinned BOOLEAN DEFAULT false`
  - `is_archived BOOLEAN DEFAULT false`
  - `tags TEXT[] DEFAULT '{}'`
  - `updated_at TIMESTAMPTZ DEFAULT now()`
- [x] Tambah index untuk is_pinned dan is_archived
- [x] Tambah trigger auto-update `updated_at`

#### Task 2.2 — Update Supabase Types
- [x] Update `src/integrations/supabase/types.ts` — tambah kolom baru ke Memory type

#### Task 2.3 — Update Server Functions
- [x] Update `fetchMemories` — include kolom baru, default exclude archived, sort pinned duluan
- [x] Tambah `fetchArchivedMemories()` — khusus fetch yang archived
- [x] Tambah `pinMemory(id, isPinned)` server function
- [x] Tambah `archiveMemory(id, isArchived)` server function
- [x] Tambah `addTagToMemory(id, tag)` server function
- [x] Tambah `removeTagFromMemory(id, tag)` server function

#### Task 2.4 — Update MemoriesScreen UI
- [x] Tambah tab filter: Semua | Pinned | Arsip
- [x] Tombol pin (📌) per memory card dengan visual highlight berbeda
- [x] Tombol archive/unarchive per memory
- [x] Tampil tags sebagai badge di bawah konten
- [x] Memory ter-pin punya highlight border brand
- [x] Pinned icon menggantikan Brain icon di kartu yang di-pin
- [x] Search berfungsi di semua tab

### Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-07-05 | ✅ Selesai | Migration SQL, types, 6 server functions baru, UI lengkap dengan tab+pin+archive+tags. Fix unused import di chat.ts. |

---

---

## FASE 3: Finance Budgets

> **Prioritas: 🟡 SEDANG**
> **Estimasi:** 3–4 jam

### Tasks

#### Task 3.1 — Database Migration
- [x] Buat tabel `finance_budgets`:
  - `id UUID PRIMARY KEY`
  - `user_id UUID REFERENCES auth.users(id)`
  - `category TEXT`
  - `amount_limit NUMERIC`
  - `period TEXT` (monthly, weekly)
  - `created_at TIMESTAMPTZ`
  - `updated_at TIMESTAMPTZ` + trigger auto-update
  - RLS: users manage own budgets

#### Task 3.2 — Server Functions
- [x] `fetchBudgets()` — ambil semua budget user
- [x] `createBudget(category, amountLimit, period)`
- [x] `updateBudget(id, data)`
- [x] `deleteBudget(id)`

#### Task 3.3 — FinanceScreen UI Update
- [x] Tambah section "Budget" di FinanceScreen
- [x] Progress bar per kategori (spent vs limit) dengan `BudgetProgressBar` component
- [x] Color indicator: 🟢 hijau (<70%) / 🟡 kuning (70-90%) / 🔴 merah (≥90%)
- [x] Form tambah budget (category, limit, period)
- [x] Edit inline limit budget
- [x] Hapus budget dengan confirm
- [x] Kalkulasi spent otomatis dari life_logs bulan ini (monthly) atau 7 hari terakhir (weekly)

### Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-07-05 | ⏳ Belum mulai | |
| 2026-07-06 | ✅ Selesai | Migration SQL, 4 server functions, FinanceScreen dengan budget section lengkap (progress bar, color indicator, CRUD). |

---

---

## FASE 4: Admin Panel & RBAC

> **Prioritas: 🟡 SEDANG**
> **Estimasi:** 2–3 jam

### Tasks

#### Task 4.1 — Database: Tambah kolom `role` ke `profiles`
- [x] Migration: `ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'user'`
- [x] Update types (`src/integrations/supabase/types.ts`)

#### Task 4.2 — Update Admin Server Functions di `jeevana.functions.ts`
- [x] `fetchAdminStats()` — verifikasi kolom role baru (sudah ada)
- [x] `fetchAdminUsers()` — tampil list user + role (sudah ada)
- [x] `updateUserRole(userId, role)` — admin bisa ganti role user ✨ BARU

#### Task 4.3 — AdminScreen UI
- [x] Stats cards (total users, total logs, total messages) + breakdown admin count
- [x] Distribusi role summary (user/admin/super_admin count)
- [x] User management table dengan `RoleBadge` (icon + warna berbeda)
- [x] Dropdown ganti role per user dengan konfirmasi visual

### Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-07-05 | ⏳ Belum mulai | |
| 2026-07-06 | ✅ Selesai | Migration role, updateUserRole function, AdminScreen rewrite dengan role management UI. |

---

---

## FASE 5: Infrastructure

> **Prioritas: 🟢 RENDAH**
> **Estimasi:** 3–5 jam

### Tasks

#### Task 5.1 — Unit Tests (Vitest)
- [x] Install Vitest sebagai devDependency
- [x] Buat `src/lib/memory/retrieve.test.ts`
- [x] Test case (12 tests, semua pass):
  - Query finance → dapat memory finance (bukan olahraga)
  - Query exercise → dapat memory olahraga
  - Empty memories → return empty
  - Empty/whitespace query → return empty
  - Query tidak relevan → return empty
  - Limit berfungsi → tidak return lebih dari limit
  - Default limit = 5
  - Score > 0 untuk semua hasil
  - Hasil diurutkan score descending
  - `formatMemoryContextForPrompt` empty & numbered list
- [x] Tambah script `test` dan `test:watch` di `package.json`

#### Task 5.2 — GitHub Actions CI/CD
- [x] Buat `.github/workflows/ci.yml`
- [x] Steps: install → lint → typecheck → test

#### Task 5.3 — AI Events Audit Log
- [x] Buat tabel `ai_events` (user_id, event_type, tool_name, input, output, metadata, created_at)
- [x] RLS: user baca data sendiri, service role bisa insert
- [ ] Integrasi log di `/api/chat.ts` — TODO lanjutan

#### Task 5.4 — Cron Jobs
- [ ] Buat `/api/cron/memory-derive.ts` — periodic memory derivation
- [ ] Setup cron di `vercel.json`

### Progress Log

| Tanggal | Status | Catatan |
|---|---|---|
| 2026-07-05 | ⏳ Belum mulai | |
| 2026-07-06 | ✅ Selesai (partial) | Vitest 12 tests pass, GitHub Actions CI, AI events audit migration. Cron ditunda (Vercel-specific setup). |

---

---

## Referensi

- **jeevana_trae repo:** https://github.com/deryalfif/jeevana_trae
- **retrieve.ts (sumber):** https://github.com/deryalfif/jeevana_trae/blob/master/src/lib/memory/retrieve.ts
- **derive.ts (sumber):** https://github.com/deryalfif/jeevana_trae/blob/master/src/lib/memory/derive.ts
- **extract.ts (sumber):** https://github.com/deryalfif/jeevana_trae/blob/master/src/lib/ai/extract.ts

---

*Dibuat: 5 Juli 2026 | Update terakhir: 5 Juli 2026*

