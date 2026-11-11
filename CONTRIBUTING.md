# Contributing independent experiments

Start from a functional brief and an independent design. Public previews may inform broad ideas but do not grant redistribution permission. Do not copy paid templates, their marketing copy, branding, images, fonts, source code, captures or distinctive compositions. Do not automatically rebuild removed projects from the same reference. Generated code still needs a rights review.

Use a dedicated worktree and coherent checkpoints. Only use original or properly licensed assets and dependencies. Record each local asset by SHA-256, origin, applicable license and redistribution grant in ASSET_PROVENANCE.json, and preserve all required notices. Review references, supplied code and design similarity manually. Hold uncertain projects outside the repository and publishing output.

Add approved projects to compliance/projects.json only after this review. Run `make compliance`, `make test` and `make build`, then check responsive behavior and all final runtime requests. Install the local check with `git config core.hooksPath .githooks`. CI independently checks the committed tree and builds an explicit publication allowlist. These checks are safeguards and cannot establish copyright compliance.

Commits and PR/issue comments use Pukbot. A Pukbot commit writes to GitHub, so do not commit when the active task prohibits remote publication. PR descriptions are one line. Never auto-merge, deploy, force-push or rewrite history. Publishing requires owner review and explicit approval followed by manual workflow dispatch. Evidence must use synthetic data and cleared designs only; do not upload disputed originals or actual project data.
