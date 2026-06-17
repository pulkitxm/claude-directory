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

Because the `public_id` is derived deterministically from the same
`category` + `slug` the site already has, the website builds the Cloudinary mp4
URL itself — no manifest needed. **Add a project → run this script → done**, no
code change.

## Setup

```bash
cd scripts/upload-demos
npm install
cp .env.example .env   # fill in your Cloudinary creds
```

### Required env vars

| Var                     | Required | Purpose                                          |
| ----------------------- | -------- | ------------------------------------------------ |
| `CLOUDINARY_CLOUD_NAME` | yes      | Cloudinary cloud name                            |
| `CLOUDINARY_API_KEY`    | yes      | Cloudinary API key (needs upload permission)     |
| `CLOUDINARY_API_SECRET` | yes      | Cloudinary API secret                            |
| `CLOUDINARY_FOLDER`     | no       | Target folder (default `claude-directory-demos`) |

## Usage

```bash
npm run list       # just print the discovered demo videos
npm run dry-run    # report what would upload, but do not upload
npm start          # upload (skips assets already on Cloudinary)
node index.js --force   # re-upload even if the asset already exists
```

One failed upload no longer aborts the run — failures are retried (transient
errors) and then reported at the end, with a non-zero exit so you know to re-run.

After a real run, `uploads.json` (gitignored) holds a
`repoPath → { publicId, deliveryUrl, … }` map for reference. The site does
**not** need this file — it derives URLs itself.

## GitHub Actions

`.github/workflows/upload-video-demos.yml` runs this on demand
(`workflow_dispatch`) with two inputs:

- **dry_run** — list what's new but don't upload.
- **force** — re-upload even if the asset already exists.

It reads the Cloudinary creds from repo secrets. Trigger it from the Actions tab.
