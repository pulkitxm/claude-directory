import {
	cp,
	mkdir,
	mkdtemp,
	readFile,
	readdir,
	rm,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { spawn } from "node:child_process";

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

async function stageRepository() {
	await rm(output, { recursive: true, force: true });
	await mkdir(output, { recursive: true });
	const archive = await mkdtemp(join(tmpdir(), "fable-pages-"));
	const tar = join(archive, "repository.tar");
	await run("git", ["archive", "--format=tar", `--output=${tar}`, "HEAD"]);
	await run("tar", ["-xf", tar, "-C", output]);
	await rm(archive, { recursive: true, force: true });
	await writeFile(join(output, ".nojekyll"), "");
	const references = [];
	async function collect(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const path = join(directory, entry.name);
			if (entry.name === ".reference") references.push(path);
			else await collect(path);
		}
	}
	await collect(output);
	await Promise.all(
		references.map((path) => rm(path, { recursive: true, force: true })),
	);
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
	if (isNext) await run("npm", ["run", "build"], project);
	else await run("npm", ["exec", "--", "vite", "build", "--base=./"], project);
	const built = join(project, isNext ? "out" : "dist");
	const staged = join(output, name);
	const preserved = await mkdtemp(join(tmpdir(), "fable-metadata-"));
	for (const file of [
		"demo.mp4",
		"poster.jpg",
		"poster.png",
		"README.md",
		"prompt.md",
	]) {
		await cp(join(staged, file), join(preserved, file), { force: false }).catch(
			() => {},
		);
	}
	await rm(staged, { recursive: true, force: true });
	await mkdir(staged, { recursive: true });
	await cp(built, staged, { recursive: true });
	await cp(preserved, staged, { recursive: true });
	await rm(preserved, { recursive: true, force: true });
	await rm(join(project, "node_modules"), { recursive: true, force: true });
	process.stdout.write(`Built ${name}\n`);
}

async function runPool(projects) {
	let index = 0;
	async function worker() {
		while (index < projects.length) {
			const project = projects[index];
			index += 1;
			await buildProject(project);
		}
	}
	await Promise.all(
		Array.from({ length: Math.min(concurrency, projects.length) }, worker),
	);
}

await stageRepository();
const discovered = await findProjects(root);
const projects = requested.length
	? requested.map((project) => resolve(root, project))
	: discovered;
await runPool(projects);
process.stdout.write(
	`Staged ${projects.length} built previews in ${relative(root, output)}\n`,
);
