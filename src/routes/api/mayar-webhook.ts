import { createFileRoute } from "@tanstack/react-router";

/**
 * Webhook endpoint untuk Mayar.id
 * Mayar akan mengirim notifikasi ke endpoint ini ketika status pembayaran berubah.
 *
 * Setup: Daftarkan URL ini di Mayar dashboard -> Webhook:
 *   POST https://<domain>/api/mayar-webhook
 */
export const Route = createFileRoute("/api/mayar-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const rawBody = await request.text();
          const signature = request.headers.get("x-callback-signature");

          // Verifikasi signature
          const { verifyWebhookSignature } = await import("@/lib/mayar.server");
          const isValid = await verifyWebhookSignature(rawBody, signature);
          if (!isValid) {
            console.warn("[mayar-webhook] Invalid signature");
            return new Response(JSON.stringify({ error: "Invalid signature" }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }

          const payload = JSON.parse(rawBody);
          console.log("[mayar-webhook] Received:", JSON.stringify(payload).slice(0, 500));

          // Extract data dari payload Mayar
          // Mayar webhook payload bisa bervariasi, tapi umumnya:
          // { transactionId, status, amount, ... }
          const transactionId =
            payload.transactionId ?? payload.transaction_id ?? payload.data?.transactionId;
          const status = payload.status ?? payload.data?.status;
          const invoiceId =
            payload.paymentLinkId ?? payload.invoiceId ?? payload.data?.paymentLinkId;

          if (!transactionId && !invoiceId) {
            return new Response(JSON.stringify({ ok: true, skipped: "no identifier" }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Update subscription di database
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          // Cari subscription berdasarkan invoice ID atau transaction ID
          let query = supabaseAdmin.from("subscriptions").select("id, user_id, plan, status");

          if (invoiceId) {
            query = query.eq("mayar_invoice_id", invoiceId);
          } else if (transactionId) {
            query = query.eq("mayar_transaction_id", transactionId);
          }

          const { data: sub } = await query.maybeSingle();

          if (!sub) {
            console.warn("[mayar-webhook] Subscription not found for:", {
              invoiceId,
              transactionId,
            });
            return new Response(JSON.stringify({ ok: true, skipped: "not found" }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Map status Mayar ke status internal
          let newStatus: string;
          if (status === "paid" || status === "settled") {
            newStatus = "active";
          } else if (status === "expired") {
            newStatus = "expired";
          } else if (status === "cancelled") {
            newStatus = "cancelled";
          } else {
            newStatus = sub.status; // keep current
          }

          // Update subscription
          const updateData: {
            status: string;
            updated_at: string;
            mayar_transaction_id?: string;
          } = {
            status: newStatus,
            updated_at: new Date().toISOString(),
          };
          if (transactionId) {
            updateData.mayar_transaction_id = transactionId;
          }

          const { error: updateErr } = await supabaseAdmin
            .from("subscriptions")
            .update(updateData)
            .eq("id", sub.id);

          if (updateErr) {
            console.error("[mayar-webhook] Update error:", updateErr.message);
            return new Response(JSON.stringify({ error: updateErr.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          console.log(`[mayar-webhook] Subscription ${sub.id} updated to ${newStatus}`);
          return new Response(JSON.stringify({ ok: true, status: newStatus }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("[mayar-webhook] Error:", err);
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
