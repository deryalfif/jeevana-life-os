// Error reporting utility (generic, no external dependencies)
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[Jeevana Error]", error, context);
}
