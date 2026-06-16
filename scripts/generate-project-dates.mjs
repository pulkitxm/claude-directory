#!/usr/bin/env node
// Generates project-dates.json at the repo root.
//
// For every project folder (each top-level directory that holds a self-contained
// experiment) it records the "last updated" date: the date of the most recent git
// commit that touched any file inside that folder.
//
// We use git history rather than filesystem mtimes on purpose — checking out or
// switching branches rewrites file mtimes, so on a fresh clone every project would
// look like it was modified at the same instant. Git commit dates are stable and
// reflect when the project was actually last changed.

import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(repoRoot, "project-dates.json");

// Folders that are not projects and must be skipped.
const IGNORED = new Set(["scripts", "extras", "node_modules"]);

function isProjectDir(name) {
  if (name.startsWith(".")) return false; // .git, .github, .claude, etc.
  if (IGNORED.has(name)) return false;
  return true;
}

function lastCommitDate(dir) {
  // %cI => committer date, strict ISO 8601. Empty if the folder has no commits.
  const out = execFileSync(
    "git",
    ["log", "-1", "--format=%cI", "--", dir],
    { cwd: repoRoot, encoding: "utf8" }
  ).trim();
  return out || null;
}

const projects = readdirSync(repoRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && isProjectDir(e.name))
  .map((e) => ({ project: e.name, lastUpdated: lastCommitDate(e.name) }))
  .sort((a, b) => (b.lastUpdated ?? "").localeCompare(a.lastUpdated ?? ""));

writeFileSync(outFile, JSON.stringify(projects, null, 2) + "\n");

console.log(`Wrote ${projects.length} projects to ${outFile}\n`);
console.log("Last 5 edited projects:");
for (const p of projects.slice(0, 5)) {
  console.log(`  ${p.lastUpdated}  ${p.project}`);
}
