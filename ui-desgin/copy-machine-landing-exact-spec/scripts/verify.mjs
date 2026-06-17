#!/usr/bin/env node
/**
 * Verification for the copy-machine-landing scaffold.
 *
 * This is the SETUP phase of a multi-turn experiment: the project must match the
 * user's EXACT specifications (Vite + React + TS, Tailwind classic directives,
 * tailwind-merge + clsx, framer-motion, lucide-react, `@/` -> `/src/` alias,
 * and the exact contents of utils.ts / index.css / main.tsx / App.tsx).
 *
 * Checks performed (CLI-only, no GUI):
 *   1. Required files exist at their exact paths.
 *   2. The exact-spec files contain exactly the content the user provided.
 *   3. The `@/` alias resolves to `/src/` in vite.config.ts and tsconfig.json.
 *   4. The required dependencies are declared in package.json.
 *   5. A production build succeeds (`npm run build`).
 *   6. The dev server boots, serves the app, and the spec'd
 *      <main class="relative min-h-screen flex flex-col"> renders in a real
 *      headless Chromium with no console/page errors. The `@/lib/utils` `cn()`
 *      helper is exercised through the alias to prove it resolves at runtime.
 */
import { chromium } from "playwright";
import { spawn, execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import net from "net";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

let failures = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const bad = (m) => {
	console.error(`  ✗ ${m}`);
	failures++;
};
const section = (m) => console.log(`\n── ${m}`);

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

// ---------------------------------------------------------------------------
// 1. Required files exist
// ---------------------------------------------------------------------------
section("Required files exist");
const requiredFiles = [
	"package.json",
	"vite.config.ts",
	"tsconfig.json",
	"index.html",
	"postcss.config.js",
	"tailwind.config.js",
	"src/main.tsx",
	"src/App.tsx",
	"src/index.css",
	"src/lib/utils.ts",
];
for (const f of requiredFiles) {
	if (exists(f)) ok(f);
	else bad(`missing ${f}`);
}
if (fs.existsSync(path.join(ROOT, "src/components/ui"))) ok("src/components/ui/ (UI components dir)");
else bad("missing src/components/ui/ directory");

// ---------------------------------------------------------------------------
// 2. Exact-spec file contents (character-for-character per the prompt)
// ---------------------------------------------------------------------------
section("Exact-spec file contents");

const EXPECTED = {
	"src/lib/utils.ts": `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
	"src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  -webkit-font-smoothing: antialiased;
}
`,
	"src/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
	"src/App.tsx": `function App() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Components will be stacked here */}
    </main>
  )
}

export default App
`,
};

for (const [rel, expected] of Object.entries(EXPECTED)) {
	const actual = read(rel);
	if (actual === expected) ok(`${rel} matches spec exactly`);
	else bad(`${rel} does NOT match spec exactly`);
}

// ---------------------------------------------------------------------------
// 3. `@/` alias resolves to /src/
// ---------------------------------------------------------------------------
section("Path alias @/ -> /src/");
const vite = read("vite.config.ts");
if (/['"]@['"]\s*:\s*path\.resolve\(__dirname,\s*['"]\.\/src['"]\)/.test(vite))
	ok("vite.config.ts aliases @ -> ./src");
else bad("vite.config.ts missing @ -> ./src alias");

const tsconfig = JSON.parse(read("tsconfig.json"));
if (tsconfig.compilerOptions?.baseUrl === "." &&
	Array.isArray(tsconfig.compilerOptions?.paths?.["@/*"]) &&
	tsconfig.compilerOptions.paths["@/*"][0] === "./src/*")
	ok('tsconfig.json maps "@/*" -> "./src/*"');
else bad('tsconfig.json missing "@/*" -> "./src/*" mapping');

// ---------------------------------------------------------------------------
// 4. Required dependencies declared
// ---------------------------------------------------------------------------
section("Required dependencies declared");
const pkg = JSON.parse(read("package.json"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
for (const dep of [
	"react",
	"react-dom",
	"vite",
	"typescript",
	"tailwindcss",
	"tailwind-merge",
	"clsx",
	"framer-motion",
	"lucide-react",
]) {
	if (deps[dep]) ok(`${dep} @ ${deps[dep]}`);
	else bad(`missing dependency ${dep}`);
}

// ---------------------------------------------------------------------------
// 5. Production build succeeds
// ---------------------------------------------------------------------------
section("Production build (npm run build)");
try {
	execSync("npm run build", { cwd: ROOT, stdio: "pipe" });
	if (exists("dist/index.html")) ok("vite build produced dist/index.html");
	else bad("build ran but dist/index.html missing");
} catch (e) {
	bad("npm run build failed");
	console.error(String(e.stdout || "") + String(e.stderr || ""));
}

// ---------------------------------------------------------------------------
// 6. Dev server boots & renders the spec'd <main> in headless Chromium
// ---------------------------------------------------------------------------
section("Headless runtime smoke test");

const getPort = () =>
	new Promise((resolve, reject) => {
		const srv = net.createServer();
		srv.listen(0, () => {
			const { port } = srv.address();
			srv.close(() => resolve(port));
		});
		srv.on("error", reject);
	});

const waitForServer = async (url, timeoutMs = 30000) => {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		try {
			const res = await fetch(url);
			if (res.ok) return true;
		} catch {}
		await new Promise((r) => setTimeout(r, 250));
	}
	return false;
};

let server;
let browser;
try {
	const port = await getPort();
	const url = `http://localhost:${port}/`;
	server = spawn("npm", ["run", "dev", "--", "--port", String(port), "--strictPort"], {
		cwd: ROOT,
		stdio: "pipe",
		env: { ...process.env, NODE_ENV: "development" },
	});
	let serverLog = "";
	server.stdout.on("data", (d) => (serverLog += d.toString()));
	server.stderr.on("data", (d) => (serverLog += d.toString()));

	const up = await waitForServer(url);
	if (!up) {
		bad("dev server did not start in time");
		console.error(serverLog);
	} else {
		ok("dev server responded");

		browser = await chromium.launch();
		const page = await browser.newPage();
		const errors = [];
		page.on("console", (m) => {
			if (m.type() === "error") errors.push(m.text());
		});
		page.on("pageerror", (e) => errors.push(String(e)));

		await page.goto(url, { waitUntil: "networkidle" });

		const mainCls = await page.getAttribute("main", "class");
		if (mainCls === "relative min-h-screen flex flex-col")
			ok('rendered <main class="relative min-h-screen flex flex-col">');
		else bad(`<main> class was "${mainCls}"`);

		// Tailwind must have applied: min-h-screen => min-height == viewport height.
		const minH = await page.evaluate(() => {
			const el = document.querySelector("main");
			return el ? getComputedStyle(el).minHeight : null;
		});
		const vh = await page.evaluate(() => window.innerHeight);
		if (minH === `${vh}px`) ok(`Tailwind applied (main min-height = ${minH})`);
		else bad(`Tailwind min-h-screen not applied (min-height=${minH}, vh=${vh}px)`);

		// Prove `@/lib/utils` cn() resolves through the alias at runtime.
		const cnResult = await page.evaluate(async () => {
			const mod = await import("/src/lib/utils.ts");
			return mod.cn("a", false && "b", "c", "p-2", "p-4");
		});
		if (cnResult === "a c p-4") ok(`@/lib/utils cn() resolves via alias -> "${cnResult}"`);
		else bad(`cn() returned unexpected "${cnResult}"`);

		if (errors.length === 0) ok("no console/page errors");
		else bad(`console/page errors: ${errors.join(" | ")}`);
	}
} catch (e) {
	bad(`runtime smoke test threw: ${e.message}`);
} finally {
	if (browser) await browser.close();
	if (server) server.kill("SIGTERM");
}

// ---------------------------------------------------------------------------
section("Result");
if (failures === 0) {
	console.log("  ALL CHECKS PASSED ✓\n");
	process.exit(0);
} else {
	console.error(`  ${failures} CHECK(S) FAILED ✗\n`);
	process.exit(1);
}
