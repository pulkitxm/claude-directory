.PHONY: cloc format demo demos-fresh

# Count lines of code across all git-tracked files (excludes .diff files)
cloc:
	git ls-files | grep -v '\.diff$$' | cloc --list-file=-

# Format all files with Biome (respects .gitignore via biome.json vcs config)
format:
	npx @biomejs/biome@2 format --write .

# Re-record ONE project's demo.mp4 and regenerate its poster.jpg + posters.json entry.
#   make demo PROJECT=hero-sections/aethera-cinematic-hero
demo:
	@test -n "$(PROJECT)" || { echo "usage: make demo PROJECT=<category>/<project>"; exit 2; }
	@p='$(PROJECT)'; p="$${p%/}"; \
	  bash scripts/record-demos/record-one.sh "$$p" && \
	  node scripts/generate-posters/generate-posters.mjs --force --only "$$p"

# Re-record EVERY demo from scratch: delete all demo.mp4 + poster.jpg, re-record
# them all, then regenerate every poster + the posters.json manifest.
# Destructive (re-records can take a while) — pass CONFIRM=1 to skip the prompt.
#   make demos-fresh             # asks before deleting
#   make demos-fresh CONFIRM=1   # no prompt
#   make demos-fresh WORKERS=4   # parallel recording (default 3)
demos-fresh:
	@if [ "$(CONFIRM)" != "1" ]; then \
	  printf 'Delete ALL demo.mp4 + poster.jpg and re-record everything? [y/N] '; \
	  read ans; [ "$$ans" = y ] || [ "$$ans" = Y ] || { echo aborted; exit 1; }; \
	fi
	find . \( -name node_modules -o -name .git \) -prune -o \( -name demo.mp4 -o -name poster.jpg \) -type f -print -delete
	bash scripts/record-demos/record-all.sh --force $(if $(WORKERS),--workers $(WORKERS),)
	node scripts/generate-posters/generate-posters.mjs --force
