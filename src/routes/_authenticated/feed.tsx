import { createFileRoute } from "@tanstack/react-router";
import { FeedScreen } from "@/components/app/FeedScreen";

export const Route = createFileRoute("/_authenticated/feed")({
  head: () => ({ meta: [{ title: "Life Feed — Jeevana" }] }),
  component: FeedScreen,
});
