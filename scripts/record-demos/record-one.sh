#!/usr/bin/env bash
# Record a demo.mp4 for ONE project.
#
# Two project shapes are supported:
#   - Vite app (has package.json): boots `npm run dev` on a strict port.
#   - Static page (no package.json, root-level .html): serves the folder with
#     python3 http.server. If there is no index.html, the first *.html file at
#     the project root is used as the entry page.
#
# Either way the recorder (record.mjs) auto-detects scrollable vs static pages,
# and everything is torn down on exit.
#
# Usage: ./record-one.sh <project-dir> [port]
#   port defaults to 5199 (override to run several in parallel on distinct ports).
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
PROJ_IN="${1:?usage: record-one.sh <project-dir> [port]}"
PORT="${2:-${PORT:-5199}}"

PROJ="$(cd "$PROJ_IN" 2>/dev/null && pwd)" || { echo "No such dir: $PROJ_IN"; exit 2; }
NAME="$(basename "$PROJ")"
SAFE="$(printf '%s' "$NAME" | tr ' /' '__')"
URL="http://localhost:${PORT}/"
TMPROOT="${TMPDIR:-/tmp}"
TMP="${TMPROOT%/}/demo-rec-${SAFE}-${PORT}"

echo "=== [$NAME] (port $PORT) ==="

MODE=""
if [ -f "$PROJ/package.json" ]; then
  MODE=vite
else
  ENTRY=""
  if [ -f "$PROJ/index.html" ]; then
    ENTRY="index.html"
  else
    ENTRY="$(cd "$PROJ" && ls -- *.html 2>/dev/null | head -1)"
  fi
  [ -n "$ENTRY" ] || { echo "SKIP: no package.json and no root-level .html in $PROJ"; exit 3; }
  MODE=static
  URL="http://localhost:${PORT}/${ENTRY}"
fi

if [ "$MODE" = vite ] && [ ! -d "$PROJ/node_modules" ]; then
  echo "[$NAME] installing project deps..."
  ( cd "$PROJ" && npm install --silent --no-audit --no-fund >"${TMPROOT%/}/demo-install-${SAFE}.log" 2>&1 ) \
    || { echo "INSTALL FAILED"; tail -15 "${TMPROOT%/}/demo-install-${SAFE}.log"; exit 4; }
fi

free_port() {
  local pids; pids="$(lsof -ti tcp:"$1" 2>/dev/null)"
  [ -n "$pids" ] && { echo "$pids" | xargs kill -9 2>/dev/null; sleep 1; }
  return 0
}
free_port "$PORT"

LOG="${TMPROOT%/}/demo-dev-${SAFE}.log"
if [ "$MODE" = vite ]; then
  ( cd "$PROJ" && npm run dev -- --port "$PORT" --strictPort >"$LOG" 2>&1 ) &
else
  ( cd "$PROJ" && python3 -m http.server "$PORT" --bind 127.0.0.1 >"$LOG" 2>&1 ) &
fi
DEV_PID=$!
trap 'kill "$DEV_PID" 2>/dev/null; pkill -P "$DEV_PID" 2>/dev/null; free_port "$PORT"' EXIT

echo "[$NAME] waiting for dev server on $PORT..."
UP=0
for _ in $(seq 1 60); do
  if curl -s -o /dev/null "$URL"; then UP=1; break; fi
  kill -0 "$DEV_PID" 2>/dev/null || { echo "DEV SERVER DIED"; tail -20 "$LOG"; exit 5; }
  sleep 0.5
done
[ "$UP" = 1 ] || { echo "SERVER NEVER CAME UP"; tail -20 "$LOG"; exit 6; }
sleep 1

echo "[$NAME] recording..."
node "$HERE/record.mjs" --url "$URL" --out "$PROJ/demo.mp4" --tmp "$TMP" --fps 30 \
  || { echo "RECORD FAILED"; exit 7; }

echo "[$NAME] DONE -> demo.mp4 ($(du -h "$PROJ/demo.mp4" | cut -f1))"
