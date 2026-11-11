# Historical content remediation plan

Current-tree removal does not remove existing commits, raw file URLs, pull-request refs, Pages artifacts, source archives, forks, caches or downloaded copies. Do not represent the repository as historically cleared after merging this change.

## Observed inventory

Baseline main commit: `f3d7e12f34bf7d90130dce3ec3b26cf69c29794e`. The authenticated API returned 74 branch refs, no tags, no releases and no Actions artifacts at audit time. There are 619 recorded deployment entries. The baseline contains disputed source/media and is still public until approved publication. Closed Dependabot PRs and their refs can retain those same trees. Closing a PR does not delete its branch or content.

The local `latest-main-backup` checkout preserves the exact original main snapshot at the owner's request. Keep it private and unserved. Hash/path evidence in compliance/removed-files.jsonl and compliance/source-hash-matches.json is sufficient for public review; never attach the disputed originals or actual project data as evidence.

## Actions requiring explicit approval

1. Review the current-tree diff and licensing decisions, then authorize Pukbot checkpoint commits and a PR. Publish only the remediated tree. Do not upload an archive of the original projects.
2. Coordinate with contributors and affected creators on retention and removal requirements. Preserve a private, access-controlled evidence record before any destructive action.
3. Inventory every remote branch, tag, release attachment, PR ref, wiki, GitHub Pages deployment, build cache and artifact. Confirm whether any content remains active at the exact path/hash, including CSS, media, PDFs, zip downloads and social previews. Metadata API results do not establish global absence.
4. Review the portfolio source history, `pulkitxm/pulkit.blog:gh-pages`, and the `pulkitxm/claude-directory-ppt` presentation history independently. New builds replace current served trees but leave older objects.
5. If history surgery is warranted, prepare an isolated `git-filter-repo` plan covering disputed project paths and identical blobs stored under other names. Review the resulting file inventory and all branches/tags before seeking approval. Do not run it or force-push as part of this task.
6. After explicit approval, coordinate a write freeze, branch protection changes if needed, historical ref updates, and contributor re-cloning instructions. Use approved tooling and do not create merges that reintroduce the old history.
7. Contact GitHub support regarding cached raw files, PR refs, source archives and Pages deployment artifacts that cannot be removed through normal approved controls. Review CDN/search/social cache invalidation and external hosting separately.
8. Recheck known path/hash samples after publication and any approved history work. Forks, caches, downloaded archives and external copies cannot be guaranteed erased. Record residual exposure and owner/support requests without claiming complete removal.

No published history was rewritten, no refs force-updated, and no release/artifact/cache deletion was performed. This plan does not authorize those operations.
