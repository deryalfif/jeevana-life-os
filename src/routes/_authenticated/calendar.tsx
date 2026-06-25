import { createFileRoute } from "@tanstack/react-router";
import { CalendarScreen } from "@/components/app/CalendarScreen";

export const Route = createFileRoute("/_authenticated/calendar")({
  head: () => ({ meta: [{ title: "Kalender — Jeevana" }] }),
  component: CalendarScreen,
});
