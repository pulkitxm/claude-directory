import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const run = (command, args) =>
	execFileSync(command, args, {
		encoding: "utf8",
		maxBuffer: 64 * 1024 * 1024,
	}).trim();

const dateKey = (value) => {
	const date = new Date(value);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

const dateFromKey = (key) => {
	const [year, month, day] = key.split("-").map(Number);
	return new Date(year, month - 1, day);
};

const shiftedDateKey = (key, days) => {
	const date = dateFromKey(key);
	date.setDate(date.getDate() + days);
	return dateKey(date);
};

const increment = (counts, key) => counts.set(key, (counts.get(key) ?? 0) + 1);

const nameWithOwner = run("gh", [
	"repo",
	"view",
	"--json",
	"nameWithOwner",
	"--jq",
	".nameWithOwner",
]);
const [owner, name] = nameWithOwner.split("/");
const today = new Date();
today.setHours(0, 0, 0, 0);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const stableCutoff = dateKey(yesterday);
const cachePath = resolve(
	run("git", ["rev-parse", "--git-path", "contri-cache.json"]),
);
let cachedDays = {};
let cachedCloc;

try {
	const cache = JSON.parse(readFileSync(cachePath, "utf8"));
	if (cache.version === 1 && cache.repository === nameWithOwner) {
		cachedDays = cache.days;
		cachedCloc = cache.cloc;
	}
} catch {}

const cachedDates = Object.keys(cachedDays)
	.filter((date) => date < stableCutoff)
	.sort();
const cachedDateSet = new Set(cachedDates);
const nextUncachedDate = cachedDates.length
	? shiftedDateKey(cachedDates.at(-1), 1)
	: undefined;
const dayBeforeYesterday = shiftedDateKey(stableCutoff, -1);
const recalculationStart = nextUncachedDate
	? nextUncachedDate < dayBeforeYesterday
		? nextUncachedDate
		: dayBeforeYesterday
	: undefined;
const commitStats = new Map();
const pullRequestCounts = new Map();

for (const date of cachedDates) {
	const day = cachedDays[date];
	commitStats.set(date, {
		commits: day.Commits,
		added: day["Lines Added"],
		removed: day["Lines Removed"],
	});
	pullRequestCounts.set(date, day.PRs);
}

const commitLogArgs = ["log", "--all", "--format=commit:%at", "--numstat"];
if (recalculationStart)
	commitLogArgs.push("--since", `${recalculationStart} 00:00:00`);
const commitLog = run("git", commitLogArgs);
let currentCommitDate;

for (const line of commitLog.split("\n")) {
	if (line.startsWith("commit:")) {
		const timestamp = Number(line.slice(7));
		currentCommitDate = dateKey(timestamp * 1000);
		if (cachedDateSet.has(currentCommitDate)) {
			currentCommitDate = undefined;
			continue;
		}
		const stats = commitStats.get(currentCommitDate) ?? {
			commits: 0,
			added: 0,
			removed: 0,
		};
		stats.commits += 1;
		commitStats.set(currentCommitDate, stats);
		continue;
	}

	const match = line.match(/^(\d+|-)\t(\d+|-)\t/);
	if (!match || !currentCommitDate) continue;
	const stats = commitStats.get(currentCommitDate);
	if (match[1] !== "-") stats.added += Number(match[1]);
	if (match[2] !== "-") stats.removed += Number(match[2]);
}

let pullRequestDates;

if (recalculationStart) {
	const searchStart = shiftedDateKey(recalculationStart, -1);
	const pages = JSON.parse(
		run("gh", [
			"api",
			"--paginate",
			"--slurp",
			"-X",
			"GET",
			"search/issues",
			"-f",
			`q=repo:${nameWithOwner} is:pr created:>=${searchStart}`,
			"-f",
			"per_page=100",
		]),
	);
	pullRequestDates = pages
		.flatMap((page) => page.items.map(({ created_at: createdAt }) => createdAt))
		.filter((createdAt) => dateKey(createdAt) >= recalculationStart);
} else {
	const query = `query($owner:String!,$name:String!,$endCursor:String){repository(owner:$owner,name:$name){pullRequests(first:100,after:$endCursor,orderBy:{field:CREATED_AT,direction:ASC}){nodes{createdAt}pageInfo{hasNextPage endCursor}}}}`;
	const pages = JSON.parse(
		run("gh", [
			"api",
			"graphql",
			"--paginate",
			"--slurp",
			"-f",
			`owner=${owner}`,
			"-f",
			`name=${name}`,
			"-f",
			`query=${query}`,
		]),
	);
	pullRequestDates = pages.flatMap((page) =>
		page.data.repository.pullRequests.nodes.map(({ createdAt }) => createdAt),
	);
}

for (const createdAt of pullRequestDates) {
	const date = dateKey(createdAt);
	if (!cachedDateSet.has(date)) increment(pullRequestCounts, date);
}

const activityDates = [
	...commitStats.keys(),
	...pullRequestCounts.keys(),
].sort();

if (activityDates.length === 0) {
	console.log("No commits or pull requests found.");
	process.exit(0);
}

const rows = [];
const cursor = dateFromKey(activityDates[0]);

while (cursor <= today) {
	const date = dateKey(cursor);
	const stats = commitStats.get(date) ?? { commits: 0, added: 0, removed: 0 };
	rows.push({
		Date: date,
		PRs: pullRequestCounts.get(date) ?? 0,
		Commits: stats.commits,
		"Lines Added": stats.added,
		"Lines Removed": stats.removed,
		"Net LOC": stats.added - stats.removed,
	});
	cursor.setDate(cursor.getDate() + 1);
}

const stableDays = Object.fromEntries(
	rows
		.filter((row) => row.Date < stableCutoff)
		.map((row) => [
			row.Date,
			{
				PRs: row.PRs,
				Commits: row.Commits,
				"Lines Added": row["Lines Added"],
				"Lines Removed": row["Lines Removed"],
				"Net LOC": row["Net LOC"],
			},
		]),
);
const clocKey = createHash("sha256")
	.update(run("git", ["rev-parse", "HEAD"]))
	.update("\0")
	.update(run("git", ["diff", "--no-ext-diff", "--"]))
	.update("\0")
	.update(run("git", ["diff", "--cached", "--no-ext-diff", "--"]))
	.digest("hex");
const cloc =
	cachedCloc?.key === clocKey
		? cachedCloc.output
		: run("make", ["--no-print-directory", "cloc"]);
writeFileSync(
	cachePath,
	JSON.stringify({
		version: 1,
		repository: nameWithOwner,
		days: stableDays,
		cloc: { key: clocKey, output: cloc },
	}),
);

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const templatePath = resolve(scriptDirectory, "contri-report-template.html");
const reportPath = resolve(scriptDirectory, "contri-report.html");
const reportData = JSON.stringify({
	repository: nameWithOwner,
	generatedAt: new Date().toISOString(),
	cloc,
	rows,
}).replaceAll("<", "\\u003c");
const report = readFileSync(templatePath, "utf8").replace(
	"__CONTRI_REPORT_DATA__",
	() => reportData,
);
writeFileSync(reportPath, report);

console.log(`\nHTML report: ${reportPath}`);
console.log(`Contribution cache: ${cachePath}`);

if (stdin.isTTY && stdout.isTTY) {
	const prompt = createInterface({ input: stdin, output: stdout });
	const answer = await prompt.question(
		"Press Enter to open the HTML report, or type anything to skip: ",
	);
	prompt.close();
	if (answer === "") {
		try {
			execFileSync("open", [reportPath]);
		} catch {
			console.error(
				`Could not open the report. Open it manually: ${reportPath}`,
			);
		}
	}
}
