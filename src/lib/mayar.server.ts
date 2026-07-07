/**
 * Mayar.id Headless Commerce API Client
 * Server-side only — never import this in client code.
 */

const MAYAR_API_KEY = process.env.MAYAR_API_KEY;
const MAYAR_BASE_URL = process.env.MAYAR_BASE_URL ?? "https://api.mayar.id/hl/v1";

interface MayarResponse<T = unknown> {
  statusCode: number;
  messages: string;
  data?: T;
}

export interface MayarInvoiceCreateRequest {
  name: string;
  email: string;
  mobile: string;
  redirectUrl: string;
  description: string;
  expiredAt: string; // ISO 8601
  items: Array<{
    quantity: number;
    rate: number;
    description: string;
  }>;
  extraData?: Record<string, string>;
}

export interface MayarInvoiceCreateResponse {
  id: string;
  transactionId: string;
  link: string;
  expiredAt: number;
  extraData?: Record<string, string>;
}

export interface MayarInvoiceDetail {
  id: string;
  amount: number;
  status: string;
  link: string;
  expiredAt: number;
  transactions: Array<{ id: string }>;
  customerId: string;
  customer: {
    id: string;
    email: string;
    mobile: string;
    name: string;
  };
  transactionId: string;
  paymentUrl: string;
  paymentLinkId: string;
}

function headers(): Record<string, string> {
  if (!MAYAR_API_KEY) throw new Error("MAYAR_API_KEY belum di-set di .env");
  return {
    Authorization: `Bearer ${MAYAR_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function createInvoice(
  req: MayarInvoiceCreateRequest,
): Promise<MayarInvoiceCreateResponse> {
  const res = await fetch(`${MAYAR_BASE_URL}/invoice/create`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(req),
  });
  const json = (await res.json()) as MayarResponse<MayarInvoiceCreateResponse>;
  if (json.statusCode !== 200) {
    throw new Error(`Mayar createInvoice error: ${json.messages}`);
  }
  return json.data!;
}

export async function getInvoiceDetail(invoiceId: string): Promise<MayarInvoiceDetail> {
  const res = await fetch(`${MAYAR_BASE_URL}/invoice/${invoiceId}`, {
    method: "GET",
    headers: headers(),
  });
  const json = (await res.json()) as MayarResponse<MayarInvoiceDetail>;
  if (json.statusCode !== 200) {
    throw new Error(`Mayar getInvoiceDetail error: ${json.messages}`);
  }
  return json.data!;
}

/**
 * Verifikasi signature webhook Mayar menggunakan HMAC SHA-256.
 * Mayar mengirim header `x-callback-signature` berisi HMAC dari raw body.
 */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string | null,
): Promise<boolean> {
  const secret = process.env.MAYAR_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expected === signature;
}

export type SubscriptionPlan = "free" | "pro" | "premium";

export const PLAN_DETAILS: Record<
  SubscriptionPlan,
  { name: string; price: number; features: string[] }
> = {
  free: {
    name: "FREE",
    price: 0,
    features: ["Basic Logging", "Expense Tracking", "Daily Summary"],
  },
  pro: {
    name: "PRO",
    price: 10000,
    features: [
      "Unlimited Logs",
      "Advanced Insights",
      "Smart Reminders",
      "Full Dashboard Analytics",
    ],
  },
  premium: {
    name: "PREMIUM",
    price: 20000,
    features: [
      "Health Tracking",
      "Calendar Integration",
      "AI Planning Assistant",
      "Early Access Features",
    ],
  },
};
