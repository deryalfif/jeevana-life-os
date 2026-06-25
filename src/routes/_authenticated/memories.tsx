import { createFileRoute } from "@tanstack/react-router";
import { MemoriesScreen } from "@/components/app/MemoriesScreen";

export const Route = createFileRoute("/_authenticated/memories")({
  head: () => ({ meta: [{ title: "Memory Center — Jeevana" }] }),
  component: MemoriesScreen,
});
