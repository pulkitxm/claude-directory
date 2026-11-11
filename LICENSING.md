# License scope

The root MIT license applies only to original repository code, documentation and assets that the contributors are authorized to license. It grants no rights in a vendor's templates, trademarks, photographs, fonts, illustrations, source captures or other third-party work. AI-generated code can still implicate third-party rights.

Third-party package code retains its own license. npm dependencies are acquired through lockfiles and are not relicensed under MIT. Runtime package declarations and versions are recorded in compliance/dependency-licenses.json. Complete installed package license and notice texts are copied into THIRD_PARTY_NOTICES.txt for each built npm preview. The Three.js CDN dependency retains its MIT notice in THIRD_PARTY_NOTICES.md.

The compliance check compares each registered project's direct production and optional npm dependencies with its version 3 lockfile and exact reviewed package, version, license and tarball origin. Development-only packages do not require runtime records. Missing, duplicated, stale or uncertain records block the existing commit, PR and publishing checks. Recorded license-file metadata is validated without requiring node_modules; this offline check does not replace inspection of the actual upstream license or prove legal compliance. Package upgrades require renewed rights review rather than automatic provenance updates.

Inline open-source icon geometry keeps its actual MIT, ISC or Apache-2.0 grant and complete notices. The exact matched paths and regions, source URLs and license files are recorded in compliance/inline-icon-provenance.json. Matching a small path does not license the rest of an icon or page. A free design prompt permits only the uses granted by its own terms and does not license premium component code or outside assets.

Specifically licensed component and shader source restored after the nonpremium review retains its upstream grant and full notices. Exact source versions, comparison evidence and retained-file hashes are recorded in compliance/restored-projects.json and linked review records. The root MIT license does not replace those grants.

Legacy downloaded or undocumented media files and fonts from retained experiments have been removed. The provenance manifest records each replacement original asset by SHA-256. Nothing removed is licensed or authorized by the repository's MIT file, and removal from this branch does not erase historical copies.

A named reference, public preview, free download, template purchase, or automated check does not establish redistribution permission. Uncertain third-party material must remain outside the repository and publishing output until the precise rights and attribution requirements have been reviewed.
