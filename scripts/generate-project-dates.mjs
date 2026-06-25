#!/usr/bin/env node
// Generates project-dates.json at the repo root.
//
// For every project folder (each experiment lives in <category>/<project>/) it
// records the "last updated" date: the date of the most recent git commit that
// changed the project's *content*.
//
// We use git history rather than filesystem mtimes on purpose — checking out or
// switching branches rewrites file mtimes, so on a fresh clone every project
// would look like it was modified at the same instant. Git commit dates are
// stable and reflect when the project was actually last changed.
//
// Projects are grouped into category subdirectories (hero-sections,
// landing-pages, …). The bare project slug (the leaf folder name, e.g.
// "asme-hero-landing") stays the key — it is unique across categories and is
// what the website keys off — so reorganizing into categories does not change
// the JSON keys, only the on-disk path.
//
// Surviving the category move: when a project is moved from ./<slug>/ to
// ./<category>/<slug>/ that shows up in history as a pure rename. A naive
// `git log -- <category>/<slug>` would report the *move* commit as the last
// change and collapse every project's date to the reorg date. To avoid that we
// pass BOTH the current path (<category>/<slug>) and the historical root path
// (<slug>) as pathspecs, with -M (detect renames) and --diff-filter=AMD
// (Added/Modified/Deleted only). The reorg is a pure rename (R), so it is
// excluded, and we get the real last *content* change date across the move —
// with no frozen baseline and no hard-coded commit SHAs.

import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(repoRoot, "project-dates.json");

// Top-level folders that are tooling, not category buckets, and must be skipped.
const IGNORED = new Set(["scripts", "extras", "node_modules"]);

function isVisibleDir(name) {
	if (name.startsWith(".")) return false; // .git, .github, .claude, etc.
	return !IGNORED.has(name);
}

function git(args) {
	return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

// Last commit that changed the project's content, following the category move.
// `currentPath` is <category>/<slug>; `rootPath` is the historical <slug>.
function lastContentDate(currentPath, rootPath) {
	// %cI => committer date, strict ISO 8601. -M finds renames so the reorg is
	// classified as R and dropped by --diff-filter=AMD; the two pathspecs cover
	// history both before (rootPath) and after (currentPath) the move.
	const out = git([
		"log",
		"-1",
		"-M",
		"--diff-filter=AMD",
		"--format=%cI",
		"--",
		currentPath,
		rootPath,
	]);
	if (out) return out;
	// Safety net: a project whose only history is a rename/copy (no A/M/D yet).
	return (
		git(["log", "-1", "--format=%cI", "--", currentPath, rootPath]) || null
	);
}

const projects = [];
for (const category of readdirSync(repoRoot, { withFileTypes: true })) {
	if (!category.isDirectory() || !isVisibleDir(category.name)) continue;
	for (const entry of readdirSync(join(repoRoot, category.name), {
		withFileTypes: true,
	})) {
		if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
		const slug = entry.name;
		projects.push({
			project: slug,
			lastUpdated: lastContentDate(`${category.name}/${slug}`, slug),
		});
	}
}

projects.sort((a, b) =>
	(b.lastUpdated ?? "").localeCompare(a.lastUpdated ?? ""),
);

writeFileSync(outFile, `${JSON.stringify(projects, null, 2)}\n`);

// Match the formatting the repo's `make format` would apply, so the generated
// file doesn't show up as a diff after a separate format pass.
execFileSync("npx", ["@biomejs/biome@2", "format", "--write", outFile], {
	cwd: repoRoot,
	stdio: "inherit",
});

console.log(`Wrote ${projects.length} projects to ${outFile}\n`);
console.log("Last 5 edited projects:");
for (const p of projects.slice(0, 5)) {
	console.log(`  ${p.lastUpdated}  ${p.project}`);
}
