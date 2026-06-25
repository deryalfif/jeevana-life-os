import { createFileRoute } from "@tanstack/react-router";
import { HabitsScreen } from "@/components/app/HabitsScreen";

export const Route = createFileRoute("/_authenticated/habits")({
  head: () => ({ meta: [{ title: "Habits — Jeevana" }] }),
  component: HabitsScreen,
});
