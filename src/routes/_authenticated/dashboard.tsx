import { createFileRoute } from "@tanstack/react-router";
import { DashboardScreen } from "@/components/app/DashboardScreen";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Jeevana" }] }),
  component: DashboardScreen,
});
