import path from "path";
import { discoverProjects, fileExists, repoRootFromGallery } from "./projects";

export const THUMBNAIL_CAPTURE_SECONDS = 1;
const THUMB_WIDTH = 640;

function hasArg(name: string) {
  return Bun.argv.includes(name);
}

async function runProcess(command: string[], cwd: string) {
  const proc = Bun.spawn(command, {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });
  const stderr = await new Response(proc.stderr).text();
  await proc.exited;
  if (proc.exitCode !== 0) {
    throw new Error(`${command.join(" ")} failed: ${stderr.trim()}`);
  }
}

export function thumbnailCommand(demoPath: string, thumbnailPath: string) {
  return [
    "ffmpeg",
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    demoPath,
    "-ss",
    THUMBNAIL_CAPTURE_SECONDS.toFixed(3),
    "-frames:v",
    "1",
    "-vf",
    `scale=${THUMB_WIDTH}:-2`,
    "-c:v",
    "libwebp",
    "-quality",
    "78",
    thumbnailPath,
  ];
}

async function writeThumbnail(demoPath: string, thumbnailPath: string) {
  await runProcess(thumbnailCommand(demoPath, thumbnailPath), import.meta.dir);
}

async function main() {
  const root = repoRootFromGallery();
  const force = hasArg("--force");
  const projects = await discoverProjects(root);
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const project of projects) {
    const thumbnailPath = path.join(project.path, "thumbnail.webp");
    if (!force && (await fileExists(thumbnailPath))) {
      skipped += 1;
      console.log(`skip ${project.name}`);
      continue;
    }

    try {
      await writeThumbnail(project.demoPath, thumbnailPath);
      generated += 1;
      console.log(`ok   ${project.name} @ ${THUMBNAIL_CAPTURE_SECONDS.toFixed(2)}s`);
    } catch (error) {
      failed += 1;
      console.error(`fail ${project.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`Generated ${generated}, skipped ${skipped}, failed ${failed}`);
  if (failed > 0) process.exit(1);
}

if (import.meta.main) {
  await main();
}
