-- =====================================================
-- Fase 5: AI Events Audit Log
-- =====================================================

CREATE TABLE IF NOT EXISTS public.ai_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,          -- 'tool_call', 'chat_complete', 'memory_derive', dll
  tool_name TEXT,                    -- nama AI tool yang dipakai, kalau ada
  input JSONB,                       -- input/arguments ke tool
  output JSONB,                      -- output dari tool
  metadata JSONB DEFAULT '{}',       -- info tambahan: model, tokens, latency, dll
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index untuk query per user dan per event type
CREATE INDEX IF NOT EXISTS idx_ai_events_user_id ON public.ai_events(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_events_event_type ON public.ai_events(event_type);
CREATE INDEX IF NOT EXISTS idx_ai_events_created_at ON public.ai_events(created_at DESC);

-- RLS: user hanya bisa lihat event mereka sendiri
ALTER TABLE public.ai_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own AI events"
  ON public.ai_events
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admin bisa baca semua (nanti untuk analytics)
CREATE POLICY "Service role can insert AI events"
  ON public.ai_events
  FOR INSERT
  WITH CHECK (true);
