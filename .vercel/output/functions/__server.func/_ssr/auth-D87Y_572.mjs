import { __toESM } from "../_runtime.mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Eye, EyeOff, Sparkles } from "../_libs/lucide-react.mjs";
import { supabase } from "./client-DFhTWwuO.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
import { Input } from "./input-Ex0NFJPK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D87Y_572.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({ to: "/chat" });
		});
	}, [navigate]);
	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			if (mode === "register") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: window.location.origin + "/chat" }
				});
				if (error) throw error;
				if (data.user && !data.session) {
					setError("Pendaftaran berhasil! Cek email kamu untuk verifikasi.");
					setMode("login");
					setLoading(false);
					return;
				}
				navigate({ to: "/chat" });
			} else if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
				if (error) throw error;
				setError("Link reset password telah dikirim ke email kamu.");
				setLoading(false);
				return;
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				navigate({ to: "/chat" });
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Gagal masuk");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-canvas flex items-center justify-center px-4 font-sans text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 justify-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-9 rounded-2xl bg-gradient-to-br from-brand to-grape grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold text-xl tracking-tight",
					children: "Jeevana"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(15,23,42,0.15)] border border-slate-200/70 p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: mode === "login" ? "Halo lagi 👋" : mode === "forgot" ? "Lupa Password" : "Mulai cerita kamu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500 mt-1",
						children: mode === "login" ? "Masuk untuk lanjutin ngobrol sama Jeevana." : mode === "forgot" ? "Masukkan email kamu untuk mereset password." : "Bikin akun gratis. Cuma email & password."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-slate-600",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "kamu@email.com",
								className: "mt-1"
							})] }),
							mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-slate-600",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: showPassword ? "text" : "password",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "min. 6 karakter",
									className: "mt-1 pr-10"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-slate-400 hover:text-slate-600 focus:outline-none",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
								})]
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-sm rounded-xl px-3 py-2 ${error.includes("dikirim") || error.includes("berhasil") ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`,
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading,
								className: "w-full bg-ink hover:bg-ink/90 text-white rounded-xl h-11",
								children: loading ? "Sebentar..." : mode === "login" ? "Masuk" : mode === "forgot" ? "Kirim Link Reset" : "Daftar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(mode === "login" ? "register" : "login"),
						className: "mt-4 text-sm text-slate-500 hover:text-ink w-full text-center block",
						children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Belum punya akun? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand font-medium",
							children: "Daftar"
						})] }) : mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Udah punya akun? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand font-medium",
							children: "Masuk"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Kembali ke ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand font-medium",
							children: "Masuk"
						})] })
					}),
					mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("forgot"),
						className: "mt-2 text-sm text-slate-500 hover:text-ink w-full text-center block",
						children: "Lupa password?"
					})
				]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
