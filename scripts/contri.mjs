import { execFileSync } from "node:child_process";

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

const increment = (counts, key) => counts.set(key, (counts.get(key) ?? 0) + 1);

const commitStats = new Map();
const commitTimestamps = [];
const commitLog = run("git", [
	"log",
	"--all",
	"--format=commit:%at",
	"--numstat",
]);
let currentCommitDate;

for (const line of commitLog.split("\n")) {
	if (line.startsWith("commit:")) {
		const timestamp = Number(line.slice(7));
		currentCommitDate = dateKey(timestamp * 1000);
		commitTimestamps.push(timestamp);
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

const nameWithOwner = run("gh", [
	"repo",
	"view",
	"--json",
	"nameWithOwner",
	"--jq",
	".nameWithOwner",
]);
const [owner, name] = nameWithOwner.split("/");
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
const pullRequestDates = pages.flatMap((page) =>
	page.data.repository.pullRequests.nodes.map(({ createdAt }) => createdAt),
);
const pullRequestCounts = new Map();

for (const createdAt of pullRequestDates)
	increment(pullRequestCounts, dateKey(createdAt));

const firstTimestamp = Math.min(
	commitTimestamps.length
		? Math.min(...commitTimestamps) * 1000
		: Number.POSITIVE_INFINITY,
	pullRequestDates.length
		? Math.min(...pullRequestDates.map(Date.parse))
		: Number.POSITIVE_INFINITY,
);

if (!Number.isFinite(firstTimestamp)) {
	console.log("No commits or pull requests found.");
	process.exit(0);
}

const rows = [];
const cursor = new Date(firstTimestamp);
cursor.setHours(0, 0, 0, 0);
const today = new Date();
today.setHours(0, 0, 0, 0);

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

const totals = [...commitStats.values()].reduce(
	(total, stats) => ({
		added: total.added + stats.added,
		removed: total.removed + stats.removed,
	}),
	{ added: 0, removed: 0 },
);
rows.push({
	Date: "TOTAL",
	PRs: pullRequestDates.length,
	Commits: commitTimestamps.length,
	"Lines Added": totals.added,
	"Lines Removed": totals.removed,
	"Net LOC": totals.added - totals.removed,
});
console.table(rows);
