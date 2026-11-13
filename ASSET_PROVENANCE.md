# Resources

Visuals use CSS, DOM elements, canvas, procedural shaders and inline SVG. Typography uses system fonts. Standalone media files are excluded from project source.

[ASSET_PROVENANCE.json](ASSET_PROVENANCE.json) records remote services and resource origins. [Runtime dependencies](compliance/dependency-licenses.json) record exact package versions, licenses and package origins. Built previews include their applicable `THIRD_PARTY_NOTICES.txt`.

[Source licenses](compliance/source-licenses.json) identify specifically licensed component and shader integrations, their upstream revisions and applicable notices. [Inline icon provenance](compliance/inline-icon-provenance.json) identifies licensed geometry and full license files. [Inline source records](compliance/inline-artwork.json) bind drawings, shader programs and notices to exact source hashes.

The procedural coastal scene bundles Three.js 0.160.0 and OrbitControls from the pinned npm package. Full notices are included in the project and [third-party notices](THIRD_PARTY_NOTICES.md).

Hosting may provide Cloudflare Web Analytics and email-address decoding. These services remain governed by their provider terms and are recorded separately from repository resources.

Resource changes require verified source permissions, applicable attribution and current hashes. Run `make compliance` before submitting changes.
