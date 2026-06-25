import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Content2, Header, Item, Root2, Trigger2, require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Activity, ArrowRight, AtSign, Bell, Brain, Calendar, Check, ChevronDown, Coffee, DollarSign, Dumbbell, FileText, Heart, ListChecks, Menu, MessageCircle, Moon, Play, Send, Sparkles, TrendingUp, Wallet, X, Zap } from "../_libs/lucide-react.mjs";
import { cn } from "./utils-OyjWw23L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BrbL2tRJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_ITEMS = [
	"Features",
	"Use Cases",
	"Roadmap",
	"Pricing",
	"FAQ"
];
function Nav() {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: "#main-content",
		className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white",
		children: "Skip to content"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Main navigation",
		className: "sticky top-0 z-50 w-full border-b border-black/5 bg-canvas/70 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "flex items-center gap-2",
					"aria-label": "Jeevana home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-grape text-white shadow-md shadow-brand/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-extrabold tracking-tight",
						children: "Jeevana"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-8 text-sm font-medium text-ink/60 md:flex",
					children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${item.toLowerCase().replace(/\s+/g, "-")}`,
						className: "transition-colors hover:text-ink",
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/auth",
							className: "px-3 py-2 text-sm font-semibold text-ink/70 hover:text-ink transition-colors hidden sm:block",
							children: "Masuk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/auth",
							className: "rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition-all hover:scale-105 active:scale-95",
							children: "Mulai Gratis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-9 place-items-center rounded-lg border border-black/10 bg-surface text-ink/60 md:hidden",
							onClick: () => setMobileOpen(!mobileOpen),
							"aria-label": mobileOpen ? "Close menu" : "Open menu",
							"aria-expanded": mobileOpen,
							children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
						})
					]
				})
			]
		}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-black/5 bg-surface px-6 py-4 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${item.toLowerCase().replace(/\s+/g, "-")}`,
					className: "rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-canvas hover:text-ink",
					onClick: () => setMobileOpen(false),
					children: item
				}, item))
			})
		})]
	})] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden px-6 pb-24 pt-16 md:pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-60",
			style: { background: "radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.18), transparent), radial-gradient(40% 40% at 80% 10%, rgba(59,130,246,0.18), transparent)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-surface px-4 py-1.5 text-xs font-semibold text-ink/70 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-brand" }), "AI Life Operating System"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]",
						children: [
							"Your Entire Life,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Organized In",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent",
								children: "One Conversation."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/60",
						children: "Activities, expenses, reminders, habits, and goals. Just tell Jeevana what's happening, and AI takes care of the rest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#pricing",
							className: "group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-xl shadow-brand/30 transition-all hover:bg-brand/90 hover:shadow-2xl",
							children: ["Start Free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-2 rounded-full border border-black/10 bg-surface px-7 py-4 font-semibold transition-all hover:bg-black/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), " Watch Demo"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 grid items-start gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {})]
			})]
		})]
	});
}
function ChatPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lg:col-span-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-black/5 bg-surface p-6 shadow-2xl shadow-black/5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-grape text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Jeevana"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-ink/40",
							children: "Online · Indonesian + English"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600",
						children: "LIVE"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-sm text-white",
							children: "Hari ini jogging 5 km selama 45 menit."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-grape text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex max-w-[85%] flex-col gap-2 rounded-2xl rounded-tl-sm bg-canvas px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-medium text-ink/50",
								children: "Got it — saved to your day:"
							}), [
								{
									label: "Activity Logged",
									color: "bg-emerald-500"
								},
								{
									label: "Distance Recorded",
									color: "bg-brand"
								},
								{
									label: "Duration Saved",
									color: "bg-grape"
								}
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-4 place-items-center rounded-full ${r.color} text-white`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-2.5",
										strokeWidth: 3
									})
								}), r.label]
							}, r.label))]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-2 rounded-full border border-black/5 bg-canvas px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-ink/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-sm text-ink/40",
							children: "Ceritakan harimu..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "grid size-7 place-items-center rounded-full bg-brand text-white",
							"aria-label": "Send message",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
						})
					]
				})
			]
		})
	});
}
function DashboardCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative lg:col-span-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/15 to-grape/15 blur-2xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-white bg-white/70 p-4 shadow-2xl shadow-black/5 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-2 px-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2.5 rounded-full bg-red-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2.5 rounded-full bg-amber-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2.5 rounded-full bg-emerald-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-3 flex-1 rounded-md bg-canvas px-3 py-1 text-[10px] font-mono text-ink/40",
							children: "jeevana.app / today"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-canvas p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-widest text-ink/40",
								children: "Today · Tuesday"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-bold",
								children: "Good evening, Ammar"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-full bg-surface px-3 py-1.5 text-[10px] font-bold shadow-sm",
								children: "4 events"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
								label: "Activity",
								value: "5.0 km",
								sub: "+12% vs week",
								color: "#3B82F6"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
								label: "Spending",
								value: "Rp 25k",
								sub: "under budget",
								color: "#8B5CF6"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-xl bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold uppercase tracking-wider text-ink/40",
									children: "Weekly Activity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5 text-emerald-500" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 items-end gap-2",
								children: [
									40,
									65,
									30,
									78,
									55,
									90,
									70
								].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full rounded-md bg-gradient-to-t from-brand to-grape",
										style: { height: `${h}%` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-ink/40",
										children: [
											"M",
											"T",
											"W",
											"T",
											"F",
											"S",
											"S"
										][i]
									})]
								}, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityRow, {
									icon: Dumbbell,
									label: "Jogging 5 km",
									time: "07:30",
									tint: "emerald"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityRow, {
									icon: Coffee,
									label: "Kopi · Rp 25k",
									time: "08:15",
									tint: "amber"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityRow, {
									icon: Bell,
									label: "Bayar listrik",
									time: "10 Nov",
									tint: "violet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityRow, {
									icon: Wallet,
									label: "Freelance +2M",
									time: "14:20",
									tint: "blue"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingBadge, {
				className: "-left-2 top-6 sm:-left-6 sm:top-10",
				dot: "bg-emerald-500",
				label: "Activity Saved"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingBadge, {
				className: "-right-2 top-32 sm:-right-6 animate-float",
				dot: "bg-brand",
				label: "Expense Recorded"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingBadge, {
				className: "-left-2 bottom-24 sm:-left-8 animate-float-delay",
				dot: "bg-grape",
				label: "Reminder Created"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingBadge, {
				className: "-right-2 -bottom-3 sm:-right-6",
				dot: "bg-amber-500",
				label: "Daily Summary Ready"
			})
		]
	});
}
function MiniStat({ label, value, sub, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] font-bold uppercase tracking-wider text-ink/40",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-2xl font-extrabold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-1 text-[10px] font-semibold",
				style: { color },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-1 rounded-full",
					style: { background: color }
				}), sub]
			})
		]
	});
}
function ActivityRow({ icon: Icon, label, time, tint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl bg-surface p-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid size-7 place-items-center rounded-lg ${{
				emerald: "bg-emerald-50 text-emerald-600",
				amber: "bg-amber-50 text-amber-600",
				violet: "bg-violet-50 text-violet-600",
				blue: "bg-blue-50 text-blue-600"
			}[tint]}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-[11px] font-semibold",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[9px] text-ink/40",
				children: time
			})]
		})]
	});
}
function FloatingBadge({ className = "", dot, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `absolute z-10 hidden items-center gap-2 rounded-full border border-black/5 bg-surface px-3 py-2 text-xs font-bold shadow-xl shadow-black/5 sm:inline-flex ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${dot} animate-pulse` }), label]
	});
}
var STATS = [
	["10,000+", "Life Events Recorded"],
	["95%", "AI Understanding Accuracy"],
	["30+", "Hours Saved Every Month"],
	["4.9/5", "User Satisfaction"]
];
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-black/5 bg-surface py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink/40",
				children: "Your Life, Backed By Data"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-8 md:grid-cols-4",
				children: STATS.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-gradient-to-br from-ink to-brand bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl",
						children: v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-xs font-medium text-ink/50 md:text-sm",
						children: l
					})]
				}, l))
			})]
		})
	});
}
var ITEMS = [
	{
		icon: FileText,
		name: "Notes App",
		desc: "Scattered journals and lost ideas.",
		span: "md:col-span-2 md:row-span-2",
		rotate: "-rotate-2"
	},
	{
		icon: Wallet,
		name: "Finance App",
		desc: "Manual entry. Static spreadsheets.",
		span: "md:col-span-2",
		rotate: "rotate-1"
	},
	{
		icon: Calendar,
		name: "Calendar",
		desc: "Silent blocks of time.",
		span: "md:col-span-2",
		rotate: "-rotate-1"
	},
	{
		icon: ListChecks,
		name: "Task Manager",
		desc: "Forgotten reminders.",
		span: "md:col-span-3",
		rotate: "rotate-1"
	},
	{
		icon: Heart,
		name: "Health App",
		desc: "Ignored habits & stats.",
		span: "md:col-span-3",
		rotate: "-rotate-1"
	}
];
function Problem() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-16 max-w-3xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: [
						"Your Life Is Scattered Across ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink/40",
							children: "Too Many Apps."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-pretty text-lg text-ink/60",
					children: "Most people manage their lives using separate tools that never work together."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[140px]",
				children: ITEMS.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `group relative overflow-hidden rounded-3xl border border-black/5 bg-surface p-6 shadow-sm transition-transform hover:!rotate-0 hover:shadow-xl ${it.span} ${it.rotate}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex size-10 items-center justify-center rounded-xl bg-canvas text-ink/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold",
							children: it.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-ink/50",
							children: it.desc
						})] })]
					})
				}, it.name))
			})]
		})
	});
}
function ValueProps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-4 rounded-[2.5rem] bg-ink px-6 py-24 text-white md:mx-8 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60",
					children: "The Jeevana Way"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-6xl",
					children: [
						"One Conversation.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent",
							children: "One Organized Life."
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[200px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueTile, {
						className: "md:col-span-3 md:row-span-2 bg-gradient-to-br from-brand to-grape",
						icon: MessageCircle,
						title: "Natural Language First",
						desc: "Tidak perlu form. Tidak perlu kategori. Just talk to Jeevana like you'd text a friend — in Indonesian or English.",
						big: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueTile, {
						className: "md:col-span-3 bg-white/5 border border-white/10",
						icon: Zap,
						title: "Automatic Structuring",
						desc: "AI mengubah percakapan menjadi data terstruktur — categorized, timestamped, ready to analyze."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueTile, {
						className: "md:col-span-2 bg-white/5 border border-white/10",
						icon: Activity,
						title: "Life Data Hub",
						desc: "Semua aspek kehidupan tersimpan dalam satu tempat."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueTile, {
						className: "md:col-span-1 bg-white text-ink",
						icon: Brain,
						title: "Smart Insights",
						desc: "Memahami pola hidupmu.",
						invert: true
					})
				]
			})]
		})
	});
}
function ValueTile({ className = "", icon: Icon, title, desc, big = false, invert = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex flex-col justify-between rounded-3xl p-6 md:p-8 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid size-10 place-items-center rounded-xl ${invert ? "bg-ink/5 text-ink" : "bg-white/10 text-white"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: `font-bold ${big ? "text-2xl md:text-3xl" : "text-lg"}`,
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 text-sm leading-relaxed ${invert ? "text-ink/60" : "text-white/70"}`,
				children: desc
			})]
		})]
	});
}
var FEATURES = [
	{
		n: "01",
		title: "AI Daily Logging",
		input: "Hari ini jogging 5 km.",
		output: [{
			label: "ACTIVITY",
			v: "Running"
		}, {
			label: "DISTANCE",
			v: "5 km"
		}],
		color: "#3B82F6",
		icon: Activity
	},
	{
		n: "02",
		title: "Expense Tracking",
		input: "Beli kopi 25 ribu.",
		output: [{
			label: "TYPE",
			v: "Expense"
		}, {
			label: "AMOUNT",
			v: "Rp 25.000"
		}],
		color: "#EF4444",
		icon: Wallet
	},
	{
		n: "03",
		title: "Income Tracking",
		input: "Project freelance dibayar 2 juta.",
		output: [{
			label: "TYPE",
			v: "Income"
		}, {
			label: "AMOUNT",
			v: "Rp 2.000.000"
		}],
		color: "#10B981",
		icon: DollarSign
	},
	{
		n: "04",
		title: "Reminder & Task",
		input: "Ingatkan saya bayar listrik tanggal 10.",
		output: [{
			label: "TASK",
			v: "Bayar listrik"
		}, {
			label: "DATE",
			v: "10 Nov"
		}],
		color: "#8B5CF6",
		icon: Bell
	},
	{
		n: "05",
		title: "Daily Summary",
		input: "[Auto · 21:00]",
		output: [{
			label: "EVENTS",
			v: "12 logged"
		}, {
			label: "INSIGHT",
			v: "Active day"
		}],
		color: "#F59E0B",
		icon: Moon
	}
];
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "features",
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-16 max-w-3xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/60",
					children: "Features"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: ["Talk to Jeevana. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink/40",
						children: "Watch it work."
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[260px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						f: FEATURES[0],
						className: "md:col-span-3 md:row-span-2",
						tall: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						f: FEATURES[1],
						className: "md:col-span-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						f: FEATURES[2],
						className: "md:col-span-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						f: FEATURES[3],
						className: "md:col-span-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
						f: FEATURES[4],
						className: "md:col-span-3"
					})
				]
			})]
		})
	});
}
function FeatureCard({ f, className = "", tall = false }) {
	const Icon = f.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-surface p-6 transition-shadow hover:shadow-xl md:p-8 ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-xl text-white",
						style: { background: f.color },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px] font-bold uppercase tracking-widest text-ink/40",
						children: ["Feature ", f.n]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: `mt-6 font-bold tracking-tight ${tall ? "text-3xl md:text-4xl" : "text-xl"}`,
				children: f.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-canvas p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-ink/40",
							children: "You say"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-medium",
							children: [
								"\"",
								f.input,
								"\""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-black/5" }),
							"AI structures it",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-black/5" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: f.output.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-black/5 bg-surface px-3 py-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono font-bold",
									style: { color: f.color },
									children: [o.label, ":"]
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: o.v
								})
							]
						}, o.label))
					})
				]
			})
		]
	});
}
var STEPS = [
	{
		t: "Tell Jeevana About Your Day",
		d: "Speak or type naturally — no forms, no setup.",
		c: "#3B82F6"
	},
	{
		t: "AI Understands Context",
		d: "Jeevana parses intent, entities, dates, amounts.",
		c: "#8B5CF6"
	},
	{
		t: "Data Is Structured Automatically",
		d: "Categorized and timestamped in the right place.",
		c: "#3B82F6"
	},
	{
		t: "Dashboard Updates Instantly",
		d: "Charts and logs reflect your words in realtime.",
		c: "#8B5CF6"
	},
	{
		t: "Receive Insights And Recommendations",
		d: "Patterns surface so you can act on them.",
		c: "#10B981"
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-surface px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 inline-flex items-center gap-2 rounded-full border border-black/5 bg-canvas px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/60",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: ["Five steps. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink/40",
						children: "Zero friction."
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative space-y-3 border-l-2 border-dashed border-black/10 pl-8",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -left-[2.6rem] grid size-10 place-items-center rounded-full text-sm font-extrabold text-white ring-4 ring-white",
						style: { background: s.c },
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-black/5 bg-canvas p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold",
							children: s.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink/60",
							children: s.d
						})]
					})]
				}, s.t))
			})]
		})
	});
}
var TABS = [
	{
		label: "Home Dashboard",
		id: "home"
	},
	{
		label: "Finance Dashboard",
		id: "finance"
	},
	{
		label: "Activity Dashboard",
		id: "activity"
	}
];
function DashboardPreview() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("home");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-12 max-w-3xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
						children: [
							"See Your Life In",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent",
								children: "One Dashboard."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-ink/60",
						children: "Three views. Every metric that matters. Updated as you talk."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex justify-center gap-2",
					role: "tablist",
					"aria-label": "Dashboard views",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": activeTab === t.id,
						"aria-controls": `panel-${t.id}`,
						onClick: () => setActiveTab(t.id),
						className: `rounded-full px-5 py-2 text-sm font-semibold transition-all ${activeTab === t.id ? "bg-ink text-white shadow-lg" : "bg-surface text-ink/60 hover:bg-ink/5"}`,
						children: t.label
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-[2rem] border border-black/5 bg-surface p-3 shadow-2xl shadow-black/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/10 to-grape/10 blur-3xl"
						}),
						activeTab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeDashboard, {}),
						activeTab === "finance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceDashboard, {}),
						activeTab === "activity" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityDashboard, {})
					]
				})
			]
		})
	});
}
function HomeDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "panel-home",
		role: "tabpanel",
		className: "rounded-3xl bg-canvas p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSidebar, { activeItem: "Today" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 space-y-4 md:col-span-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 md:grid-cols-4",
						children: [
							{
								l: "Today's Spending",
								v: "Rp 125k",
								c: "#EF4444"
							},
							{
								l: "Income MTD",
								v: "Rp 8.5M",
								c: "#10B981"
							},
							{
								l: "Activities",
								v: "12",
								c: "#3B82F6"
							},
							{
								l: "Goals Hit",
								v: "7/9",
								c: "#8B5CF6"
							}
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold uppercase tracking-wider text-ink/40",
									children: m.l
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-2xl font-extrabold",
									children: m.v
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-canvas",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full w-2/3",
										style: { background: m.c }
									})
								})
							]
						}, m.l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-3 md:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-surface p-4 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold uppercase tracking-wider text-ink/40",
									children: "Spending This Week"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold text-emerald-600",
									children: "−18% vs last"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyChart, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-gradient-to-br from-ink to-[#1e293b] p-4 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-grape" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-bold uppercase tracking-wider text-white/60",
									children: "AI Insight"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm leading-relaxed",
								children: [
									"You're spending ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-grape",
										children: "30% less"
									}),
									" on coffee this week. Nice streak — keep it up."
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentActivity, {})
				]
			})]
		})
	});
}
function FinanceDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "panel-finance",
		role: "tabpanel",
		className: "rounded-3xl bg-canvas p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSidebar, { activeItem: "Finance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 space-y-4 md:col-span-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						{
							l: "Monthly Income",
							v: "Rp 8.5M",
							c: "#10B981"
						},
						{
							l: "Monthly Expense",
							v: "Rp 3.2M",
							c: "#EF4444"
						},
						{
							l: "Savings",
							v: "Rp 5.3M",
							c: "#3B82F6"
						},
						{
							l: "Budget Left",
							v: "62%",
							c: "#8B5CF6"
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-bold uppercase tracking-wider text-ink/40",
								children: m.l
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-extrabold",
								children: m.v
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-canvas",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full w-2/3",
									style: { background: m.c }
								})
							})
						]
					}, m.l))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs font-bold uppercase tracking-wider text-ink/40",
						children: "Expense Breakdown"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyChart, {})]
				})]
			})]
		})
	});
}
function ActivityDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "panel-activity",
		role: "tabpanel",
		className: "rounded-3xl bg-canvas p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSidebar, { activeItem: "Health" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 space-y-4 md:col-span-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						{
							l: "Total Activities",
							v: "47",
							c: "#3B82F6"
						},
						{
							l: "Active Days",
							v: "18/20",
							c: "#10B981"
						},
						{
							l: "Avg Duration",
							v: "42 min",
							c: "#8B5CF6"
						},
						{
							l: "Streak",
							v: "5 days",
							c: "#F59E0B"
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-bold uppercase tracking-wider text-ink/40",
								children: m.l
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-extrabold",
								children: m.v
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1 w-full overflow-hidden rounded-full bg-canvas",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full w-2/3",
									style: { background: m.c }
								})
							})
						]
					}, m.l))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs font-bold uppercase tracking-wider text-ink/40",
						children: "Activity This Week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyChart, {})]
				})]
			})]
		})
	});
}
var SIDEBAR_ITEMS = [
	{
		icon: Activity,
		l: "Today"
	},
	{
		icon: Wallet,
		l: "Finance"
	},
	{
		icon: Calendar,
		l: "Calendar"
	},
	{
		icon: Bell,
		l: "Reminders"
	},
	{
		icon: Heart,
		l: "Health"
	},
	{
		icon: Brain,
		l: "Insights"
	}
];
function DashboardSidebar({ activeItem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Dashboard navigation",
		className: "col-span-3 hidden flex-col gap-2 rounded-2xl bg-surface p-3 md:flex",
		children: SIDEBAR_ITEMS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${i.l === activeItem ? "bg-ink text-white" : "text-ink/60 hover:bg-canvas"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "size-4" }), i.l]
		}, i.l))
	});
}
function WeeklyChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-32 items-end gap-2",
		children: [
			55,
			70,
			40,
			85,
			60,
			95,
			50
		].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full rounded-lg bg-gradient-to-t from-brand to-grape",
				style: { height: `${h}%` }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] text-ink/40",
				children: [
					"M",
					"T",
					"W",
					"T",
					"F",
					"S",
					"S"
				][i]
			})]
		}, i))
	});
}
function RecentActivity() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-bold uppercase tracking-wider text-ink/40",
				children: "Recent Activity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-[10px] font-bold text-brand",
				children: "View all"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: [
				{
					i: Dumbbell,
					l: "Jogging 5 km · 45 min",
					t: "07:30",
					c: "emerald"
				},
				{
					i: Coffee,
					l: "Kopi · Rp 25.000",
					t: "08:15",
					c: "amber"
				},
				{
					i: Wallet,
					l: "Freelance payment +Rp 2.000.000",
					t: "14:20",
					c: "blue"
				},
				{
					i: Bell,
					l: "Reminder: Bayar listrik tanggal 10",
					t: "16:00",
					c: "violet"
				}
			].map((r, idx) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl bg-canvas p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid size-8 place-items-center rounded-lg ${{
								emerald: "bg-emerald-100 text-emerald-600",
								amber: "bg-amber-100 text-amber-600",
								blue: "bg-blue-100 text-blue-600",
								violet: "bg-violet-100 text-violet-600"
							}[r.c]}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.i, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 text-sm font-semibold",
							children: r.l
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-bold text-ink/40",
							children: r.t
						})
					]
				}, idx);
			})
		})]
	});
}
var PERSONAS = [
	{
		l: "Young Professionals",
		e: "👔"
	},
	{
		l: "Students",
		e: "🎓"
	},
	{
		l: "Freelancers",
		e: "💻"
	},
	{
		l: "Creators",
		e: "🎨"
	},
	{
		l: "Entrepreneurs",
		e: "🚀"
	},
	{
		l: "Remote Workers",
		e: "🌍"
	}
];
function BuiltFor() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "use-cases",
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-16 max-w-3xl text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: ["Built For People Who Have ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink/40",
						children: "A Lot Going On."
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6",
				children: PERSONAS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group flex flex-col items-center gap-3 rounded-3xl border border-black/5 bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-canvas to-surface text-3xl",
						children: p.e
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-bold",
						children: p.l
					})]
				}, p.l))
			})]
		})
	});
}
var BENEFITS = [
	"Save Time Every Day",
	"Understand Your Habits Better",
	"Manage Finances Effortlessly",
	"Never Miss Important Tasks",
	"Build Better Daily Routines",
	"See Your Entire Life In One Place"
];
function Benefits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-surface px-6 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: [
						"What You Gain ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent",
							children: "With Jeevana"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-ink/60",
					children: "Less app-switching. More understanding. Better days, one conversation at a time."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: BENEFITS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-4 rounded-2xl border border-black/5 bg-canvas p-4 transition-colors hover:bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-grape text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4",
								strokeWidth: 3
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: b
						})]
					}, b))
				})]
			})
		})
	});
}
var PHASES = [
	{
		label: "Phase 1 — Current MVP",
		tag: "Shipping",
		tagColor: "bg-emerald-100 text-emerald-700",
		items: [
			"Daily Logging",
			"Expense Tracking",
			"Income Tracking",
			"Reminder",
			"Daily Summary"
		]
	},
	{
		label: "Phase 2 — Social Finance",
		tag: "Q1 2026",
		tagColor: "bg-blue-100 text-blue-700",
		items: [
			"Split Bill",
			"Debt Tracking",
			"Shared Expenses"
		]
	},
	{
		label: "Phase 3 — Health Tracking",
		tag: "Q2 2026",
		tagColor: "bg-violet-100 text-violet-700",
		items: [
			"Nutrition Tracking",
			"Water Intake",
			"Weight Tracking"
		]
	},
	{
		label: "Phase 4 — Integrations",
		tag: "Q3 2026",
		tagColor: "bg-amber-100 text-amber-700",
		items: [
			"Google Calendar",
			"Smart Scheduling",
			"Workflow Automation"
		]
	}
];
function Roadmap() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "roadmap",
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-16 max-w-3xl text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: ["Growing With ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink/40",
						children: "Your Life."
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: PHASES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 rounded-3xl border border-black/5 bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold uppercase tracking-widest text-ink/40",
								children: p.label.split("—")[0]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2 py-0.5 text-[10px] font-bold ${p.tagColor}`,
								children: p.tag
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold",
							children: p.label.split("—")[1]?.trim()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: p.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm text-ink/70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-brand" }), it]
							}, it))
						})
					]
				}, p.label))
			})]
		})
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-16 max-w-3xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: ["Pricing that respects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink/40",
						children: "your wallet."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-ink/60",
					children: "Start free. Upgrade when Jeevana becomes essential."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
						tier: "FREE",
						price: "Rp 0",
						subtitle: "Forever free",
						features: [
							"Basic Logging",
							"Expense Tracking",
							"Daily Summary"
						],
						cta: "Get Started"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
						tier: "PRO",
						price: "Rp 10.000",
						subtitle: "per month",
						features: [
							"Unlimited Logs",
							"Advanced Insights",
							"Smart Reminders",
							"Full Dashboard Analytics"
						],
						cta: "Choose Pro",
						highlight: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
						tier: "PREMIUM",
						price: "Rp 20.000",
						subtitle: "per month",
						features: [
							"Health Tracking",
							"Calendar Integration",
							"AI Planning Assistant",
							"Early Access Features"
						],
						cta: "Go Premium"
					})
				]
			})]
		})
	});
}
function PricingCard({ tier, price, subtitle, features, cta, highlight = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative flex flex-col rounded-3xl p-8 ${highlight ? "bg-ink text-white shadow-2xl shadow-brand/30 ring-4 ring-brand/20 md:-translate-y-4" : "border border-black/5 bg-surface"}`,
		children: [
			highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-grape px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg",
				children: "Most Popular"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `text-xs font-extrabold uppercase tracking-[0.2em] ${highlight ? "text-grape" : "text-ink/40"}`,
				children: tier
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-baseline gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-4xl font-extrabold",
					children: price
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: highlight ? "text-sm text-white/50" : "text-sm text-ink/40",
					children: ["/", subtitle.includes("month") ? "mo" : ""]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: highlight ? "text-xs text-white/50" : "text-xs text-ink/40",
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-8 space-y-3",
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `grid size-5 shrink-0 place-items-center rounded-full ${highlight ? "bg-brand" : "bg-brand/10 text-brand"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-3",
							strokeWidth: 3
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: highlight ? "text-white/90" : "",
						children: f
					})]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				className: `mt-auto block w-full rounded-full py-3 text-center text-sm font-bold transition-all ${highlight ? "bg-white text-ink hover:bg-white/90" : "border border-black/10 bg-surface text-ink hover:bg-black/5"}`,
				children: cta
			})
		]
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var FAQS = [
	{
		q: "How secure is my data?",
		a: "Your data is encrypted at rest and in transit. Jeevana follows industry-standard security practices, and your conversations are never used to train third-party models."
	},
	{
		q: "Can Jeevana track expenses automatically?",
		a: "Yes. Just mention an expense in chat — 'Beli kopi 25 ribu' — and Jeevana extracts the amount, category, and timestamp into your finance dashboard."
	},
	{
		q: "Can I use Jeevana as a daily journal?",
		a: "Absolutely. Anything you tell Jeevana becomes part of your life log. You can search, reflect, and review past days anytime."
	},
	{
		q: "Does Jeevana support reminders?",
		a: "Yes. Natural-language reminders like 'Ingatkan saya bayar listrik tanggal 10' are scheduled automatically and pushed when due."
	},
	{
		q: "Will there be a mobile app?",
		a: "A native mobile app is on the roadmap for Phase 4. For now, Jeevana works beautifully as a responsive web app on every device."
	},
	{
		q: "Can Jeevana understand Indonesian?",
		a: "Yes — Jeevana is bilingual by design. Bahasa Indonesia and English work equally well. Mix them in the same sentence if you want."
	}
];
function FAQ() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "bg-surface px-6 py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-12 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-balance text-4xl font-extrabold tracking-tight md:text-5xl",
					children: "Frequently asked."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "space-y-3",
				children: FAQS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `item-${i}`,
					className: "rounded-2xl border border-black/5 bg-canvas px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left text-base font-bold hover:no-underline",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-ink/60",
						children: f.a
					})]
				}, i))
			})]
		})
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-6 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink via-[#1e1b4b] to-[#3B0764] p-12 md:p-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-0 opacity-30",
					style: { background: "radial-gradient(50% 50% at 80% 20%, rgba(139,92,246,0.6), transparent), radial-gradient(40% 40% at 20% 80%, rgba(59,130,246,0.5), transparent)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid items-center gap-12 md:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-balance text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl",
								children: [
									"Start Understanding ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Your Life Better."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-pretty text-lg text-white/70",
								children: "Stop switching between apps. Let Jeevana organize your life through simple conversations."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#pricing",
									className: "inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-ink shadow-xl transition-transform hover:scale-105",
									children: ["Start Free Today ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-white/50",
									children: "No credit card · Free forever"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto aspect-square w-full max-w-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-brand/40 to-grape/40 blur-3xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-6 rounded-full bg-gradient-to-br from-brand to-grape shadow-2xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-3 rounded-full border border-white/20 backdrop-blur-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 grid place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
											className: "size-24 text-white",
											strokeWidth: 1.2
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -right-2 top-8 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur",
									children: "✓ Logged"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -left-2 bottom-12 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur",
									children: "✓ Organized"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -bottom-2 right-12 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur",
									children: "✓ Insightful"
								})
							]
						})
					})]
				})]
			})
		})
	});
}
var SOCIAL_LINKS = [{
	Icon: AtSign,
	label: "Follow us on Twitter",
	href: "#"
}, {
	Icon: Send,
	label: "Follow us on Instagram",
	href: "#"
}];
var PRODUCT_LINKS = [
	"Features",
	"Use Cases",
	"Pricing",
	"FAQ"
];
var COMPANY_LINKS = [
	"Contact",
	"Privacy",
	"Terms"
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-black/5 bg-surface px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-grape text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-extrabold tracking-tight",
									children: "Jeevana"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm text-ink/60",
								children: "Your Life. Organized. An AI Life Operating System that turns conversations into a structured, insightful life log."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex gap-3",
								children: SOCIAL_LINKS.map(({ Icon, label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href,
									"aria-label": label,
									className: "grid size-9 place-items-center rounded-xl border border-black/5 bg-canvas text-ink/60 transition-colors hover:bg-ink hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}, label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-extrabold uppercase tracking-widest text-ink/40",
						children: "Product"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-sm",
						children: PRODUCT_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${l.toLowerCase().replace(/\s+/g, "-")}`,
							className: "text-ink/70 hover:text-ink",
							children: l
						}) }, l))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-extrabold uppercase tracking-widest text-ink/40",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-sm",
						children: COMPANY_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-ink/70 hover:text-ink",
							children: l
						}) }, l))
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-6 text-xs text-ink/40 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Jeevana. All Rights Reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Ceritakan harimu, Jeevana akan mengurus sisanya." })]
			})]
		})
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "main-content",
		className: "min-h-screen bg-canvas font-sans text-ink selection:bg-brand/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Problem, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueProps, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPreview, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltFor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roadmap, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Landing as component };
