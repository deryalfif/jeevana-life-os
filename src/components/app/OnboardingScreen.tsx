import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { saveUserPreferences, createGoal, createMemory } from "@/lib/jeevana.functions";
import { Sparkles, Target, Brain, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const INTEREST_OPTIONS = [
  { id: "activities", label: "Aktivitas Harian", emoji: "🏃" },
  { id: "finance", label: "Keuangan", emoji: "💰" },
  { id: "habits", label: "Kebiasaan", emoji: "🔥" },
  { id: "productivity", label: "Produktivitas", emoji: "⚡" },
  { id: "health", label: "Kesehatan", emoji: "🏥" },
  { id: "everything", label: "Semuanya!", emoji: "✨" },
];

export function OnboardingScreen() {
  const navigate = useNavigate();
  const savePrefsFn = useServerFn(saveUserPreferences);
  const createGoalFn = useServerFn(createGoal);
  const createMemoryFn = useServerFn(createMemory);

  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([""]);
  const [memories, setMemories] = useState<string[]>([""]);

  const saveMut = useMutation({
    mutationFn: async () => {
      await savePrefsFn({ data: { interests, onboarding_completed: true } });
      for (const g of goals.filter(Boolean)) {
        await createGoalFn({ data: { title: g } });
      }
      for (const m of memories.filter(Boolean)) {
        await createMemoryFn({ data: { content: m } });
      }
    },
    onSuccess: () => navigate({ to: "/chat" }),
  });

  const toggleInterest = (id: string) => {
    if (id === "everything") {
      setInterests(INTEREST_OPTIONS.map((o) => o.id));
      return;
    }
    setInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? "bg-brand" : "bg-slate-200"}`} />
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center">
            <div className="text-6xl mb-6">✨</div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Selamat Datang di Jeevana</h1>
            <p className="text-slate-500 mt-3 text-lg">AI yang bantu kamu mencatat dan memahami hidupmu, cukup lewat chat.</p>
            <Button onClick={() => setStep(2)} className="mt-8 rounded-xl gap-2 px-8 py-3 text-base">
              Mulai <ChevronRight className="size-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="size-5 text-grape" />
              <h1 className="text-2xl font-bold font-display tracking-tight">Mau Jeevana bantu apa?</h1>
            </div>
            <p className="text-slate-500 mb-6">Pilih yang sesuai kebutuhanmu.</p>
            <div className="grid grid-cols-2 gap-3">
              {INTEREST_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => toggleInterest(o.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${interests.includes(o.id) ? "border-brand bg-blue-50 ring-2 ring-brand/20" : "border-slate-200 bg-white hover:border-slate-300"}`}
                >
                  <div className="text-2xl">{o.emoji}</div>
                  <div className="mt-2 font-medium text-sm">{o.label}</div>
                  {interests.includes(o.id) && <Check className="size-4 text-brand mt-1" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">Kembali</Button>
              <Button onClick={() => setStep(3)} disabled={interests.length === 0} className="rounded-xl gap-2">
                Lanjut <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Target className="size-5 text-brand" />
              <h1 className="text-2xl font-bold font-display tracking-tight">Apa target-mu?</h1>
            </div>
            <p className="text-slate-500 mb-6">Contoh: Menabung Rp1.000.000/bulan, Olahraga 3x seminggu.</p>
            <div className="space-y-3">
              {goals.map((g, i) => (
                <input
                  key={i}
                  value={g}
                  onChange={(e) => { const n = [...goals]; n[i] = e.target.value; setGoals(n); }}
                  placeholder={`Target ${i + 1}`}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
              ))}
              <button
                onClick={() => setGoals([...goals, ""])}
                className="text-sm text-brand hover:underline"
              >
                + Tambah target
              </button>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(2)} className="rounded-xl">Kembali</Button>
              <Button onClick={() => setStep(4)} className="rounded-xl gap-2">
                Lanjut <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Memories */}
        {step === 4 && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="size-5 text-grape" />
              <h1 className="text-2xl font-bold font-display tracking-tight">Ceritakan tentang dirimu</h1>
            </div>
            <p className="text-slate-500 mb-6">Biar Jeevana lebih kenal kamu. Contoh: "Saya Data Analyst di startup."</p>
            <div className="space-y-3">
              {memories.map((m, i) => (
                <input
                  key={i}
                  value={m}
                  onChange={(e) => { const n = [...memories]; n[i] = e.target.value; setMemories(n); }}
                  placeholder={`Info tentang kamu ${i + 1}`}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
              ))}
              <button
                onClick={() => setMemories([...memories, ""])}
                className="text-sm text-grape hover:underline"
              >
                + Tambah info
              </button>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(3)} className="rounded-xl">Kembali</Button>
              <Button onClick={() => setStep(5)} className="rounded-xl gap-2">
                Lanjut <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Generate workspace */}
        {step === 5 && (
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Siap dipakai!</h1>
            <p className="text-slate-500 mt-3 text-lg">
              Workspace personalmu sudah siap. Sekarang, cukup ngobrol dan biarkan Jeevana mengurus sisanya.
            </p>
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 text-left">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Ringkasan</div>
              <div className="space-y-2 text-sm">
                <div>✅ {interests.length} bidang minat dipilih</div>
                <div>🎯 {goals.filter(Boolean).length} target dibuat</div>
                <div>🧠 {memories.filter(Boolean).length} memory disimpan</div>
              </div>
            </div>
            <Button
              onClick={() => saveMut.mutate()}
              disabled={saveMut.isPending}
              className="mt-8 rounded-xl gap-2 px-8 py-3 text-base"
            >
              {saveMut.isPending ? "Menyiapkan..." : "Mulai Chat dengan Jeevana ✨"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
