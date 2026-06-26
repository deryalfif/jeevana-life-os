import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const patches = [
  {
    file: path.join(
      root,
      "node_modules",
      "@supabase",
      "functions-js",
      "dist",
      "module",
      "FunctionsClient.js",
    ),
    from: 'import { __awaiter } from "tslib";',
    to: `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};`,
  },
  {
    file: path.join(
      root,
      "node_modules",
      "@supabase",
      "auth-js",
      "dist",
      "module",
      "lib",
      "fetch.js",
    ),
    from: 'import { __rest } from "tslib";',
    to: `var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    return t;
};`,
  },
];

for (const patch of patches) {
  if (!fs.existsSync(patch.file)) {
    console.warn(`[fix-supabase-tslib] File tidak ditemukan, skip: ${patch.file}`);
    continue;
  }

  const source = fs.readFileSync(patch.file, "utf8");

  if (source.includes(patch.to)) {
    console.log(`[fix-supabase-tslib] Sudah ter-patch: ${patch.file}`);
    continue;
  }

  if (!source.includes(patch.from)) {
    console.warn(`[fix-supabase-tslib] String target tidak ditemukan, skip: ${patch.file}`);
    continue;
  }

  const next = source.replace(patch.from, patch.to);
  fs.writeFileSync(patch.file, next, "utf8");
  console.log(`[fix-supabase-tslib] Patch diterapkan: ${patch.file}`);
}