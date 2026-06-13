import { describe, expect, test } from "bun:test";
import path from "path";
import { cleanupGeneratedArtifacts, GENERATED_ARTIFACTS } from "./cleanup";
import { devCommand, installCommand, previewCommand } from "./commands";
import { thumbnailCommand, THUMBNAIL_CAPTURE_SECONDS } from "./generate-thumbnails";
import { discoverProjects, ensureInsideRoot, parseReadmeMetadata, safeProjectId } from "./projects";
import type { ProjectInfo } from "./types";

async function makeFixture() {
  const root = await Bun.$`mktemp -d`.text();
  return root.trim();
}

async function write(filePath: string, content: string) {
  await Bun.write(filePath, content);
}

async function makeProject(root: string, name: string, files: Record<string, string>) {
  const projectPath = path.join(root, name);
  await Bun.$`mkdir -p ${projectPath}`;
  await write(path.join(projectPath, "demo.mp4"), "demo");
  for (const [relative, content] of Object.entries(files)) {
    const filePath = path.join(projectPath, relative);
    await Bun.$`mkdir -p ${path.dirname(filePath)}`;
    await write(filePath, content);
  }
  return projectPath;
}

function packageJson(scripts: Record<string, string>) {
  return JSON.stringify({ private: true, type: "module", scripts }, null, 2);
}

describe("project discovery", () => {
  test("classifies vite, next, static, alternate static html, unknown, and spaces", async () => {
    const root = await makeFixture();
    await write(
      path.join(root, "README.md"),
      [
        "| Project | Description | Stack |",
        "|---------|-------------|-------|",
        "| [vite-card](./vite-card/) | Vite desc | React, Vite |",
        "| [space name](./space%20name/) | Space desc | React |",
      ].join("\n"),
    );

    await makeProject(root, "vite-card", {
      "package.json": packageJson({ dev: "vite", build: "vite build", preview: "vite preview" }),
      "vite.config.ts": "export default {};",
    });
    await makeProject(root, "next-card", {
      "package.json": packageJson({ dev: "next dev", build: "next build", start: "next start" }),
      "next.config.ts": "export default {};",
    });
    await makeProject(root, "static-card", { "index.html": "<h1>Static</h1>" });
    await makeProject(root, "alternate-static", { "sidi-bou-said.html": "<h1>Walk</h1>" });
    await makeProject(root, "unknown-card", { "package.json": packageJson({ test: "bun test" }) });
    await makeProject(root, "space name", {
      "package.json": packageJson({ dev: "vite" }),
      "vite.config.ts": "export default {};",
    });

    const projects = await discoverProjects(root);
    const byName = new Map(projects.map((project) => [project.name, project]));

    expect(byName.get("vite-card")?.type).toBe("vite");
    expect(byName.get("vite-card")?.description).toBe("Vite desc");
    expect(byName.get("next-card")?.type).toBe("next");
    expect(byName.get("static-card")?.type).toBe("static");
    expect(byName.get("alternate-static")?.type).toBe("static");
    expect(byName.get("alternate-static")?.entryHtml).toBe("sidi-bou-said.html");
    expect(byName.get("unknown-card")?.type).toBe("unknown");
    expect(byName.get("unknown-card")?.runnable).toBe(false);
    expect(byName.get("space name")?.id).toBe("space-name");
  });

  test("safe ids and README table parsing are stable", () => {
    expect(safeProjectId("prisma landing")).toBe("prisma-landing");
    expect(safeProjectId("VANGUARD hero landing")).toBe("vanguard-hero-landing");
    const metadata = parseReadmeMetadata(
      "| [demo one](./demo%20one/) | Description | React, Bun |\n",
    );
    expect(metadata.get("demo one")).toEqual({
      description: "Description",
      stack: "React, Bun",
    });
  });

  test("path guard keeps targets inside the repo root", () => {
    expect(ensureInsideRoot("/repo/root", "/repo/root/project")).toBe(true);
    expect(ensureInsideRoot("/repo/root", "/repo/root")).toBe(true);
    expect(ensureInsideRoot("/repo/root", "/repo/other")).toBe(false);
  });
});

describe("command construction", () => {
  const viteProject = {
    path: "/tmp/with spaces/vite app",
    type: "vite",
  } as ProjectInfo;
  const nextProject = {
    path: "/tmp/next app",
    type: "next",
  } as ProjectInfo;

  test("uses bun for installs", () => {
    expect(installCommand(viteProject).command).toEqual(["bun", "install"]);
  });

  test("constructs vite dev and preview commands without shell strings", () => {
    expect(devCommand(viteProject, 5401).command).toEqual([
      "bun",
      "run",
      "dev",
      "--",
      "--host",
      "127.0.0.1",
      "--port",
      "5401",
      "--strictPort",
    ]);
    expect(previewCommand(viteProject, 5402).command).toEqual([
      "bun",
      "run",
      "preview",
      "--",
      "--host",
      "127.0.0.1",
      "--port",
      "5402",
      "--strictPort",
    ]);
  });

  test("constructs next dev and preview commands", () => {
    expect(devCommand(nextProject, 5403).command).toEqual([
      "bun",
      "run",
      "dev",
      "--",
      "-H",
      "127.0.0.1",
      "-p",
      "5403",
    ]);
    expect(previewCommand(nextProject, 5404).command).toEqual([
      "bun",
      "run",
      "start",
      "--",
      "-H",
      "127.0.0.1",
      "-p",
      "5404",
    ]);
  });

  test("never generates npm or node commands", () => {
    const specs = [
      installCommand(viteProject),
      devCommand(viteProject, 5401),
      previewCommand(viteProject, 5402),
      devCommand(nextProject, 5403),
      previewCommand(nextProject, 5404),
    ];
    const commandText = specs.flatMap((spec) => spec.command).join(" ");
    expect(commandText).not.toContain("npm");
    expect(commandText).not.toContain("node");
  });
});

describe("generated artifact cleanup", () => {
  test("removes install/build artifacts while preserving source and checked-in metadata", async () => {
    const root = await makeFixture();
    const projectPath = await makeProject(root, "cleanup app", {
      "package.json": packageJson({ dev: "vite" }),
      "package-lock.json": "keep package lock",
      "src/App.tsx": "keep source",
      "thumbnail.webp": "keep thumbnail",
      "node_modules/pkg/index.js": "generated dependency",
      "dist/index.html": "generated vite output",
      "build/index.html": "generated build output",
      ".next/server/app.js": "generated next output",
      ".vite/deps/pkg.js": "generated vite cache",
      ".turbo/cache/item": "generated turbo cache",
      "coverage/index.html": "generated coverage",
      "bun.lock": "generated bun lock",
      "bun.lockb": "generated bun binary lock",
    });

    const result = await cleanupGeneratedArtifacts({ path: projectPath } as ProjectInfo);

    expect(result.failed).toEqual([]);
    expect(result.removed).toEqual(
      expect.arrayContaining([
        "node_modules",
        "dist",
        "build",
        ".next",
        ".vite",
        ".turbo",
        "coverage",
        "bun.lock",
        "bun.lockb",
      ]),
    );
    for (const artifact of GENERATED_ARTIFACTS) {
      expect(await Bun.file(path.join(projectPath, artifact)).exists()).toBe(false);
    }
    expect(await Bun.file(path.join(projectPath, "package.json")).exists()).toBe(true);
    expect(await Bun.file(path.join(projectPath, "package-lock.json")).exists()).toBe(true);
    expect(await Bun.file(path.join(projectPath, "src/App.tsx")).exists()).toBe(true);
    expect(await Bun.file(path.join(projectPath, "demo.mp4")).exists()).toBe(true);
    expect(await Bun.file(path.join(projectPath, "thumbnail.webp")).exists()).toBe(true);
  });

  test("does not include package-lock in the generated artifact allowlist", () => {
    expect([...GENERATED_ARTIFACTS]).not.toContain("package-lock.json");
  });
});

describe("thumbnail generation", () => {
  test("captures the one-second frame with explicit ffmpeg arguments", () => {
    expect(THUMBNAIL_CAPTURE_SECONDS).toBe(1);
    expect(thumbnailCommand("/tmp/demo.mp4", "/tmp/thumbnail.webp")).toEqual([
      "ffmpeg",
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      "/tmp/demo.mp4",
      "-ss",
      "1.000",
      "-frames:v",
      "1",
      "-vf",
      "scale=640:-2",
      "-c:v",
      "libwebp",
      "-quality",
      "78",
      "/tmp/thumbnail.webp",
    ]);
  });
});
