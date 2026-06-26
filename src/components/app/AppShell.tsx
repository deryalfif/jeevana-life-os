import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  MessageCircle,
  Newspaper,
  LayoutGrid,
  Database,
  Settings,
  Sparkles,
  LogOut,
  Calendar,
  Activity,
  Flame,
  Wallet,
  Bell,
  Brain,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

const nav = [
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/calendar", label: "Kalender", icon: Calendar },
  { to: "/activities", label: "Aktivitas", icon: Activity },
  { to: "/habits", label: "Habits", icon: Flame },
  { to: "/finance", label: "Keuangan", icon: Wallet },
  { to: "/reminders", label: "Pengingat", icon: Bell },
  { to: "/memories", label: "Memories", icon: Brain },
  { to: "/insights", label: "Insights", icon: TrendingUp },
  { to: "/feed", label: "Life Feed", icon: Newspaper },
  { to: "/logs", label: "Data Mentah", icon: Database },
  { to: "/admin", label: "Admin Panel", icon: ShieldAlert },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-canvas font-sans text-ink flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-200/70 bg-white">
        <Link to="/chat" className="flex items-center gap-2 px-5 h-16 border-b border-slate-200/70">
          <div className="size-8 rounded-xl bg-gradient-to-br from-brand to-grape grid place-items-center">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-bold tracking-tight">Jeevana</span>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                  active
                    ? "bg-ink text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={signOut}
          className="m-3 flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-100 hover:text-ink"
        >
          <LogOut className="size-4" /> Keluar
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 min-h-0 pb-16 md:pb-0">{children}</main>

        {/* Bottom nav (mobile) */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 px-2 py-2 z-30 overflow-x-auto">
          <div className="flex min-w-max gap-1">
            {nav.filter((item) => item.to !== "/admin").map((item) => {
              const active = pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center gap-0.5 text-[10px] px-3 py-1 rounded-lg whitespace-nowrap ${
                    active ? "text-ink bg-slate-100" : "text-slate-400"
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
