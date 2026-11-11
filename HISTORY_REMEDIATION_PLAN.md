# Historical content remediation plan

Current-tree and live-site withdrawal does not erase published commits, GitHub-managed pull-request refs, source archives, old deployment artifacts, forks, caches or downloaded copies. The remediated branch tips and managed live deployment are separate from the historical exposure below. No published history rewrite, force-push, ref deletion or artifact purge is authorized by this plan.

## Verified historical inventory

The read-only inventory was recorded at 2026-11-11T11:55:31.923362+00:00. [Sanitized metadata](compliance/historical-exposure.json) records exact ref/commit/tree identities, deployment IDs and priority cases without copying historical source, media, PR bodies or claim correspondence. Git object IDs identify metadata objects; they are not SHA-256 comparisons of downloaded bytes. Source-byte comparisons from the private backup remain in compliance/removed-files.jsonl and compliance/source-hash-matches.json.

| Scope | Recorded result | Meaning and limit |
| --- | --- | --- |
| Current branch tips | 3 checked, 0 with `templates/premium` | Tip absence does not erase ancestors, PR diffs or cached objects |
| Retained pull refs | 969 of 1393 contain premium snapshots | All 969 affected refs are `refs/pull/<number>/head` for closed PRs; counts are refs, not distinct projects or copies |
| Resolved commit/tree metadata | 2005 commits, 664 distinct premium subtree identities | Shared tree identities were reused for counting; path indicators are not legal findings |
| Baseline main | `f3d7e12f34bf7d90130dce3ec3b26cf69c29794e` still resolves | Confirmed through the public repository's authenticated Commit/Tree API, without fetching raw source or media; individual raw-path serving was not tested |
| Deployment records | 416 of 620 have premium-containing source commits, covering 409 distinct source commits | These are historical metadata records, not 416 proven live sites or inspected stored artifacts |
| Tags and releases | 0 tags, 0 releases | No release/tag cleanup target was identified in this snapshot |
| Actions artifacts | 1 current artifact | Metadata points to the remediated `15c278a5c33147aae4bafb3ebf68dea381121677` source; the artifact was not downloaded or independently inspected in this history inventory |

The baseline premium subtree has 68,179 blob paths, 48,902 asset-path indicators and 52,551 captured-path indicators. Asset and capture indicators overlap and must not be summed as distinct copied files. A premium subtree at a historical tip establishes retained material, not the rights of every item within it.

Current live responses are documented separately in [the deployment remediation record](DEPLOYMENT_REMEDIATION.md) and compliance/deployment-verification.json. Deployment state alone does not establish serving status or deletion: among the 416 premium-source records, 3 retain a latest `success` state, 370 are `inactive`, 25 are `error` and 18 are `failure`. An inactive or failed record does not prove associated storage was purged. None of these metadata states overrides an observed canonical live response.

## Priority historical pull refs

Start the support/admin case with the five original Lexington projects named in the complaint context. The counts below describe each historical project tree, not today's removed files or a redistribution license.

| Project and PR | Retained ref | Head commit | Blob paths | Asset indicators | Captured-path indicators |
| --- | --- | --- | ---: | ---: | ---: |
| [Carrington PR 428](https://github.com/pulkitxm/claude-directory/pull/428) | `refs/pull/428/head` | `9bc228e39506` | 350 | 270 | 287 |
| [Dusk PR 487](https://github.com/pulkitxm/claude-directory/pull/487) | `refs/pull/487/head` | `2078c65538f9` | 479 | 151 | 345 |
| [Mulberry PR 488](https://github.com/pulkitxm/claude-directory/pull/488) | `refs/pull/488/head` | `3d4911a03b64` | 465 | 114 | 359 |
| [Westend PR 492](https://github.com/pulkitxm/claude-directory/pull/492) | `refs/pull/492/head` | `f5c55897090a` | 92 | 62 | 0 |
| [Sandstone PR 497](https://github.com/pulkitxm/claude-directory/pull/497) | `refs/pull/497/head` | `6cf06960f3a7` | 317 | 223 | 252 |

Closing a PR, squash merging it, or deleting its ordinary branch does not remove its GitHub-managed pull ref. Review legacy gallery PRs [69](https://github.com/pulkitxm/claude-directory/pull/69) and [736](https://github.com/pulkitxm/claude-directory/pull/736) separately for historical thumbnail, download and external-media references. Linked media was not fetched in this inventory.

A limited text review covered 123 matching PR conversations/review bodies and did not identify a separate creator-authored claim there. Inline code-review threads and private/external correspondence were outside that review. This does not disprove the creator concern supplied by the owner, establish permission, or replace review of the actual correspondence.

## Coordinated actions requiring separate authorization

1. Have the owner/admin and relevant licensor or creator review the exact retained refs, project paths and rights issue. Preserve necessary evidence privately as hashes, identities and scoped records. Keep the original backup private, access controlled and unserved. Use sanitized metadata for support coordination and public evidence; review any request for original material separately.
2. Prepare a GitHub Support request covering retained pull refs, PR diffs, cached commit/raw views and source archives. Supply the metadata inventory and priority refs first. Determine which actions require repository-admin controls and which require provider assistance. Do not assume normal branch deletion clears provider-managed refs or cached objects.
3. Review old deployment storage and artifacts separately from live endpoints. Reconcile exact deployment IDs, source SHAs, environments, retention and any stored downloads with support/admins. Do not delete old deployments, artifacts or caches automatically.
4. If historical source removal is chosen, prepare an isolated `git-filter-repo` proposal covering disputed project paths and identical blobs under alternate names. Inventory every relevant branch, tag and pull ref, review the proposed resulting tree and preservation needs, and obtain explicit approval before any published history changes.
5. For approved history work, coordinate a write freeze, contributor notifications, branch protection handling, replacement refs and re-cloning instructions. Prevent an ordinary merge or stale contributor push from restoring the old history. Do not force-push or rewrite published history as part of this audit.
6. Review portfolio/blog/presentation histories, forks, cached search/social previews, external media hosts and downloaded archives independently. Respect the owner's separate choices for external recordings; no external copy is declared cleared by a primary-repository tip check.
7. Recheck the approved path/hash/ref scope after any authorized historical work. Record support actions, unresolved copies and vantage limits. Current source and live withdrawal can be verified while historical or external-copy remediation remains pending; complete erasure from forks, caches and downloads cannot be guaranteed.

This document records exposure and the next coordinated decision. It does not authorize destructive operations or claim historical or legal clearance.
