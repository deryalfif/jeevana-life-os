import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown, ChevronRight } from "lucide-react";
import { fetchSubscription } from "@/lib/jeevana.functions";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — Jeevana" }] }),
  component: SettingsScreen,
});

const PLAN_LABELS: Record<string, string> = {
  free: "FREE",
  pro: "PRO",
  premium: "PREMIUM",
};

function SettingsScreen() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSubFn = useServerFn(fetchSubscription);
  const { data: subscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => fetchSubFn(),
  });

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setEmail(u.user?.email ?? "");
      const { data: p } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", u.user!.id)
        .single();
      setName(p?.display_name ?? "");
    })();
  }, []);

  async function save() {
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    await supabase.from("profiles").update({ display_name: name }).eq("id", u.user!.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const currentPlan = subscription?.plan ?? "free";

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
      <p className="text-slate-500 mt-1">Atur profil dan akun kamu.</p>

      {/* Subscription Card */}
      <Link
        to="/subscription"
        className="mt-8 flex items-center justify-between bg-white rounded-3xl border border-slate-200/70 p-5 hover:bg-slate-50 transition group"
      >
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-brand/10 grid place-items-center">
            <Crown className="size-5 text-brand" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Plan Langganan</p>
            <p className="text-lg font-bold">{PLAN_LABELS[currentPlan] ?? "FREE"}</p>
          </div>
        </div>
        <ChevronRight className="size-5 text-slate-300 group-hover:text-slate-500 transition" />
      </Link>

      <div className="mt-6 bg-white rounded-3xl border border-slate-200/70 p-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-600">Email</label>
          <Input value={email} disabled className="mt-1 bg-slate-50" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600">Nama panggilan</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
            placeholder="Mau dipanggil apa?"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={save}
            disabled={saving}
            className="bg-ink hover:bg-ink/90 text-white rounded-xl"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
          {saved && <span className="text-sm text-emerald-600">Tersimpan ✓</span>}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-3xl border border-slate-200/70 p-6">
        <h2 className="font-semibold">Akun</h2>
        <p className="text-sm text-slate-500 mt-1">Keluar dari sesi ini.</p>
        <Button onClick={signOut} variant="outline" className="mt-4 rounded-xl">
          Keluar dari Jeevana
        </Button>
      </div>
    </div>
  );
}
