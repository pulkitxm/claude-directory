import { readdir } from "fs/promises";
import path from "path";
import {
  commandForMode,
  commandText,
  DASHBOARD_HOST,
  DASHBOARD_PORT,
  PROJECT_PORT_START,
  buildCommand,
  installCommand,
} from "./commands";
import { cleanupGeneratedArtifacts } from "./cleanup";
import { discoverProjects, ensureInsideRoot, fileExists, pathExists, repoRootFromGallery } from "./projects";
import type { CommandSpec, ProjectInfo, ProjectStatus, PublicProject, RunMode } from "./types";

type RuntimeState = {
  status: ProjectStatus;
  port?: number;
  url?: string;
  process?: ReturnType<typeof Bun.spawn>;
  logs: string[];
  mode?: RunMode;
  touched?: boolean;
};

type EventClient = {
  send: (payload: unknown) => void;
  close: () => void;
};

const root = repoRootFromGallery();
const projects = await discoverProjects(root);
const projectById = new Map(projects.map((project) => [project.id, project]));
const states = new Map<string, RuntimeState>();
const clients = new Set<EventClient>();
const staticMounts = new Map<string, { projectId: string; projectPath: string; entryHtml: string }>();
const THUMBNAIL_VERSION = "1s";

for (const project of projects) {
  states.set(project.id, { status: "idle", logs: [] });
}

function stateFor(projectId: string): RuntimeState {
  let state = states.get(projectId);
  if (!state) {
    state = { status: "idle", logs: [] };
    states.set(projectId, state);
  }
  return state;
}

function publicProject(project: ProjectInfo): PublicProject {
  const state = stateFor(project.id);
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    stack: project.stack,
    type: project.type,
    runnable: project.runnable,
    actions: project.actions,
    status: state.status,
    port: state.port,
    url: state.url,
    thumbnailUrl: project.thumbnailPath
      ? `/media/${project.id}/thumbnail.webp?v=${THUMBNAIL_VERSION}`
      : undefined,
    logs: state.logs.slice(-120),
  };
}

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

function text(data: string, init: ResponseInit = {}) {
  return new Response(data, {
    ...init,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...init.headers,
    },
  });
}

function html(data: string, init: ResponseInit = {}) {
  return new Response(data, {
    ...init,
    headers: {
      "content-type": "text/html; charset=utf-8",
      ...init.headers,
    },
  });
}

function notFound(message = "Not found") {
  return json({ error: message }, { status: 404 });
}

function appendLog(projectId: string, line: string) {
  const state = stateFor(projectId);
  const normalized = line.replace(/\r/g, "").trimEnd();
  if (!normalized) return;
  for (const chunk of normalized.split("\n")) {
    state.logs.push(chunk);
  }
  if (state.logs.length > 500) state.logs.splice(0, state.logs.length - 500);
  broadcast({ type: "project:log", projectId, logs: state.logs.slice(-120) });
}

function setStatus(projectId: string, status: ProjectStatus, extra: Partial<RuntimeState> = {}) {
  const state = stateFor(projectId);
  Object.assign(state, extra, { status });
  broadcast({
    type: "project:status",
    projectId,
    project: publicProject(projectById.get(projectId)!),
  });
}

function broadcast(payload: unknown) {
  for (const client of clients) client.send(payload);
}

async function streamProcessOutput(projectId: string, stream: ReadableStream<Uint8Array> | null) {
  if (!stream) return;
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      appendLog(projectId, decoder.decode(value, { stream: true }));
    }
  } catch (error) {
    appendLog(projectId, `log stream ended: ${String(error)}`);
  }
}

async function waitForUrl(url: string, projectId: string, process?: ReturnType<typeof Bun.spawn>) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (process && process.killed) throw new Error("process stopped before responding");
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok || response.status < 500) return;
    } catch {}
    await Bun.sleep(500);
  }
  appendLog(projectId, `Timed out waiting for ${url}`);
  throw new Error(`Server never responded at ${url}`);
}

async function runForegroundCommand(projectId: string, spec: CommandSpec) {
  appendLog(projectId, `$ ${commandText(spec)}`);
  const proc = Bun.spawn(spec.command, {
    cwd: spec.cwd,
    stdout: "pipe",
    stderr: "pipe",
  });
  await Promise.all([
    streamProcessOutput(projectId, proc.stdout),
    streamProcessOutput(projectId, proc.stderr),
    proc.exited,
  ]);
  if (proc.exitCode !== 0) {
    throw new Error(`${commandText(spec)} failed with exit code ${proc.exitCode ?? "unknown"}`);
  }
}

async function isPortAvailable(port: number): Promise<boolean> {
  try {
    const server = Bun.serve({
      hostname: DASHBOARD_HOST,
      port,
      fetch: () => new Response("ok"),
    });
    server.stop(true);
    return true;
  } catch {
    return false;
  }
}

async function nextProjectPort(): Promise<number> {
  const used = new Set(
    [...states.values()].map((state) => state.port).filter((port): port is number => Boolean(port)),
  );

  for (let port = PROJECT_PORT_START; port < PROJECT_PORT_START + 250; port += 1) {
    if (used.has(port)) continue;
    if (await isPortAvailable(port)) return port;
  }

  throw new Error("No free project preview ports found");
}

async function waitForProcessExit(proc: ReturnType<typeof Bun.spawn>) {
  await Promise.race([proc.exited.catch(() => undefined), Bun.sleep(3_000)]);
}

function clearRuntime(projectId: string) {
  const state = stateFor(projectId);
  staticMounts.delete(projectId);
  state.process = undefined;
  state.port = undefined;
  state.url = undefined;
  state.mode = undefined;
}

async function stopProject(project: ProjectInfo, cleanup = true) {
  const state = stateFor(project.id);
  const hadActivity =
    state.status !== "idle" ||
    Boolean(state.process) ||
    Boolean(state.url) ||
    staticMounts.has(project.id);
  const proc = state.process;

  if (hadActivity) appendLog(project.id, "Stopping...");
  if (proc && !proc.killed) {
    proc.kill();
    await waitForProcessExit(proc);
  }

  clearRuntime(project.id);

  if (cleanup) {
    setStatus(project.id, "cleaning");
    const result = await cleanupGeneratedArtifacts(project);
    if (result.removed.length > 0) {
      appendLog(project.id, `Removed generated artifacts: ${result.removed.join(", ")}`);
    } else {
      appendLog(project.id, "No generated artifacts to remove.");
    }
    if (result.failed.length > 0) {
      for (const failure of result.failed) {
        appendLog(project.id, `Failed to remove ${failure.artifact}: ${failure.error}`);
      }
      setStatus(project.id, "failed");
      throw new Error("Stopped, but cleanup failed for one or more generated artifacts");
    }
  }

  setStatus(project.id, "stopped");
  appendLog(project.id, cleanup ? "Stopped and cleaned." : "Stopped.");
}

async function startStaticProject(project: ProjectInfo) {
  if (!project.entryHtml) throw new Error("Static project has no HTML entry");
  const state = stateFor(project.id);
  const mountUrl = `/static-project/${project.id}/${project.entryHtml}`;
  staticMounts.set(project.id, {
    projectId: project.id,
    projectPath: project.path,
    entryHtml: project.entryHtml,
  });
  state.url = mountUrl;
  state.port = DASHBOARD_PORT;
  state.mode = "dev";
  state.touched = true;
  setStatus(project.id, "running", { url: mountUrl, port: DASHBOARD_PORT, mode: "dev" });
  appendLog(project.id, `Serving static entry ${project.entryHtml}`);
  return mountUrl;
}

async function startProject(project: ProjectInfo, mode: RunMode) {
  const state = stateFor(project.id);
  if (state.status === "running" && state.url) {
    appendLog(project.id, `Already running at ${state.url}`);
    return state.url;
  }
  if (state.status === "installing" || state.status === "building" || state.status === "starting") {
    return `/launch/${project.id}?mode=${mode}`;
  }
  if (!project.runnable) throw new Error("Project is video-only and has no supported runner");
  if (mode === "preview" && !project.actions.includes("preview")) {
    throw new Error("This project does not expose build preview scripts");
  }

  state.logs = [];
  state.mode = mode;
  state.port = undefined;
  state.url = undefined;
  state.process = undefined;
  state.touched = true;
  staticMounts.delete(project.id);
  setStatus(project.id, "starting");

  try {
    if (project.type === "static") {
      return await startStaticProject(project);
    }

    if (!(await pathExists(path.join(project.path, "node_modules")))) {
      setStatus(project.id, "installing");
      await runForegroundCommand(project.id, installCommand(project));
    }

    if (mode === "preview") {
      setStatus(project.id, "building");
      await runForegroundCommand(project.id, buildCommand(project));
    }

    const port = await nextProjectPort();
    const url = `http://${DASHBOARD_HOST}:${port}/`;
    const spec = commandForMode(project, mode, port);
    appendLog(project.id, `$ ${commandText(spec)}`);
    setStatus(project.id, "starting", { port, url });
    const proc = Bun.spawn(spec.command, {
      cwd: spec.cwd,
      stdout: "pipe",
      stderr: "pipe",
    });
    state.process = proc;
    streamProcessOutput(project.id, proc.stdout);
    streamProcessOutput(project.id, proc.stderr);
    proc.exited.then((code) => {
      const latest = stateFor(project.id);
      if (latest.process === proc && latest.status === "running") {
        latest.process = undefined;
        setStatus(project.id, "failed");
        appendLog(project.id, `Process exited with code ${code}`);
      }
    });

    await waitForUrl(url, project.id, proc);
    setStatus(project.id, "running", { port, url, process: proc, mode });
    appendLog(project.id, `Ready at ${url}`);
    return url;
  } catch (error) {
    const state = stateFor(project.id);
    if (state.process && !state.process.killed) state.process.kill();
    state.process = undefined;
    setStatus(project.id, "failed");
    appendLog(project.id, String(error instanceof Error ? error.message : error));
    throw error;
  }
}

function indexPage() {
  const filePath = path.join(import.meta.dir, "..", "public", "index.html");
  return new Response(Bun.file(filePath), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function launchPage(project: ProjectInfo, mode: RunMode) {
  const modeLabel = mode === "preview" ? "Build preview" : "Run live";
  return html(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(modeLabel)} · ${escapeHtml(project.name)}</title>
  <link rel="stylesheet" href="/styles.css?v=thumb-fix-1">
</head>
<body class="launch-page">
  <main class="launch-shell">
    <section class="launch-panel">
      <div class="launch-topline">${escapeHtml(modeLabel)}</div>
      <h1>${escapeHtml(project.name)}</h1>
      <div class="launch-status" id="launch-status">Starting...</div>
      <div class="launch-actions">
        <a class="button secondary" href="/">Back to gallery</a>
        <button class="button danger" id="stop-button" type="button">Stop</button>
      </div>
      <pre class="logs" id="logs"></pre>
    </section>
  </main>
  <script>
    window.LAUNCH_PROJECT = ${JSON.stringify({ id: project.id, mode })};
  </script>
  <script src="/app.js?v=thumb-fix-1"></script>
</body>
</html>`);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".woff2") return "font/woff2";
  return "application/octet-stream";
}

async function servePublic(pathname: string) {
  const publicRoot = path.join(import.meta.dir, "..", "public");
  const requested = path.join(publicRoot, pathname.replace(/^\/+/, ""));
  const resolved = path.resolve(requested);
  if (!ensureInsideRoot(publicRoot, resolved) || !(await fileExists(resolved))) return null;
  return new Response(Bun.file(resolved), {
    headers: { "content-type": contentTypeFor(resolved) },
  });
}

async function serveStaticProject(url: URL) {
  const match = url.pathname.match(/^\/static-project\/([^/]+)\/?(.*)$/);
  if (!match) return null;
  const [, projectId, rest] = match;
  const mount = staticMounts.get(projectId);
  if (!mount) return notFound("Static project is not running");
  const requestedPath = decodeURIComponent(rest || mount.entryHtml);
  const filePath = path.resolve(mount.projectPath, requestedPath);
  if (!ensureInsideRoot(mount.projectPath, filePath) || !(await fileExists(filePath))) {
    return notFound("Static project asset not found");
  }
  return new Response(Bun.file(filePath), {
    headers: { "content-type": contentTypeFor(filePath) },
  });
}

async function handleApi(request: Request, url: URL) {
  if (url.pathname === "/api/projects" && request.method === "GET") {
    return json({ projects: projects.map(publicProject) });
  }

  if (url.pathname === "/api/stop-all" && request.method === "POST") {
    const failures: string[] = [];
    for (const project of projects) {
      const state = stateFor(project.id);
      if (
        state.touched ||
        state.status !== "idle" ||
        state.process ||
        state.url ||
        staticMounts.has(project.id)
      ) {
        try {
          await stopProject(project);
        } catch (error) {
          failures.push(
            `${project.name}: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }
    }
    if (failures.length > 0) {
      return json({ ok: false, error: failures.join("; ") }, { status: 500 });
    }
    return json({ ok: true });
  }

  const actionMatch = url.pathname.match(/^\/api\/projects\/([^/]+)\/(run|preview|stop)$/);
  if (!actionMatch) return null;

  const [, projectId, action] = actionMatch;
  const project = projectById.get(projectId);
  if (!project) return notFound("Unknown project");

  try {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, { status: 405 });
    }
    if (action === "stop") {
      await stopProject(project);
      return json({ ok: true, project: publicProject(project) });
    }
    const mode = action === "preview" ? "preview" : "dev";
    const url = await startProject(project, mode);
    return json({ ok: true, url, project: publicProject(project) });
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        project: publicProject(project),
      },
      { status: 500 },
    );
  }
}

function eventStream() {
  let client: EventClient | undefined;
  let keepAlive: ReturnType<typeof setInterval> | undefined;
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      client = {
        send(payload) {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
          } catch {
            if (client) clients.delete(client);
          }
        },
        close() {
          clients.delete(client);
          if (keepAlive) {
            clearInterval(keepAlive);
            keepAlive = undefined;
          }
          try {
            controller.close();
          } catch {}
        },
      };
      clients.add(client);
      client.send({ type: "ready", projects: projects.map(publicProject) });
      keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch {
          if (client) clients.delete(client);
          if (keepAlive) clearInterval(keepAlive);
        }
      }, 5_000);
    },
    cancel() {
      if (keepAlive) {
        clearInterval(keepAlive);
        keepAlive = undefined;
      }
      if (client) {
        clients.delete(client);
        client = undefined;
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  });
}

function stopAll() {
  for (const project of projects) {
    const state = stateFor(project.id);
    if (state.process && !state.process.killed) state.process.kill();
  }
}

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    stopAll();
    process.exit(0);
  });
}

const server = Bun.serve({
  hostname: DASHBOARD_HOST,
  port: DASHBOARD_PORT,
  idleTimeout: 255,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") return indexPage();
    if (url.pathname === "/api/events") return eventStream();

    const apiResponse = await handleApi(request, url);
    if (apiResponse) return apiResponse;

    const staticProjectResponse = await serveStaticProject(url);
    if (staticProjectResponse) return staticProjectResponse;

    const launchMatch = url.pathname.match(/^\/launch\/([^/]+)$/);
    if (launchMatch) {
      const project = projectById.get(launchMatch[1]);
      if (!project) return html("Unknown project", { status: 404 });
      const mode = url.searchParams.get("mode") === "preview" ? "preview" : "dev";
      return launchPage(project, mode);
    }

    const mediaMatch = url.pathname.match(/^\/media\/([^/]+)\/(demo\.mp4|thumbnail\.webp)$/);
    if (mediaMatch) {
      const project = projectById.get(mediaMatch[1]);
      if (!project) return notFound("Unknown project");
      const assetName = mediaMatch[2];
      if (assetName === "thumbnail.webp") {
        if (!project.thumbnailPath) return notFound("Thumbnail not generated");
        return new Response(Bun.file(project.thumbnailPath), {
          headers: { "content-type": "image/webp" },
        });
      }
      return new Response(Bun.file(project.demoPath), {
        headers: { "content-type": "video/mp4" },
      });
    }

    const publicResponse = await servePublic(url.pathname);
    if (publicResponse) return publicResponse;

    return text("Not found", { status: 404 });
  },
});

console.log(`Project gallery running at http://${server.hostname}:${server.port}`);
console.log(`Discovered ${projects.length} projects with demo.mp4`);
