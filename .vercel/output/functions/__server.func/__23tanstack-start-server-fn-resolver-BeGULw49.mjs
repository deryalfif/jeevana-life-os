//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BeGULw49.js
var manifest = {
	"07b538c424c652c668fe08bf84e4bc39271de25c157a0253c253134cc3a59bcf": {
		functionName: "fetchReminders_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"083071cbb6b37309dc135019a4137f1efd5f37bacd346c05a15057ece6ad7a30": {
		functionName: "createMemory_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"0b5f9a13376f19e6dc2ac429b75e4a50beb13fdd8e26f6ccccd93bf5d135b021": {
		functionName: "loadInitialMessages_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"20dc21e93c51767d220fd22efcd151bc14dbf463235b2cab2de75ed28b1dd7e3": {
		functionName: "updateMemory_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"22df63008c08c47a7d61df3808d0efd45d3dd69d89cb9c9c3a24ddedcd9b0e21": {
		functionName: "fetchUserPreferences_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"2681635f7092af861959bf3b62ac9a69e5dbfb636fddc5561acb2378ae699707": {
		functionName: "fetchHabits_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"2ca0e844d3e5c3b18153ce7d1b8010b5684f26ee98ff7d81747aa9a678cc2a68": {
		functionName: "fetchAdminStats_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"2d9ee1cfb53e2d4e664830bed4c8cb8977e58eefd3fc18d8c9799aefa5a85bc0": {
		functionName: "fetchAdminUsers_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"381803fbb31d3044121445a378e8724cf3911d7379f139262f3cad120c6ae154": {
		functionName: "fetchLifeLogs_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"562fce3729390f860d68a9cb5f9641e4359b338e090cca78dd7a1bdf83efdbc1": {
		functionName: "completeHabit_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"5b67dbf9b01f0a375162ea74972f77a36837820c8e62952b0e0ae20e08393ee7": {
		functionName: "createHabit_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"6752e17c446c7102ef42a1c57a07886d7ee2eaa65ac495067dc758cb449e0762": {
		functionName: "fetchHabitCompletions_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"7ea209853c3ab8ae4577af7683c8ef242841a5256beef95b5c4c829d727af35c": {
		functionName: "deleteHabit_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"821a68122cd69bce305521371f872c6f0d6cf90083064f32beab45394670b892": {
		functionName: "deleteLifeLog_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"b9cc098136ea190a9bb2a9e64174624f42a8bf43696f36ebc61fe2b9499d0a81": {
		functionName: "updateReminderStatus_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"bcb5b014023eb8e5b3656b5e3f5d61d7f9db44b8967a08c87eea2340dd1d27a7": {
		functionName: "saveUserPreferences_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"bef7f9b297d7066276d0de3baa493a7c72d4f0dbf194868e7713ee1f3f24589e": {
		functionName: "deleteMemory_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"d07c4b7b50dcfd1072b98ff0403f7b978f999555faf433e2b20b8f163d410334": {
		functionName: "fetchMemories_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"f81b489e0e347eec7e98a9be684c1530a9a19e654a096dc7d6bfab62ec3666fd": {
		functionName: "createGoal_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	},
	"fc0d9c9e98a5ec82105f0366e09676ac1f3d071b65a195aca6fa63172b0aaccb": {
		functionName: "fetchGoals_createServerFn_handler",
		importer: () => import("./_ssr/jeevana.functions-DyZ01odm.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById };
