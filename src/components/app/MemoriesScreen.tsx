import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchMemories, createMemory, deleteMemory, updateMemory } from "@/lib/jeevana.functions";
import { Brain, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MemoriesScreen() {
  const qc = useQueryClient();
  const fetchFn = useServerFn(fetchMemories);
  const createFn = useServerFn(createMemory);
  const deleteFn = useServerFn(deleteMemory);
  const updateFn = useServerFn(updateMemory);

  const { data: memories = [], isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: () => fetchFn(),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const createMut = useMutation({
    mutationFn: (content: string) => createFn({ data: { content } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["memories"] }); setShowAdd(false); setNewContent(""); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["memories"] }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => updateFn({ data: { id, content } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["memories"] }); setEditId(null); },
  });

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
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
              Memory adalah informasi tentang dirimu yang diingat AI secara jangka panjang — pekerjaanmu, hobimu, tujuan hidupmu.
              Semakin banyak memory, semakin personal AI-nya. Kamu bisa menambah, edit, atau hapus memory kapan saja.
            </p>
          </div>
        </div>
      </div>

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
            <Button variant="outline" onClick={() => setShowAdd(false)} className="rounded-xl">Batal</Button>
            <Button onClick={() => newContent && createMut.mutate(newContent)} disabled={!newContent || createMut.isPending} className="rounded-xl">
              Simpan
            </Button>
          </div>
        </div>
      )}

      {/* Memories list */}
      <div className="mt-6 space-y-3">
        {isLoading ? (
          <div className="bg-white border border-slate-200/70 rounded-3xl p-10 text-center text-sm text-slate-400">Memuat...</div>
        ) : memories.length === 0 ? (
          <div className="bg-white border border-slate-200/70 rounded-3xl p-10 text-center">
            <div className="text-4xl">🧠</div>
            <p className="mt-3 font-semibold">Belum ada memory</p>
            <p className="text-sm text-slate-500 mt-1">
              Ceritakan tentang dirimu di AI Chat, misalnya "Saya bekerja sebagai developer" — AI akan otomatis menyimpannya.
            </p>
          </div>
        ) : (
          memories.map((m) => (
            <div key={m.id} className="bg-white border border-slate-200/70 rounded-2xl p-5 group">
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
                    <button onClick={() => setEditId(null)} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
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
                  <div className="size-9 rounded-xl bg-grape/10 text-grape grid place-items-center shrink-0 mt-0.5">
                    <Brain className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{m.content}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      Disimpan {new Date(m.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setEditId(m.id); setEditContent(m.content); }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => { if (confirm("Hapus memory ini?")) deleteMut.mutate(m.id); }}
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
