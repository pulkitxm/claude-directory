import {
	cp,
	mkdir,
	mkdtemp,
	readFile,
	readdir,
	rename,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { spawn } from "node:child_process";
import { versionPagesAssets } from "./version-pages-assets.mjs";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, process.env.PAGES_OUTPUT ?? "_site");
const concurrency = Number(process.env.PAGES_BUILD_CONCURRENCY ?? 4);
const requested = process.argv.slice(2);

function run(command, args, cwd = root) {
	return new Promise((resolvePromise, reject) => {
		const child = spawn(command, args, { cwd, stdio: "inherit" });
		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) resolvePromise();
			else reject(new Error(`${command} exited with code ${code}`));
		});
	});
}

function capture(command, args, cwd = root) {
	return new Promise((resolvePromise, reject) => {
		const child = spawn(command, args, { cwd });
		let stdout = "";
		let stderr = "";
		child.stdout.on("data", (chunk) => {
			stdout += chunk;
		});
		child.stderr.on("data", (chunk) => {
			stderr += chunk;
		});
		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) resolvePromise(stdout.trim());
			else
				reject(
					new Error(stderr.trim() || `${command} exited with code ${code}`),
				);
		});
	});
}

async function findProjects(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const projects = [];
	for (const entry of entries) {
		if (
			!entry.isDirectory() ||
			entry.name === ".git" ||
			entry.name === "node_modules" ||
			resolve(directory, entry.name) === output
		)
			continue;
		const path = join(directory, entry.name);
		const names = new Set((await readdir(path)).map((item) => item));
		if (names.has("package.json") && names.has("prompt.md"))
			projects.push(path);
		else projects.push(...(await findProjects(path)));
	}
	return projects;
}

async function stageRepository(projects) {
	if (process.env.GITHUB_ACTIONS === "true") {
		const checkoutEvidence = [];
		async function collectCheckout(directory) {
			for (const entry of await readdir(directory, { withFileTypes: true })) {
				if (!entry.isDirectory() || entry.name === ".git") continue;
				const path = join(directory, entry.name);
				if (entry.name === ".reference" || entry.name === ".audit")
					checkoutEvidence.push(path);
				else if (path !== output) await collectCheckout(path);
			}
		}
		await collectCheckout(root);
		await Promise.all(
			checkoutEvidence.map((path) =>
				rm(path, { recursive: true, force: true }),
			),
		);
	}
	await rm(output, { recursive: true, force: true });
	await mkdir(output, { recursive: true });
	const archive = await mkdtemp(join(tmpdir(), "fable-pages-"));
	const tar = join(archive, "repository.tar");
	await run("git", ["archive", "--format=tar", `--output=${tar}`, "HEAD"]);
	await run("tar", ["-xf", tar, "-C", output]);
	await rm(archive, { recursive: true, force: true });
	await writeFile(join(output, ".nojekyll"), "");
	const evidence = [];
	async function collect(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const path = join(directory, entry.name);
			if (entry.name === ".reference" || entry.name === ".audit")
				evidence.push(path);
			else await collect(path);
		}
	}
	await collect(output);
	await Promise.all(
		evidence.map((path) => rm(path, { recursive: true, force: true })),
	);
	for (const project of projects) {
		const staged = join(output, relative(root, project));
		const preserved = await mkdtemp(join(tmpdir(), "fable-metadata-"));
		for (const file of [
			"demo.mp4",
			"poster.jpg",
			"poster.png",
			"README.md",
			"prompt.md",
		]) {
			await cp(join(staged, file), join(preserved, file), {
				force: false,
			}).catch(() => {});
		}
		await rm(staged, { recursive: true, force: true });
		await mkdir(staged, { recursive: true });
		await cp(preserved, staged, { recursive: true });
		await rm(preserved, { recursive: true, force: true });
	}
}

async function buildProject(project) {
	const name = relative(root, project);
	const packageJson = JSON.parse(
		await readFile(join(project, "package.json"), "utf8"),
	);
	await run(
		"npm",
		["ci", "--no-audit", "--no-fund", "--prefer-offline"],
		project,
	);
	const isNext = Boolean(
		packageJson.dependencies?.next || packageJson.devDependencies?.next,
	);
	const isTanstack = Boolean(
		packageJson.dependencies?.["@tanstack/react-start"] ||
			packageJson.devDependencies?.["@tanstack/react-start"],
	);
	if (isNext) await run("npm", ["run", "build"], project);
	else if (isTanstack) {
		const generated = [
			"_pages-index.html",
			"_pages-main.tsx",
			"_pages-vite.config.ts",
		];
		await writeFile(
			join(project, "_pages-index.html"),
			'<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="root"></div><script type="module" src="/_pages-main.tsx"></script></body></html>',
		);
		await writeFile(
			join(project, "_pages-main.tsx"),
			'import { StrictMode } from "react"; import { createRoot } from "react-dom/client"; import { Route } from "./src/routes/index"; import "./src/styles.css"; const Component = Route.options.component!; createRoot(document.getElementById("root")!).render(<StrictMode><Component /></StrictMode>);',
		);
		await writeFile(
			join(project, "_pages-vite.config.ts"),
			packageJson.dependencies?.["vite-tsconfig-paths"] ||
				packageJson.devDependencies?.["vite-tsconfig-paths"]
				? 'import tailwindcss from "@tailwindcss/vite"; import viteReact from "@vitejs/plugin-react"; import { resolve } from "node:path"; import { defineConfig } from "vite"; import tsConfigPaths from "vite-tsconfig-paths"; import original from "./vite.config"; export default defineConfig({ resolve: original.resolve, plugins: [tsConfigPaths(), tailwindcss(), viteReact()], build: { rollupOptions: { input: resolve(__dirname, "_pages-index.html") } } });'
				: 'import tailwindcss from "@tailwindcss/vite"; import viteReact from "@vitejs/plugin-react"; import { resolve } from "node:path"; import { defineConfig } from "vite"; import original from "./vite.config"; export default defineConfig({ resolve: original.resolve, plugins: [tailwindcss(), viteReact()], build: { rollupOptions: { input: resolve(__dirname, "_pages-index.html") } } });',
		);
		try {
			await run(
				"npm",
				[
					"exec",
					"--",
					"vite",
					"build",
					"--config",
					"_pages-vite.config.ts",
					"--base=./",
				],
				project,
			);
			await rename(
				join(project, "dist", "_pages-index.html"),
				join(project, "dist", "index.html"),
			);
		} finally {
			await Promise.all(
				generated.map((file) => rm(join(project, file), { force: true })),
			);
		}
	} else
		await run("npm", ["exec", "--", "vite", "build", "--base=./"], project);
	const built = join(project, isNext ? "out" : "dist");
	const staged = join(output, name);
	await cp(built, staged, { recursive: true });
	await rm(join(project, "node_modules"), { recursive: true, force: true });
	process.stdout.write(`Built ${name}\n`);
}

async function runPool(projects) {
	let index = 0;
	const failures = [];
	async function worker() {
		while (index < projects.length) {
			const project = projects[index];
			index += 1;
			try {
				await buildProject(project);
			} catch (error) {
				failures.push({ project: relative(root, project), error });
			} finally {
				await rm(join(project, "node_modules"), {
					recursive: true,
					force: true,
				});
			}
		}
	}
	await Promise.all(
		Array.from({ length: Math.min(concurrency, projects.length) }, worker),
	);
	if (failures.length > 0) {
		const summary = failures
			.map(({ project, error }) => `${project}: ${error.message}`)
			.join("\n");
		throw new Error(`${failures.length} preview builds failed\n${summary}`);
	}
}

const discovered = await findProjects(root);
const projects = requested.length
	? requested.map((project) => resolve(root, project))
	: discovered;
await stageRepository(discovered);
await runPool(projects);
const pagesAssetVersion = (
	process.env.PAGES_ASSET_VERSION ??
	process.env.GITHUB_SHA ??
	(await capture("git", ["rev-parse", "HEAD"]))
).slice(0, 12);
const versioned = await versionPagesAssets(output, pagesAssetVersion);
await run("node", [
	join(root, "scripts", "verify-pages.mjs"),
	output,
	...projects.map((project) => relative(root, project)),
]);
process.stdout.write(
	`Staged ${projects.length} built previews in ${relative(root, output)} with ${versioned.references} versioned asset references\n`,
);
