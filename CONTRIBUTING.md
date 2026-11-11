# Contributing independent experiments

Start from a functional brief and an independent design. Public previews may inform broad ideas but do not grant redistribution permission. Do not copy paid templates, their marketing copy, branding, images, fonts, source code, captures or distinctive compositions. Define each new project from its current functional brief and documented permissions. Review source permissions for every implementation.

Use a dedicated worktree and coherent checkpoints. Only use original or properly licensed assets and dependencies. Record each local asset by SHA-256, origin, applicable license and redistribution grant in ASSET_PROVENANCE.json, and preserve all required notices. Review references, supplied code and design similarity manually. Register and publish a project only after its source permissions and required notices are verified.

Add approved projects to compliance/projects.json only after this review. Run `make compliance`, `make test` and `make build`, then check responsive behavior and all final runtime requests. Install the local check with `git config core.hooksPath .githooks`. CI independently checks the committed tree and builds an explicit publication allowlist. CI validates configured records; source authorization and notices require human review.

Commits and PR/issue comments use Pukbot. A Pukbot commit writes to GitHub, so do not commit when the active task prohibits remote publication. PR descriptions are one line. Never auto-merge, deploy, force-push or rewrite history. Publishing requires owner review and explicit approval followed by manual workflow dispatch. Evidence must use synthetic data and approved designs, with no actual project data in captured artifacts.
