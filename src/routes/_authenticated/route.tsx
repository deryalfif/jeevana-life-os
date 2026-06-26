import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });

    const isOnboardingPage = location.pathname === "/onboarding";
    const { data: prefs } = await supabase
      .from("user_preferences")
      .select("onboarding_completed")
      .eq("user_id", data.user.id)
      .maybeSingle();

    const onboardingCompleted = prefs?.onboarding_completed === true;

    if (!isOnboardingPage && !onboardingCompleted) throw redirect({ to: "/onboarding" });
    if (isOnboardingPage && onboardingCompleted) throw redirect({ to: "/chat" });

    return { user: data.user, onboardingCompleted };
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
