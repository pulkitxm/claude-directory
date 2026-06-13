import type { CommandSpec, ProjectInfo, RunMode } from "./types";

export const DASHBOARD_HOST = "127.0.0.1";
export const DASHBOARD_PORT = 4321;
export const PROJECT_PORT_START = 5401;

export function installCommand(project: ProjectInfo): CommandSpec {
  return {
    command: ["bun", "install"],
    cwd: project.path,
  };
}

export function devCommand(project: ProjectInfo, port: number): CommandSpec {
  if (project.type === "vite") {
    return {
      command: [
        "bun",
        "run",
        "dev",
        "--",
        "--host",
        DASHBOARD_HOST,
        "--port",
        String(port),
        "--strictPort",
      ],
      cwd: project.path,
    };
  }

  if (project.type === "next") {
    return {
      command: ["bun", "run", "dev", "--", "-H", DASHBOARD_HOST, "-p", String(port)],
      cwd: project.path,
    };
  }

  throw new Error(`Unsupported dev command for ${project.type}`);
}

export function buildCommand(project: ProjectInfo): CommandSpec {
  if (project.type === "vite" || project.type === "next") {
    return {
      command: ["bun", "run", "build"],
      cwd: project.path,
    };
  }

  throw new Error(`Unsupported build command for ${project.type}`);
}

export function previewCommand(project: ProjectInfo, port: number): CommandSpec {
  if (project.type === "vite") {
    return {
      command: [
        "bun",
        "run",
        "preview",
        "--",
        "--host",
        DASHBOARD_HOST,
        "--port",
        String(port),
        "--strictPort",
      ],
      cwd: project.path,
    };
  }

  if (project.type === "next") {
    return {
      command: ["bun", "run", "start", "--", "-H", DASHBOARD_HOST, "-p", String(port)],
      cwd: project.path,
    };
  }

  throw new Error(`Unsupported preview command for ${project.type}`);
}

export function commandForMode(project: ProjectInfo, mode: RunMode, port: number): CommandSpec {
  return mode === "preview" ? previewCommand(project, port) : devCommand(project, port);
}

export function commandText(spec: CommandSpec): string {
  return spec.command
    .map((part) => (/\s/.test(part) ? JSON.stringify(part) : part))
    .join(" ");
}

