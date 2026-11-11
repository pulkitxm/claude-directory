# Asset provenance

ASSET_PROVENANCE.json is the machine-readable manifest for every retained local media asset, with exact path, SHA-256, origin, license, kind and redistribution permission. All replacement SVGs are new geometric drawings created locally without modifying old media. The Apex light-study video is newly synthesized from a mathematical gradient; its recipe and SHA-256 are recorded in the manifest. System fonts replace the old downloaded fonts. Old demos and posters were removed and have not been regenerated from disputed designs.

The only external browser dependency is Three.js 0.160.0 and its OrbitControls module from unpkg. Its MIT rights notice is preserved in THIRD_PARTY_NOTICES.md. Network availability is required for that scene. npm runtime package/version/license records are in compliance/dependency-licenses.json; the publication builder preserves installed license/notice texts in each preview's THIRD_PARTY_NOTICES.txt. These dependency licenses do not license third-party demo media.

To add an asset, establish ownership or an explicit redistribution grant, record the original source and applicable license, preserve required notices, hash the exact file, and update the manifest. Record manual review for suspicious build-hash filenames. Never rename or transform disputed files to disguise origin. Captures and commercial template source remain prohibited even if ignored by Git.

Run `node scripts/check-compliance.mjs` before commits, PRs and publishing. This detects common mistakes and does not prove copyright compliance. Review independent authorship, design similarity, trademark, publicity and other rights manually.
