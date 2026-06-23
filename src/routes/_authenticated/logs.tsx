import { createFileRoute } from "@tanstack/react-router";
import { LogsScreen } from "@/components/app/LogsScreen";

export const Route = createFileRoute("/_authenticated/logs")({
  head: () => ({ meta: [{ title: "Life Logs — Jeevana" }] }),
  component: LogsScreen,
});
