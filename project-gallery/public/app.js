const state = {
  projects: [],
  query: "",
  type: "all",
  runningOnly: false,
};

const grid = document.querySelector("#grid");
const totalCount = document.querySelector("#total-count");
const visibleCount = document.querySelector("#visible-count");
const runningCount = document.querySelector("#running-count");
const searchInput = document.querySelector("#search-input");
const typeFilter = document.querySelector("#type-filter");
const runningFilter = document.querySelector("#running-filter");
const stopAllButton = document.querySelector("#stop-all");
const dialog = document.querySelector("#video-dialog");
const dialogVideo = document.querySelector("#dialog-video");

const statusBusy = new Set(["installing", "building", "starting", "cleaning"]);

function projectMatches(project) {
  const haystack = [
    project.name,
    project.description,
    project.stack,
    project.type,
    project.status,
  ]
    .join(" ")
    .toLowerCase();

  if (state.query && !haystack.includes(state.query)) return false;
  if (state.type !== "all" && project.type !== state.type) return false;
  if (state.runningOnly && project.status !== "running") return false;
  return true;
}

function statusLabel(project) {
  if (project.status === "idle") return "ready";
  return project.status;
}

function render() {
  if (!grid) return;
  const visible = state.projects.filter(projectMatches);
  totalCount.textContent = String(state.projects.length);
  visibleCount.textContent = String(visible.length);
  runningCount.textContent = String(
    state.projects.filter((project) => project.status === "running").length,
  );

  grid.innerHTML = "";
  if (visible.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No projects match the current filters.";
    grid.append(empty);
    return;
  }

  for (const project of visible) {
    grid.append(projectCard(project));
  }
}

function projectCard(project) {
  const card = document.createElement("article");
  card.className = "card";

  const videoButton = document.createElement("button");
  videoButton.className = "thumbnail-button";
  videoButton.type = "button";
  videoButton.setAttribute("aria-label", `Open ${project.name} demo video`);
  const thumbnail = document.createElement("img");
  thumbnail.alt = `${project.name} thumbnail`;
  thumbnail.loading = "lazy";
  thumbnail.decoding = "async";
  if (project.thumbnailUrl) {
    thumbnail.addEventListener("load", () => thumbnail.classList.add("is-ready"), { once: true });
    thumbnail.addEventListener("error", () => {
      thumbnail.removeAttribute("src");
      thumbnail.alt = "Thumbnail missing";
      thumbnail.classList.add("is-ready", "is-missing");
    }, { once: true });
    thumbnail.src = project.thumbnailUrl;
    if (thumbnail.complete && thumbnail.naturalWidth > 0) {
      thumbnail.classList.add("is-ready");
    }
  } else {
    thumbnail.alt = "Thumbnail missing";
    thumbnail.classList.add("is-ready", "is-missing");
  }
  videoButton.append(thumbnail);
  videoButton.addEventListener("click", () => openVideo(project));

  const body = document.createElement("div");
  body.className = "card-body";

  const titleRow = document.createElement("div");
  titleRow.className = "card-title";
  const title = document.createElement("h2");
  title.textContent = project.name;
  const status = document.createElement("span");
  status.className = `badge ${project.status}`;
  status.textContent = statusLabel(project);
  titleRow.append(title, status);

  const badges = document.createElement("div");
  badges.className = "badges";
  badges.append(badge(project.type));
  if (!project.runnable) badges.append(badge("video only"));

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = project.description || "No README description.";

  const stack = document.createElement("p");
  stack.className = "stack";
  stack.textContent = project.stack || "Stack metadata unavailable.";

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(...actionButtons(project));

  body.append(titleRow, badges, description, stack, actions);
  card.append(videoButton, body);
  return card;
}

function badge(text) {
  const element = document.createElement("span");
  element.className = "badge";
  element.textContent = text;
  return element;
}

function actionButtons(project) {
  const elements = [];
  const busy = statusBusy.has(project.status);

  const run = document.createElement("button");
  run.className = "button primary";
  run.type = "button";
  run.textContent = project.status === "running" ? "Open live" : "Run live";
  run.disabled = !project.actions.includes("run") || busy;
  run.addEventListener("click", () => openLaunch(project, "dev"));
  elements.push(run);

  if (project.actions.includes("preview")) {
    const preview = document.createElement("button");
    preview.className = "button";
    preview.type = "button";
    preview.textContent = "Build preview";
    preview.disabled = busy;
    preview.addEventListener("click", () => openLaunch(project, "preview"));
    elements.push(preview);
  }

  if (project.status === "running" || busy || project.status === "failed") {
    const stop = document.createElement("button");
    stop.className = "button danger";
    stop.type = "button";
    stop.textContent = "Stop";
    stop.addEventListener("click", () => stopProject(project.id));
    elements.push(stop);
  }

  if (project.url && project.status === "running") {
    const link = document.createElement("a");
    link.className = "live-url";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = project.url;
    elements.push(link);
  }

  return elements;
}

function openVideo(project) {
  dialogVideo.src = `/media/${project.id}/demo.mp4`;
  dialog.showModal();
  dialogVideo.play().catch(() => {});
}

dialog?.addEventListener("close", () => {
  dialogVideo.pause();
  dialogVideo.removeAttribute("src");
  dialogVideo.load();
});

function openLaunch(project, mode) {
  window.open(`/launch/${project.id}?mode=${mode}`, "_blank", "noopener,noreferrer");
}

async function stopProject(projectId) {
  await fetch(`/api/projects/${projectId}/stop`, { method: "POST" });
}

async function stopAll() {
  await fetch("/api/stop-all", { method: "POST" });
}

async function loadProjects() {
  const response = await fetch("/api/projects");
  const data = await response.json();
  state.projects = data.projects || [];
  render();
}

function upsertProject(project) {
  const index = state.projects.findIndex((item) => item.id === project.id);
  if (index === -1) state.projects.push(project);
  else state.projects[index] = project;
}

function connectEvents() {
  const events = new EventSource("/api/events");
  events.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    if (payload.type === "ready" && payload.projects) {
      state.projects = payload.projects;
      render();
    }
    if (payload.type === "project:status" && payload.project) {
      upsertProject(payload.project);
      render();
      updateLaunchFromProject(payload.project);
    }
    if (payload.type === "project:log") {
      const project = state.projects.find((item) => item.id === payload.projectId);
      if (project) {
        project.logs = payload.logs || [];
        updateLaunchFromProject(project);
      }
    }
  });
}

searchInput?.addEventListener("input", () => {
  state.query = searchInput.value.trim().toLowerCase();
  render();
});

typeFilter?.addEventListener("change", () => {
  state.type = typeFilter.value;
  render();
});

runningFilter?.addEventListener("change", () => {
  state.runningOnly = runningFilter.checked;
  render();
});

stopAllButton?.addEventListener("click", stopAll);

function launchContext() {
  return window.LAUNCH_PROJECT || null;
}

async function startLaunch() {
  const context = launchContext();
  if (!context) return;
  const endpoint =
    context.mode === "preview"
      ? `/api/projects/${context.id}/preview`
      : `/api/projects/${context.id}/run`;
  try {
    const response = await fetch(endpoint, { method: "POST" });
    const data = await response.json();
    if (data.project) updateLaunchFromProject(data.project);
    if (data.ok && data.url) {
      setLaunchStatus(`Ready at ${data.url}`);
      setTimeout(() => {
        window.location.href = data.url;
      }, 650);
    } else if (!data.ok) {
      setLaunchStatus(data.error || "Launch failed");
    }
  } catch (error) {
    setLaunchStatus(String(error));
  }
}

function updateLaunchFromProject(project) {
  const context = launchContext();
  if (!context || project.id !== context.id) return;
  setLaunchStatus(`${project.status}${project.url ? ` · ${project.url}` : ""}`);
  const logs = document.querySelector("#logs");
  if (logs) {
    logs.textContent = (project.logs || []).join("\n");
    logs.scrollTop = logs.scrollHeight;
  }
}

function setLaunchStatus(text) {
  const launchStatus = document.querySelector("#launch-status");
  if (launchStatus) launchStatus.textContent = text;
}

document.querySelector("#stop-button")?.addEventListener("click", async () => {
  const context = launchContext();
  if (!context) return;
  await stopProject(context.id);
});

connectEvents();
loadProjects();
startLaunch();
