-- =====================================================
-- Fase 3: Finance Budgets
-- =====================================================

-- Tabel finance_budgets
CREATE TABLE IF NOT EXISTS public.finance_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount_limit NUMERIC NOT NULL DEFAULT 0,
  period TEXT NOT NULL DEFAULT 'monthly' CHECK (period IN ('monthly', 'weekly')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index untuk lookup cepat per user
CREATE INDEX IF NOT EXISTS idx_finance_budgets_user_id ON public.finance_budgets(user_id);

-- Trigger auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_finance_budgets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_finance_budgets_updated_at
  BEFORE UPDATE ON public.finance_budgets
  FOR EACH ROW EXECUTE FUNCTION public.update_finance_budgets_updated_at();

-- RLS
ALTER TABLE public.finance_budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own budgets"
  ON public.finance_budgets
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
