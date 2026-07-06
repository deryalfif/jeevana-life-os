-- =====================================================
-- Payment: Subscriptions table (Mayar.id integration)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free',           -- 'free', 'pro', 'premium'
  status TEXT NOT NULL DEFAULT 'active',       -- 'active', 'expired', 'cancelled', 'pending'
  mayar_invoice_id TEXT,                       -- ID invoice dari Mayar
  mayar_transaction_id TEXT,                   -- ID transaksi dari Mayar
  payment_url TEXT,                            -- URL pembayaran Mayar
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,                      -- NULL untuk free plan
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index untuk query cepat
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_mayar_invoice ON public.subscriptions(mayar_invoice_id);

-- RLS: user hanya bisa lihat subscription mereka sendiri
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own subscriptions"
  ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
  ON public.subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions"
  ON public.subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role bisa full access (untuk webhook)
CREATE POLICY "Service role full access on subscriptions"
  ON public.subscriptions
  FOR ALL
  USING (true)
  WITH CHECK (true);
