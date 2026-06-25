import { createFileRoute } from "@tanstack/react-router";
import { InsightsScreen } from "@/components/app/InsightsScreen";

export const Route = createFileRoute("/_authenticated/insights")({
  head: () => ({ meta: [{ title: "Insights — Jeevana" }] }),
  component: InsightsScreen,
});
