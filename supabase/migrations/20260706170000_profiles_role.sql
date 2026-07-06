-- =====================================================
-- Fase 4: Admin Panel & RBAC
-- Tambah kolom role ke profiles
-- =====================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Index untuk lookup role
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Update existing rows (pastikan semua user punya role 'user')
UPDATE public.profiles SET role = 'user' WHERE role IS NULL OR role = '';
