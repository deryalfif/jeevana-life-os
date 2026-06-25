import { createFileRoute } from "@tanstack/react-router";
import { ActivitiesScreen } from "@/components/app/ActivitiesScreen";

export const Route = createFileRoute("/_authenticated/activities")({
  head: () => ({ meta: [{ title: "Aktivitas — Jeevana" }] }),
  component: ActivitiesScreen,
});
