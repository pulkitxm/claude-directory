.PHONY: cloc format

# Count lines of code across all git-tracked files (excludes .diff files)
cloc:
	git ls-files | grep -v '\.diff$$' | cloc --list-file=-

# Format all files with Biome (respects .gitignore via biome.json vcs config)
format:
	npx @biomejs/biome@2 format --write .
