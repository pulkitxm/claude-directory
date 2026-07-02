#!/usr/bin/env bash
# Record demo.mp4 for every project, at ANY depth. This covers both the flat
# <category>/<project>/ layout and nested ones like
# templates/premium/<provider>/<project>/.
#
# A directory is treated as a project when it has a package.json (Vite app) or a
# root-level *.html (static page). Once a project dir is found the walk does NOT
# descend into it, so a project's own build output or nested asset/pages folders
# are never mistaken for separate projects.
#
# Bounded concurrency (each worker owns a distinct port, so no collisions).
# Resumable: skips any project that already has a demo.mp4 (use --force to redo).
# Ctrl-C / SIGTERM stops cleanly: every worker is torn down and every worker port
# is freed, so no dev server or headless Chromium is left running.
#
# Usage:
#   ./record-all.sh                 # record all projects missing a demo.mp4
#   ./record-all.sh --force         # re-record every project
#   ./record-all.sh --workers 4     # change concurrency (default 3)
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"   # repo root (scripts/record-demos -> ../..)
FORCE=0
NWORK=3
BASEPORT=5301

while [ $# -gt 0 ]; do
  case "$1" in
    --force) FORCE=1 ;;
    --workers) NWORK="${2:?--workers needs a number}"; shift ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "unknown arg: $1"; exit 2 ;;
  esac
  shift
done

# --- discover projects at any depth -----------------------------------------
projects=()

# A dir is a project if it has package.json (Vite) or a root-level .html (static).
is_project() {
  local dir="$1" f
  [ -f "$dir/package.json" ] && return 0
  for f in "$dir"/*.html; do [ -e "$f" ] && return 0; done   # no nullglob in 3.2
  return 1
}

# Recurse, but stop at the first project ancestor so nested asset/build/page
# folders inside a project are never picked up as their own projects.
walk() {
  local dir="$1" sub
  if is_project "$dir"; then
    if [ "$FORCE" = 1 ] || [ ! -f "$dir/demo.mp4" ]; then projects+=("$dir"); fi
    return
  fi
  for sub in "$dir"/*/; do
    [ -d "$sub" ] || continue                              # glob stayed literal
    sub="${sub%/}"
    case "$(basename "$sub")" in node_modules|.git|.*) continue ;; esac
    walk "$sub"
  done
}

# Skip tooling/non-project top-level dirs; dotdirs are ignored too.
for catdir in "$ROOT"/*/; do
  catdir="${catdir%/}"
  case "$(basename "$catdir")" in scripts|extras|node_modules|.*) continue ;; esac
  walk "$catdir"
done

if [ "${#projects[@]}" -eq 0 ]; then
  echo "Nothing to record (all projects already have demo.mp4; use --force to redo)."
  exit 0
fi

echo "Recording ${#projects[@]} project(s) with $NWORK worker(s):"
printf '  %s\n' "${projects[@]##*/}"
echo "------------------------------------------------------------"

# --- graceful shutdown -------------------------------------------------------
# On Ctrl-C/SIGTERM: stop the workers and their record-one.sh trees, kill any
# recorder, and free the whole worker port range (that reaps stuck dev servers).
WORKER_PIDS=()
cleanup() {
  trap '' INT TERM                                         # ignore repeats while tidying
  echo
  echo "Interrupted — stopping workers and freeing ports..."
  local p pids
  if [ "${#WORKER_PIDS[@]}" -gt 0 ]; then
    for p in "${WORKER_PIDS[@]}"; do
      kill -TERM "$p" 2>/dev/null
      pkill -TERM -P "$p" 2>/dev/null
    done
  fi
  pkill -f "$HERE/record.mjs" 2>/dev/null
  for ((p = BASEPORT; p < BASEPORT + NWORK; p++)); do
    pids="$(lsof -ti tcp:"$p" 2>/dev/null)"
    [ -n "$pids" ] && echo "$pids" | xargs kill -9 2>/dev/null
  done
  exit 130
}
trap cleanup INT TERM

worker() {
  local idx="$1"
  local port=$((BASEPORT + idx))
  local i
  for ((i = idx; i < ${#projects[@]}; i += NWORK)); do
    local proj="${projects[$i]}"
    local name; name="$(basename "$proj")"
    local log="${TMPDIR:-/tmp}/demo-batch-${port}-$(printf '%s' "$name" | tr ' /' '__').log"
    if PORT="$port" bash "$HERE/record-one.sh" "$proj" "$port" >"$log" 2>&1; then
      echo "OK    $name ($(du -h "$proj/demo.mp4" 2>/dev/null | cut -f1))"
    else
      echo "FAIL  $name  (log: $log)"
    fi
  done
}

for ((w = 0; w < NWORK; w++)); do worker "$w" & WORKER_PIDS+=("$!"); done
wait

echo "------------------------------------------------------------"
echo "Done. Demos written as demo.mp4 inside each project directory."
