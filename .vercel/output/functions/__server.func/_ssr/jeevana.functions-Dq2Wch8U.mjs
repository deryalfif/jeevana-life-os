import { __toESM } from "../_runtime.mjs";
import { isRedirect, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { TSS_SERVER_FUNCTION, createServerFn } from "./esm-B0H-9KhN.mjs";
import { getServerFnById } from "../__23tanstack-start-server-fn-resolver-BeGULw49.mjs";
import { requireSupabaseAuth } from "./auth-middleware-B4yfsouX.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jeevana.functions-Dq2Wch8U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadInitialMessages = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("0b5f9a13376f19e6dc2ac429b75e4a50beb13fdd8e26f6ccccd93bf5d135b021"));
var fetchLifeLogs = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("381803fbb31d3044121445a378e8724cf3911d7379f139262f3cad120c6ae154"));
var deleteLifeLog = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("821a68122cd69bce305521371f872c6f0d6cf90083064f32beab45394670b892"));
var fetchHabits = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("2681635f7092af861959bf3b62ac9a69e5dbfb636fddc5561acb2378ae699707"));
var fetchHabitCompletions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6752e17c446c7102ef42a1c57a07886d7ee2eaa65ac495067dc758cb449e0762"));
var createHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("5b67dbf9b01f0a375162ea74972f77a36837820c8e62952b0e0ae20e08393ee7"));
var completeHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("562fce3729390f860d68a9cb5f9641e4359b338e090cca78dd7a1bdf83efdbc1"));
var deleteHabit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("7ea209853c3ab8ae4577af7683c8ef242841a5256beef95b5c4c829d727af35c"));
var fetchMemories = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d07c4b7b50dcfd1072b98ff0403f7b978f999555faf433e2b20b8f163d410334"));
var createMemory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("083071cbb6b37309dc135019a4137f1efd5f37bacd346c05a15057ece6ad7a30"));
var deleteMemory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("bef7f9b297d7066276d0de3baa493a7c72d4f0dbf194868e7713ee1f3f24589e"));
var updateMemory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("20dc21e93c51767d220fd22efcd151bc14dbf463235b2cab2de75ed28b1dd7e3"));
var fetchGoals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("fc0d9c9e98a5ec82105f0366e09676ac1f3d071b65a195aca6fa63172b0aaccb"));
var createGoal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("f81b489e0e347eec7e98a9be684c1530a9a19e654a096dc7d6bfab62ec3666fd"));
var fetchReminders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("07b538c424c652c668fe08bf84e4bc39271de25c157a0253c253134cc3a59bcf"));
var updateReminderStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("b9cc098136ea190a9bb2a9e64174624f42a8bf43696f36ebc61fe2b9499d0a81"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("22df63008c08c47a7d61df3808d0efd45d3dd69d89cb9c9c3a24ddedcd9b0e21"));
var saveUserPreferences = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("bcb5b014023eb8e5b3656b5e3f5d61d7f9db44b8967a08c87eea2340dd1d27a7"));
var fetchAdminStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("2ca0e844d3e5c3b18153ce7d1b8010b5684f26ee98ff7d81747aa9a678cc2a68"));
var fetchAdminUsers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("2d9ee1cfb53e2d4e664830bed4c8cb8977e58eefd3fc18d8c9799aefa5a85bc0"));
//#endregion
export { completeHabit, createGoal, createHabit, createMemory, deleteHabit, deleteLifeLog, deleteMemory, fetchAdminStats, fetchAdminUsers, fetchGoals, fetchHabitCompletions, fetchHabits, fetchLifeLogs, fetchMemories, fetchReminders, loadInitialMessages, saveUserPreferences, updateMemory, updateReminderStatus, useServerFn };
