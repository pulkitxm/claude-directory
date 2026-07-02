# upload-demos

Uploads every local `demo.mp4` in this repo to Cloudinary as a `video` resource,
so the site serves an optimized mp4 (`f_auto,q_auto`) from a CDN instead of a raw
mp4 off GitHub/jsDelivr.

Because this script lives in the claude-directory repo, it reads the demo files
straight off disk — no GitHub API, no downloads, no rate limits.

## How it works

1. Walks the repo and finds every `*/demo.mp4` (skipping `node_modules`, `.git`,
   `.claude`, `extras`, `scripts`).
2. Fetches the list of already-uploaded assets in **one** bulk Cloudinary call,
   so re-runs skip existing videos without burning the API quota.
3. Uploads each new mp4 to Cloudinary as a `video` resource with a
   **deterministic** `public_id` derived from the repo path:

   ```
   repo:  components-ui/aurora-sign-up/demo.mp4
   id:    claude-directory-demos/components-ui__aurora-sign-up

   repo:  hero-sections/vanguard hero landing/demo.mp4
   id:    claude-directory-demos/hero-sections__vanguard-hero-landing
   ```

   The id is: join the repo path segments with `__`, lowercase, then replace
   anything outside `[a-z0-9_-]` with `-` and collapse dashes. This sanitization
   matters because some folder names contain spaces.
