---
name: template-cloner
description: Evaluate references and build independent design experiments only when rights permit.
---

This workflow no longer clones commercial templates. Identify the reference owner and applicable license before implementation. Record only factual source URLs and rights findings, not captured source or expressive design specifications. Develop a distinct layout, content, visual identity, and interactions from functional requirements. An uncertain commercial derivative must remain removed from distribution.

Public previews may be examined as inspiration. Public accessibility is not redistribution permission. AI-generated implementations can still infringe third-party rights. A framework change, renamed asset, altered hash, or CSS adjustment does not establish independent creation.

Never automatically download and commit proprietary images, fonts, video, icons, illustrations, logos, or other assets. Never commit captured commercial HTML, CSS, JavaScript, screenshots, computed-style dumps, or other source material without documented authorization. Never reproduce paid templates pixel-for-pixel for public redistribution.

Use original designs, original copy and branding, and original or properly licensed assets. Record every asset and runtime dependency in ASSET_PROVENANCE.json with origin, license, redistribution permission, and SHA-256 for local files. Preserve required third-party license notices. Include inline SVG and embedded artwork in the rights review, record exact licensed geometry in compliance/inline-icon-provenance.json, and refresh compliance/inline-artwork.json only after reviewing changed source and notices. Simple geometry does not authorize unrelated illustration code. Do not describe third-party materials as MIT-licensed unless their actual license permits that.

Stop and flag uncertain rights for manual licensing review. Keep uncertain material outside the repository and publication output. Do not automatically rebuild a removed premium project from the same reference.

Before each commit, PR, preview capture, or publication: run `node scripts/check-compliance.mjs`, relevant tests/builds, and inspect provenance and output manually. Passing checks is a safeguard, not proof of copyright compliance. Register only independently reviewed projects in compliance/projects.json. Publishing includes source archives and raw files as well as deployed pages.

Use a dedicated worktree. Make coherent checkpoint commits through Pukbot when remote writes are authorized. Do not automatically push, open a PR, merge, deploy, or rewrite history. Respect session-specific publication restrictions. PR descriptions must be a single line. Evidence must use synthetic data and cleared designs only.
