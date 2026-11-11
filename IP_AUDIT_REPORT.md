# Repository IP audit report

## Current media-free distribution

All 151 standalone original media files have now been removed from the current source, including 150 SVG drawings and one gradient MP4. All 145 reviewed projects remain. Visible media slots use original CSS-generated visuals; Apex uses a procedural scroll scene. Empty data favicons prevent stale media requests. The coastal 3D scene bundles its pinned, MIT-licensed Three.js package locally. The source guard rejects standalone media even when a provenance entry exists, and the static publication copier excludes media files. Exact removed hashes and renewed source review records are in [compliance/media-removal.json](compliance/media-removal.json). Earlier media counts below describe the named prior snapshots.

Current-source safeguards and 69 synthetic tests pass. All 145 previews build, with 465 local references verified and no standalone media files among the 561 artifact files. Eighteen targeted desktop/mobile control flows pass with external HTTP requests blocked, including both scroll interactions, converted image sliders and generated card grids, component image primitives and the bundled 3D scene. See [compliance/media-removal-controls.json](compliance/media-removal-controls.json). Deployment and historical-purge verification are tracked separately and are not implied by this source change. Premium templates remain excluded. Removing assets does not itself resolve every possible design or other right.


Audit date: 2026-11-11. Baseline: `f3d7e12f34bf7d90130dce3ec3b26cf69c29794e`. Initial branch: `ip-remediation`; deeper verification branch: `copyright-verification`. Scope: all 77,104 tracked files and all 546 project directories, including hidden capture trees, every category, root metadata, scripts, agent workflows, licenses and deployment configurations. The portfolio and presentation repositories were also remediated, merged and deployed.

## Outcome

145 projects retained after reviewed source and asset remediation; 401 projects removed from current distribution, including all 199 premium recreations across 10 vendors. Initial classifications: 202 HIGH RISK, 343 MEDIUM RISK, 1 LOW RISK. Retained projects have a LOW RISK engineering assessment after cleanup, subject to the limitations below. Removed projects keep their original risk classification for review.

The owner approved publication, squash merges and completion of the managed deployments. PRs [1390](https://github.com/pulkitxm/claude-directory/pull/1390), [141](https://github.com/pulkitxm/pulkit.page/pull/141) and [3](https://github.com/pulkitxm/claude-directory-ppt/pull/3) were squash merged through Pukbot with their review branches deleted. Fresh managed-site deployments succeeded. Published history rewriting, force-pushes and historical artifact deletion were not performed. Do not publish the baseline or backup as evidence.

## Evidence and method

The complete per-project record is [compliance/project-audit.json](compliance/project-audit.json), including original reference URLs where present, vendor, asset/capture paths, evidence, action and uncertainties. The table below enumerates every project. A tracked-file inventory records 76,919 removed or replaced original paths, Git blob IDs and SHA-256 values verified from the private full main checkout in compliance/removed-files.jsonl. It contains metadata only, not copied content. [Source hash matches](compliance/source-hash-matches.json) records exact comparisons. All 58 recorded capture/implementation pairs were verified with SHA-256 against the private main backup. None of the initial 131 replacement local assets matched a baseline file hash; later verified restorations are recorded separately below. Shared framework/library matches alone are not evidence of proprietary ownership.

Every project's README and brief and available implementation text were scanned for external origins, supplied code, branding, marketing copy, source captures, runtime assets and license records. Premium projects were reviewed per project, with detailed content inspection of the priority Lexington projects and captured/distributed source pairs. Nonpremium projects were reviewed using source signals and briefs; undocumented embedded component code was held back rather than assumed independently created. No remote demo assets were downloaded for this audit. Visual similarity was assessed from documented recreation intent and implementation evidence, not an exhaustive side-by-side visual/legal review of every page.

Carrington records 37 vendor-style WebP images and Astro CSS/JS source captures. Dusk preserves original build-hash WebP names and compiled vendor styles/fonts. Mulberry's captured about-page CSS and distributed reference.css have identical SHA-256 `7e243d4214f82df0821dbf5489cda4667bb040c6c5cbfa03a6e09f9c6ab47eed`. Westend retains Astro script/image identifiers and explicitly reproduces 122 routes. Sandstone retains Astro asset metadata and original CSS/JS URLs. All five were removed in full. Matching source and implementation CSS was also found in Matterhaus, Molle, Navy, Northbound and Keynote. Filenames alone were not used to establish copying.

Lexington's [license FAQ](https://lexingtonthemes.com/legal/faq) and Cruip's [license terms](https://cruip.com/terms/) distinguish site use from redistribution of templates or derivatives. These pages support conservative removal; no conclusion is made about private grants or legal infringement. Other vendor projects lack recorded authorization and were removed pending review, including 14 premium projects with free/open-source-origin claims requiring precise license and asset verification.

## Actions

Removed the complete premium tree and 216 additional projects. Removed commercial source captures, undocumented media/fonts, legacy posters/videos, gallery references and copied briefs from current distribution. Preserved 96 fictional h0..h95 implementations and selected independent scene, terminal, scroll, design-system and UI experiments. New geometric SVG artwork replaces old media without transforming it; the Apex gradient film is newly generated. Font-face rules/downloads were removed. Old fidelity tests and scraper tools were removed.

Replaced all four agent workflows with inspiration/permission boundaries, independent-design requirements, provenance tracking, manual review holds and prepublication checks. Removed unconditional asset downloading, commercial source capture, pixel cloning and automatic publishing instructions. Added automated provenance/hash/capture/workflow checks, adversarial tests, a pre-commit hook and CI. MIT scope is clarified without relicensing third-party dependencies. Pages now stages only an explicit reviewed catalog, omits source/captures/archives, clears old output, verifies links and fails on unknown paths. Publication is manual only. Root/category counts are regenerated from the reviewed catalog; old posters and dates manifests are empty.

## Deeper verification of the retained source

The follow-up reviewed all 131 retained implementations against their original baseline prompts and READMEs, rather than treating rewritten briefs as proof of origin. [compliance/retained-source-verification.json](compliance/retained-source-verification.json) records evidence for every retained project, original-document hashes, comparison methods, findings and uncertainty. The 101 non-UI projects contributed 311 implementation files compared against 14,667 removed or captured implementation files, with identical contents deduplicated. The 30 UI projects contributed 410 implementation files and a separate comparison against 14,694 removed/captured code and SVG files, including all 216 removed nonpremium projects. Normalized token candidates were inspected in context. No substantive proprietary template or component body was identified in the retained implementation. Shared boilerplate, small icon paths and procedural mathematics do not establish ownership, and differently coded visual similarity remains a manual rights question.

The review did find remaining material requiring correction. Replaced unverified social/technology brand artwork and real-company client, employment and publication claims with newly drawn geometry and fictional examples. Replaced a quote vector shared with removed templates where an upstream grant was not established. Replaced three complex social symbols in Maximalism and the newspaper slogan in Newsprint metadata. The useful page structure and interactions remain. [compliance/source-verification-fixes.json](compliance/source-verification-fixes.json) records exact file and original replacement-region hashes without redistributing the removed artwork.

371 individual SVG path shapes and two complete Lock regions were traced to actual upstream sources under MIT, ISC or Apache-2.0 grants. These are precise geometry matches, not blanket licenses for surrounding icons or pages, nor proof of the historical import version. [compliance/inline-icon-provenance.json](compliance/inline-icon-provenance.json) records those matches and full license-file hashes. Complete notices are retained in the repository and copied into all 68 affected static previews. Unmatched custom charts, procedural drawings, simple geometry and inline data-URI SVGs were reviewed separately. A new source-hash safeguard requires renewed review when a file containing inline artwork, a required notice or a retained license changes.

All 131 local asset hashes were verified. The 130 replacement SVGs use geometric primitives without embedded photos, font data, source captures, scripts or external asset references. Actual baseline SVG bytes were checked for hash and color-insensitive geometry matches; no replacement matched. The gradient MP4 was decoded and inspected as generated color fields, with no source footage. Its documented parameters are descriptive; the exact original executable command was not retained. All 100 runtime package/version/license declarations match installed packages and complete license texts. All 25 applicable live npm notice files contain those 100 notices; all68 new static notices were also verified on the follow-up deployment.

The legacy UI briefs lack confirmed per-project prompt acquisition and permission records. DesignPrompts' [terms](https://designprompts.dev/terms) provide a limited permission basis for actual Free Builder inputs: those prompts may be used subject to the terms, while Pro components, paid catalogue content and unrelated assets are outside that grant. This does not prove any particular legacy prompt came from that source. The old prompt collection remains removed, and retained implementation was reviewed for copied code and artwork separately from prompt-source assumptions.

Follow-up local verification passed all 131 preview builds, all 34 tests, all 1,265 publication references, 92 desktop/mobile checks across 46 affected non-UI pages and four checks for the two UI corrections. All 68 static notice files match their exact recorded output hashes. Results are in [compliance/verification-followup.json](compliance/verification-followup.json).

The source follow-up was squash merged through [PR1393](https://github.com/pulkitxm/claude-directory/pull/1393) at `83879229b486c8eb777187fa01a725d7743c2ca8`; its reviewed and merged trees match. Fresh Pages run43018899063 and deployment7709817357 succeeded. All1480 live targets were verified, including131 retained roots200,415 removed roots404 and812 old file paths404. Every new static notice and affected compiled asset matched its recorded output. Raw HTML differences from Cloudflare analytics/email transformations remain explicit in the record; exact origin hashes were verified by reversing only those provider changes. None of the58 captured/distributed source hashes occurs among the1456 checked current Git files or630 built publication files. This establishes the stated engineering outcome, not legal clearance or historical erasure.

The owner prioritized current-repository verification before portfolio restoration or reconsideration of other removed nonpremium projects. That source-verification phase did not include restoration. The subsequent nonpremium re-review is recorded below. Historical refs, external correspondence and any privately granted rights remain separate review items.

## Removed nonpremium project re-review

The follow-up re-reviewed all216 removed projects outside the premium directory using original baseline documents, implementation and asset hashes, and primary licensing sources. Fourteen conditional restoration candidates were identified: five small independent UI/interaction experiments, six licensed shader integrations, and three integrations of upstream MIT components. The other202 remain withheld because precise code, design, or asset grants are missing or restrictive. A nonpremium folder name, a permissive framework dependency, or free preview access does not establish a right to redistribute a complete template.

The complete decisions are in [compliance/nonpremium-review.json](compliance/nonpremium-review.json), with separate source/licensing records in compliance/nonpremium-reviews/. 14 of those candidates have completed source, asset, license and functionality verification and are included in this review branch. Remaining candidates stay outside the catalog until cleanup and verification finish. Live publication is recorded separately in compliance/restored-projects.json. No paid template is being rebuilt from its former reference. This re-review does not authorize historical rewriting or public removal requests to other repository owners.

## Completed nonpremium restoration checks

The second review restored 14 projects, producing a 145-project current catalog while keeping all 199 premium projects and 202 other unresolved projects outside distribution. Five restored projects preserve small independent UI or interaction implementations. Nine integrate specifically licensed components or shader packages, with their own MIT or Apache notices retained. No premium template was reconstructed from its old reference.

[compliance/restored-projects.json](compliance/restored-projects.json) records all 272 retained restoration file hashes, before/after comparisons, specific upstream grants, replacement assets and build/interaction checks. Detailed shader records are in compliance/restoration-reviews/. All 14 cleaned projects built and passed desktop/mobile rendering and meaningful control checks. Stale shader source panels now export the actual current licensed component with its full notice, and Grain's mobile controls are accessible through a tested disclosure.

The current media manifest contains 151 files: 150 original geometric SVGs and the generated gradient video. Exact hashes match the retained files, no media hash matches the removed baseline ledger, and none of the 58 recorded captured/distributed source hashes remains in the current tree. All 216 previously removed nonpremium projects have a recorded decision; 202 remain held for precise rights evidence. [compliance/restoration-verification.json](compliance/restoration-verification.json) records the final source checks.

The safeguard suite now has 36 passing tests, including shader-source review pins and a regression distinguishing literal JSX source-credit links from media, style and network-resource URLs. License/notice files are pinned separately. These tests complement the recorded manual source review and do not establish legal clearance. The full catalog was squash merged through [PR1395](https://github.com/pulkitxm/claude-directory/pull/1395) at edaeace133815bfc90f6831cee8da63d72326132 with the exact reviewed tree. Main CI43043534590 passed all145 builds,36 tests and1323 publication references. Pages43043609547 and deployment7713415382 succeeded. All2173 final live targets and28 restored desktop/mobile flows passed. [Live URL/hash results](compliance/restoration-live-verification.json) and [control checks](compliance/restoration-live-controls.json) record this separately from local results. All401 withdrawn roots,812 legacy files,199 premium GitHub alias paths and56 capture probes returned404. All704 approved artifact files and the canonical alias matched exact served bytes or separately verified documented provider transformations.43 HTML responses retain explicit raw-byte differences; their entire origin bytes matched after bounded Cloudflare reversal. Historical copies and independent forks remain pending separate actions.

## Remaining review and limits

This is a conservative technical remediation, not a legal clearance. Independently briefed projects were not compared against every possible outside design or snippet, and generated authorship is not proof of ownership. Review substantial similarity, supplied prompt ownership, trademark/publicity rights and any private licenses with qualified counsel or the relevant creator as appropriate. No disputed project should be restored solely because it builds or its filenames differ.

The shared conversation at https://chatgpt.com/share/6af43ab0-f564-83ee-91c9-fccb15864d0d returned only a title shell. Its specific contents were unavailable; the owner was asked to paste the claims. The original written audit requirements and all named examples were applied independently.

The remediated current main tree excludes the withdrawn content. History reachable from main, old branch/PR refs and raw commit URLs still retains historical material. A fresh metadata inventory found 1,393 retained pull-head refs, including 969 closed premium-bearing heads; 416 of 620 recorded deployments use premium-bearing source revisions. Baseline `f3d7e12` remains publicly resolvable. Current branch tips have no premium subtree. No tags or releases were found. One current Pages artifact exists and was not downloaded for this metadata inventory. Deployment records do not prove old bytes are still served or erased. See [HISTORY_REMEDIATION_PLAN.md](HISTORY_REMEDIATION_PLAN.md), [compliance/historical-exposure.json](compliance/historical-exposure.json) and [DEPLOYMENT_REMEDIATION.md](DEPLOYMENT_REMEDIATION.md). Live verification confirms all 131 retained preview URLs return200, all 415 removed project roots return404, and all 812 checked legacy asset/source/preview URLs return404. The canonical catalog has exactly131 approved links and no premium links. All10 live desktop/mobile smoke checks passed. Portfolio, blog and presentation withdrawals are also deployed; details and response timestamps are in [compliance/deployment-verification.json](compliance/deployment-verification.json) and [DEPLOYMENT_REMEDIATION.md](DEPLOYMENT_REMEDIATION.md). The owner explicitly chose to leave the two linked YouTube recordings unchanged. They remain outside the claimed withdrawal outcome and are not declared cleared by this audit. Historical copies remain separate actions. The blog was published using the guarded Pukbot manual path. The token-free receipt/content verification path was merged in [portfolio PR142](https://github.com/pulkitxm/pulkit.page/pull/142), but no subsequent receipt publication or portfolio restoration was performed while primary-repository verification took priority.

## Requested pull-request cleanup

All 73 initially open PRs were authored by Dependabot. Closed both reviewed Pukbot batches and verified zero remaining Dependabot PRs with the GitHub API before opening remediation review PRs. A later grouped update PR1392 appeared during follow-up and was also closed; a final open-PR check is recorded with the follow-up verification. No Dependabot branches or historical objects were deleted by that PR-closing action. The three remediation review branches were later deleted as part of their approved squash merges.

## Verification

The initial remediation built all 131 retained previews, with 26 automated tests and 1,249 publication references passing. The retained-source follow-up then passed 34 tests, 1,265 references, source safeguards, actionlint and whitespace checks. Browser checks passed for 99 static projects and 30 UI projects on desktop/mobile, plus terminal and scroll-video behavior and nine representative UI interactions. Eleven Tailwind globs and two mobile-menu stacking issues were repaired during verification. Follow-up build/test/link results are recorded in [compliance/verification-followup.json](compliance/verification-followup.json); earlier baseline browser and interaction evidence remains in compliance/verification.json. Fresh deployed checks are recorded separately from local checks. Missing access is reported as pending, never as successful deletion. The original main backup is private local evidence and must not be uploaded or deployed.

Git inspection and synthetic fixtures now clear inherited repository-control environment variables. A regression verifies that linked-worktree hooks inspect the intended checkout without changing the caller's Git configuration or index.

## Every inspected project

| Project | Initial risk | Disposition |
| --- | --- | --- |
| `3d-games/lovable-webgl-hero` | HIGH RISK | removed from current distribution |
| `3d-games/sidi-bou-said-3d-walk` | LOW RISK | retained after asset remediation |
| `animations-loaders/apex-scroll-hero` | MEDIUM RISK | retained after asset remediation |
| `animations-loaders/bags-editorial-collage` | HIGH RISK | removed from current distribution |
| `animations-loaders/bloom-nested-squares` | MEDIUM RISK | removed from current distribution |
| `animations-loaders/container-scroll-animation` | MEDIUM RISK | removed from current distribution |
| `animations-loaders/dot-nokia-typing-hero` | MEDIUM RISK | removed from current distribution |
| `animations-loaders/linkflow-boomerang-hero` | MEDIUM RISK | removed from current distribution |
| `animations-loaders/mainframe-scrub-hero` | MEDIUM RISK | removed from current distribution |
| `animations-loaders/microvisuals-boomerang-hero` | MEDIUM RISK | removed from current distribution |
| `animations-loaders/moneta-key-preloader` | HIGH RISK | removed from current distribution |
| `animations-loaders/pallet-ross-landing` | HIGH RISK | removed from current distribution |
| `animations-loaders/qclay-hexagon-loader` | HIGH RISK | removed from current distribution |
| `animations-loaders/scroll-expansion-hero` | MEDIUM RISK | removed from current distribution |
| `components-ui/animated-dots-rain` | MEDIUM RISK | removed from current distribution |
| `components-ui/animated-hud-targeting-ui` | MEDIUM RISK | removed from current distribution |
| `components-ui/aurora-sign-up` | MEDIUM RISK | removed from current distribution |
| `components-ui/background-paths-hero` | MEDIUM RISK | retained after verified nonpremium restoration |
| `components-ui/core-features-gradient-cards` | MEDIUM RISK | removed from current distribution |
| `components-ui/crimson-mill-supply-card-h61` | MEDIUM RISK | retained after asset remediation |
| `components-ui/gradient-bars-background` | MEDIUM RISK | removed from current distribution |
| `components-ui/gradient-dots-background` | MEDIUM RISK | removed from current distribution |
| `components-ui/interactive-3d-spline-scene` | MEDIUM RISK | removed from current distribution |
| `components-ui/lumen-aurora-vcard-h62` | MEDIUM RISK | retained after asset remediation |
| `components-ui/nexto-404-hero` | MEDIUM RISK | removed from current distribution |
| `components-ui/scanner-card-stream` | MEDIUM RISK | removed from current distribution |
| `components-ui/sixsense-reference-finder` | HIGH RISK | removed from current distribution |
| `components-ui/spatial-product-showcase` | MEDIUM RISK | removed from current distribution |
| `components-ui/terminal-cli-control-deck` | MEDIUM RISK | retained after asset remediation |
| `hero-sections/aethera-cinematic-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/ai-builder-dark-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/altitude-index-h38` | MEDIUM RISK | retained after asset remediation |
| `hero-sections/animated-text-rotate-hero` | MEDIUM RISK | retained after verified nonpremium restoration |
| `hero-sections/bloom-liquid-glass-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/cinematic-stream-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/codenest-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/convix-pr-agency-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/datacore-video-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/designpro-video-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/digital-epoch-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/equilibrium-liquid-glass-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/fearless-vision-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/helix-vault-h55` | MEDIUM RISK | retained after asset remediation |
| `hero-sections/ironclad-password-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/kubric-hero-landing` | HIGH RISK | removed from current distribution |
| `hero-sections/mainframe-hero-landing` | MEDIUM RISK | removed from current distribution |
| `hero-sections/monocrit-studio-h27` | MEDIUM RISK | retained after asset remediation |
| `hero-sections/nexora-automation-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/noctis-cinematic-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/particle-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/power-ai-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/prisma-noir-h52` | MEDIUM RISK | retained after asset remediation |
| `hero-sections/rivr-defi-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/securify-data-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/sentinel-ai-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/shape-landing-hero` | MEDIUM RISK | retained after verified nonpremium restoration |
| `hero-sections/skyelite-jet-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/smart-prosthetics-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/stellar-ai-landing-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/synex-wealth-hero` | HIGH RISK | removed from current distribution |
| `hero-sections/taskly-liquid-glass-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/toonhub-figurine-carousel` | HIGH RISK | removed from current distribution |
| `hero-sections/transform-data-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/vanguard-hero-landing` | MEDIUM RISK | removed from current distribution |
| `hero-sections/vaultshield-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/velorah-hero-landing` | MEDIUM RISK | removed from current distribution |
| `hero-sections/verdant-advisory-h10` | MEDIUM RISK | retained after asset remediation |
| `hero-sections/wanderful-cinematic-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/woven-light-hero` | MEDIUM RISK | removed from current distribution |
| `hero-sections/xero-encryption-hero` | MEDIUM RISK | removed from current distribution |
| `landing-pages/aegis-console-h39` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/almond-hours-h65` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/amber-foundry-h9` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/amberhaus-pet-atelier-h31` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/archway-summit-h21` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/asme-hero-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/asme-liquid-glass-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/astral-veil-h6` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/atelier-noir-h7` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/atelier-press-h51` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/aura-email-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/auric-clinic-glow-h37` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/auroracast-hls-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/axion-studio-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/axis-quotient-h30` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/azimuth-realty-engine-h36` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/carbon-bloom-h95` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/cartwright-relocation-h47` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/cerulean-precision-collective-h67` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/citron-atlas-h79` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/claywell-solene-h5` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/cobalt-repairworks-h78` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/concrete-bazaar-h87` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/crimson-cut-studio-h72` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/design-rocket-email` | MEDIUM RISK | removed from current distribution |
| `landing-pages/dhara-heritage-edit-h88` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/dot-daily-calm-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/ember-quietude-h26` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/evergreen-ledger-h94` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/fernhollow-pet-wellness-h68` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/forma-video-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/freightleaf-clean-haul-h80` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/graft-modular-h93` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/gridframe-precision-h74` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/gridwright-h48` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/groundai-landing` | HIGH RISK | removed from current distribution |
| `landing-pages/grove-kitchen-fresh-h70` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/halcyon-mesh-h56` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/harbour-hearth-h64` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/hearthwell-homeware-h71` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/helix-strata-h76` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/ink-vermilion-personal-brand-h23` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/kairos-academy-h0` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/lantern-broth-midnight-ramen-h8` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/lantern-loft-tutoring-h1` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/lumen-grove-h63` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/lumen-launch-h44` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/lumen-vector-h92` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/lumina-maternite-h2` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/mentality-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/meridian-grid-systems-h81` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/meridian-precision-clinic-h35` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/mindloop-mono-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/monolith-grid-atelier-h59` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/neuralyn-dark-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/nhm-paleontology-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/noctis-aurum-h69` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/obsidian-lacquer-h57` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/obsidian-meridian-h85` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/ochre-stone-studio-h11` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/orbis-nft-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/orbital-frequency-summit-h22` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/paper-circuit-agentic-saas-h16` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/pelmatech-health-companion` | HIGH RISK | removed from current distribution |
| `landing-pages/prisma-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/riso-rebel-fest-h20` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/saaj-heritage-bazaar-h90` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/sencha-atelier-h12` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/sentinel-meridian-h77` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/slate-stone-architectural-h73` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/slow-roast-atelier-h84` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/snip-and-snout-grooming-h18` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/solace-wellness-grid-h13` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/space-voyage-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/spectral-orbit-novascale-h17` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/synergeus-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/terra-craft-editorial-h58` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/terra-siena-atelier-h14` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/tide-table-h82` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/usd-halo-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/valmax-photography-landing` | HIGH RISK | removed from current distribution |
| `landing-pages/vantix-precision-medicine-h34` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/vellum-apothecary-archive-h32` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/vellum-atelier-h33` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/velvet-vellum-agency-h4` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/verdant-atelier-h40` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/verdant-pledge-bento-h49` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/verdant-salon-h91` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/verdant-spine-clinic-h66` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/verdigris-trail-h50` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/vermillion-cram-h3` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/vermillion-table-h83` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/viktor-oddy-landing` | MEDIUM RISK | removed from current distribution |
| `landing-pages/voltaic-grid-advisory-h75` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/voltframe-dev-h29` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/voltic-showroom-h89` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/voltline-automation-h60` | MEDIUM RISK | retained after asset remediation |
| `landing-pages/wayfare-expedition-journal-h86` | MEDIUM RISK | retained after asset remediation |
| `portfolios/circuit-ledger-h15` | MEDIUM RISK | retained after asset remediation |
| `portfolios/cobalt-bento-folio-h43` | MEDIUM RISK | retained after asset remediation |
| `portfolios/crimson-press-kit-h25` | MEDIUM RISK | retained after asset remediation |
| `portfolios/electric-volt-folio-h45` | MEDIUM RISK | retained after asset remediation |
| `portfolios/inkpress-atelier-h46` | MEDIUM RISK | retained after asset remediation |
| `portfolios/jack-3d-portfolio` | HIGH RISK | removed from current distribution |
| `portfolios/lumen-folio-h19` | MEDIUM RISK | retained after asset remediation |
| `portfolios/meridian-drafthouse-h54` | MEDIUM RISK | retained after asset remediation |
| `portfolios/michael-smith-portfolio` | MEDIUM RISK | removed from current distribution |
| `portfolios/monogram-terminal-h42` | MEDIUM RISK | retained after asset remediation |
| `portfolios/nocturne-bento-h28` | MEDIUM RISK | retained after asset remediation |
| `portfolios/solstice-craft-studio-h41` | MEDIUM RISK | retained after asset remediation |
| `portfolios/voltline-resume-h53` | MEDIUM RISK | retained after asset remediation |
| `portfolios/voltmark-engineer-terminal-h24` | MEDIUM RISK | retained after asset remediation |
| `shaders/abstract-glassy-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/aether-flow-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/ai-input-wave-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/animated-shader-background` | MEDIUM RISK | removed from current distribution |
| `shaders/animated-shader-hero` | HIGH RISK | removed from current distribution |
| `shaders/anomalous-matter-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/atc-tunnel-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/aura-core-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/aurora-borealis-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/blue-meshy-shader-lab` | MEDIUM RISK | removed from current distribution |
| `shaders/blueprint-ascii-grid-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/cathedral-raymarch-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/celestial-bloom-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/celestial-ink-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/celestial-matrix-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/celestial-matrix-terminal` | MEDIUM RISK | removed from current distribution |
| `shaders/celestial-sphere-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/cosmic-plasma-web` | MEDIUM RISK | removed from current distribution |
| `shaders/crystal-voronoi-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/crystalline-cube-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/cybernetic-grid-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/digital-glitch-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/digital-petals-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/dithering-shader-lab` | MEDIUM RISK | removed from current distribution |
| `shaders/dithering-sphere-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/dithering-swirl-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/dotted-surface-waves` | MEDIUM RISK | removed from current distribution |
| `shaders/dynamic-waveform-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/electric-waves-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/endless-pursuit-shader-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/exoplanet-survey-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/flowing-waves-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/fluid-swirl-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/galactic-spiral-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/gaming-vibe-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/generative-mountain-scene` | MEDIUM RISK | removed from current distribution |
| `shaders/glsl-hills-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/grain-gradient-corners-lab` | MEDIUM RISK | retained after verified nonpremium restoration |
| `shaders/grainy-gradient-ripple-card` | MEDIUM RISK | removed from current distribution |
| `shaders/hero-button-expandable` | MEDIUM RISK | removed from current distribution |
| `shaders/hero-dithering-card` | MEDIUM RISK | removed from current distribution |
| `shaders/hero-futuristic-webgpu` | MEDIUM RISK | removed from current distribution |
| `shaders/hex-shield-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/hive-noise-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/horizon-strata-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/interactive-flux-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/launch-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/liquid-crystal-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/liquid-metal-foundry` | MEDIUM RISK | retained after verified nonpremium restoration |
| `shaders/living-nebula-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/mesh-gradient-shader-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/molten-core-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/morphing-light-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/moving-circles-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/novatrix-gradient-mesh` | MEDIUM RISK | removed from current distribution |
| `shaders/old-television-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/paper-shader-resume-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/paper-shaders-control-deck` | MEDIUM RISK | removed from current distribution |
| `shaders/paper-shaders-hero-lab` | MEDIUM RISK | removed from current distribution |
| `shaders/phosphor-30-shader-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/radial-aperture-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/radial-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/realistic-fog-background` | MEDIUM RISK | removed from current distribution |
| `shaders/sdf-dreamscape-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/shader-animation-integration` | MEDIUM RISK | retained after verified nonpremium restoration |
| `shaders/shader-flow-field-rings` | MEDIUM RISK | retained after verified nonpremium restoration |
| `shaders/shader-lines-showcase` | MEDIUM RISK | retained after verified nonpremium restoration |
| `shaders/shader-plasma-grid-background` | MEDIUM RISK | removed from current distribution |
| `shaders/shader-spectral-clock` | MEDIUM RISK | removed from current distribution |
| `shaders/sickui-waitlist-mesh-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/simplex-dithering-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/spooky-smoke-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/starship-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/thermal-shader-imaging` | MEDIUM RISK | removed from current distribution |
| `shaders/vhs-noise-distortion-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/vitruvian-ascii-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/volumetric-beams-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/warp-checks-background-lab` | MEDIUM RISK | retained after verified nonpremium restoration |
| `shaders/warp-dithering-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/warp-drive-shader-bridge` | MEDIUM RISK | removed from current distribution |
| `shaders/warp-shader-hero` | MEDIUM RISK | removed from current distribution |
| `shaders/waves-shader-oscilloscope` | MEDIUM RISK | removed from current distribution |
| `shaders/webgl-flowing-gradient-shader` | MEDIUM RISK | removed from current distribution |
| `shaders/webgl-rgb-shift-shader-hero` | MEDIUM RISK | removed from current distribution |
| `templates/atelier-archive-quiet-luxury` | MEDIUM RISK | removed from current distribution |
| `templates/aurum-neural-ai-landing` | MEDIUM RISK | removed from current distribution |
| `templates/browser-core-devtools-template` | MEDIUM RISK | removed from current distribution |
| `templates/clinical-luxury-conversion` | MEDIUM RISK | removed from current distribution |
| `templates/cyber-serif-template` | MEDIUM RISK | retained after asset remediation |
| `templates/disruptor-brutalist-template` | MEDIUM RISK | removed from current distribution |
| `templates/editorial-naturalism-design-system` | MEDIUM RISK | removed from current distribution |
| `templates/emerald-glass-system` | MEDIUM RISK | removed from current distribution |
| `templates/enterprise-admin-saas-landing` | MEDIUM RISK | removed from current distribution |
| `templates/flux-editorial-saas-landing` | MEDIUM RISK | removed from current distribution |
| `templates/forest-sage-organic-store` | MEDIUM RISK | removed from current distribution |
| `templates/gen-z-neobrutalist-landing` | MEDIUM RISK | removed from current distribution |
| `templates/heavyweight-brutalist-store` | MEDIUM RISK | removed from current distribution |
| `templates/kinetic-orange-brutalist-agency` | MEDIUM RISK | removed from current distribution |
| `templates/lumina-neobrutalist-saas-landing` | MEDIUM RISK | removed from current distribution |
| `templates/lumina-portfolio-template` | MEDIUM RISK | removed from current distribution |
| `templates/midnight-editorial-template` | MEDIUM RISK | removed from current distribution |
| `templates/neon-velocity-style-guide` | MEDIUM RISK | removed from current distribution |
| `templates/obsidian-elite-template` | MEDIUM RISK | removed from current distribution |
| `templates/organic-intelligence-wave` | MEDIUM RISK | removed from current distribution |
| `templates/premium/aceternity/agenforce-marketing-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/agenlabs-agency-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/ai-saas-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/cryptgen-marketing-aceternity` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/devpro-portfolio-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/foxtrot-marketing-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/minimal-portfolio-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/minimalist-portfolio-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/nodus-agent-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/playful-marketing-aceternity` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/proactiv-marketing-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/productized-agency-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/schedule-marketing-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/sidefolio-portfolio-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/simplistic-saas-template` | HIGH RISK | removed from current distribution |
| `templates/premium/aceternity/startup-landing-page-template` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/appy` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/community` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/creative` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/cube` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/devfolio` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/devspace` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/docs` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/fintech` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/gray` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/jobboard` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/mosaic` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/neon` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/open-pro` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/podcast` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/quoty` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/shadcnblocks-admin` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/simple` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/stellar` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/talent` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/tidy` | HIGH RISK | removed from current distribution |
| `templates/premium/cruip/waitlist` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/aelen` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/alfred` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/astromaxsp` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/aubergine` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/author` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/bastion` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/brightlight` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/buio` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/carbon` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/carriera` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/carrington` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/copperlane` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/dusk` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/ellamae` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/enlightr` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/flabbergasted` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/flaco` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/hemingway` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/hirewise` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/kotei` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/matterhaus` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/molle` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/mulberry` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/navy` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/newport` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/northbound` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/outkast` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/phanatik` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/primapersona` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/profoliox` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/quartiere` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/riflesso` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/rosewood` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/sandstone` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/semplice` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/simplexity` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/snowpeak` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/spaziobianco` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/streamer` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/studiomax` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/trendspotter` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/vanta` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/westend` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/williamsburg` | HIGH RISK | removed from current distribution |
| `templates/premium/lexingtonthemes/zeroindex` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/agent` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/blog` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/changelog` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/codeforge` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/devtool` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/mobile` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/portfolio` | MEDIUM RISK | removed from current distribution |
| `templates/premium/magic-ui/saas` | HIGH RISK | removed from current distribution |
| `templates/premium/magic-ui/startup` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/agency` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/ai-starter-kit` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/ai-tool` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/appline` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/base` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/crypto` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/doggystickers` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/finorio-saas-landing` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/gostartup` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/landing-template-nextui` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/next-saas-starter` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/next-startd` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/nextadmin` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/nextblog` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/nextly` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/nextmerce-saas-ecommerce` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/nextra-docs-template` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/notion-blog` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/play` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/plutonium` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/react-portfolio` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/saas-ui` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/sandocs` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/solid` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/stablo` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/startup-nextjs` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/startup-pro` | HIGH RISK | removed from current distribution |
| `templates/premium/nextjstemplates/tailwind-nextjs-starter-blog` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/tx-shadcn` | MEDIUM RISK | removed from current distribution |
| `templates/premium/nextjstemplates/unft-marketplace` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/aspect` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/charter` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/echo` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/hatch` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/hive` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/kinto` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/lumen` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/mainline` | MEDIUM RISK | removed from current distribution |
| `templates/premium/shadcnblocks/metafi` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/plasma` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/relative` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/scalar` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/sonic` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/streamline` | HIGH RISK | removed from current distribution |
| `templates/premium/shadcnblocks/zippay` | HIGH RISK | removed from current distribution |
| `templates/premium/shipxen/emerald-ai` | HIGH RISK | removed from current distribution |
| `templates/premium/shipxen/front-centre` | HIGH RISK | removed from current distribution |
| `templates/premium/shipxen/gnomie-ai` | HIGH RISK | removed from current distribution |
| `templates/premium/shipxen/minimum-via` | HIGH RISK | removed from current distribution |
| `templates/premium/shipxen/screenshot-two` | HIGH RISK | removed from current distribution |
| `templates/premium/shipxen/specta` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/aichat` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/aispace` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/appspace` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/bizspace` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/cms` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/dashspace` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/filemanager` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/fincash` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/fundex` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/lytic` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/nexstudio` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/originx` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/saasly` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/saasspace` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/synthai` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/techself` | HIGH RISK | removed from current distribution |
| `templates/premium/tailgrids/writemate` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/catalyst` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/commit` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/compass` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/keynote` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/oatmeal-saas-kit` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/pocket` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/primer` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/protocol` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/radiant` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/salient` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/studio` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/syntax` | HIGH RISK | removed from current distribution |
| `templates/premium/tailwindcss/transmit` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/andromeda-light-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/andromeda-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/atemp-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/bigspring-light-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/bigspring-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/bookworm-light-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/clarity` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/cleaner-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/cloudpeak-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/copper-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/darkrise-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/devgent-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/dexler-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/finprox-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/fortify-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/glasto` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/mobit` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/neonspark-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/nextspace-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/novai-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/optimize-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/optivus-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/quickdir-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/relux-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/seoptic-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/spydea-nextjs` | HIGH RISK | removed from current distribution |
| `templates/premium/themefisher/visionex-nextjs` | HIGH RISK | removed from current distribution |
| `templates/raw-form-design-system` | MEDIUM RISK | removed from current distribution |
| `templates/realmagic-ticker-scroll` | MEDIUM RISK | removed from current distribution |
| `templates/red-sun-editorial-template` | MEDIUM RISK | removed from current distribution |
| `templates/season-04-brutalist-store` | MEDIUM RISK | removed from current distribution |
| `templates/softly-wellness` | MEDIUM RISK | removed from current distribution |
| `templates/stacking-cards-portfolio` | MEDIUM RISK | retained after verified nonpremium restoration |
| `templates/sticky-content-switch` | MEDIUM RISK | retained after verified nonpremium restoration |
| `templates/super-design-industrial-system` | MEDIUM RISK | removed from current distribution |
| `templates/super-travel-luxury-landing` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-architectural-type` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-cinematic-agency` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-crimson-craft` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-design-on-reality` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-editorial-grid` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-editorial-manifesto` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-invite-waitlist` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-midnight-editorial` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-modern-atmospheric` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-modern-obsidian` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-neo-brutalist-acid` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-obsidian-lime` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-red-noir-landing` | HIGH RISK | removed from current distribution |
| `templates/superdesign-studio-editorial` | MEDIUM RISK | removed from current distribution |
| `templates/superdesign-technical-system` | MEDIUM RISK | removed from current distribution |
| `templates/synapse-design-system` | MEDIUM RISK | retained after asset remediation |
| `templates/terroir-tasting-room` | MEDIUM RISK | removed from current distribution |
| `templates/vertical-clip-text-slide` | MEDIUM RISK | retained after verified nonpremium restoration |
| `ui-design/academia-classical-showcase` | MEDIUM RISK | retained after asset remediation |
| `ui-design/ai-budget-tracking-landing-page-velara-al` | HIGH RISK | removed from current distribution |
| `ui-design/aperture-minimalist-dark` | MEDIUM RISK | retained after asset remediation |
| `ui-design/art-deco-gatsby-showcase` | MEDIUM RISK | retained after asset remediation |
| `ui-design/aurora-flow-landing` | MEDIUM RISK | retained after asset remediation |
| `ui-design/bauhaus-form-follows-function` | MEDIUM RISK | retained after asset remediation |
| `ui-design/bitcoin-defi-aurum` | MEDIUM RISK | retained after asset remediation |
| `ui-design/bold-typography-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/botanical-organic-serif` | MEDIUM RISK | retained after asset remediation |
| `ui-design/clay-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/copy-machine-pixel-perfect` | MEDIUM RISK | retained after verified nonpremium restoration |
| `ui-design/copy-machine-setup` | MEDIUM RISK | retained after verified nonpremium restoration |
| `ui-design/corporate-trust-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/cyberpunk-glitch-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/finsyc-finance-landing` | HIGH RISK | removed from current distribution |
| `ui-design/flatline-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/handcraft-paper-ui` | MEDIUM RISK | retained after asset remediation |
| `ui-design/industrial-skeuomorphism` | MEDIUM RISK | retained after asset remediation |
| `ui-design/kinetic-typography-poster` | MEDIUM RISK | retained after asset remediation |
| `ui-design/lumen-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/lumina-minimalist-modern` | MEDIUM RISK | retained after asset remediation |
| `ui-design/luxury-editorial-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/material-you-showcase` | MEDIUM RISK | retained after asset remediation |
| `ui-design/maximalism-dopamine-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/neo-brutalism-loud-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/neumorphism-soft-ui` | MEDIUM RISK | retained after asset remediation |
| `ui-design/newsprint-editorial-press` | MEDIUM RISK | retained after asset remediation |
| `ui-design/playful-geometric-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/retro-90s-nostalgia-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/scaffold-ready-splash` | MEDIUM RISK | retained after asset remediation |
| `ui-design/serif-editorial-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/swiss-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/vaporwave-outrun-design-system` | MEDIUM RISK | retained after asset remediation |
| `ui-design/verdant-organic-design-system` | MEDIUM RISK | retained after asset remediation |
