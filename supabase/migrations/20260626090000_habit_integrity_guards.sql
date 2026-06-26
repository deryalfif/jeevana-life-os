CREATE UNIQUE INDEX IF NOT EXISTS habits_user_title_active_unique_idx
ON public.habits (user_id, lower(title))
WHERE is_active = true;

CREATE UNIQUE INDEX IF NOT EXISTS habit_completions_user_habit_day_unique_idx
ON public.habit_completions (user_id, habit_id, (date(completed_at)));