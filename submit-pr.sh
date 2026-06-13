#!/usr/bin/env bash
#
# submit-pr.sh — fork, branch, commit, push, and open a PR for the
# project-gallery + thumbnails contribution against the upstream repo.
#
# Usage:
#   ./submit-pr.sh
#
# Requirements: git, gh (logged in: `gh auth status`)
#
# Idempotent: safe to re-run. It will skip steps that are already done
# (fork exists, branch exists, nothing new to commit, already pushed).

set -euo pipefail

UPSTREAM="pulkitxm/claude-directory"
BRANCH="feat/project-gallery"
TITLE="Add project-gallery dashboard and demo thumbnails"

cd "$(dirname "$0")"

echo "==> Preflight checks"
command -v gh >/dev/null || { echo "gh CLI not found. Install it first."; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Not logged in to gh. Run: gh auth login"; exit 1; }

GH_USER="$(gh api user --jq .login)"
echo "    GitHub user: $GH_USER"

# ---------------------------------------------------------------------------
# 1. Fork the upstream repo (idempotent) and ensure a 'fork' remote exists.
#    'origin' stays on upstream; we push to 'fork'.
# ---------------------------------------------------------------------------
echo "==> Ensuring fork exists"
gh repo fork "$UPSTREAM" --clone=false >/dev/null 2>&1 || true

if ! git remote | grep -qx "fork"; then
  echo "    Adding 'fork' remote -> $GH_USER/claude-directory"
  git remote add fork "https://github.com/$GH_USER/claude-directory.git"
else
  echo "    'fork' remote already present"
fi

# ---------------------------------------------------------------------------
# 2. Create (or switch to) the feature branch.
# ---------------------------------------------------------------------------
echo "==> Preparing branch '$BRANCH'"
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git checkout "$BRANCH"
else
  git checkout -b "$BRANCH"
fi

# ---------------------------------------------------------------------------
# 3. Stage everything (excluding this helper), show it, confirm.
# ---------------------------------------------------------------------------
echo "==> Staging changes"
git add -A
git reset -q -- submit-pr.sh 2>/dev/null || true

if git diff --cached --quiet; then
  echo "    Nothing new to stage (already committed?)."
else
  echo
  echo "----- Files to be committed -----"
  git status --short
  echo "---------------------------------"
  echo
  read -r -p "Proceed with commit? [y/N] " ok
  [[ "$ok" =~ ^[Yy]$ ]] || { echo "Aborted before commit."; exit 1; }

  echo "==> Committing"
  git commit -m "$TITLE" -m "- Add project-gallery/: Bun-only local dashboard to browse generated demos and launch one project at a time (Vite/Next/static/package), binding to 127.0.0.1 with an allowlisted command set
- Add thumbnail generator (bun run thumbnails) that captures a thumbnail.webp from the 1s mark of each demo.mp4
- Add generated thumbnail.webp for existing projects
- Stop/Stop-all clean only known generated artifacts (node_modules, dist, build, .next, .vite, .turbo, coverage, bun.lock, bun.lockb); source, package.json, demo.mp4, thumbnail.webp preserved
- gitignore: add bun.lockb"
fi

# ---------------------------------------------------------------------------
# 4. Push to the fork.
# ---------------------------------------------------------------------------
echo "==> Pushing to fork"
git push -u fork "$BRANCH"

# ---------------------------------------------------------------------------
# 5. Open the PR against upstream (outward-facing — confirm first).
#    Body is written to a temp file and passed via --body-file so backticks
#    and quotes in the markdown can't break shell parsing.
# ---------------------------------------------------------------------------
# Bail out early if a PR already exists for this branch.
if gh pr view "$GH_USER:$BRANCH" --repo "$UPSTREAM" >/dev/null 2>&1; then
  echo "==> A PR already exists for $GH_USER:$BRANCH:"
  gh pr view "$GH_USER:$BRANCH" --repo "$UPSTREAM" --json url --jq .url
  exit 0
fi

echo
read -r -p "Open the PR against $UPSTREAM now? [y/N] " openpr
[[ "$openpr" =~ ^[Yy]$ ]] || { echo "Branch pushed. Skipping PR. Re-run this script to open it later."; exit 0; }

BODY_FILE="$(mktemp)"
trap 'rm -f "$BODY_FILE"' EXIT

cat > "$BODY_FILE" <<'EOF'
## Summary

Adds a small **Project Gallery** tool plus generated thumbnails to make the demos in this repo easy to browse locally.

This is a **tooling contribution** (not a new experiment), so there's no `prompt.md`/`demo.mp4` for it — it's a dashboard *for* the existing demos.

### What's included

- **`project-gallery/`** — a Bun-only local dashboard that lists every project and plays its `demo.mp4` without installing anything. Optionally launches one selected project live:
  - Vite → `bun run dev -- --host 127.0.0.1 --port <port> --strictPort`
  - Next → `bun run dev -- -H 127.0.0.1 -p <port>`
  - Static → served directly by the gallery server
  - Server binds to `127.0.0.1` and only runs an allowlisted command set for discovered project folders.
- **Thumbnail generator** (`bun run thumbnails`) — captures a `thumbnail.webp` from the 1s mark of each `demo.mp4` (`--force` to regenerate).
- **Generated `thumbnail.webp`** files added next to existing demos.
- **`.gitignore`** — adds `bun.lockb`.

### Safety

**Stop** / **Stop all** remove only known generated artifacts for a project (`node_modules`, `dist`, `build`, `.next`, `.vite`, `.turbo`, `coverage`, `bun.lock`, `bun.lockb`). Source files, `package.json`, `package-lock.json`, `demo.mp4`, and `thumbnail.webp` are preserved.

### Try it

```bash
cd project-gallery
bun run dev      # open http://127.0.0.1:4321
bun run thumbnails
bun test
```
EOF

echo "==> Creating pull request"
gh pr create \
  --repo "$UPSTREAM" \
  --base main \
  --head "$GH_USER:$BRANCH" \
  --title "$TITLE" \
  --body-file "$BODY_FILE"

echo
echo "==> Done. PR opened against $UPSTREAM."
