import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.argv[2]);
const projects = process.argv.slice(3);
const contentTypes = new Map([
	[".css", "text/css"],
	[".html", "text/html"],
	[".js", "text/javascript"],
	[".mjs", "text/javascript"],
]);

const server = createServer(async (request, response) => {
	try {
		const pathname = decodeURIComponent(
			new URL(request.url, "http://localhost").pathname,
		);
		const relative = normalize(pathname).replace(/^[/\\]+/, "");
		let file = resolve(root, relative);
		if (file !== root && !file.startsWith(`${root}${sep}`))
			throw new Error("Invalid path");
		if ((await stat(file)).isDirectory()) file = join(file, "index.html");
		response.setHeader(
			"content-type",
			contentTypes.get(extname(file)) ?? "application/octet-stream",
		);
		createReadStream(file).pipe(response);
	} catch {
		response.statusCode = 404;
		response.end("Not found");
	}
});

await new Promise((resolvePromise) =>
	server.listen(0, "127.0.0.1", resolvePromise),
);
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;

try {
	for (const project of projects) {
		const url = `${origin}/${project}/`;
		const response = await fetch(url);
		if (!response.ok) throw new Error(`${project} returned ${response.status}`);
		const html = await response.text();
		if (!html.includes("</html>") || html.length < 100)
			throw new Error(`${project} has no usable HTML`);
		const assets = [
			...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi),
			...html.matchAll(
				/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi,
			),
		].map((match) => match[1]);
		if (assets.length === 0)
			throw new Error(`${project} has no CSS or JavaScript assets`);
		for (const asset of assets) {
			const assetUrl = new URL(asset, url);
			if (assetUrl.origin !== origin) continue;
			const assetResponse = await fetch(assetUrl);
			if (!assetResponse.ok)
				throw new Error(`${project} is missing ${assetUrl.pathname}`);
		}
		await readFile(join(root, project, "index.html"));
		process.stdout.write(`Verified ${project}\n`);
	}
} finally {
	await new Promise((resolvePromise, reject) =>
		server.close((error) => (error ? reject(error) : resolvePromise())),
	);
}
