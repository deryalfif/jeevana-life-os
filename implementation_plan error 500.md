# Fix Vercel 500 Error: `tslib` ERR_MODULE_NOT_FOUND

## Root Cause Analysis

The error `Cannot find package 'tslib' imported from /var/task/_libs/supabase__functions-js.mjs` is happening because:

### The Core Problem

The Nitro bundler (used by TanStack Start) is **splitting** `@supabase/functions-js` and `@supabase/auth-js` into separate library chunks (`_libs/supabase__functions-js.mjs` and `_libs/supabase__auth-js.mjs`), but it's **NOT inlining** the `tslib` import into those chunks. The resulting bundled files still contain bare `import { __awaiter } from "tslib"` and `import { __rest } from "tslib"` statements at line 1.

On Vercel's serverless runtime (`/var/task/`), the function bundle lives at:
```
/var/task/
├── index.mjs          (entry)
├── _libs/
│   ├── supabase__functions-js.mjs   ← import { __awaiter } from "tslib"  ❌
│   └── supabase__auth-js.mjs        ← import { __rest } from "tslib"     ❌
├── node_modules/
│   └── tslib/          ← Present, but can't be resolved from _libs/
└── package.json
```

The `node_modules/tslib` **does exist** in the function bundle (your [fix-vercel-tslib-artifact.mjs](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/scripts/fix-vercel-tslib-artifact.mjs) copies it there), but the ESM resolver in Node.js 22 resolves bare specifiers **relative to the importing file's location**, not the function root. Since the files in `_libs/` are one directory deep, Node.js can't find `tslib` from `_libs/supabase__functions-js.mjs`.

### Why Existing Fixes Don't Work

| Existing Fix | Why It Fails |
|---|---|
| [vite.config.ts](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/vite.config.ts) `ssr.noExternal` | Only tells Vite to bundle these packages rather than externalize them — but the Nitro vercel preset still splits them into `_libs/` chunks with the raw `tslib` import preserved |
| [nitro.config.ts](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/nitro.config.ts) `noExternals` / `externals.inline` | Same intent as above, but the Nitro nightly build (3.0.1-20260519) is **not** honoring these for transitive dependencies like `tslib` within the `_libs/` chunk splitting |
| [fix-supabase-tslib.mjs](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/scripts/fix-supabase-tslib.mjs) (postinstall) | Patches `node_modules` source files, but Nitro's rolldown bundler re-reads the original imports from the ESM module graph, not the patched CJS-like inline. The patched files don't have the same module specifier that rolldown resolves |
| [fix-vercel-tslib-artifact.mjs](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/scripts/fix-vercel-tslib-artifact.mjs) (post-build) | Copies `tslib` to `.vercel/output/functions/__server.func/node_modules/tslib/` — but the ESM resolver in Node.js resolves `from "tslib"` **relative to the importing file at `_libs/`**, so it looks for `_libs/node_modules/tslib/` first, then walks up but may not find it at the function root depending on the Vercel runtime's module resolution behavior |

## Proposed Fix

The most reliable fix is to **patch the built output files directly** — replace the bare `import { __awaiter } from "tslib"` / `import { __rest } from "tslib"` statements with inlined helper implementations in the Vercel output bundles. This eliminates the need for `tslib` to be resolvable at all at runtime.

### Strategy: Post-Build Output Patching

We'll replace the existing [fix-vercel-tslib-artifact.mjs](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/scripts/fix-vercel-tslib-artifact.mjs) with a comprehensive script that:

1. Scans **all** `.mjs` files in `.output/server/_libs/` AND `.vercel/output/functions/__server.func/_libs/`
2. Replaces any `import { __awaiter } from "tslib"` with the inlined `__awaiter` polyfill
3. Replaces any `import { __rest } from "tslib"` with the inlined `__rest` polyfill
4. Handles any other tslib helpers that may appear in the future

> [!IMPORTANT]
> This approach patches the **bundled output** (not `node_modules`), so it's robust against bundler behavior changes and always runs after Nitro finishes its work.

---

### Proposed Changes

#### [MODIFY] [fix-vercel-tslib-artifact.mjs](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/scripts/fix-vercel-tslib-artifact.mjs)

Complete rewrite. Instead of copying `tslib` into `node_modules`, the script will:
- Scan all `.mjs` files in the build output `_libs/` directories  
- Replace `import { <helper> } from "tslib"` with inlined helper implementations
- Support all common tslib helpers (`__awaiter`, `__rest`, `__decorate`, `__param`, `__metadata`, `__asyncGenerator`, `__asyncValues`, `__spreadArray`, etc.)
- Log all patches applied

#### [MODIFY] [vite.config.ts](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/vite.config.ts)

Remove the Nitro-level `noExternals` and `externals.inline` config since they don't work and the post-build script handles everything.

#### [DELETE] [nitro.config.ts](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/nitro.config.ts)

This file is redundant — TanStack Start uses the `nitro` key inside `vite.config.ts`, not a separate `nitro.config.ts`. The config here is never picked up by the build pipeline.

#### [KEEP] [fix-supabase-tslib.mjs](file:///c:/Users/LENOVO/Documents/Codepolitan/jeevana/jeevana-life-os/scripts/fix-supabase-tslib.mjs) (postinstall)

Keep this as a belt-and-suspenders safety net for local `vite dev` mode where the bundler may still resolve `node_modules` directly.

---

## Open Questions

> [!IMPORTANT]
> **Vercel Deploy Method**: Are you deploying via `vercel deploy --prebuilt` (local build → push artifacts) or via Vercel's git integration (Vercel runs `npm install` + `npm run build` on their CI)? This matters because:
> - **Git integration**: The `postinstall` script runs automatically, but the build output patching is what actually fixes the production issue
> - **`--prebuilt`**: Both scripts run locally, and the `.vercel/output/` is pushed directly — we need to make sure `.vercel/` is NOT in `.gitignore` (currently it's not, which is correct for `--prebuilt`)

> [!NOTE]
> **Nitro Nightly Version**: You're using `nitro-nightly@3.0.1-20260519-181425-9cc59cf7`. This is a pre-release. There may be a newer nightly or stable release that fixes the chunking behavior. However, the post-build patch approach works regardless of the Nitro version.

## Verification Plan

### Automated Tests
```bash
npm run build
```
Then verify no `from "tslib"` remains in the output:
```bash
grep -r 'from "tslib"' .output/server/_libs/ .vercel/output/functions/__server.func/_libs/
```
Should return **no results**.

### Manual Verification
- Deploy to Vercel and confirm the 500 error is gone
- Test the Supabase-dependent features (auth, functions invocations)
