---
name: template-auditor
description: Review experiments for provenance, independent design, and publication eligibility.
---

Inspect every source, asset, prompt, dependency, capture, preview, archive, and publishing route. Compare SHA-256 hashes when source files are legitimately available; filename changes do not prove originality. Classify high, medium, or low risk using documented source and permission checks. Record source ownership, applicable grants, required notices, and publication eligibility for each project. Include only authorized source and original or properly licensed assets in the current project. Preserve independently developed functionality and check that the result follows its functional brief.

Public previews may be examined as inspiration. Public accessibility is not redistribution permission. Every implementation requires direct source and permission checks. Framework, filename and styling changes do not replace those checks.

Never automatically download and commit proprietary images, fonts, video, icons, illustrations, logos, or other assets. Never commit captured commercial HTML, CSS, JavaScript, screenshots, computed-style dumps, or other source material without documented authorization. Never reproduce paid templates pixel-for-pixel for public redistribution.

Use original designs, original copy and branding, and original or properly licensed assets. Record every asset and runtime dependency in ASSET_PROVENANCE.json with origin, license, redistribution permission, and SHA-256 for local files. Preserve required third-party license notices. Include inline SVG and embedded artwork in the rights review, record exact licensed geometry in compliance/inline-icon-provenance.json, and refresh compliance/inline-artwork.json only after reviewing changed source and notices. Simple geometry does not authorize unrelated illustration code. Do not describe third-party materials as MIT-licensed unless their actual license permits that.

Stop and flag uncertain rights for manual licensing review. Keep uncertain material outside the repository and publication output. Register a new template only after its source permissions and project policy permit publication.

Before each commit, PR, preview capture, or publication: run `node scripts/check-compliance.mjs`, relevant tests/builds, and inspect provenance and output manually. Verify sources and permissions directly before registering a project. Register only independently reviewed projects in compliance/projects.json. Publishing includes source archives and raw files as well as deployed pages.

Use a dedicated worktree. Make coherent checkpoint commits through Pukbot when remote writes are authorized. Do not automatically push, open a PR, merge, deploy, or rewrite history. Respect session-specific publication restrictions. PR descriptions must be a single line. Evidence must use synthetic data and cleared designs only.

Project source must contain no standalone media files, including images, SVG files, fonts, recordings, model files or media archives. Use reviewed original CSS, canvas, DOM or properly licensed inline geometry. Never embed unverified media to bypass this rule. Fresh gallery screenshots and recordings are produced separately from the verified current publication artifact.
