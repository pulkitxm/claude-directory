#!/usr/bin/env node
/**
 * Generate poster images for every project demo.mp4 in the repo.
 *
 * For each `**\/demo.mp4` this writes, next to the video:
 *   - `poster.jpg`  — a representative still frame (max 1280px wide) used as the
 *                     `<video poster>` so something sharp shows the instant the
 *                     card/page renders, before the video has buffered.
 *
 * It also writes a single `posters.json` manifest at the repo root keyed by the
 * project's path relative to the repo (e.g. "hero-sections/transform-data-hero"):
 *
 *   {
 *     "hero-sections/transform-data-hero": {
 *       "poster": "hero-sections/transform-data-hero/poster.jpg",
 *       "video":  "hero-sections/transform-data-hero/demo.mp4",
 *       "width":  1280,
 *       "height": 800,
 *       "blurDataURL": "data:image/jpeg;base64,...."  // ~24px, inline LQIP
 *     }
 *   }
 *
 * The consuming gallery site can use `blurDataURL` as an instant zero-request
 * placeholder, swap in `poster.jpg` once it loads, and only then fade the video
 * in — so a video that is slow (or never) loading never shows a blank box.
 *
 * Frame selection uses ffmpeg's `thumbnail` filter over the opening of the clip,
 * which skips black fade-in frames and picks a content-rich frame automatically.
 *
 * ffmpeg resolution order: $FFMPEG_PATH -> `ffmpeg` on PATH -> the optional
 * `ffmpeg-static` dependency. Install it once with `npm install` in this folder
 * if you don't have a system ffmpeg.
 *
 * Usage:
 *   node generate-posters.mjs                 # only (re)generate missing posters
 *   node generate-posters.mjs --force         # regenerate every poster
 *   node generate-posters.mjs --only <substr> # limit to matching project paths
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");

const CONFIG = {
	posterMaxWidth: 1280, // poster.jpg is capped to this width (keeps files small)
	posterQuality: 4, // ffmpeg -q:v for the poster (2 best .. 31 worst)
	lqipWidth: 24, // tiny blurred placeholder embedded as a data URI
	lqipQuality: 8,
	thumbnailWindow: 90, // frames ffmpeg's `thumbnail` filter samples from the open
};

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx !== -1 ? args[onlyIdx + 1] : null;

function resolveFfmpeg() {
	if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
		return process.env.FFMPEG_PATH;
	}
	try {
		execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
		return "ffmpeg";
	} catch {
		/* fall through to ffmpeg-static */
	}
	try {
		const require = createRequire(import.meta.url);
		const p = require("ffmpeg-static");
		if (p && fs.existsSync(p)) return p;
	} catch {
		/* not installed */
	}
	console.error(
		"ffmpeg not found. Install a system ffmpeg, set FFMPEG_PATH, or run " +
			"`npm install` in scripts/generate-posters to pull in ffmpeg-static.",
	);
	process.exit(1);
}

const FFMPEG = resolveFfmpeg();

/** Recursively collect every directory that directly contains a demo.mp4. */
function findProjectDirs(dir, out = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) findProjectDirs(full, out);
		else if (entry.name === "demo.mp4") out.push(dir);
	}
	return out;
}

function runFfmpeg(ffArgs) {
	execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", ...ffArgs], {
		stdio: ["ignore", "ignore", "pipe"],
	});
}

/** Read the encoded dimensions of a generated jpg (ffmpeg prints these to stderr). */
function readJpgSize(file) {
	const { stderr } = spawnSync(FFMPEG, ["-hide_banner", "-i", file], {
		encoding: "utf8",
	});
	const m = (stderr || "").match(/,\s*(\d{2,5})x(\d{2,5})/);
	return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

function makePoster(video, posterPath) {
	runFfmpeg([
		"-y",
		"-i",
		video,
		"-vf",
		`thumbnail=n=${CONFIG.thumbnailWindow},scale='min(${CONFIG.posterMaxWidth},iw)':-2`,
		"-frames:v",
		"1",
		"-q:v",
		String(CONFIG.posterQuality),
		posterPath,
	]);
}

function makeBlurDataURL(video, tmpPath) {
	runFfmpeg([
		"-y",
		"-i",
		video,
		"-vf",
		`thumbnail=n=${CONFIG.thumbnailWindow},scale=${CONFIG.lqipWidth}:-2`,
		"-frames:v",
		"1",
		"-q:v",
		String(CONFIG.lqipQuality),
		tmpPath,
	]);
	const b64 = fs.readFileSync(tmpPath).toString("base64");
	fs.rmSync(tmpPath, { force: true });
	return `data:image/jpeg;base64,${b64}`;
}

function main() {
	const dirs = findProjectDirs(REPO_ROOT)
		.map((d) => path.relative(REPO_ROOT, d))
		.filter((rel) => !ONLY || rel.includes(ONLY))
		.sort();

	console.log(`Found ${dirs.length} project(s) with a demo.mp4.`);

	const manifestPath = path.join(REPO_ROOT, "posters.json");
	const manifest = fs.existsSync(manifestPath)
		? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
		: {};

	let generated = 0;
	let skipped = 0;
	let failed = 0;

	for (const rel of dirs) {
		const video = path.join(REPO_ROOT, rel, "demo.mp4");
		const posterPath = path.join(REPO_ROOT, rel, "poster.jpg");
		const hasPoster = fs.existsSync(posterPath);

		if (!FORCE && hasPoster && manifest[rel]?.blurDataURL) {
			skipped++;
			continue;
		}

		try {
			makePoster(video, posterPath);
			const size = readJpgSize(posterPath);
			const blurDataURL = makeBlurDataURL(
				video,
				path.join(REPO_ROOT, rel, ".lqip.tmp.jpg"),
			);
			manifest[rel] = {
				poster: `${rel}/poster.jpg`,
				video: `${rel}/demo.mp4`,
				width: size?.width ?? null,
				height: size?.height ?? null,
				blurDataURL,
			};
			generated++;
			console.log(`  ✓ ${rel}`);
		} catch (err) {
			failed++;
			console.error(`  ✗ ${rel}: ${err.message.split("\n")[0]}`);
		}
	}

	// Drop manifest entries whose project/demo no longer exists.
	for (const rel of Object.keys(manifest)) {
		if (!fs.existsSync(path.join(REPO_ROOT, rel, "demo.mp4"))) {
			delete manifest[rel];
		}
	}

	const ordered = Object.fromEntries(
		Object.keys(manifest)
			.sort()
			.map((k) => [k, manifest[k]]),
	);
	fs.writeFileSync(manifestPath, JSON.stringify(ordered, null, 2) + "\n");

	console.log(
		`\nDone. generated=${generated} skipped=${skipped} failed=${failed}`,
	);
	console.log(`Manifest written to ${path.relative(REPO_ROOT, manifestPath)}`);
}

main();
