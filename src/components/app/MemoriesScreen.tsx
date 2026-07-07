import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  fetchMemories,
  fetchArchivedMemories,
  createMemory,
  deleteMemory,
  updateMemory,
  pinMemory,
  archiveMemory,
} from "@/lib/jeevana.functions";
import { retrieveRelevantMemories } from "@/lib/memory";
import {
  Brain,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Search,
  Pin,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MemoryTab = "all" | "pinned" | "archived";

export function MemoriesScreen() {
  const qc = useQueryClient();
  const fetchFn = useServerFn(fetchMemories);
  const fetchArchivedFn = useServerFn(fetchArchivedMemories);
  const createFn = useServerFn(createMemory);
  const deleteFn = useServerFn(deleteMemory);
  const updateFn = useServerFn(updateMemory);
  const pinFn = useServerFn(pinMemory);
  const archiveFn = useServerFn(archiveMemory);

  const [tab, setTab] = useState<MemoryTab>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: activeMemories = [], isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: () => fetchFn(),
  });

  const { data: archivedMemories = [], isLoading: isLoadingArchived } = useQuery({
    queryKey: ["memories", "archived"],
    queryFn: () => fetchArchivedFn(),
    enabled: tab === "archived",
  });

  // Tab filtering
  const tabMemories = useMemo(() => {
    if (tab === "archived") return archivedMemories;
    if (tab === "pinned") return activeMemories.filter((m) => m.is_pinned);
    return activeMemories;
  }, [tab, activeMemories, archivedMemories]);

  // Client-side semantic search
  const displayedMemories = useMemo(() => {
    if (!searchQuery.trim()) return tabMemories;
    const scored = retrieveRelevantMemories(tabMemories, searchQuery, 50);
    return scored.length > 0
      ? scored.map((s) => tabMemories.find((m) => m.id === s.id)!).filter(Boolean)
      : [];
  }, [tabMemories, searchQuery]);

  const pinnedCount = activeMemories.filter((m) => m.is_pinned).length;

  const createMut = useMutation({
    mutationFn: (content: string) => createFn({ data: { content } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["memories"] });
      setShowAdd(false);
      setNewContent("");
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["memories"] }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateFn({ data: { id, content } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["memories"] });
      setEditId(null);
    },
  });

  const pinMut = useMutation({
    mutationFn: ({ id, isPinned }: { id: string; isPinned: boolean }) =>
      pinFn({ data: { id, isPinned } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["memories"] }),
  });

  const archiveMut = useMutation({
    mutationFn: ({ id, isArchived }: { id: string; isArchived: boolean }) =>
      archiveFn({ data: { id, isArchived } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["memories"] });
      qc.invalidateQueries({ queryKey: ["memories", "archived"] });
    },
  });

  const loading = isLoading || (tab === "archived" && isLoadingArchived);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Memory Center</h1>
          <p className="text-slate-500 mt-1">Hal-hal penting tentangmu yang diingat Jeevana.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="rounded-xl gap-2">
          <Plus className="size-4" /> Tambah Memory
        </Button>
      </div>

      {/* Info card */}
      <div className="mt-6 bg-gradient-to-r from-grape/10 to-brand/10 border border-grape/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Brain className="size-5 text-grape mt-0.5 shrink-0" />
          <div>
            <div className="font-medium text-sm">Apa itu Memory?</div>
            <p className="text-xs text-slate-600 mt-1">
              Memory adalah informasi tentang dirimu yang diingat AI secara jangka panjang —
              pekerjaanmu, hobimu, tujuan hidupmu. Semakin banyak memory, semakin personal AI-nya.
              Kamu bisa pin, archive, atau hapus memory kapan saja.
            </p>
          </div>
        </div>
      </div>

      {/* Tab filter */}
      <div className="mt-5 flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(
          [
            { key: "all", label: "Semua", count: activeMemories.length },
            { key: "pinned", label: "📌 Pinned", count: pinnedCount },
            { key: "archived", label: "🗃️ Arsip", count: null },
          ] as const
        ).map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => {
              setTab(key);
              setSearchQuery("");
            }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              tab === key ? "bg-white shadow-sm text-ink" : "text-slate-500 hover:text-ink"
            }`}
          >
            {label}
            {count !== null && count > 0 && (
              <span className="ml-1.5 text-xs bg-slate-200 text-slate-600 rounded-full px-1.5 py-0.5">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search bar */}
      {tabMemories.length > 0 && (
        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari memory... (mis. keuangan, olahraga, kerja)"
            className="pl-10 rounded-xl bg-white border-slate-200/70"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      )}

      {/* Search result count */}
      {searchQuery && (
        <p className="mt-2 text-xs text-slate-500">
          {displayedMemories.length === 0
            ? "Tidak ada memory yang cocok."
            : `Menampilkan ${displayedMemories.length} dari ${tabMemories.length} memory yang relevan`}
        </p>
      )}

      {/* Add form */}
      {showAdd && (
        <div className="mt-4 bg-white border border-slate-200/70 rounded-2xl p-5">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder='Contoh: "Saya bekerja sebagai Data Analyst di startup fintech."'
            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm border-none outline-none focus:ring-2 focus:ring-brand/30 resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2 mt-3 justify-end">
            <Button variant="outline" onClick={() => setShowAdd(false)} className="rounded-xl">
              Batal
            </Button>
            <Button
              onClick={() => newContent && createMut.mutate(newContent)}
              disabled={!newContent || createMut.isPending}
              className="rounded-xl"
            >
              Simpan
            </Button>
          </div>
        </div>
      )}

      {/* Memories list */}
      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="bg-white border border-slate-200/70 rounded-3xl p-10 text-center text-sm text-slate-400">
            Memuat...
          </div>
        ) : tabMemories.length === 0 ? (
          <div className="bg-white border border-slate-200/70 rounded-3xl p-10 text-center">
            <div className="text-4xl">
              {tab === "pinned" ? "📌" : tab === "archived" ? "🗃️" : "🧠"}
            </div>
            <p className="mt-3 font-semibold">
              {tab === "pinned"
                ? "Belum ada memory yang di-pin"
                : tab === "archived"
                  ? "Arsip kosong"
                  : "Belum ada memory"}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {tab === "pinned"
                ? "Pin memory penting dengan klik ikon 📌 di setiap memory."
                : tab === "archived"
                  ? "Memory yang kamu arsipkan akan muncul di sini."
                  : "Ceritakan tentang dirimu di AI Chat — AI akan otomatis menyimpannya."}
            </p>
          </div>
        ) : displayedMemories.length === 0 && searchQuery ? (
          <div className="bg-white border border-slate-200/70 rounded-3xl p-10 text-center">
            <div className="text-4xl">🔍</div>
            <p className="mt-3 font-semibold">Tidak ada hasil</p>
            <p className="text-sm text-slate-500 mt-1">
              Coba kata kunci lain atau hapus pencarian.
            </p>
          </div>
        ) : (
          displayedMemories.map((m) => (
            <div
              key={m.id}
              className={`bg-white border rounded-2xl p-5 group transition-colors ${
                m.is_pinned ? "border-brand/30 bg-brand/5" : "border-slate-200/70"
              }`}
            >
              {editId === m.id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm border-none outline-none focus:ring-2 focus:ring-brand/30 resize-none"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2 justify-end">
                    <button
                      onClick={() => setEditId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <X className="size-3" /> Batal
                    </button>
                    <button
                      onClick={() => updateMut.mutate({ id: m.id, content: editContent })}
                      className="text-xs text-brand hover:text-brand/80 flex items-center gap-1"
                    >
                      <Save className="size-3" /> Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div
                    className={`size-9 rounded-xl grid place-items-center shrink-0 mt-0.5 ${
                      m.is_pinned ? "bg-brand/15 text-brand" : "bg-grape/10 text-grape"
                    }`}
                  >
                    {m.is_pinned ? <Pin className="size-4" /> : <Brain className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{m.content}</p>

                    {/* Tags */}
                    {m.tags && m.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {m.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-slate-100 text-slate-600 rounded-full px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 mt-2">
                      {m.is_pinned && (
                        <span className="text-brand font-medium mr-2">📌 Pinned</span>
                      )}
                      Disimpan{" "}
                      {new Date(m.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {/* Pin / Unpin */}
                    <button
                      onClick={() => pinMut.mutate({ id: m.id, isPinned: !m.is_pinned })}
                      title={m.is_pinned ? "Unpin memory" : "Pin memory"}
                      className={`p-1.5 rounded-lg transition-colors ${
                        m.is_pinned
                          ? "bg-brand/10 text-brand hover:bg-brand/20"
                          : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Pin className="size-3.5" />
                    </button>

                    {/* Edit */}
                    {tab !== "archived" && (
                      <button
                        onClick={() => {
                          setEditId(m.id);
                          setEditContent(m.content);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                    )}

                    {/* Archive / Unarchive */}
                    <button
                      onClick={() => archiveMut.mutate({ id: m.id, isArchived: !m.is_archived })}
                      title={m.is_archived ? "Kembalikan dari arsip" : "Arsipkan memory"}
                      className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600"
                    >
                      {m.is_archived ? (
                        <ArchiveRestore className="size-3.5" />
                      ) : (
                        <Archive className="size-3.5" />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm("Hapus memory ini permanen?")) deleteMut.mutate(m.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
