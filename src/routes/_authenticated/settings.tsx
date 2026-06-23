import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — Jeevana" }] }),
  component: SettingsScreen,
});

function SettingsScreen() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      setEmail(u.user?.email ?? "");
      const { data: p } = await supabase.from("profiles").select("display_name").eq("id", u.user!.id).single();
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

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
      <p className="text-slate-500 mt-1">Atur profil dan akun kamu.</p>

      <div className="mt-8 bg-white rounded-3xl border border-slate-200/70 p-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-600">Email</label>
          <Input value={email} disabled className="mt-1 bg-slate-50" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600">Nama panggilan</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" placeholder="Mau dipanggil apa?" />
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={save} disabled={saving} className="bg-ink hover:bg-ink/90 text-white rounded-xl">
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
