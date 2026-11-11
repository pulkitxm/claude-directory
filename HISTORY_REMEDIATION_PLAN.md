# Historical content remediation plan

The owner-approved history replacement was published on 2026-11-11. Only `refs/heads/main` changed, through one atomic exact-lease operation from `e3af83c859da181eb6067b155308d17b53238b70` to `85aa28e003e5788055c18915a9d3ccbb4c0e4038`. Git and the GitHub commit/tree API agree on the published checkpoint and tree `b999253764c6f69170a1318cdca22f2298a643c8`; publication-time checks showed no other owned head or tag and zero open PRs. The owner reviewed and expressly approved this single main replacement. No public backup ref was created.

Current-tree withdrawal, the owned-main rewrite and provider-managed history are separate outcomes. The private original backup remains access controlled and unserved. GitHub-managed pull-request refs, forks, provider caches, unadvertised objects and old published artifacts were not erased by this operation. [The publication receipt](compliance/history-publication.json) records the final scope and verification status; earlier preparation and exposure files remain dated snapshots.

## Published scope and preserved source

The final filter removes all 199 premium project trees, 200 additional approved nonpremium project trees and 93 proven historical aliases. It removes standalone media by historical path and verified content identity at renamed aliases, captured source by path and global blob identity, all 58 recorded exact source matches, original supplied-source prompts from the implementation exceptions, and 281 historical-only raw prompt or source-guide versions. The reviewed global removal set contains 37,725 blob IDs. The raw guides were withheld conservatively because collection/source redistribution permission was unverified; this is not a finding that every version infringes.

The historical implementation exceptions are `animations-loaders/container-scroll-animation` and `components-ui/interactive-3d-spline-scene`. Neither is restored to current distribution or declared licensed by the exception. Their media, captures and original supplied-source prompts receive no exemption. All 131 current sanitized brief versions remain. Project-code removal uses approved project paths and proven aliases rather than globally deleting shared implementation boilerplate. Shared legitimate empty files and `.nojekyll` survive; 53 empty or nonmedia bodies with media suffixes are removed by path only.

At the rewrite checkpoint, the complete 1,607-file source tree is byte-for-byte and mode-for-mode identical before and after publication. All 145 retained project subtree IDs also match the prior approved source checkpoint. The final independent candidate and clean checkout pass strict object verification, all 71 Node tests and the compliance guard. All 37,725 selected blob IDs are absent reachably and physically from that candidate; no selected project, media, captured-source or proven alias path remains. The independent fresh network main-only clone also passes strict object verification, all 71 tests and the compliance guard. All 37,725 target blob IDs are physically absent and unreachable there, no forbidden historical path remains, and every current file and all 145 project subtree identities match. The clone uses its own Git directory without alternates; later metadata-only descendants do not change the checked rewrite checkpoint. [The as-published clone receipt](compliance/history-publication-fresh-clone.json) records the 3,050-commit main ancestry, 18,685 reachable objects and 2,242 historical paths observed at inspection.

The private all-ref candidate preserves 1,417 ref names and maps 5,265 commits to 3,476, pruning 1,789. These are private all-ref counts, not a claim that all provider-managed refs were published. The final full-body review consumed 45,280 previously unclassified blobs and matched every SHA-256 and Git ID; only two known premium bytecode caches were opaque, and both are absent from the candidate. No additional unresolved binary or structured-media candidate was found. All 39 observed suffixes match the filter coverage. No LFS pointer was observed.

The final primary Pages release uses original source `e3af83c859da181eb6067b155308d17b53238b70`, with a full tree identical to the rewritten checkpoint. [Pages run 43067713912](https://github.com/pulkitxm/claude-directory/actions/runs/43067713912) and deployment 7716809169 succeeded. All 2,236 final live targets pass in [the final primary live record](compliance/media-free-final-live-verification.json). Its 560-file Linux artifact has zero standalone media and 465 valid local references; the uploader omits the empty `.nojekyll` marker while the source preserves it. Deployment success does not remove historical objects.

## Contributor checkout reset

Create a fresh clone for ongoing work:

```sh
git clone https://github.com/pulkitxm/claude-directory.git project-directory-fresh
git -C project-directory-fresh rev-parse HEAD
```

The rewrite checkpoint is `85aa28e003e5788055c18915a9d3ccbb4c0e4038`; later reviewed documentation commits can advance `main`. Start new work branches from the fresh `main`. Keep prior checkouts and the requested original backup private and unserved. Transfer needed independent changes manually after review, without merging or publishing old branches, old tags or an old-history backup ref. No contributor notification has been sent. Further history changes require separate owner review.

## Earlier private rehearsal snapshot

An initial private rehearsal tested the then-selected targets. Secondary review found a native Spline scene format and an older root-level project alias requiring expanded filtering; the initial rehearsal is not final acceptance or complete media erasure. All73,898 reachable blobs, totaling15,305,046,385bytes, were SHA-256 hashed across87,777 historical paths. The scan found28,943 confirmed media blobs and23,931 capture-origin blobs; their reviewed union and known copied-source IDs produce37,440 global removal targets. Fifty-three empty or non-media bodies with media suffixes are removed by path, preserving shared legitimate empty files. All58 recorded source hashes were independently verified, with no current non-media capture collision. No LFS pointers were found.

The rehearsal based on main37a19a420061caee567451bf6f3da9c008dbe520 preserved the exact1,600-file current tree. All selected blobs are absent from reachable history and physical candidate storage after candidate-only garbage collection; forbidden historical media, premium and capture paths are absent. Strict object verification,69 tests and the source guard pass. No garbage collection or rewriting touched the original backup or shared source store. [Preparation metadata](compliance/history-purge-preparation.json) distinguishes this rehearsal from final publication. Those follow-up changes were subsequently included in the final frozen input and published exact lease recorded above.

The rehearsal changes1,397 GitHub-managed refs, which ordinary pushes cannot update. A separate202-project inventory records10,598 versions of withheld nonpremium source, prompts and documentation;44 versions already match the initial removal IDs. The owner subsequently approved removal of200additional nonpremium project trees, with historical implementation exceptions only for animations-loaders/container-scroll-animation and components-ui/interactive-3d-spline-scene. Media, captured source and source-containing original prompts receive no exception. The [exact reviewed scope](compliance/history-purge-scope.json) partitions all202held projects and overlaps none of the145retained projects. This scope choice does not establish rights or restore either exception to current distribution. All399selected projects and both exceptions were then checked individually for historical aliases. Multi-file byte identities and commit witnesses establish93additional prefixes, including older root-level names and typo/space renames. Common utilities, entrypoints and vendor libraries were excluded as identity proof. The [alias evidence](compliance/history-purge-aliases.json) records no current/exception identity collision and no unresolved root-basename candidate. These exact aliases were included in the final filter. The later full-body review and publication receipt supersede the initial rehearsal status.

GitHub's [history-removal documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) says pull refs are read-only to pushes and its sensitive-data support process does not remove non-sensitive data. Copyright remediation therefore needs the appropriate provider and rights-holder review; it must not be represented as a secrets-removal request. GitHub's [copyright notice guide](https://docs.github.com/en/site-policy/content-removal-policies/guide-to-submitting-a-dmca-takedown-notice) requires the submitting party to be the rights owner or authorized representative and to identify the material precisely. Repository administration alone does not establish that authority. No notice or external message has been sent, and no fork or cache purge is claimed.

## Earlier verified historical exposure snapshot

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

> I administer this repository and have withdrawn commercial template recreations, disputed assets and captured source from its current distribution. The audit and historical inventories identify the exact affected paths, commits, GitHub-managed pull refs and deployment metadata. Please advise how to remove the identified historical PR diffs, cached commit/raw views, source archives and stored deployment artifacts, and which steps require repository administration or rights-holder participation. The five priority cases are PRs 428, 487, 488, 492 and 497. The owner-controlled main branch has now been rewritten through one explicitly approved exact-lease operation, while GitHub-managed PR refs and provider cached objects remain pending. The earlier read-only inventory also confirmed two independently controlled forks retaining the premium subtree. Please distinguish actions that affect the primary repository from those requiring each fork owner or the relevant rights holder. I am the repository administrator, not the owner of the third-party template rights.

Attach reviewed metadata inventories and public current-tree audit links first. Do not attach the private backup, original media, claim correspondence or laptop captures without separately reviewing the disclosure scope. A support request or its acknowledgment does not establish that material was purged.

## Remaining provider and external-copy steps

1. Review the final publication receipt and earlier ref, project and rights inventories with the repository owner/admin and, where applicable, the relevant rights holder. Preserve necessary original evidence privately; use sanitized metadata first for any separately authorized coordination.
2. Review all 1,416 captured GitHub-managed pull-request refs with the provider, starting with the five priority cases above. Ordinary owned-branch pushes cannot replace these refs. Determine which PR diffs, cached commit/raw views and source archives require provider assistance. Repository administration does not establish authority to file a third-party copyright claim.
3. Review old deployment storage, Actions/release artifacts and cached downloads separately from current live responses. Reconcile exact source revisions, deployment IDs and retention. The separate [retired download cleanup](compliance/retired-pages-artifact-cleanup.json) deleted three pre-media-free Actions artifacts and verified their metadata endpoints return 404. The current and previous media-free artifacts remain. Internal deployment storage and caches still require separate review.
4. Review external copies separately. The repository reported 169 network forks and the public inventory enumerated 168 visible forks. The main rewrite changes none of them. Owner/provider coordination and any relevant rights-holder process remain pending; no external messages have been sent.
5. Preserve the completed fresh network main-only clone receipt separately from the private-candidate checks. Its exact path/hash scope, full source tree and all retained project trees pass. Record any subsequent authorized provider action as a new result, without overwriting the earlier dated snapshots.
6. Use the fresh-checkout instructions above for contributors. Do not reintroduce old ancestors through stale branches or a public backup ref. Further history replacements, protection changes and external contact require separate owner review.
7. Review portfolio/blog/presentation histories, external recordings, search/social caches and downloaded archives independently. Preserve the owner's explicit choices for the two external recordings. No global erasure or legal-compliance claim follows from the owned-main rewrite or passing safeguards.

The original local backup remains private, access controlled and unserved. The shared source object store and locked backup were not rewritten or garbage-collected. Only the independent candidate was garbage-collected. The primary branch replacement succeeded; provider-managed refs and independently controlled copies remain pending manual action.
