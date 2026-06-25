import { __toESM } from "../_runtime.mjs";
import { DefaultChatTransport, require_react, useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { loadInitialMessages, useServerFn } from "./jeevana.functions-Dq2Wch8U.mjs";
import { useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { ArrowDown, CircleCheck, CornerDownLeft, LoaderCircle, Sparkles, Square, TriangleAlert, X } from "../_libs/lucide-react.mjs";
import { supabase } from "./client-DFhTWwuO.mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { Qs } from "../_libs/streamdown+[...].mjs";
import { cn } from "./utils-OyjWw23L.mjs";
import { Button } from "./button-B5pEyLGs.mjs";
import { StickToBottom, useStickToBottomContext } from "../_libs/use-stick-to-bottom.mjs";
import { A } from "../_libs/@streamdown/cjk+[...].mjs";
import { G } from "../_libs/shiki+streamdown__code.mjs";
import { h } from "../_libs/@streamdown/math+[...].mjs";
import { f } from "../_libs/@streamdown/mermaid+[...].mjs";
import { nanoid } from "../_libs/nanoid.mjs";
import { motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-C9P7iXO5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Conversation = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom, {
	className: cn("relative flex-1 overflow-y-hidden", className),
	initial: "smooth",
	resize: "smooth",
	role: "log",
	...props
});
var ConversationContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom.Content, {
	className: cn("flex flex-col gap-8 p-4", className),
	...props
});
var ConversationEmptyState = ({ className, title = "No messages yet", description = "Start a conversation to see messages here", icon, children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex size-full flex-col items-center justify-center gap-3 p-8 text-center", className),
	...props,
	children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		children: icon
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-medium text-sm",
			children: title
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: description
		})]
	})] })
});
var ConversationScrollButton = ({ className, ...props }) => {
	const { isAtBottom, scrollToBottom } = useStickToBottomContext();
	const handleScrollToBottom = (0, import_react.useCallback)(() => {
		scrollToBottom();
	}, [scrollToBottom]);
	return !isAtBottom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: cn("absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full dark:bg-background dark:hover:bg-muted", className),
		onClick: handleScrollToBottom,
		size: "icon",
		type: "button",
		variant: "outline",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
	});
};
var Message = ({ className, from, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("group flex w-full max-w-[95%] flex-col gap-2", from === "user" ? "is-user ml-auto justify-end" : "is-assistant", className),
	...props
});
var MessageContent = ({ children, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm", "group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground", "group-[.is-assistant]:text-foreground", className),
	...props,
	children
});
(0, import_react.createContext)(null);
var streamdownPlugins = {
	cjk: A,
	code: G,
	math: h,
	mermaid: f
};
var MessageResponse = (0, import_react.memo)(({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
	className: cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className),
	plugins: streamdownPlugins,
	...props
}), (prevProps, nextProps) => prevProps.children === nextProps.children && nextProps.isAnimating === prevProps.isAnimating);
MessageResponse.displayName = "MessageResponse";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]", "h-9 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1", "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", className),
		...props
	});
}
var inputGroupAddonVariants = cva("text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
		"block-end": "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupTextarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		"data-slot": "input-group-control",
		className: cn("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent", className),
		...props
	});
}
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
var convertBlobUrlToDataUrl = async (url) => {
	try {
		const blob = await (await fetch(url)).blob();
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};
var PromptInputController = (0, import_react.createContext)(null);
var ProviderAttachmentsContext = (0, import_react.createContext)(null);
var useOptionalPromptInputController = () => (0, import_react.useContext)(PromptInputController);
var useOptionalProviderAttachments = () => (0, import_react.useContext)(ProviderAttachmentsContext);
var LocalAttachmentsContext = (0, import_react.createContext)(null);
var usePromptInputAttachments = () => {
	const provider = useOptionalProviderAttachments();
	const context = (0, import_react.useContext)(LocalAttachmentsContext) ?? provider;
	if (!context) throw new Error("usePromptInputAttachments must be used within a PromptInput or PromptInputProvider");
	return context;
};
var LocalReferencedSourcesContext = (0, import_react.createContext)(null);
var PromptInput = ({ className, accept, multiple, globalDrop, syncHiddenInput, maxFiles, maxFileSize, onError, onSubmit, children, ...props }) => {
	const controller = useOptionalPromptInputController();
	const usingProvider = !!controller;
	const inputRef = (0, import_react.useRef)(null);
	const formRef = (0, import_react.useRef)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	const files = usingProvider ? controller.attachments.files : items;
	const [referencedSources, setReferencedSources] = (0, import_react.useState)([]);
	const filesRef = (0, import_react.useRef)(files);
	(0, import_react.useEffect)(() => {
		filesRef.current = files;
	}, [files]);
	const openFileDialogLocal = (0, import_react.useCallback)(() => {
		inputRef.current?.click();
	}, []);
	const matchesAccept = (0, import_react.useCallback)((f) => {
		if (!accept || accept.trim() === "") return true;
		return accept.split(",").map((s) => s.trim()).filter(Boolean).some((pattern) => {
			if (pattern.endsWith("/*")) {
				const prefix = pattern.slice(0, -1);
				return f.type.startsWith(prefix);
			}
			return f.type === pattern;
		});
	}, [accept]);
	const addLocal = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		setItems((prev) => {
			const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - prev.length) : void 0;
			const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
			if (typeof capacity === "number" && sized.length > capacity) onError?.({
				code: "max_files",
				message: "Too many files. Some were not added."
			});
			const next = [];
			for (const file of capped) next.push({
				filename: file.name,
				id: nanoid(),
				mediaType: file.type,
				type: "file",
				url: URL.createObjectURL(file)
			});
			return [...prev, ...next];
		});
	}, [
		matchesAccept,
		maxFiles,
		maxFileSize,
		onError
	]);
	const removeLocal = (0, import_react.useCallback)((id) => setItems((prev) => {
		const found = prev.find((file) => file.id === id);
		if (found?.url) URL.revokeObjectURL(found.url);
		return prev.filter((file) => file.id !== id);
	}), []);
	const addWithProviderValidation = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		const currentCount = files.length;
		const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - currentCount) : void 0;
		const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
		if (typeof capacity === "number" && sized.length > capacity) onError?.({
			code: "max_files",
			message: "Too many files. Some were not added."
		});
		if (capped.length > 0) controller?.attachments.add(capped);
	}, [
		matchesAccept,
		maxFileSize,
		maxFiles,
		onError,
		files.length,
		controller
	]);
	const clearAttachments = (0, import_react.useCallback)(() => usingProvider ? controller?.attachments.clear() : setItems((prev) => {
		for (const file of prev) if (file.url) URL.revokeObjectURL(file.url);
		return [];
	}), [usingProvider, controller]);
	const clearReferencedSources = (0, import_react.useCallback)(() => setReferencedSources([]), []);
	const add = usingProvider ? addWithProviderValidation : addLocal;
	const remove = usingProvider ? controller.attachments.remove : removeLocal;
	const openFileDialog = usingProvider ? controller.attachments.openFileDialog : openFileDialogLocal;
	const clear = (0, import_react.useCallback)(() => {
		clearAttachments();
		clearReferencedSources();
	}, [clearAttachments, clearReferencedSources]);
	(0, import_react.useEffect)(() => {
		if (!usingProvider) return;
		controller.__registerFileInput(inputRef, () => inputRef.current?.click());
	}, [usingProvider, controller]);
	(0, import_react.useEffect)(() => {
		if (syncHiddenInput && inputRef.current && files.length === 0) inputRef.current.value = "";
	}, [files, syncHiddenInput]);
	(0, import_react.useEffect)(() => {
		const form = formRef.current;
		if (!form) return;
		if (globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		form.addEventListener("dragover", onDragOver);
		form.addEventListener("drop", onDrop);
		return () => {
			form.removeEventListener("dragover", onDragOver);
			form.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => {
		if (!globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		document.addEventListener("dragover", onDragOver);
		document.addEventListener("drop", onDrop);
		return () => {
			document.removeEventListener("dragover", onDragOver);
			document.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => () => {
		if (!usingProvider) {
			for (const f of filesRef.current) if (f.url) URL.revokeObjectURL(f.url);
		}
	}, [usingProvider]);
	const handleChange = (0, import_react.useCallback)((event) => {
		if (event.currentTarget.files) add(event.currentTarget.files);
		event.currentTarget.value = "";
	}, [add]);
	const attachmentsCtx = (0, import_react.useMemo)(() => ({
		add,
		clear: clearAttachments,
		fileInputRef: inputRef,
		files: files.map((item) => ({
			...item,
			id: item.id
		})),
		openFileDialog,
		remove
	}), [
		files,
		add,
		remove,
		clearAttachments,
		openFileDialog
	]);
	const refsCtx = (0, import_react.useMemo)(() => ({
		add: (incoming) => {
			const array = Array.isArray(incoming) ? incoming : [incoming];
			setReferencedSources((prev) => [...prev, ...array.map((s) => ({
				...s,
				id: nanoid()
			}))]);
		},
		clear: clearReferencedSources,
		remove: (id) => {
			setReferencedSources((prev) => prev.filter((s) => s.id !== id));
		},
		sources: referencedSources
	}), [referencedSources, clearReferencedSources]);
	const handleSubmit = (0, import_react.useCallback)(async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const text = usingProvider ? controller.textInput.value : (() => {
			return new FormData(form).get("message") || "";
		})();
		if (!usingProvider) form.reset();
		try {
			const result = onSubmit({
				files: await Promise.all(files.map(async ({ id: _id, ...item }) => {
					if (item.url?.startsWith("blob:")) {
						const dataUrl = await convertBlobUrlToDataUrl(item.url);
						return {
							...item,
							url: dataUrl ?? item.url
						};
					}
					return item;
				})),
				text
			}, event);
			if (result instanceof Promise) try {
				await result;
				clear();
				if (usingProvider) controller.textInput.clear();
			} catch {}
			else {
				clear();
				if (usingProvider) controller.textInput.clear();
			}
		} catch {}
	}, [
		usingProvider,
		controller,
		files,
		onSubmit,
		clear
	]);
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		accept,
		"aria-label": "Upload files",
		className: "hidden",
		multiple,
		onChange: handleChange,
		ref: inputRef,
		title: "Upload files",
		type: "file"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: cn("w-full", className),
		onSubmit: handleSubmit,
		ref: formRef,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
			className: "overflow-hidden",
			children
		})
	})] });
	const withReferencedSources = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalReferencedSourcesContext.Provider, {
		value: refsCtx,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalAttachmentsContext.Provider, {
		value: attachmentsCtx,
		children: withReferencedSources
	});
};
var PromptInputTextarea = ({ onChange, onKeyDown, className, placeholder = "What would you like to know?", ...props }) => {
	const controller = useOptionalPromptInputController();
	const attachments = usePromptInputAttachments();
	const [isComposing, setIsComposing] = (0, import_react.useState)(false);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		onKeyDown?.(e);
		if (e.defaultPrevented) return;
		if (e.key === "Enter") {
			if (isComposing || e.nativeEvent.isComposing) return;
			if (e.shiftKey) return;
			e.preventDefault();
			const { form } = e.currentTarget;
			if ((form?.querySelector("button[type=\"submit\"]"))?.disabled) return;
			form?.requestSubmit();
		}
		if (e.key === "Backspace" && e.currentTarget.value === "" && attachments.files.length > 0) {
			e.preventDefault();
			const lastAttachment = attachments.files.at(-1);
			if (lastAttachment) attachments.remove(lastAttachment.id);
		}
	}, [
		onKeyDown,
		isComposing,
		attachments
	]);
	const handlePaste = (0, import_react.useCallback)((event) => {
		const items = event.clipboardData?.items;
		if (!items) return;
		const files = [];
		for (const item of items) if (item.kind === "file") {
			const file = item.getAsFile();
			if (file) files.push(file);
		}
		if (files.length > 0) {
			event.preventDefault();
			attachments.add(files);
		}
	}, [attachments]);
	const handleCompositionEnd = (0, import_react.useCallback)(() => setIsComposing(false), []);
	const handleCompositionStart = (0, import_react.useCallback)(() => setIsComposing(true), []);
	const controlledProps = controller ? {
		onChange: (e) => {
			controller.textInput.setInput(e.currentTarget.value);
			onChange?.(e);
		},
		value: controller.textInput.value
	} : { onChange };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupTextarea, {
		className: cn("field-sizing-content max-h-48 min-h-16", className),
		name: "message",
		onCompositionEnd: handleCompositionEnd,
		onCompositionStart: handleCompositionStart,
		onKeyDown: handleKeyDown,
		onPaste: handlePaste,
		placeholder,
		...props,
		...controlledProps
	});
};
var PromptInputFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
	align: "block-end",
	className: cn("justify-between gap-1", className),
	...props
});
var PromptInputSubmit = ({ className, variant = "default", size = "icon-sm", status, onStop, onClick, children, ...props }) => {
	const isGenerating = status === "submitted" || status === "streaming";
	let Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "size-4" });
	if (status === "submitted") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
	else if (status === "streaming") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" });
	else if (status === "error") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" });
	const handleClick = (0, import_react.useCallback)((e) => {
		if (isGenerating && onStop) {
			e.preventDefault();
			onStop();
			return;
		}
		onClick?.(e);
	}, [
		isGenerating,
		onStop,
		onClick
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
		"aria-label": isGenerating ? "Stop" : "Submit",
		className: cn(className),
		onClick: handleClick,
		size,
		type: isGenerating && onStop ? "button" : "submit",
		variant,
		...props,
		children: children ?? Icon
	});
};
var motionComponentCache = /* @__PURE__ */ new Map();
var getMotionComponent = (element) => {
	let component = motionComponentCache.get(element);
	if (!component) {
		component = motion.create(element);
		motionComponentCache.set(element, component);
	}
	return component;
};
var ShimmerComponent = ({ children, as: Component = "p", className, duration = 2, spread = 2 }) => {
	const MotionComponent = getMotionComponent(Component);
	const dynamicSpread = (0, import_react.useMemo)(() => (children?.length ?? 0) * spread, [children, spread]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionComponent, {
		animate: { backgroundPosition: "0% center" },
		className: cn("relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent", "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]", className),
		initial: { backgroundPosition: "100% center" },
		style: {
			"--spread": `${dynamicSpread}px`,
			backgroundImage: "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))"
		},
		transition: {
			duration,
			ease: "linear",
			repeat: Number.POSITIVE_INFINITY
		},
		children
	});
};
var Shimmer = (0, import_react.memo)(ShimmerComponent);
var SUGGESTIONS = [
	"Hari ini jogging 5km selama 45 menit",
	"Beli kopi 25 ribu di kafe",
	"Dibayar freelance 2 juta",
	"Ingatkan saya bayar listrik tanggal 10"
];
function formatIDR(n) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0
	}).format(n);
}
function ToolBadge({ result }) {
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-amber-400 animate-pulse" }), " mencatat..."]
	});
	if (result.ok === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 inline-flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), " Gagal mencatat"]
	});
	const label = result.type === "expense" ? `${result.title} · ${formatIDR(Number(result.amount ?? 0))}` : result.type === "income" ? `+${formatIDR(Number(result.amount ?? 0))} · ${result.title}` : result.type === "reminder" ? `Pengingat: ${result.title}` : result.type === "note" ? `Catatan disimpan` : `${result.title}${result.duration_minutes ? ` · ${result.duration_minutes} mnt` : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mt-2 inline-flex items-center gap-2 text-xs bg-gradient-to-br ${result.type === "expense" ? "from-rose-50 to-rose-100 text-rose-700 border-rose-200" : result.type === "income" ? "from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200" : result.type === "reminder" ? "from-amber-50 to-amber-100 text-amber-800 border-amber-200" : result.type === "note" ? "from-slate-50 to-slate-100 text-slate-700 border-slate-200" : "from-blue-50 to-blue-100 text-blue-700 border-blue-200"} border rounded-xl px-3 py-1.5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: "Dicatat:"
			}),
			" ",
			label
		]
	});
}
function ChatScreen() {
	const qc = useQueryClient();
	const loadInitial = useServerFn(loadInitialMessages);
	const { data: initial } = useQuery({
		queryKey: ["chat-history"],
		queryFn: () => loadInitial(),
		staleTime: Infinity
	});
	const tokenRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			tokenRef.current = data.session?.access_token ?? null;
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			tokenRef.current = session?.access_token ?? null;
		});
		return () => subscription.unsubscribe();
	}, []);
	const { messages, sendMessage, status } = useChat({
		transport: (0, import_react.useMemo)(() => new DefaultChatTransport({
			api: "/api/chat",
			headers: () => tokenRef.current ? { Authorization: `Bearer ${tokenRef.current}` } : {}
		}), []),
		messages: initial ?? [],
		onFinish: () => {
			qc.invalidateQueries({ queryKey: ["life-logs"] });
		}
	});
	const [input, setInput] = (0, import_react.useState)("");
	const isBusy = status === "submitted" || status === "streaming";
	function submit(text) {
		const t = text.trim();
		if (!t || isBusy) return;
		sendMessage({ text: t });
		setInput("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[100dvh] md:h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-14 md:h-16 border-b border-slate-200/70 bg-white/80 backdrop-blur px-5 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-brand" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-semibold tracking-tight",
						children: "Ngobrol sama Jeevana"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs text-slate-400",
						children: "Cerita aja, biar aku catetin."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Conversation, {
				className: "flex-1 min-h-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConversationContent, {
					className: "max-w-3xl mx-auto w-full",
					children: [messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConversationEmptyState, {
						title: "Mulai cerita harimu ✨",
						description: "Ketik apa aja — aktivitas, pengeluaran, atau pengingat. Aku catat otomatis.",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-12 rounded-2xl bg-gradient-to-br from-brand to-grape grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6 text-white" })
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-12 rounded-2xl bg-gradient-to-br from-brand to-grape grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: "Mulai cerita harimu ✨"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-500",
									children: "Coba salah satu ini:"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-2 w-full max-w-md",
								children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => submit(s),
									className: "text-left text-sm bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl px-4 py-3 transition",
									children: s
								}, s))
							})
						]
					}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
						from: m.role,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent, { children: m.parts.map((part, i) => {
							if (part.type === "text") return m.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageResponse, { children: part.text }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part.text }, i);
							if (part.type.startsWith("tool-")) {
								const output = part.output;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBadge, { result: output }, i);
							}
							return null;
						}) })
					}, m.id)), status === "submitted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
						from: "assistant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, { children: "Mikir bentar..." }) })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationScrollButton, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-slate-200/70 bg-white p-3 md:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-3xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptInput, {
						onSubmit: (_, e) => {
							e.preventDefault();
							submit(input);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputTextarea, {
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Cerita harimu di sini...",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputFooter, {
							className: "justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputSubmit, {
								status,
								disabled: !input.trim() || isBusy
							})
						})]
					})
				})
			})
		]
	});
}
var SplitComponent = ChatScreen;
//#endregion
export { SplitComponent as component };
