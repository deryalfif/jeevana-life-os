import { __toESM } from "../_runtime.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { supabase } from "./client-DFhTWwuO.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
import { Input } from "./input-Ex0NFJPK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-EgUA7LcC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event == "PASSWORD_RECOVERY") {}
		});
	}, []);
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			navigate({ to: "/chat" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Gagal update password");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-canvas flex items-center justify-center px-4 font-sans text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] border border-slate-200/70 p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Reset Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 mt-1",
					children: "Masukkan password barumu."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-slate-600",
							children: "Password Baru"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							required: true,
							minLength: 6,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "min. 6 karakter",
							className: "mt-1"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full bg-ink hover:bg-ink/90 text-white rounded-xl h-11",
							children: loading ? "Menyimpan..." : "Update Password"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
