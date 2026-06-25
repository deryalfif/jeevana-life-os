import { TSS_SERVER_FUNCTION, createServerFn } from "./esm-B0H-9KhN.mjs";
import { requireSupabaseAuth } from "./auth-middleware-B4yfsouX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jeevana.functions-DyZ01odm.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadInitialMessages_createServerFn_handler = createServerRpc({
	id: "0b5f9a13376f19e6dc2ac429b75e4a50beb13fdd8e26f6ccccd93bf5d135b021",
	name: "loadInitialMessages",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => loadInitialMessages.__executeServer(opts));
var loadInitialMessages = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(loadInitialMessages_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("messages").select("id, role, content, parts, created_at").order("created_at", { ascending: true }).limit(200);
	if (error) throw new Error(error.message);
	return (data ?? []).map((m) => ({
		id: m.id,
		role: m.role,
		parts: Array.isArray(m.parts) && m.parts.length > 0 ? m.parts : [{
			type: "text",
			text: m.content
		}]
	}));
});
var fetchLifeLogs_createServerFn_handler = createServerRpc({
	id: "381803fbb31d3044121445a378e8724cf3911d7379f139262f3cad120c6ae154",
	name: "fetchLifeLogs",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchLifeLogs.__executeServer(opts));
var fetchLifeLogs = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchLifeLogs_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("life_logs").select("id, type, category, title, amount, duration_minutes, occurred_at, metadata, created_at").order("occurred_at", { ascending: false }).limit(500);
	if (error) throw new Error(error.message);
	return data ?? [];
});
var deleteLifeLog_createServerFn_handler = createServerRpc({
	id: "821a68122cd69bce305521371f872c6f0d6cf90083064f32beab45394670b892",
	name: "deleteLifeLog",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => deleteLifeLog.__executeServer(opts));
var deleteLifeLog = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(deleteLifeLog_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("life_logs").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var fetchHabits_createServerFn_handler = createServerRpc({
	id: "2681635f7092af861959bf3b62ac9a69e5dbfb636fddc5561acb2378ae699707",
	name: "fetchHabits",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchHabits.__executeServer(opts));
var fetchHabits = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchHabits_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("habits").select("id, title, frequency, target_per_period, icon, color, is_active, created_at").eq("is_active", true).order("created_at", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var fetchHabitCompletions_createServerFn_handler = createServerRpc({
	id: "6752e17c446c7102ef42a1c57a07886d7ee2eaa65ac495067dc758cb449e0762",
	name: "fetchHabitCompletions",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchHabitCompletions.__executeServer(opts));
var fetchHabitCompletions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchHabitCompletions_createServerFn_handler, async ({ context }) => {
	const thirtyDaysAgo = /* @__PURE__ */ new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	const { data, error } = await context.supabase.from("habit_completions").select("id, habit_id, completed_at").gte("completed_at", thirtyDaysAgo.toISOString()).order("completed_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var createHabit_createServerFn_handler = createServerRpc({
	id: "5b67dbf9b01f0a375162ea74972f77a36837820c8e62952b0e0ae20e08393ee7",
	name: "createHabit",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => createHabit.__executeServer(opts));
var createHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createHabit_createServerFn_handler, async ({ data, context }) => {
	const { data: habit, error } = await context.supabase.from("habits").insert({
		user_id: context.userId,
		title: data.title,
		frequency: data.frequency ?? "daily",
		target_per_period: data.target_per_period ?? 1
	}).select().single();
	if (error) throw new Error(error.message);
	return habit;
});
var completeHabit_createServerFn_handler = createServerRpc({
	id: "562fce3729390f860d68a9cb5f9641e4359b338e090cca78dd7a1bdf83efdbc1",
	name: "completeHabit",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => completeHabit.__executeServer(opts));
var completeHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(completeHabit_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("habit_completions").insert({
		habit_id: data.habit_id,
		user_id: context.userId
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteHabit_createServerFn_handler = createServerRpc({
	id: "7ea209853c3ab8ae4577af7683c8ef242841a5256beef95b5c4c829d727af35c",
	name: "deleteHabit",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => deleteHabit.__executeServer(opts));
var deleteHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(deleteHabit_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("habits").update({ is_active: false }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var fetchMemories_createServerFn_handler = createServerRpc({
	id: "d07c4b7b50dcfd1072b98ff0403f7b978f999555faf433e2b20b8f163d410334",
	name: "fetchMemories",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchMemories.__executeServer(opts));
var fetchMemories = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchMemories_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("memories").select("id, content, created_at").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var createMemory_createServerFn_handler = createServerRpc({
	id: "083071cbb6b37309dc135019a4137f1efd5f37bacd346c05a15057ece6ad7a30",
	name: "createMemory",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => createMemory.__executeServer(opts));
var createMemory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createMemory_createServerFn_handler, async ({ data, context }) => {
	const { data: memory, error } = await context.supabase.from("memories").insert({
		user_id: context.userId,
		content: data.content
	}).select().single();
	if (error) throw new Error(error.message);
	return memory;
});
var deleteMemory_createServerFn_handler = createServerRpc({
	id: "bef7f9b297d7066276d0de3baa493a7c72d4f0dbf194868e7713ee1f3f24589e",
	name: "deleteMemory",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => deleteMemory.__executeServer(opts));
var deleteMemory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(deleteMemory_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("memories").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var updateMemory_createServerFn_handler = createServerRpc({
	id: "20dc21e93c51767d220fd22efcd151bc14dbf463235b2cab2de75ed28b1dd7e3",
	name: "updateMemory",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => updateMemory.__executeServer(opts));
var updateMemory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(updateMemory_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("memories").update({ content: data.content }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var fetchGoals_createServerFn_handler = createServerRpc({
	id: "fc0d9c9e98a5ec82105f0366e09676ac1f3d071b65a195aca6fa63172b0aaccb",
	name: "fetchGoals",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchGoals.__executeServer(opts));
var fetchGoals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchGoals_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("goals").select("id, title, target_value, current_value, unit, deadline, status, created_at").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var createGoal_createServerFn_handler = createServerRpc({
	id: "f81b489e0e347eec7e98a9be684c1530a9a19e654a096dc7d6bfab62ec3666fd",
	name: "createGoal",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => createGoal.__executeServer(opts));
var createGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createGoal_createServerFn_handler, async ({ data, context }) => {
	const { data: goal, error } = await context.supabase.from("goals").insert({
		user_id: context.userId,
		title: data.title,
		target_value: data.target_value,
		unit: data.unit,
		deadline: data.deadline
	}).select().single();
	if (error) throw new Error(error.message);
	return goal;
});
var fetchReminders_createServerFn_handler = createServerRpc({
	id: "07b538c424c652c668fe08bf84e4bc39271de25c157a0253c253134cc3a59bcf",
	name: "fetchReminders",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchReminders.__executeServer(opts));
var fetchReminders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchReminders_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("reminders").select("id, title, remind_at, status, life_log_id, created_at").order("remind_at", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var updateReminderStatus_createServerFn_handler = createServerRpc({
	id: "b9cc098136ea190a9bb2a9e64174624f42a8bf43696f36ebc61fe2b9499d0a81",
	name: "updateReminderStatus",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => updateReminderStatus.__executeServer(opts));
var updateReminderStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(updateReminderStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("reminders").update({ status: data.status }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var fetchUserPreferences_createServerFn_handler = createServerRpc({
	id: "22df63008c08c47a7d61df3808d0efd45d3dd69d89cb9c9c3a24ddedcd9b0e21",
	name: "fetchUserPreferences",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchUserPreferences.__executeServer(opts));
var fetchUserPreferences = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchUserPreferences_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("user_preferences").select("*").eq("user_id", context.userId).single();
	if (error && error.code !== "PGRST116") throw new Error(error.message);
	return data;
});
var saveUserPreferences_createServerFn_handler = createServerRpc({
	id: "bcb5b014023eb8e5b3656b5e3f5d61d7f9db44b8967a08c87eea2340dd1d27a7",
	name: "saveUserPreferences",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => saveUserPreferences.__executeServer(opts));
var saveUserPreferences = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(saveUserPreferences_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("user_preferences").upsert({
		user_id: context.userId,
		...data,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var fetchAdminStats_createServerFn_handler = createServerRpc({
	id: "2ca0e844d3e5c3b18153ce7d1b8010b5684f26ee98ff7d81747aa9a678cc2a68",
	name: "fetchAdminStats",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchAdminStats.__executeServer(opts));
var fetchAdminStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchAdminStats_createServerFn_handler, async ({ context }) => {
	const { data: profile } = await context.supabase.from("profiles").select("role").eq("id", context.userId).single();
	if (profile?.role !== "admin" && profile?.role !== "super_admin") throw new Error("Forbidden: Admin access required");
	const { supabaseAdmin } = await import("./client.server-pv5dszoL.mjs");
	const { count: userCount } = await supabaseAdmin.from("profiles").select("*", {
		count: "exact",
		head: true
	});
	const { count: logCount } = await supabaseAdmin.from("life_logs").select("*", {
		count: "exact",
		head: true
	});
	const { count: messageCount } = await supabaseAdmin.from("messages").select("*", {
		count: "exact",
		head: true
	});
	return {
		totalUsers: userCount ?? 0,
		totalLogs: logCount ?? 0,
		totalMessages: messageCount ?? 0
	};
});
var fetchAdminUsers_createServerFn_handler = createServerRpc({
	id: "2d9ee1cfb53e2d4e664830bed4c8cb8977e58eefd3fc18d8c9799aefa5a85bc0",
	name: "fetchAdminUsers",
	filename: "src/lib/jeevana.functions.ts"
}, (opts) => fetchAdminUsers.__executeServer(opts));
var fetchAdminUsers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(fetchAdminUsers_createServerFn_handler, async ({ context }) => {
	const { data: profile } = await context.supabase.from("profiles").select("role").eq("id", context.userId).single();
	if (profile?.role !== "admin" && profile?.role !== "super_admin") throw new Error("Forbidden: Admin access required");
	const { supabaseAdmin } = await import("./client.server-pv5dszoL.mjs");
	const { data, error } = await supabaseAdmin.from("profiles").select("id, display_name, role, created_at").order("created_at", { ascending: false }).limit(100);
	if (error) throw new Error(error.message);
	return data ?? [];
});
//#endregion
export { completeHabit_createServerFn_handler, createGoal_createServerFn_handler, createHabit_createServerFn_handler, createMemory_createServerFn_handler, deleteHabit_createServerFn_handler, deleteLifeLog_createServerFn_handler, deleteMemory_createServerFn_handler, fetchAdminStats_createServerFn_handler, fetchAdminUsers_createServerFn_handler, fetchGoals_createServerFn_handler, fetchHabitCompletions_createServerFn_handler, fetchHabits_createServerFn_handler, fetchLifeLogs_createServerFn_handler, fetchMemories_createServerFn_handler, fetchReminders_createServerFn_handler, fetchUserPreferences_createServerFn_handler, loadInitialMessages_createServerFn_handler, saveUserPreferences_createServerFn_handler, updateMemory_createServerFn_handler, updateReminderStatus_createServerFn_handler };
