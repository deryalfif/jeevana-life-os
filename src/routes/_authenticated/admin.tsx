import { createFileRoute } from "@tanstack/react-router";
import { AdminScreen } from "@/components/app/AdminScreen";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Jeevana" }] }),
  component: AdminScreen,
});
