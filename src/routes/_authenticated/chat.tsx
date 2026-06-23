import { createFileRoute } from "@tanstack/react-router";
import { ChatScreen } from "@/components/app/ChatScreen";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({ meta: [{ title: "Chat — Jeevana" }] }),
  component: ChatScreen,
});
