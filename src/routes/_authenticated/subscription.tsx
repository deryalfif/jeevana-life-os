import { createFileRoute } from "@tanstack/react-router";
import { SubscriptionScreen } from "@/components/app/SubscriptionScreen";

export const Route = createFileRoute("/_authenticated/subscription")({
  head: () => ({ meta: [{ title: "Langganan — Jeevana" }] }),
  component: SubscriptionScreen,
});
