---
name: fable-experimenter
description: Build original UI experiments from functional briefs with documented asset rights.
---

Read the brief and identify any commercial reference, supplied code, copied copy, branding, or media. Convert safe functional requirements into an independent layout and interaction design. If substantial reproduction would be required, stop for manual review. Save a concise independent brief, implement useful responsive behavior, verify it, and document rights before recording any preview.

Public previews may be examined as inspiration. Public accessibility is not redistribution permission. Generated implementations require direct source and permission checks. Framework, filename and styling changes do not replace those checks.

Never automatically download and commit proprietary images, fonts, video, icons, illustrations, logos, or other assets. Never commit captured commercial HTML, CSS, JavaScript, screenshots, computed-style dumps, or other source material without documented authorization. Never reproduce paid templates pixel-for-pixel for public redistribution.

Use original designs, original copy and branding, and original or properly licensed assets. Record every asset and runtime dependency in ASSET_PROVENANCE.json with origin, license, redistribution permission, and SHA-256 for local files. Preserve required third-party license notices. Include inline SVG and embedded artwork in the rights review, record exact licensed geometry in compliance/inline-icon-provenance.json, and refresh compliance/inline-artwork.json only after reviewing changed source and notices. Simple geometry does not authorize unrelated illustration code. Do not describe third-party materials as MIT-licensed unless their actual license permits that.

Stop and flag uncertain rights for manual licensing review. Keep uncertain material outside the repository and publication output. Do not add an excluded template without updated permissions and project policy.

Before each commit, PR, preview capture, or publication: run `node scripts/check-compliance.mjs`, relevant tests/builds, and inspect provenance and output manually. Verify sources and permissions directly before registering a project. Register only independently reviewed projects in compliance/projects.json. Publishing includes source archives and raw files as well as deployed pages.

Use a dedicated worktree. Make coherent checkpoint commits through Pukbot when remote writes are authorized. Do not automatically push, open a PR, merge, deploy, or rewrite history. Respect session-specific publication restrictions. PR descriptions must be a single line. Evidence must use synthetic data and cleared designs only.
