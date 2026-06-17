#!/usr/bin/env node
/**
 * CLI-only verification for the landing-page scaffold.
 *
 * Asserts the scaffold the prompt asked for actually works:
 *   1. The `@/` path alias resolves to /src/ (the prompt's STEP 2 requirement).
 *   2. The cn() utility merges/dedupes Tailwind classes (STEP 3).
 *   3. App.tsx renders to static HTML (the exact STEP 6 component).
 *   4. framer-motion + lucide-react are installed and render server-side.
 *
 * Everything is driven from Node — no browser, no GUI. Run with:
 *   node scripts/verify.mjs
 */
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { build } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const ok = (m) => console.log(`  ✓ ${m}`);
const fail = (m) => {
  console.error(`  ✗ ${m}`);
  process.exitCode = 1;
};

// Bundle src against the real vite config (resolves the `@/` alias + TSX/JSX)
// into a single ESM file we can import and render from Node.
async function bundle(entry, name) {
  const outDir = path.join(root, "scripts", ".verify");
  await build({
    root,
    logLevel: "error",
    configFile: path.join(root, "vite.config.ts"),
    build: {
      outDir,
      emptyOutDir: false,
      lib: { entry, formats: ["es"], fileName: () => `${name}.mjs` },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime", "react-dom/server"],
      },
    },
  });
  return pathToFileURL(path.join(outDir, `${name}.mjs`)).href;
}

console.log("Landing Page Scaffold — verification\n");

// 1 + 2: import the cn() utility THROUGH the @/ alias and exercise it.
console.log("[1/4] @/ alias + cn() utility");
const utilUrl = await bundle(path.join(root, "scripts", "_probe-cn.ts"), "probe-cn");
const { cnResult, classValueWorks } = await import(utilUrl);
if (cnResult === "px-4 py-1 bg-white") ok(`cn() merged conflicting classes -> "${cnResult}"`);
else fail(`cn() returned unexpected value: "${cnResult}"`);
if (classValueWorks) ok("clsx ClassValue inputs (arrays/objects/conditionals) handled");
else fail("clsx conditional inputs not handled");

// 3: render the EXACT App.tsx from the prompt's STEP 6 to static markup.
console.log("\n[2/4] App.tsx renders (prompt STEP 6)");
const appUrl = await bundle(path.join(root, "src", "App.tsx"), "app");
const App = (await import(appUrl)).default;
const html = renderToStaticMarkup(React.createElement(App));
if (html.includes("relative min-h-screen flex flex-col")) ok("App renders <main> with the exact STEP 6 classes");
else fail(`App markup missing expected classes: ${html}`);

// 4: framer-motion + lucide-react are installed and render server-side.
console.log("\n[3/4] framer-motion + lucide-react");
const { motion } = await import("framer-motion");
const motionHtml = renderToStaticMarkup(
  React.createElement(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 } }, "ok"),
);
if (motionHtml.includes("ok")) ok("framer-motion <motion.div> renders");
else fail("framer-motion did not render");
const { Rocket } = await import("lucide-react");
const iconHtml = renderToStaticMarkup(React.createElement(Rocket));
if (iconHtml.includes("<svg")) ok("lucide-react <Rocket/> renders an SVG");
else fail("lucide-react icon did not render");

// 5: the on-disk files match the prompt's exact specs.
console.log("\n[4/4] files exist at the exact spec'd paths");
const expect = [
  "src/App.tsx",
  "src/main.tsx",
  "src/index.css",
  "src/lib/utils.ts",
  "src/components/ui/.gitkeep",
  "vite.config.ts",
  "tsconfig.json",
];
for (const f of expect) {
  if (fs.existsSync(path.join(root, f))) ok(f);
  else fail(`missing ${f}`);
}

fs.rmSync(path.join(root, "scripts", ".verify"), { recursive: true, force: true });
console.log(process.exitCode ? "\nFAILED" : "\nALL CHECKS PASSED");
