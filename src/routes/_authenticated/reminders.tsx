import { createFileRoute } from "@tanstack/react-router";
import { RemindersScreen } from "@/components/app/RemindersScreen";

export const Route = createFileRoute("/_authenticated/reminders")({
  head: () => ({ meta: [{ title: "Pengingat — Jeevana" }] }),
  component: RemindersScreen,
});
