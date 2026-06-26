import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const functionsRoot = path.join(root, ".vercel", "output", "functions");
const tslibSource = path.join(root, "node_modules", "tslib");

function findFunctionDirs(dir) {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && entry.name.endsWith(".func")) {
      results.push(fullPath);
      continue;
    }

    if (entry.isDirectory()) {
      results.push(...findFunctionDirs(fullPath));
    }
  }

  return results;
}

function copyDirRecursive(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

if (!fs.existsSync(tslibSource)) {
  console.error(`[fix-vercel-tslib-artifact] tslib source tidak ditemukan: ${tslibSource}`);
  process.exit(1);
}

const functionDirs = findFunctionDirs(functionsRoot);

if (functionDirs.length === 0) {
  console.warn(`[fix-vercel-tslib-artifact] Tidak ada folder .func ditemukan di: ${functionsRoot}`);
  process.exit(0);
}

for (const funcDir of functionDirs) {
  const target = path.join(funcDir, "node_modules", "tslib");
  copyDirRecursive(tslibSource, target);
  console.log(`[fix-vercel-tslib-artifact] tslib disalin ke: ${target}`);
}