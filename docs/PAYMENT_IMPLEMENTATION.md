# Integrasi Payment Gateway — Mayar.id

## Overview

Jeevana Life OS mengintegrasikan **Mayar.id** sebagai payment gateway untuk menangani subscription plan (FREE/PRO/PREMIUM). Mayar adalah platform payment Indonesia yang mendukung QRIS, GoPay, OVO, DANA, Virtual Account bank, dan kartu kredit.

## Arsitektur

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────>│  Server Fn   │────>│  Mayar API   │
│  (React)     │     │  (TanStack)  │     │  (Invoice)   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Supabase    │<────│  Webhook     │<────│  Mayar       │
│  (Database)  │     │  Endpoint    │     │  Callback    │
└──────────────┘     └──────────────┘     └──────────────┘
```

## File Structure

```
src/
├── lib/
│   ├── mayar.server.ts              # Mayar API client (server-only)
│   └── jeevana.functions.ts         # Server functions (subscription CRUD)
├── routes/
│   ├── api/
│   │   └── mayar-webhook.ts         # Webhook endpoint dari Mayar
│   └── _authenticated/
│       └── subscription.tsx         # Halaman langganan
├── components/
│   ├── app/
│   │   └── SubscriptionScreen.tsx   # UI langganan
│   └── landing/
│       └── Pricing.tsx              # Pricing page (updated CTA)
└── integrations/
    └── supabase/
        └── types.ts                 # Database types (subscriptions table)

supabase/
└── migrations/
    └── 20260706190000_subscriptions.sql  # Migration tabel subscriptions
```

## Database Schema

### Tabel `subscriptions`

| Kolom                | Type        | Deskripsi                                   |
| -------------------- | ----------- | ------------------------------------------- |
| id                   | UUID (PK)   | Primary key                                 |
| user_id              | UUID (FK)   | Referensi ke auth.users                     |
| plan                 | TEXT        | `free`, `pro`, `premium`                    |
| status               | TEXT        | `active`, `expired`, `cancelled`, `pending` |
| mayar_invoice_id     | TEXT        | ID invoice dari Mayar                       |
| mayar_transaction_id | TEXT        | ID transaksi dari Mayar                     |
| payment_url          | TEXT        | URL pembayaran Mayar                        |
| started_at           | TIMESTAMPTZ | Mulai langganan                             |
| expires_at           | TIMESTAMPTZ | Berakhir langganan (NULL untuk free)        |
| created_at           | TIMESTAMPTZ | Dibuat                                      |
| updated_at           | TIMESTAMPTZ | Terakhir diupdate                           |

## Environment Variables

Tambahkan di `.env`:

```env
MAYAR_API_KEY=<your-api-key>                    # Dari web.mayar.id/api-keys
MAYAR_BASE_URL=https://api.mayar.id/hl/v1       # Production
MAYAR_WEBHOOK_SECRET=<your-webhook-secret>       # Untuk verifikasi webhook
```

**Sandbox (untuk testing):**

```env
MAYAR_BASE_URL=https://api.mayar.club/hl/v1
```

## API Endpoints yang Digunakan

### 1. Create Invoice (`POST /hl/v1/invoice/create`)

Membuat invoice untuk subscription baru. Dipanggil dari server function `createSubscription`.

**Request:**

```json
{
  "name": "User Name",
  "email": "user@email.com",
  "mobile": "08123456789",
  "redirectUrl": "https://app.jeevana.app/subscription?status=success",
  "description": "Jeevana Life OS - PRO Plan (1 bulan)",
  "expiredAt": "2026-07-07T12:00:00.000Z",
  "items": [{ "quantity": 1, "rate": 10000, "description": "PRO Plan - 1 bulan" }],
  "extraData": { "user_id": "uuid-here", "plan": "pro" }
}
```

**Response:**

```json
{
  "statusCode": 200,
  "messages": "success",
  "data": {
    "id": "invoice-uuid",
    "transactionId": "transaction-uuid",
    "link": "https://store.mayar.shop/invoices/xxxxx",
    "expiredAt": 1720348800000
  }
}
```

### 2. Get Invoice Detail (`GET /hl/v1/invoice/{id}`)

Mengecek status invoice (paid/unpaid). Digunakan untuk manual refresh.

### 3. Webhook Callback

Mayar mengirim POST request ke `/api/mayar-webhook` ketika status pembayaran berubah.

## Alur Pembayaran

### Flow Lengkap:

1. **User klik "Pilih PRO/PREMIUM"** di halaman `/subscription`
2. **Frontend** memanggil server function `createSubscription`
3. **Server** membuat invoice di Mayar API
4. **Server** menyimpan subscription dengan status `pending` di Supabase
5. **Response** berisi `paymentUrl` (link Mayar checkout)
6. **Frontend** membuka link Mayar di tab baru
7. **User** memilih metode bayar dan menyelesaikan pembayaran
8. **Mayar** mengirim webhook ke `/api/mayar-webhook`
9. **Webhook handler** memverifikasi signature, update status ke `active`
10. **User** klik "Refresh Status" atau redirect balik ke app

### Redirect Flow:

Setelah pembayaran, Mayar redirect user ke:

```
https://app.jeevana.app/subscription?status=success
```

Frontend mendeteksi parameter `status=success` dan menampilkan pesan untuk refresh.

## Pricing

| Plan    | Harga         | Fitur                                                              |
| ------- | ------------- | ------------------------------------------------------------------ |
| FREE    | Rp 0          | Basic Logging, Expense Tracking, Daily Summary                     |
| PRO     | Rp 10.000/bln | Unlimited Logs, Advanced Insights, Smart Reminders, Full Dashboard |
| PREMIUM | Rp 20.000/bln | Health Tracking, Calendar Integration, AI Planning, Early Access   |

## Server Functions

### `fetchSubscription` (GET)

Mengambil subscription aktif user. Default ke `free` jika belum ada.

### `createSubscription` (POST)

Membuat invoice Mayar dan menyimpan subscription pending.

- Input: `{ plan, email, name, mobile? }`
- Output: `{ ok, message, paymentUrl, invoiceId }`

### `checkInvoiceStatus` (GET)

Mengecek status invoice dari Mayar dan update DB jika sudah paid.

- Input: `{ invoiceId }`
- Output: `{ status, amount, paymentUrl }`

## Webhook Security

Webhook Mayar diverifikasi menggunakan **HMAC SHA-256**:

1. Mayar mengirim header `x-callback-signature`
2. Server menghitung HMAC dari raw body menggunakan `MAYAR_WEBHOOK_SECRET`
3. Signature dibandingkan (harus sama)

## Setup Webhook di Mayar

1. Login ke [web.mayar.id](https://web.mayar.id)
2. Buka menu **Settings > Webhook**
3. Atau gunakan API: `POST /hl/v1/webhook/register`
4. Set URL: `https://<domain>/api/mayar-webhook`

## Deployment Checklist

- [ ] Jalankan migration SQL di Supabase
- [ ] Set environment variables di Vercel:
  - `MAYAR_API_KEY`
  - `MAYAR_BASE_URL` (production URL)
  - `MAYAR_WEBHOOK_SECRET`
- [ ] Daftarkan webhook URL di Mayar dashboard
- [ ] Test flow pembayaran end-to-end
- [ ] Pastikan RLS policies bekerja dengan benar

## Testing

### Sandbox Mode

Gunakan sandbox untuk testing:

- Login: [web.mayar.club](https://web.mayar.club)
- API Key: [web.mayar.club/api-keys](https://web.mayar.club/api-keys)
- Base URL: `https://api.mayar.club/hl/v1`

### Test Flow

1. Jalankan migration di Supabase
2. Set `MAYAR_BASE_URL=https://api.mayar.club/hl/v1` di `.env`
3. Buat subscription dari UI
4. Bayar menggunakan sandbox payment methods
5. Verifikasi webhook diterima dan status terupdate

## Troubleshooting

| Masalah              | Solusi                                                              |
| -------------------- | ------------------------------------------------------------------- |
| Invoice gagal dibuat | Cek `MAYAR_API_KEY` valid dan punya scope `write`                   |
| Webhook tidak masuk  | Pastikan URL terdaftar di Mayar dan domain bisa diakses             |
| Status tidak update  | Cek log server, verifikasi `MAYAR_WEBHOOK_SECRET` benar             |
| "Plan tidak valid"   | Pastikan plan hanya `pro` atau `premium` (free tidak butuh payment) |
