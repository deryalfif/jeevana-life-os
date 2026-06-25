import { createFileRoute } from "@tanstack/react-router";
import { OnboardingScreen } from "@/components/app/OnboardingScreen";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({ meta: [{ title: "Selamat Datang — Jeevana" }] }),
  component: OnboardingScreen,
});
