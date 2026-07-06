import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Crown,
  Check,
  Loader2,
  ExternalLink,
  RefreshCw,
  Shield,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  fetchSubscription,
  createSubscription,
  checkInvoiceStatus,
} from "@/lib/jeevana.functions";
import { supabase } from "@/integrations/supabase/client";

const PLAN_META = {
  free: {
    name: "FREE",
    price: "Rp 0",
    period: "Selamanya",
    icon: Shield,
    color: "slate",
    features: ["Basic Logging", "Expense Tracking", "Daily Summary"],
  },
  pro: {
    name: "PRO",
    price: "Rp 10.000",
    period: "/bulan",
    icon: Zap,
    color: "brand",
    features: [
      "Unlimited Logs",
      "Advanced Insights",
      "Smart Reminders",
      "Full Dashboard Analytics",
    ],
  },
  premium: {
    name: "PREMIUM",
    price: "Rp 20.000",
    period: "/bulan",
    icon: Star,
    color: "grape",
    features: [
      "Health Tracking",
      "Calendar Integration",
      "AI Planning Assistant",
      "Early Access Features",
    ],
  },
} as const;

export function SubscriptionScreen() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string>;
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const fetchSubFn = useServerFn(fetchSubscription);
  const createSubFn = useServerFn(createSubscription);
  const checkInvoiceFn = useServerFn(checkInvoiceStatus);

  const { data: subscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => fetchSubFn(),
  });

  const createMutation = useMutation({
    mutationFn: async (plan: "pro" | "premium") => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Harus login dulu");
      return createSubFn({
        data: {
          plan,
          email: userData.user.email ?? "",
          name:
            userData.user.user_metadata?.full_name ??
            userData.user.email?.split("@")[0] ??
            "User",
        },
      });
    },
    onSuccess: (result) => {
      if (result.paymentUrl) {
        window.open(result.paymentUrl, "_blank");
        setPaymentMessage(
          "Link pembayaran sudah dibuka di tab baru. Selesaikan pembayaran, lalu klik 'Refresh Status'.",
        );
      } else if (result.message) {
        setPaymentMessage(result.message);
      }
    },
    onError: (err) => {
      setPaymentMessage(`Gagal: ${err.message}`);
    },
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      if (!subscription?.mayar_invoice_id) return null;
      return checkInvoiceFn({ data: { invoiceId: subscription.mayar_invoice_id } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscription"] });
      setPaymentMessage("Status sudah di-refresh!");
    },
  });

  // Handle redirect dari Mayar checkout
  useEffect(() => {
    if (search?.status === "success") {
      setPaymentMessage(
        "Pembayaran sedang diproses. Klik 'Refresh Status' untuk update terbaru.",
      );
      // Clean URL
      navigate({ to: "/subscription", replace: true });
    }
  }, [search, navigate]);

  const currentPlan = (subscription?.plan as keyof typeof PLAN_META) ?? "free";
  const currentMeta = PLAN_META[currentPlan];
  const CurrentIcon = currentMeta.icon;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <Crown className="size-7 text-brand" />
        <h1 className="text-3xl font-bold tracking-tight">Langganan</h1>
      </div>
      <p className="text-slate-500 mb-8">Kelola plan dan pembayaran kamu.</p>

      {/* Current Plan Card */}
      <div className="bg-white rounded-3xl border border-slate-200/70 p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`size-12 rounded-2xl grid place-items-center ${
                currentPlan === "premium"
                  ? "bg-grape/10 text-grape"
                  : currentPlan === "pro"
                    ? "bg-brand/10 text-brand"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              <CurrentIcon className="size-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Plan Saat Ini
              </p>
              <p className="text-xl font-bold">{currentMeta.name}</p>
              {subscription?.expires_at && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Berlaku hingga{" "}
                  {new Date(subscription.expires_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {subscription?.status === "pending" && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-2"
                onClick={() => refreshMutation.mutate()}
                disabled={refreshMutation.isPending}
              >
                <RefreshCw
                  className={`size-4 ${refreshMutation.isPending ? "animate-spin" : ""}`}
                />
                Refresh Status
              </Button>
              {subscription.payment_url && (
                <Button
                  size="sm"
                  className="rounded-xl gap-2 bg-brand hover:bg-brand/90 text-white"
                  onClick={() => window.open(subscription.payment_url!, "_blank")}
                >
                  <ExternalLink className="size-4" />
                  Bayar
                </Button>
              )}
            </div>
          )}
        </div>

        {paymentMessage && (
          <div className="mt-4 p-3 rounded-xl bg-brand/5 border border-brand/20 text-sm text-ink/80">
            {paymentMessage}
          </div>
        )}
      </div>

      {/* Plan Cards */}
      <h2 className="text-lg font-semibold mb-4">Pilih Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(PLAN_META) as Array<keyof typeof PLAN_META>).map((planKey) => {
          const plan = PLAN_META[planKey];
          const Icon = plan.icon;
          const isActive = currentPlan === planKey;
          const isPending =
            subscription?.status === "pending" && subscription?.plan === planKey;

          return (
            <div
              key={planKey}
              className={`relative flex flex-col rounded-3xl p-6 transition-all ${
                planKey === "pro"
                  ? "bg-ink text-white shadow-2xl shadow-brand/30 ring-4 ring-brand/20 md:-translate-y-2"
                  : "border border-slate-200/70 bg-white"
              }`}
            >
              {planKey === "pro" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-grape px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <Icon
                  className={`size-5 ${
                    planKey === "premium"
                      ? "text-grape"
                      : planKey === "pro"
                        ? "text-brand"
                        : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
                    planKey === "pro" ? "text-grape" : "text-ink/40"
                  }`}
                >
                  {plan.name}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold">{plan.price}</span>
                <span
                  className={`text-sm ${planKey === "pro" ? "text-white/50" : "text-slate-400"}`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="my-4 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full ${
                        planKey === "pro" ? "bg-brand" : "bg-brand/10 text-brand"
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className={planKey === "pro" ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              {planKey === "free" ? (
                <Button
                  disabled={isActive}
                  variant="outline"
                  className="mt-auto w-full rounded-xl"
                >
                  {isActive ? "Plan Aktif" : "Gratis"}
                </Button>
              ) : (
                <Button
                  disabled={isActive || isPending || createMutation.isPending}
                  className={`mt-auto w-full rounded-xl ${
                    planKey === "pro"
                      ? "bg-white text-ink hover:bg-white/90"
                      : "bg-ink text-white hover:bg-ink/90"
                  }`}
                  onClick={() => createMutation.mutate(planKey as "pro" | "premium")}
                >
                  {createMutation.isPending && createMutation.variables === planKey ? (
                    <Loader2 className="size-4 animate-spin mr-2" />
                  ) : null}
                  {isActive
                    ? "Plan Aktif"
                    : isPending
                      ? "Menunggu Pembayaran"
                      : `Pilih ${plan.name}`}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/50">
        <p className="text-xs text-slate-500 leading-relaxed">
          Pembayaran diproses melalui <strong>Mayar.id</strong> — mendukung QRIS, GoPay, OVO, DANA,
          Virtual Account bank, dan kartu kredit. Langganan diperpanjang otomatis setiap 30 hari.
          Kamu bisa batalkan kapan saja.
        </p>
      </div>
    </div>
  );
}
