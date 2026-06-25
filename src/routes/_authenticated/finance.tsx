import { createFileRoute } from "@tanstack/react-router";
import { FinanceScreen } from "@/components/app/FinanceScreen";

export const Route = createFileRoute("/_authenticated/finance")({
  head: () => ({ meta: [{ title: "Keuangan — Jeevana" }] }),
  component: FinanceScreen,
});
