import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const loadInitialMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("messages")
      .select("id, role, content, parts, created_at")
      .order("created_at", { ascending: true })
      .limit(1000);
    if (error) throw new Error(error.message);
    return (data ?? []).map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant",
      parts:
        Array.isArray(m.parts) && (m.parts as unknown as unknown[]).length > 0
          ? (m.parts as unknown as Array<{ type: string }>)
          : [{ type: "text" as const, text: m.content }],
    }));
  });

export const fetchLifeLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("life_logs")
      .select("id, type, category, title, amount, duration_minutes, occurred_at, metadata, created_at")
      .order("occurred_at", { ascending: false })
      .limit(2000);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const deleteLifeLog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("life_logs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// === HABITS ===
export const fetchHabits = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("habits")
      .select("id, title, frequency, target_per_period, icon, color, is_active, created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const fetchHabitCompletions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { data, error } = await context.supabase
      .from("habit_completions")
      .select("id, habit_id, completed_at")
      .gte("completed_at", thirtyDaysAgo.toISOString())
      .order("completed_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createHabit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { title: string; frequency?: string; target_per_period?: number }) => d)
  .handler(async ({ data, context }) => {
    const { data: habit, error } = await context.supabase
      .from("habits")
      .insert({
        user_id: context.userId,
        title: data.title,
        frequency: data.frequency ?? "daily",
        target_per_period: data.target_per_period ?? 1,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return habit;
  });

export const completeHabit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { habit_id: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("habit_completions")
      .insert({ habit_id: data.habit_id, user_id: context.userId });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteHabit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("habits")
      .update({ is_active: false })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// === MEMORIES ===
export const fetchMemories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("memories")
      .select("id, content, is_pinned, is_archived, tags, created_at, updated_at")
      .eq("is_archived", false) // default: exclude archived
      .order("is_pinned", { ascending: false }) // pinned duluan
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const fetchArchivedMemories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("memories")
      .select("id, content, is_pinned, is_archived, tags, created_at, updated_at")
      .eq("is_archived", true)
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { content: string; tags?: string[] }) => d)
  .handler(async ({ data, context }) => {
    const { data: memory, error } = await context.supabase
      .from("memories")
      .insert({ user_id: context.userId, content: data.content, tags: data.tags ?? [] })
      .select("id, content, is_pinned, is_archived, tags, created_at, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return memory;
  });

export const deleteMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("memories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; content: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("memories")
      .update({ content: data.content, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const pinMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; isPinned: boolean }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("memories")
      .update({ is_pinned: data.isPinned, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const archiveMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; isArchived: boolean }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("memories")
      .update({ is_archived: data.isArchived, is_pinned: false, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const addTagToMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; tag: string }) => d)
  .handler(async ({ data, context }) => {
    // Fetch existing tags dulu
    const { data: current, error: fetchErr } = await context.supabase
      .from("memories")
      .select("tags")
      .eq("id", data.id)
      .single();
    if (fetchErr) throw new Error(fetchErr.message);
    const existing = current?.tags ?? [];
    if (existing.includes(data.tag)) return { ok: true }; // sudah ada
    const { error } = await context.supabase
      .from("memories")
      .update({ tags: [...existing, data.tag], updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const removeTagFromMemory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; tag: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: current, error: fetchErr } = await context.supabase
      .from("memories")
      .select("tags")
      .eq("id", data.id)
      .single();
    if (fetchErr) throw new Error(fetchErr.message);
    const updated = (current?.tags ?? []).filter((t: string) => t !== data.tag);
    const { error } = await context.supabase
      .from("memories")
      .update({ tags: updated, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// === GOALS ===
export const fetchGoals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("goals")
      .select("id, title, target_value, current_value, unit, deadline, status, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { title: string; target_value?: number; unit?: string; deadline?: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: goal, error } = await context.supabase
      .from("goals")
      .insert({
        user_id: context.userId,
        title: data.title,
        target_value: data.target_value,
        unit: data.unit,
        deadline: data.deadline,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return goal;
  });

// === REMINDERS ===
export const fetchReminders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("reminders")
      .select("id, title, remind_at, status, life_log_id, created_at")
      .order("remind_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateReminderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("reminders")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// === USER PREFERENCES ===
export const fetchUserPreferences = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", context.userId)
      .single();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data;
  });

export const saveUserPreferences = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { interests?: string[]; onboarding_completed?: boolean; timezone?: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("user_preferences")
      .upsert({
        user_id: context.userId,
        ...data,
        updated_at: new Date().toISOString(),
      });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// === ADMIN ===
export const fetchAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Verify admin role
    const { data: profile } = await context.supabase
      .from("profiles")
      .select("role")
      .eq("id", context.userId)
      .single();
    if (profile?.role !== "admin" && profile?.role !== "super_admin") {
      throw new Error("Forbidden: Admin access required");
    }

    // Use the admin client for cross-user queries
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count: userCount } = await supabaseAdmin.from("profiles").select("*", { count: "exact", head: true });
    const { count: logCount } = await supabaseAdmin.from("life_logs").select("*", { count: "exact", head: true });
    const { count: messageCount } = await supabaseAdmin.from("messages").select("*", { count: "exact", head: true });

    return {
      totalUsers: userCount ?? 0,
      totalLogs: logCount ?? 0,
      totalMessages: messageCount ?? 0,
    };
  });

export const fetchAdminUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: profile } = await context.supabase
      .from("profiles")
      .select("role")
      .eq("id", context.userId)
      .single();
    if (profile?.role !== "admin" && profile?.role !== "super_admin") {
      throw new Error("Forbidden: Admin access required");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, display_name, role, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; role: string }) => d)
  .handler(async ({ data, context }) => {
    // Verify caller is admin/super_admin
    const { data: callerProfile } = await context.supabase
      .from("profiles")
      .select("role")
      .eq("id", context.userId)
      .single();
    if (callerProfile?.role !== "admin" && callerProfile?.role !== "super_admin") {
      throw new Error("Forbidden: Admin access required");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role: data.role })
      .eq("id", data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// === FINANCE BUDGETS ===
export const fetchBudgets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("finance_budgets")
      .select("id, category, amount_limit, period, created_at, updated_at")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const createBudget = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { category: string; amount_limit: number; period?: string }) => d)
  .handler(async ({ data, context }) => {
    const { data: budget, error } = await context.supabase
      .from("finance_budgets")
      .insert({
        user_id: context.userId,
        category: data.category,
        amount_limit: data.amount_limit,
        period: data.period ?? "monthly",
      })
      .select("id, category, amount_limit, period, created_at, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return budget;
  });

export const updateBudget = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; category?: string; amount_limit?: number; period?: string }) => d)
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const { error } = await context.supabase
      .from("finance_budgets")
      .update(rest)
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteBudget = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("finance_budgets")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
