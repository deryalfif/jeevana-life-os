import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { loadInitialMessages } from "@/lib/jeevana.functions";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

const SUGGESTIONS = [
  "Hari ini jogging 5km selama 45 menit",
  "Beli kopi 25 ribu di kafe",
  "Dibayar freelance 2 juta",
  "Ingatkan saya bayar listrik tanggal 10",
];

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function ToolBadge({ name, result }: { name: string; result: any }) {
  if (!result) {
    return (
      <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" /> mencatat...
      </div>
    );
  }
  if (result.ok === false) {
    return (
      <div className="mt-2 inline-flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
        <AlertTriangle className="size-3.5" /> Gagal mencatat
      </div>
    );
  }
  const label =
    result.type === "expense"
      ? `${result.title} · ${formatIDR(Number(result.amount ?? 0))}`
      : result.type === "income"
      ? `+${formatIDR(Number(result.amount ?? 0))} · ${result.title}`
      : result.type === "reminder"
      ? `Pengingat: ${result.title}`
      : result.type === "note"
      ? `Catatan disimpan`
      : `${result.title}${result.duration_minutes ? ` · ${result.duration_minutes} mnt` : ""}`;
  const tone =
    result.type === "expense"
      ? "from-rose-50 to-rose-100 text-rose-700 border-rose-200"
      : result.type === "income"
      ? "from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200"
      : result.type === "reminder"
      ? "from-amber-50 to-amber-100 text-amber-800 border-amber-200"
      : result.type === "note"
      ? "from-slate-50 to-slate-100 text-slate-700 border-slate-200"
      : "from-blue-50 to-blue-100 text-blue-700 border-blue-200";
  return (
    <div className={`mt-2 inline-flex items-center gap-2 text-xs bg-gradient-to-br ${tone} border rounded-xl px-3 py-1.5`}>
      <CheckCircle2 className="size-3.5" />
      <span className="font-medium">Dicatat:</span> {label}
    </div>
  );
}

export function ChatScreen() {
  const qc = useQueryClient();
  const loadInitial = useServerFn(loadInitialMessages);
  const { data: initial } = useQuery({
    queryKey: ["chat-history"],
    queryFn: () => loadInitial(),
    staleTime: Infinity,
  });

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setToken(data.session?.access_token ?? null));
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: () => (token ? { Authorization: `Bearer ${token}` } : {}),
      }),
    [token]
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: (initial as UIMessage[]) ?? [],
    onFinish: () => {
      qc.invalidateQueries({ queryKey: ["life-logs"] });
    },
  });

  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";

  function submit(text: string) {
    const t = text.trim();
    if (!t || isBusy) return;
    void sendMessage({ text: t });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[100dvh] md:h-screen">
      <header className="h-14 md:h-16 border-b border-slate-200/70 bg-white/80 backdrop-blur px-5 flex items-center gap-2">
        <Sparkles className="size-4 text-brand" />
        <h1 className="font-semibold tracking-tight">Ngobrol sama Jeevana</h1>
        <span className="ml-2 text-xs text-slate-400">Cerita aja, biar aku catetin.</span>
      </header>

      <Conversation className="flex-1 min-h-0">
        <ConversationContent className="max-w-3xl mx-auto w-full">
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Mulai cerita harimu ✨"
              description="Ketik apa aja — aktivitas, pengeluaran, atau pengingat. Aku catat otomatis."
              icon={
                <div className="size-12 rounded-2xl bg-gradient-to-br from-brand to-grape grid place-items-center">
                  <Sparkles className="size-6 text-white" />
                </div>
              }
            >
              <div className="size-12 rounded-2xl bg-gradient-to-br from-brand to-grape grid place-items-center">
                <Sparkles className="size-6 text-white" />
              </div>
              <div className="space-y-1 mt-2">
                <h3 className="font-semibold">Mulai cerita harimu ✨</h3>
                <p className="text-sm text-slate-500">Coba salah satu ini:</p>
              </div>
              <div className="mt-3 grid gap-2 w-full max-w-md">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-left text-sm bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl px-4 py-3 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent>
                  {m.parts.map((part, i) => {
                    if (part.type === "text") {
                      return m.role === "assistant" ? (
                        <MessageResponse key={i}>{part.text}</MessageResponse>
                      ) : (
                        <span key={i}>{part.text}</span>
                      );
                    }
                    if (part.type.startsWith("tool-")) {
                      const toolName = part.type.replace("tool-", "");
                      const output = (part as any).output;
                      return <ToolBadge key={i} name={toolName} result={output} />;
                    }
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Mikir bentar...</Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-slate-200/70 bg-white p-3 md:p-4">
        <div className="max-w-3xl mx-auto">
          <PromptInput
            onSubmit={(_, e) => {
              e.preventDefault();
              submit(input);
            }}
          >
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cerita harimu di sini..."
              autoFocus
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!input.trim() || isBusy} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
