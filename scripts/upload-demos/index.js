#!/usr/bin/env node
// @ts-check

/**
 * Upload every local `demo.mp4` in this repo to Cloudinary as a video resource,
 * so the site can serve an optimized mp4 (f_auto,q_auto) from a CDN instead of a
 * raw mp4 off GitHub/jsDelivr.
 *
 * This script lives in the claude-directory repo itself, so it reads the demo
 * files straight off disk — no GitHub API, no downloads, no rate limits.
 *
 * The Cloudinary public_id is derived deterministically from each project's
 * repo path, so the site builds delivery URLs itself — no manifest needed.
 *
 * Usage:
 *   node index.js            upload everything (skips already-uploaded videos)
 *   node index.js --list     just print the discovered demo videos
 *   node index.js --dry-run  report what WOULD upload, but do NOT upload
 *   node index.js --force    re-upload even if the asset already exists
 *
 * Required env (see .env.example):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 * Optional env:
 *   CLOUDINARY_FOLDER  target folder in Cloudinary (default: claude-directory-demos)
 */

import { mkdir, writeFile, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- config ---------------------------------------------------------------

// Script lives at <repo>/scripts/upload-demos/index.js → repo root is two up.
const REPO_ROOT = path.resolve(__dirname, "..", "..");

// Dirs that never hold project demos (and would be slow/huge to walk — .git,
// node_modules, and the ~100 git worktrees under .claude/worktrees/).
const SKIP_DIRS = new Set([
	"node_modules",
	".git",
	".claude",
	".github",
	"extras",
	"scripts",
]);

const CLOUDINARY_FOLDER =
	process.env.CLOUDINARY_FOLDER || "claude-directory-demos";

const OUTPUT_FILE = path.join(__dirname, "uploads.json");

const args = new Set(process.argv.slice(2));
const FLAG_LIST = args.has("--list");
const FLAG_DRY_RUN = args.has("--dry-run");
const FLAG_FORCE = args.has("--force");

// ---- helpers --------------------------------------------------------------

/**
 * Build the Cloudinary public_id (sans folder) from the repo directory.
 *
 * IMPORTANT: the website must compute the EXACT same id from its own
 * `category` + `slug` for the "no future code changes" contract to hold.
 * The transform is: join repo path segments with "__", then sanitize to a
 * safe charset (lowercase alnum + "_" + "-"), collapsing anything else to "-".
 * This handles real-world folder names with spaces, e.g.
 *   "hero-sections/vanguard hero landing/demo.mp4"
 *     -> "hero-sections__vanguard-hero-landing"
 *
 * Site side (src/lib/claude-directory.ts) must mirror this:
 *   const raw = category ? `${category}/${slug}` : slug;
 *   const id  = raw.replace(/\//g, "__").toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
 */
function publicIdFor(repoDir) {
	return repoDir
		.replace(/\//g, "__")
		.toLowerCase()
		.replace(/[^a-z0-9_-]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

function log(...m) {
	console.log(...m);
}

function fail(msg) {
	console.error(`\n✗ ${msg}`);
	process.exit(1);
}

// ---- step 1: discover demo videos by walking the local repo ---------------

async function discoverDemoVideos() {
	/** @type {{repoDir:string, repoPath:string, absPath:string, publicId:string}[]} */
	const videos = [];

	async function walk(dir) {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.isDirectory()) {
				if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) {
					continue;
				}
				await walk(path.join(dir, entry.name));
			} else if (entry.name === "demo.mp4") {
				const absPath = path.join(dir, entry.name);
				const repoPath = path
					.relative(REPO_ROOT, absPath)
					.split(path.sep)
					.join("/");
				const repoDir = repoPath.slice(0, -"/demo.mp4".length);
				videos.push({
					repoDir,
					repoPath,
					absPath,
					publicId: publicIdFor(repoDir),
				});
			}
		}
	}

	await walk(REPO_ROOT);
	videos.sort((a, b) => a.repoPath.localeCompare(b.repoPath));
	return videos;
}

// ---- step 2: upload to Cloudinary + build the delivery URL ----------------

// Fetch every already-uploaded video public_id in the target folder in a single
// paginated pass (500 per page). One bulk listing instead of one Admin API call
// per video — critical for staying under Cloudinary's ~500/hr API operation cap.
// Returns a Set of full public_ids ("<folder>/<id>").
async function fetchExistingPublicIds() {
	const existing = new Set();
	let nextCursor;
	do {
		const res = await cloudinary.api.resources({
			resource_type: "video",
			type: "upload",
			prefix: `${CLOUDINARY_FOLDER}/`,
			max_results: 500,
			next_cursor: nextCursor,
		});
		for (const r of res.resources ?? []) {
			existing.add(r.public_id);
		}
		nextCursor = res.next_cursor;
	} while (nextCursor);
	return existing;
}

async function uploadVideo(localPath, publicId) {
	// The site delivers a plain optimized mp4 (f_auto,q_auto) from this asset, so
	// we just upload the source video — no streaming rendition needed.
	return cloudinary.uploader.upload(localPath, {
		resource_type: "video",
		public_id: publicId,
		folder: CLOUDINARY_FOLDER,
		overwrite: true,
	});
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Retry transient Cloudinary errors (timeouts, 5xx, rate limits). Permanent 4xx
// errors (other than 400/420/429) fail fast.
async function uploadWithRetry(localPath, publicId, attempts = 3) {
	let lastErr;
	for (let attempt = 1; attempt <= attempts; attempt++) {
		try {
			return await uploadVideo(localPath, publicId);
		} catch (err) {
			lastErr = err;
			const code = err?.http_code ?? err?.error?.http_code;
			const retriable =
				!code || code >= 500 || code === 400 || code === 420 || code === 429;
			if (!retriable || attempt === attempts) {
				throw err;
			}
			await sleep(1000 * attempt);
		}
	}
	throw lastErr;
}

function mp4Url(publicId) {
	return cloudinary.url(`${CLOUDINARY_FOLDER}/${publicId}`, {
		resource_type: "video",
		transformation: [{ fetch_format: "auto", quality: "auto" }],
		format: "mp4",
		secure: true,
	});
}

// ---- main -----------------------------------------------------------------

async function main() {
	log(`\nclaude-directory → Cloudinary mp4\n${"=".repeat(40)}`);

	const videos = await discoverDemoVideos();
	log(`Found ${videos.length} local demo video(s).\n`);

	if (FLAG_LIST) {
		for (const v of videos) {
			const { size } = await stat(v.absPath);
			log(`  ${v.repoPath}  (${(size / 1024 / 1024).toFixed(1)} MB)`);
		}
		return;
	}

	if (!FLAG_DRY_RUN) {
		for (const key of [
			"CLOUDINARY_CLOUD_NAME",
			"CLOUDINARY_API_KEY",
			"CLOUDINARY_API_SECRET",
		]) {
			if (!process.env[key]) {
				fail(`Missing required env var: ${key}. See .env.example.`);
			}
		}
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			secure: true,
		});
	}

	// Resume support: keep a record of what we've uploaded.
	/** @type {Record<string, any>} */
	let results = {};
	try {
		results = JSON.parse(await readFile(OUTPUT_FILE, "utf8"));
	} catch {
		results = {};
	}

	// One bulk listing of what's already uploaded, so we skip locally instead of
	// making an Admin API call per video (which blows the ~500/hr quota).
	/** @type {Set<string>} */
	let existingPublicIds = new Set();
	if (!FLAG_DRY_RUN && !FLAG_FORCE) {
		log("Fetching list of already-uploaded videos…");
		existingPublicIds = await fetchExistingPublicIds();
		log(`Found ${existingPublicIds.size} already on Cloudinary.\n`);
	}

	let uploaded = 0;
	let skipped = 0;
	/** @type {string[]} */
	const failures = [];

	for (const [i, video] of videos.entries()) {
		const prefix = `[${i + 1}/${videos.length}] ${video.repoDir}`;

		try {
			if (
				!FLAG_FORCE &&
				!FLAG_DRY_RUN &&
				existingPublicIds.has(`${CLOUDINARY_FOLDER}/${video.publicId}`)
			) {
				results[video.repoDir] = {
					...results[video.repoDir],
					deliveryUrl: mp4Url(video.publicId),
					publicId: `${CLOUDINARY_FOLDER}/${video.publicId}`,
				};
				skipped++;
				continue;
			}

			if (FLAG_DRY_RUN) {
				log(`${prefix} — would upload (dry run).`);
				continue;
			}

			log(`${prefix} — uploading to Cloudinary…`);
			const res = await uploadWithRetry(video.absPath, video.publicId);
			const url = mp4Url(video.publicId);
			results[video.repoDir] = {
				repoPath: video.repoPath,
				publicId: res.public_id,
				deliveryUrl: url,
				sourceUrl: res.secure_url,
				bytes: res.bytes,
				duration: res.duration,
			};
			log(`${prefix} ✓ ${url}`);
			uploaded++;
		} catch (err) {
			// Don't let one bad asset abort the whole run — report and move on.
			const msg = err?.error?.message || err?.message || String(err);
			log(`${prefix} ✗ FAILED: ${msg}`);
			failures.push(`${video.repoDir} — ${msg}`);
		}
	}

	if (!FLAG_DRY_RUN) {
		await writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));
		log(`\n${"=".repeat(40)}`);
		log(
			`Done. Uploaded ${uploaded}, skipped ${skipped}, failed ${failures.length}.`,
		);
		log(`Manifest written to ${path.relative(REPO_ROOT, OUTPUT_FILE)}`);
		if (failures.length > 0) {
			log(`\nFailed (re-run to retry these):`);
			for (const f of failures) {
				log(`  - ${f}`);
			}
			process.exitCode = 1;
		}
	} else {
		log(`\nDry run complete. ${videos.length} local file(s) discovered.`);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
