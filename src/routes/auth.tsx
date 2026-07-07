import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Masuk — Jeevana" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/chat" },
        });
        if (error) throw error;

        if (data.user && !data.session) {
          setError("Pendaftaran berhasil! Cek email kamu untuk verifikasi.");
          setMode("login");
          setLoading(false);
          return;
        }

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

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/chat",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
      // Browser akan redirect ke Google — tidak perlu navigate manual
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk dengan Google");
      setGoogleLoading(false);
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
            {mode === "login"
              ? "Halo lagi 👋"
              : mode === "forgot"
                ? "Lupa Password"
                : "Mulai cerita kamu"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "login"
              ? "Masuk untuk lanjutin ngobrol sama Jeevana."
              : mode === "forgot"
                ? "Masukkan email kamu untuk mereset password."
                : "Bikin akun gratis. Cuma email & password."}
          </p>

          {/* Google OAuth — hanya tampil di mode login & register */}
          {mode !== "forgot" && (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="mt-6 w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 h-11 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="size-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              {googleLoading ? "Menghubungkan..." : "Lanjut dengan Google"}
            </button>
          )}

          {/* Divider "atau" */}
          {mode !== "forgot" && (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400">atau</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`${mode !== "forgot" ? "mt-4" : "mt-6"} space-y-3`}
          >
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="min. 6 karakter"
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            )}
            {error && (
              <div
                className={`text-sm rounded-xl px-3 py-2 ${
                  error.includes("dikirim") || error.includes("berhasil")
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-ink hover:bg-ink/90 text-white rounded-xl h-11"
            >
              {loading
                ? "Sebentar..."
                : mode === "login"
                  ? "Masuk"
                  : mode === "forgot"
                    ? "Kirim Link Reset"
                    : "Daftar"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="mt-4 text-sm text-slate-500 hover:text-ink w-full text-center block"
          >
            {mode === "login" ? (
              <>
                Belum punya akun? <span className="text-brand font-medium">Daftar</span>
              </>
            ) : mode === "register" ? (
              <>
                Udah punya akun? <span className="text-brand font-medium">Masuk</span>
              </>
            ) : (
              <>
                Kembali ke <span className="text-brand font-medium">Masuk</span>
              </>
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
