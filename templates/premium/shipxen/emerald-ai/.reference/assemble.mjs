import fs from "node:fs";
const body = fs.readFileSync("body.html", "utf8");
const head = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Emerald AI Landing Page Template | Shipixen (Clone)</title>
<meta name="description" content="Transform Your Business Today — Emerald AI, a dark glassy AI product landing page. Self-contained HTML/CSS/JS clone of the Shipixen Emerald AI template." />
<link rel="icon" href="./assets/images/icon.png" />
<!-- Theme variables (.preview violet+teal theme) — must load before utilities -->
<link rel="stylesheet" href="./assets/css/theme.css" />
<!-- Original compiled Tailwind build (provides all utility classes) -->
<link rel="stylesheet" href="./assets/css/shipixen-compiled.css" />
<!-- Vendored Google fonts (Roboto Serif + Rubik) -->
<link rel="stylesheet" href="./assets/fonts/google-fonts.css" />
<!-- Clone-local overrides + Inter face -->
<link rel="stylesheet" href="./styles.css" />
</head>
<body class="bg-white text-black antialiased dark:bg-gray-950 dark:text-white dark font-sans">
<div class="w-full flex flex-col justify-between items-center min-h-screen">
<main class="w-full flex flex-col items-center mb-auto">
`;
const foot = `
</main>
</div>
<script src="./script.js"></script>
</body>
</html>
`;
fs.writeFileSync("index.html", head + body + foot);
console.log("index.html written", (head+body+foot).length, "bytes");
