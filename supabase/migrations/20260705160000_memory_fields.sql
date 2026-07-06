-- Memory Fields Enhancement
-- Menambahkan is_pinned, is_archived, tags, dan updated_at ke tabel memories

ALTER TABLE public.memories
  ADD COLUMN IF NOT EXISTS is_pinned    BOOLEAN       NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_archived  BOOLEAN       NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS tags         TEXT[]        NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ   NOT NULL DEFAULT now();

-- Index untuk query yang sering: filter by pinned, filter out archived
CREATE INDEX IF NOT EXISTS memories_user_pinned_idx   ON public.memories(user_id, is_pinned);
CREATE INDEX IF NOT EXISTS memories_user_archived_idx ON public.memories(user_id, is_archived);

-- Auto-update updated_at saat row diubah
CREATE OR REPLACE FUNCTION public.set_memories_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS memories_set_updated_at ON public.memories;
CREATE TRIGGER memories_set_updated_at
  BEFORE UPDATE ON public.memories
  FOR EACH ROW EXECUTE FUNCTION public.set_memories_updated_at();
