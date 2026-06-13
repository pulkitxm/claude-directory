import { rm } from "fs/promises";
import path from "path";
import { ensureInsideRoot, pathExists } from "./projects";
import type { ProjectInfo } from "./types";

export const GENERATED_ARTIFACTS = [
  "node_modules",
  "dist",
  "build",
  ".next",
  ".vite",
  ".turbo",
  "coverage",
  "bun.lock",
  "bun.lockb",
] as const;

export type CleanupResult = {
  removed: string[];
  failed: Array<{ artifact: string; error: string }>;
};

export async function cleanupGeneratedArtifacts(project: ProjectInfo): Promise<CleanupResult> {
  const removed: string[] = [];
  const failed: Array<{ artifact: string; error: string }> = [];

  for (const artifact of GENERATED_ARTIFACTS) {
    const target = path.resolve(project.path, artifact);
    if (!ensureInsideRoot(project.path, target) || !(await pathExists(target))) continue;

    try {
      await rm(target, { recursive: true, force: true });
      removed.push(artifact);
    } catch (error) {
      failed.push({
        artifact,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { removed, failed };
}
