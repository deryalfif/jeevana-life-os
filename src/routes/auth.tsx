import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Masuk — Jeevana" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/chat" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/chat" },
        });
        if (error) throw error;
        navigate({ to: "/chat" });
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        setError("Link reset password telah dikirim ke email kamu.");
        setLoading(false);
        return;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/chat" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4 font-sans text-ink">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="size-9 rounded-2xl bg-gradient-to-br from-brand to-grape grid place-items-center">
            <Sparkles className="size-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Jeevana</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] border border-slate-200/70 p-8">
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "login" ? "Halo lagi 👋" : mode === "forgot" ? "Lupa Password" : "Mulai cerita kamu"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "login"
              ? "Masuk untuk lanjutin ngobrol sama Jeevana."
              : mode === "forgot"
              ? "Masukkan email kamu untuk mereset password."
              : "Bikin akun gratis. Cuma email & password."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                className="mt-1"
              />
            </div>
            {mode !== "forgot" && (
              <div>
                <label className="text-xs font-medium text-slate-600">Password</label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="min. 6 karakter"
                  className="mt-1"
                />
              </div>
            )}
            {error && (
              <div className={`text-sm rounded-xl px-3 py-2 ${error.includes("dikirim") ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-ink hover:bg-ink/90 text-white rounded-xl h-11"
            >
              {loading ? "Sebentar..." : mode === "login" ? "Masuk" : mode === "forgot" ? "Kirim Link Reset" : "Daftar"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="mt-4 text-sm text-slate-500 hover:text-ink w-full text-center block"
          >
            {mode === "login" ? (
              <>Belum punya akun? <span className="text-brand font-medium">Daftar</span></>
            ) : mode === "register" ? (
              <>Udah punya akun? <span className="text-brand font-medium">Masuk</span></>
            ) : (
              <>Kembali ke <span className="text-brand font-medium">Masuk</span></>
            )}
          </button>
          
          {mode === "login" && (
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="mt-2 text-sm text-slate-500 hover:text-ink w-full text-center block"
            >
              Lupa password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
