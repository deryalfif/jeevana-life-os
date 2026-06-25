import { __toESM } from "../_runtime.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { supabase } from "./client-DFhTWwuO.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
import { Input } from "./input-Ex0NFJPK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CZqrdRea.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsScreen() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [email, setEmail] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data: u } = await supabase.auth.getUser();
			setEmail(u.user?.email ?? "");
			const { data: p } = await supabase.from("profiles").select("display_name").eq("id", u.user.id).single();
			setName(p?.display_name ?? "");
		})();
	}, []);
	async function save() {
		setSaving(true);
		const { data: u } = await supabase.auth.getUser();
		await supabase.from("profiles").update({ display_name: name }).eq("id", u.user.id);
		setSaving(false);
		setSaved(true);
		setTimeout(() => setSaved(false), 1500);
	}
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl mx-auto p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Pengaturan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Atur profil dan akun kamu."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 bg-white rounded-3xl border border-slate-200/70 p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium text-slate-600",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: email,
						disabled: true,
						className: "mt-1 bg-slate-50"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium text-slate-600",
						children: "Nama panggilan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "mt-1",
						placeholder: "Mau dipanggil apa?"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							disabled: saving,
							className: "bg-ink hover:bg-ink/90 text-white rounded-xl",
							children: saving ? "Menyimpan..." : "Simpan"
						}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-emerald-600",
							children: "Tersimpan ✓"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 bg-white rounded-3xl border border-slate-200/70 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Akun"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500 mt-1",
						children: "Keluar dari sesi ini."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: signOut,
						variant: "outline",
						className: "mt-4 rounded-xl",
						children: "Keluar dari Jeevana"
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsScreen as component };
