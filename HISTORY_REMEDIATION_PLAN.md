# Historical content remediation plan

Current-tree and live-site withdrawal does not erase published commits, GitHub-managed pull-request refs, source archives, old deployment artifacts, forks, caches or downloaded copies. The remediated branch tips and managed live deployment are separate from the historical exposure below. The owner subsequently requested removal of media, withdrawn premium implementations and captured source from repository history, while retaining the original local backup privately. That follow-up supersedes the earlier recommendation to stop at a plan. Preparation and validation are in progress; no rewritten history has been published.

## Private full-history rehearsal

An initial private rehearsal tested the then-selected targets. Secondary review found a native Spline scene format and an older root-level project alias requiring expanded filtering; the initial rehearsal is not final acceptance or complete media erasure. All73,898 reachable blobs, totaling15,305,046,385bytes, were SHA-256 hashed across87,777 historical paths. The scan found28,943 confirmed media blobs and23,931 capture-origin blobs; their reviewed union and known copied-source IDs produce37,440 global removal targets. Fifty-three empty or non-media bodies with media suffixes are removed by path, preserving shared legitimate empty files. All58 recorded source hashes were independently verified, with no current non-media capture collision. No LFS pointers were found.

The rehearsal based on main37a19a420061caee567451bf6f3da9c008dbe520 preserved the exact1,600-file current tree. All selected blobs are absent from reachable history and physical candidate storage after candidate-only garbage collection; forbidden historical media, premium and capture paths are absent. Strict object verification,69 tests and the source guard pass. No garbage collection or rewriting touched the original backup or shared source store. [Preparation metadata](compliance/history-purge-preparation.json) distinguishes this rehearsal from final publication. Responsive follow-up changes require a fresh final candidate and exact ref leases before publication.

The rehearsal changes1,397 GitHub-managed refs, which ordinary pushes cannot update. A separate202-project inventory records10,598 versions of withheld nonpremium source, prompts and documentation;44 versions already match the initial removal IDs. The owner subsequently approved removal of200additional nonpremium project trees, with historical implementation exceptions only for animations-loaders/container-scroll-animation and components-ui/interactive-3d-spline-scene. Media, captured source and source-containing original prompts receive no exception. The [exact reviewed scope](compliance/history-purge-scope.json) partitions all202held projects and overlaps none of the145retained projects. This scope choice does not establish rights or restore either exception to current distribution. Final filtering must also cover proven earlier aliases of the selected project paths.

GitHub's [history-removal documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) says pull refs are read-only to pushes and its sensitive-data support process does not remove non-sensitive data. Copyright remediation therefore needs the appropriate provider and rights-holder review; it must not be represented as a secrets-removal request. GitHub's [copyright notice guide](https://docs.github.com/en/site-policy/content-removal-policies/guide-to-submitting-a-dmca-takedown-notice) requires the submitting party to be the rights owner or authorized representative and to identify the material precisely. Repository administration alone does not establish that authority. No notice or external message has been sent, and no fork or cache purge is claimed.

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

## Confirmed external forks

Read-only metadata checks on 2026-11-11 identified [Saminsami73/projects-directory](https://github.com/Saminsami73/projects-directory) and [forkgitss/pulkitxm-claude-directory](https://github.com/forkgitss/pulkitxm-claude-directory) as public forks of this repository. Both current default branches retain all ten premium-vendor directories. Exact head and tree identities are recorded in [compliance/external-copy-inventory.json](compliance/external-copy-inventory.json). The inspection read repository, ref and tree metadata only; it did not download their source or media. No owner was contacted and no external copy was changed.

These are confirmed additional copies, not a complete fork/cache inventory. Updating this repository or rewriting its history would not update those forks. Owner/provider coordination remains pending and requires separate authorization to send messages or request removal.

## Prepared provider request

The following draft is ready for owner review, not sent:

> I administer this repository and have withdrawn commercial template recreations, disputed assets and captured source from its current distribution. The audit and historical inventories identify the exact affected paths, commits, GitHub-managed pull refs and deployment metadata. Please advise how to remove the identified historical PR diffs, cached commit/raw views, source archives and stored deployment artifacts, and which steps require repository administration or rights-holder participation. The five priority cases are PRs 428, 487, 488, 492 and 497. The repository has not rewritten published history or force-pushed. Two independently controlled forks also retain the premium subtree. Please distinguish actions that affect the primary repository from those requiring each fork owner or the relevant rights holder. I am the repository administrator, not the owner of the third-party template rights.

Attach reviewed metadata inventories and public current-tree audit links first. Do not attach the private backup, original media, claim correspondence or laptop captures without separately reviewing the disclosure scope. A support request or its acknowledgment does not establish that material was purged.

## Authorized purge preparation and remaining publication steps

1. Have the owner/admin and relevant licensor or creator review the exact retained refs, project paths and rights issue. Preserve necessary evidence privately as hashes, identities and scoped records. Keep the original backup private, access controlled and unserved. Use sanitized metadata for support coordination and public evidence; review any request for original material separately.
2. Prepare a GitHub Support request covering retained pull refs, PR diffs, cached commit/raw views and source archives. Supply the metadata inventory and priority refs first. Determine which actions require repository-admin controls and which require provider assistance. Do not assume normal branch deletion clears provider-managed refs or cached objects.
3. Review old deployment storage and artifacts separately from live endpoints. Reconcile exact deployment IDs, source SHAs, environments, retention and any stored downloads with support/admins. Do not delete old deployments, artifacts or caches automatically.
4. Prepare an isolated, fully hydrated `git-filter-repo` candidate covering every historical media blob and its alternate paths, all withdrawn premium trees, captured source paths and verified copied-source aliases. Validate the final retained source tree against the approved media-free build. Keep uncertain nonpremium source decisions explicit; do not remove shared legitimate code merely because its bytes also occurred in a withdrawn directory.
5. Before publication, refresh every owner-controlled branch and tag, record exact expected heads, coordinate a write freeze and review branch protection handling. Use explicit leases for only the reviewed refs. Pukbot currently exposes no arbitrary history replacement or ref-update operation; its prepend-root command preserves a remote backup and is unsuitable for purging. The owner's separate prohibition on `git push` therefore requires a narrow tool exception before that publication step. Do not publish an old-history backup branch. Prepare contributor re-cloning instructions and prevent stale merges or pushes from restoring old ancestors. No contributor notification has been sent.
6. Review portfolio/blog/presentation histories, forks, cached search/social previews, external media hosts and downloaded archives independently. Respect the owner's separate choices for external recordings; no external copy is declared cleared by a primary-repository tip check.
7. Recheck the approved path/hash/ref scope after any authorized historical work. Record support actions, unresolved copies and vantage limits. Current source and live withdrawal can be verified while historical or external-copy remediation remains pending; complete erasure from forks, caches and downloads cannot be guaranteed.

The original local backup remains private, access controlled and unserved. Rehearsal storage is independent of the shared worktree object store. Do not garbage-collect, rewrite or publish the preserved backup. A successful local filter proves only the inspected candidate's contents. GitHub-managed PR refs, cached objects, forks and other independently controlled copies require separate provider or owner action; they are not cleared by an owner-controlled branch rewrite.
