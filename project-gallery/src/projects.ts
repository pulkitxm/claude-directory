import { lstat, readdir, realpath } from "fs/promises";
import path from "path";
import type { ProjectInfo, ProjectMetadata, ProjectType } from "./types";

const IGNORED_DIRS = new Set([
  ".git",
  ".github",
  ".claude",
  ".codex",
  ".agents",
  "scripts",
  "project-gallery",
  "node_modules",
]);

export function repoRootFromGallery(galleryDir = import.meta.dir): string {
  return path.resolve(galleryDir, "..", "..");
}

export function safeProjectId(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return slug || "project";
}

export function ensureInsideRoot(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export async function fileExists(filePath: string): Promise<boolean> {
  return Bun.file(filePath).exists();
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await lstat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return (await Bun.file(filePath).json()) as T;
  } catch {
    return fallback;
  }
}

export function parseReadmeMetadata(markdown: string): Map<string, ProjectMetadata> {
  const metadata = new Map<string, ProjectMetadata>();

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("| [")) continue;

    const cells = line
      .slice(1, line.endsWith("|") ? -1 : undefined)
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length < 3) continue;
    const nameMatch = cells[0].match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!nameMatch) continue;

    const displayName = nameMatch[1];
    metadata.set(displayName, {
      description: cells[1] || "",
      stack: cells[2] || "",
    });
  }

  return metadata;
}

async function loadReadmeMetadata(root: string): Promise<Map<string, ProjectMetadata>> {
  const readmePath = path.join(root, "README.md");
  if (!(await fileExists(readmePath))) return new Map();
  const markdown = await Bun.file(readmePath).text();
  return parseReadmeMetadata(markdown);
}

async function findEntryHtml(projectPath: string): Promise<string | undefined> {
  const entries = await readdir(projectPath, { withFileTypes: true });
  const htmlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  if (htmlFiles.includes("index.html")) return "index.html";
  return htmlFiles[0];
}

async function hasAnyFile(projectPath: string, names: string[]): Promise<boolean> {
  for (const name of names) {
    if (await fileExists(path.join(projectPath, name))) return true;
  }
  return false;
}

function scriptsFromPackage(pkg: unknown): Record<string, string> {
  if (!pkg || typeof pkg !== "object") return {};
  const scripts = (pkg as { scripts?: unknown }).scripts;
  if (!scripts || typeof scripts !== "object") return {};

  return Object.fromEntries(
    Object.entries(scripts as Record<string, unknown>).filter(
      ([, value]) => typeof value === "string",
    ),
  ) as Record<string, string>;
}

async function classifyProject(projectPath: string, scripts: Record<string, string>): Promise<ProjectType> {
  const hasPackage = await fileExists(path.join(projectPath, "package.json"));
  const hasNextConfig = await hasAnyFile(projectPath, [
    "next.config.js",
    "next.config.mjs",
    "next.config.ts",
  ]);
  const hasViteConfig = await hasAnyFile(projectPath, [
    "vite.config.js",
    "vite.config.mjs",
    "vite.config.ts",
  ]);

  if (hasPackage && (hasNextConfig || scripts.dev?.includes("next"))) return "next";
  if (hasPackage && (hasViteConfig || scripts.dev?.includes("vite"))) return "vite";
  if (!hasPackage && (await findEntryHtml(projectPath))) return "static";
  return "unknown";
}

function projectActions(type: ProjectType, scripts: Record<string, string>) {
  if (type === "static") return ["run"] as const;
  if (type === "vite") {
    return scripts.build && scripts.preview ? (["run", "preview"] as const) : (["run"] as const);
  }
  if (type === "next") {
    return scripts.build && scripts.start ? (["run", "preview"] as const) : (["run"] as const);
  }
  return [] as const;
}

export async function discoverProjects(root: string): Promise<ProjectInfo[]> {
  const realRoot = await realpath(root);
  const metadata = await loadReadmeMetadata(realRoot);
  const entries = await readdir(realRoot, { withFileTypes: true });
  const usedIds = new Map<string, number>();
  const projects: ProjectInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".") || IGNORED_DIRS.has(entry.name)) continue;

    const projectPath = path.join(realRoot, entry.name);
    const resolvedProjectPath = await realpath(projectPath);
    if (!ensureInsideRoot(realRoot, resolvedProjectPath)) continue;

    const demoPath = path.join(resolvedProjectPath, "demo.mp4");
    if (!(await fileExists(demoPath))) continue;
    const thumbnailPath = path.join(resolvedProjectPath, "thumbnail.webp");

    const packagePath = path.join(resolvedProjectPath, "package.json");
    const packageJson = (await fileExists(packagePath))
      ? await readJson<Record<string, unknown>>(packagePath, {})
      : {};
    const scripts = scriptsFromPackage(packageJson);
    const type = await classifyProject(resolvedProjectPath, scripts);
    const entryHtml = type === "static" ? await findEntryHtml(resolvedProjectPath) : undefined;
    const meta = metadata.get(entry.name) ?? { description: "", stack: "" };
    const baseId = safeProjectId(entry.name);
    const seen = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, seen + 1);
    const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;
    const actions = [...projectActions(type, scripts)];

    projects.push({
      id,
      name: entry.name,
      path: resolvedProjectPath,
      description: meta.description,
      stack: meta.stack,
      type,
      runnable: actions.length > 0,
      actions,
      demoPath,
      thumbnailPath: (await fileExists(thumbnailPath)) ? thumbnailPath : undefined,
      entryHtml,
      scripts,
    });
  }

  return projects.sort((a, b) => a.name.localeCompare(b.name));
}
