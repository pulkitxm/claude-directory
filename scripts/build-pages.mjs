import {
	cp,
	mkdir,
	readFile,
	readdir,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve, join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const staticTypes = new Set([".html", ".css", ".js", ".mjs", ".svg", ".mp4"]);
export async function copyStaticProject(from, to) {
	await mkdir(to, { recursive: true });
	for (const entry of await readdir(from, { withFileTypes: true })) {
		if (
			entry.name.startsWith(".") ||
			["node_modules", "dist", "out", "scripts", "tests", "__tests__"].includes(
				entry.name,
			) ||
			/^(?:references?|captures?|screenshots?|scraped|scrapes)$/i.test(
				entry.name,
			)
		)
			continue;
		const source = join(from, entry.name);
		const target = join(to, entry.name);
		if (entry.isDirectory()) await copyStaticProject(source, target);
		else if (
			entry.isFile() &&
			(staticTypes.has(extname(entry.name)) ||
				entry.name === "THIRD_PARTY_NOTICES.txt") &&
			!/\.(?:test|spec)\./.test(entry.name) &&
			!/^(?:reference|source-capture|captured-source|scraped)(?:[.-].*)?\.(?:html?|css|[cm]?js|json|png|jpe?g|webp|svg)$/i.test(
				entry.name,
			)
		)
			await cp(source, target);
	}
}

export async function collectNotices(directory) {
	const records = [];
	async function noticeText(path) {
		const info = await stat(path);
		if (info.isFile()) return readFile(path, "utf8");
		if (!info.isDirectory()) return "";
		const texts = [];
		for (const entry of await readdir(path, { withFileTypes: true })) {
			if (entry.isSymbolicLink())
				throw new Error(`Symlink in license notices: ${entry.name}`);
			texts.push(await noticeText(join(path, entry.name)));
		}
		return texts.join("\n");
	}
	async function walk(path) {
		const entries = await readdir(path, { withFileTypes: true }).catch(
			(error) => {
				if (error.code === "ENOENT") return [];
				throw error;
			},
		);
		for (const entry of entries) {
			if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
			const packagePath = join(path, entry.name);
			if (entry.name.startsWith("@")) {
				await walk(packagePath);
				continue;
			}
			const pkg = JSON.parse(
				await readFile(join(packagePath, "package.json"), "utf8").catch(
					(error) => {
						if (error.code === "ENOENT") return "{}";
						throw error;
					},
				),
			);
			if (!pkg.name) continue;
			const texts = [];
			for (const name of await readdir(packagePath)) {
				if (/^(licen[cs]es?|copying|notice)(?:[-_.]|$)/i.test(name))
					texts.push(await noticeText(join(packagePath, name)));
			}
			records.push(
				`${pkg.name}@${pkg.version}\nLicense: ${JSON.stringify(pkg.license ?? "See package notice")}\n${texts.join("\n")}`,
			);
			await walk(join(packagePath, "node_modules"));
		}
	}
	await walk(join(directory, "node_modules"));
	return records.join("\n\n");
}

export async function buildPages(
	directory = resolve(import.meta.dirname, ".."),
	requested = [],
) {
	const root = resolve(directory);
	const output = join(root, "_site");
	const projects = JSON.parse(
		await readFile(join(root, "compliance/projects.json"), "utf8"),
	);
	if (
		requested.some(
			(path) =>
				!projects.some(
					(project) => project.path === path && project.status === "cleared",
				),
		)
	)
		throw new Error("Only cleared projects can be built");
	const selected = projects.filter(
		(project) =>
			project.status === "cleared" &&
			(!requested.length || requested.includes(project.path)),
	);
	const run = (command, args, cwd = root) =>
		new Promise((accept, reject) => {
			const child = spawn(command, args, { cwd, stdio: "inherit" });
			child.on("error", reject);
			child.on("exit", (code) =>
				code === 0
					? accept()
					: reject(
							new Error(
								`${command} failed in ${relative(root, cwd)} (${code})`,
							),
						),
			);
		});
	await rm(output, { recursive: true, force: true });
	await run("node", ["scripts/check-compliance.mjs"]);
	await mkdir(output, { recursive: true });

	let cursor = 0;
	async function worker() {
		while (cursor < selected.length) {
			const project = selected[cursor++];
			if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(project.path))
				throw new Error("Invalid project path");
			const source = join(root, project.path);
			const target = join(output, project.path);
			const files = await readdir(source);
			if (files.includes("package.json")) {
				await run("npm", ["ci", "--no-audit", "--no-fund"], source);
				const pkg = JSON.parse(
					await readFile(join(source, "package.json"), "utf8"),
				);
				const next = Boolean(pkg.dependencies?.next);
				await run(
					"npm",
					next ? ["run", "build"] : ["run", "build", "--", "--base=./"],
					source,
				);
				await cp(join(source, next ? "out" : "dist"), target, {
					recursive: true,
				});
				await writeFile(
					join(target, "THIRD_PARTY_NOTICES.txt"),
					[
						await readFile(
							join(source, "THIRD_PARTY_NOTICES.txt"),
							"utf8",
						).catch((error) => {
							if (error.code === "ENOENT") return "";
							throw error;
						}),
						await collectNotices(source),
					]
						.filter(Boolean)
						.join("\n\n"),
				);
			} else await copyStaticProject(source, target);
			process.stdout.write(`Built ${project.path}\n`);
		}
	}
	await Promise.all(Array.from({ length: 4 }, worker));
	const escape = (s) =>
		s.replace(
			/[&<>"']/g,
			(c) =>
				({
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#39;",
				})[c],
		);
	await writeFile(
		join(output, "index.html"),
		`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Independent design experiments</title><style>body{max-width:70rem;margin:3rem auto;padding:1rem;font:1rem/1.6 system-ui;background:#132a36;color:#e7f4ef}a{color:#a7d5bf}ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;padding:0;list-style:none}</style><h1>Independent design experiments</h1><p>A collection of AI-assisted design experiments using original or properly licensed visuals. Commercial template recreations have been withdrawn. Automated checks supplement manual review and do not establish legal compliance.</p><ul>${selected.map((p) => `<li><a href="./${escape(p.path)}/">${escape(p.path)}</a></li>`).join("")}</ul></html>`,
	);
	await writeFile(
		join(output, "404.html"),
		'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preview unavailable</title><h1>Preview unavailable</h1><p>This experiment is unavailable or has been withdrawn from distribution.</p><a href="/">View current experiments</a></html>',
	);
	await writeFile(join(output, ".nojekyll"), "");
	await cp(join(root, "LICENSE"), join(output, "LICENSE"));
	await cp(
		join(root, "THIRD_PARTY_NOTICES.md"),
		join(output, "THIRD_PARTY_NOTICES.txt"),
	);
	await run("node", [
		"scripts/verify-pages.mjs",
		output,
		...selected.map((project) => project.path),
	]);
	process.stdout.write(`Built ${selected.length} cleared previews\n`);
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
	await buildPages(undefined, process.argv.slice(2));
