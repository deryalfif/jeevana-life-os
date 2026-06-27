/**
 * fix-vercel-tslib-artifact.mjs
 *
 * Post-build script that inlines tslib helpers directly into the bundled
 * server output files. This eliminates the runtime dependency on the `tslib`
 * package, which Node.js ESM can't resolve from Nitro's `_libs/` subdirectory
 * on Vercel's serverless runtime.
 *
 * Run automatically via `npm run build`.
 */

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Inlined tslib helper implementations
// ---------------------------------------------------------------------------

const TSLIB_HELPERS = {
  __awaiter: `var __awaiter = function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};`,

  __rest: `var __rest = function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  return t;
};`,

  __decorate: `var __decorate = function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  if (c > 3 && r) Object.defineProperty(target, key, r);
  return r;
};`,

  __param: `var __param = function (paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); };
};`,

  __metadata: `var __metadata = function (metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
};`,

  __spreadArray: `var __spreadArray = function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};`,

  __assign: `var __assign = Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
  }
  return t;
};`,

  __extends: `var __extends = (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();`,

  __values: `var __values = function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return { next: function () { if (o && i >= o.length) o = void 0; return { value: o && o[i++], done: !o }; } };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};`,

  __read: `var __read = function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
  catch (error) { e = { error: error }; }
  finally { try { if (r && !r.done && (m = i["return"])) m.call(i); } finally { if (e) throw e.error; } }
  return ar;
};`,

  __generator: `var __generator = function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};`,
};

// ---------------------------------------------------------------------------
// Regex to match  import { helper1, helper2 } from "tslib";
// ---------------------------------------------------------------------------
const TSLIB_IMPORT_RE = /^import\s*\{([^}]+)\}\s*from\s*["']tslib["']\s*;?\s*$/gm;

// ---------------------------------------------------------------------------
// Patch a single file
// ---------------------------------------------------------------------------
function patchFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");

  if (!source.includes('"tslib"') && !source.includes("'tslib'")) {
    return false;
  }

  let patched = source;
  let patchCount = 0;

  patched = patched.replace(TSLIB_IMPORT_RE, (_match, importList) => {
    const helpers = importList
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    const inlined = [];
    const missing = [];

    for (const helper of helpers) {
      if (TSLIB_HELPERS[helper]) {
        inlined.push(TSLIB_HELPERS[helper]);
      } else {
        missing.push(helper);
        console.warn(
          `[fix-vercel-tslib] WARNING: No inline implementation for tslib helper "${helper}" in ${filePath}`
        );
      }
    }

    // If there are helpers we don't have inlined, keep a partial import
    if (missing.length > 0) {
      const kept = `import { ${missing.join(", ")} } from "tslib";`;
      return inlined.join("\n") + "\n" + kept;
    }

    patchCount++;
    return inlined.join("\n");
  });

  if (patchCount === 0 && patched === source) {
    return false;
  }

  fs.writeFileSync(filePath, patched, "utf8");
  return true;
}

// ---------------------------------------------------------------------------
// Recursively find all .mjs files under a directory
// ---------------------------------------------------------------------------
function findMjsFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMjsFiles(fullPath));
    } else if (entry.name.endsWith(".mjs")) {
      results.push(fullPath);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const root = process.cwd();

const searchDirs = [
  path.join(root, ".output", "server"),
  path.join(root, ".vercel", "output", "functions"),
];

let totalPatched = 0;

for (const dir of searchDirs) {
  if (!fs.existsSync(dir)) {
    console.log(`[fix-vercel-tslib] Skipping (not found): ${dir}`);
    continue;
  }

  const files = findMjsFiles(dir);
  for (const file of files) {
    if (patchFile(file)) {
      const rel = path.relative(root, file);
      console.log(`[fix-vercel-tslib] ✓ Patched: ${rel}`);
      totalPatched++;
    }
  }
}

if (totalPatched === 0) {
  console.log(
    "[fix-vercel-tslib] No tslib imports found in build output (already clean or not present)."
  );
} else {
  console.log(
    `[fix-vercel-tslib] Done — inlined tslib helpers in ${totalPatched} file(s).`
  );
}