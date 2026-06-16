#!/usr/bin/env bash
# Record demo.mp4 for every project (each lives in <category>/<project>/) — Vite
# apps (package.json) and plain static pages (root-level .html, served via
# python3 http.server).
# Bounded concurrency (each worker owns a distinct port, so no collisions).
# Resumable: skips any project that already has a demo.mp4 (use --force to redo).
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
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "unknown arg: $1"; exit 2 ;;
  esac
  shift
done

projects=()
# Projects live one level deep, under category folders (<category>/<project>/).
# Skip tooling/non-category top-level dirs; the `*/` globs ignore dotfiles.
for catdir in "$ROOT"/*/; do
  case "$(basename "$catdir")" in scripts|extras|node_modules) continue ;; esac
  for d in "$catdir"*/; do
    d="${d%/}"                                       # strip trailing slash
    [ -d "$d" ] || continue                          # no children → glob stayed literal
    case "$d" in "$HERE"*) continue ;; esac          # never record the tooling dir
    if [ ! -f "$d/package.json" ]; then
      # Static project: needs at least one root-level .html to serve.
      [ -n "$(find "$d" -maxdepth 1 -name '*.html' -print -quit)" ] || continue
    fi
    if [ "$FORCE" = 0 ] && [ -f "$d/demo.mp4" ]; then continue; fi
    projects+=("$d")
  done
done

if [ "${#projects[@]}" -eq 0 ]; then
  echo "Nothing to record (all projects already have demo.mp4; use --force to redo)."
  exit 0
fi

echo "Recording ${#projects[@]} project(s) with $NWORK worker(s):"
printf '  %s\n' "${projects[@]##*/}"
echo "------------------------------------------------------------"

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

for ((w = 0; w < NWORK; w++)); do worker "$w" & done
wait

echo "------------------------------------------------------------"
echo "Done. Demos written as demo.mp4 inside each project directory."
