.PHONY: compliance test build format

compliance:
	node scripts/check-compliance.mjs

test:
	node --test scripts/*.test.mjs

build: compliance
	node scripts/build-pages.mjs

format:
	npx @biomejs/biome@2.5.0 format --write scripts .claude .github compliance biome.json ASSET_PROVENANCE.json
