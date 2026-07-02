/* Renders a single blog article. Expects window.ARTICLE_SLUG. */

const LOREM_BODY = [
	"Velit cillum fugiat proident pariatur anim proident laborum incididunt magna in labore adipisicing veniam quis. Ut et exercitation dolor in enim quis. Et est excepteur exercitation voluptate in qui duis nulla in anim ut commodo deserunt nisi. Dolor pariatur irure occaecat Lorem mollit veniam adipisicing.",
	"Deserunt qui ea do et laborum ad id. Tempor laborum aute fugiat tempor eu. Amet sint sint proident pariatur eiusmod mollit excepteur excepteur. Dolore cillum nulla enim tempor ad.",
	"Laborum quis proident ut anim consectetur. Consequat fugiat eiusmod qui officia duis eu minim cillum do qui. Sunt sit veniam minim ad id sunt magna est enim.",
	"Consectetur est sunt minim culpa quis aute officia incididunt ea laboris nulla officia dolor. Cupidatat cupidatat esse veniam cillum labore ullamco aliqua ex. Cillum incididunt ipsum laborum dolor enim incididunt consectetur id consectetur magna. Consequat mollit non ea cupidatat exercitation. Consequat reprehenderit eiusmod nisi ea esse id ut est consequat eu aliqua do quis.",
	"Occaecat commodo velit ea consectetur ut sit. Duis eiusmod ad tempor nisi magna dolore incididunt ea dolore. Commodo proident eiusmod consequat cupidatat consectetur adipisicing dolor commodo tempor labore non dolore Lorem consectetur.",
];

// second half of the prose-only articles (after the "Lorem Heading" sub-heading)
const LOREM_BODY2 = [
	"Nulla velit veniam velit veniam adipisicing et. Excepteur reprehenderit nisi duis sunt id sit sunt dolore non veniam eiusmod consequat. Consectetur ut minim mollit elit commodo enim aute. Proident pariatur anim culpa ex ea et laborum officia.",
	"Aliquip et nostrud ex aliqua. Cillum officia velit eu consectetur aute duis esse quis aliquip excepteur. Ex deserunt esse dolore ex in. Enim excepteur amet nulla ipsum aliquip consectetur. Ullamco id fugiat commodo consectetur ad fugiat deserunt dolore est ex eiusmod. Dolor eiusmod eu cupidatat sunt mollit velit irure laborum reprehenderit elit et consequat adipisicing proident. Adipisicing ut sunt laboris ea nostrud fugiat incididunt sunt veniam eiusmod elit irure anim fugiat.",
	"Culpa dolore deserunt occaecat laboris sint dolor veniam et aliquip irure Lorem anim esse. Laborum dolor Lorem in dolor sunt enim cupidatat consectetur ea. Labore nisi est consectetur elit commodo. Enim esse culpa cillum fugiat.",
	"Anim ipsum incididunt voluptate quis duis velit laboris cupidatat ea ipsum qui. Cupidatat do do incididunt nisi nostrud ut fugiat occaecat. Quis labore exercitation aute eiusmod duis consequat dolor ea. Ipsum officia voluptate culpa id. Lorem duis sint ex duis id nisi. Qui ex cillum enim enim. Occaecat elit voluptate eiusmod exercitation velit.",
	"Enim occaecat amet ullamco elit id consequat aliqua ut ex. Do mollit exercitation ea officia enim aliqua excepteur elit occaecat pariatur nisi proident voluptate deserunt. Nulla minim id aute officia qui elit. Dolor Lorem excepteur deserunt ipsum esse. Dolore voluptate ex veniam consectetur culpa nulla fugiat non.",
];

const CLEAN_CODE = `import React from "react";
import { motion } from "framer-motion";

export const BoxesContainer = () => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: \`translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)\`,
      }}
      className="absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 "
    >
      {rows.map((_, i) => (
        <motion.div
          key={\`row\` + i}
          className="w-16 h-8  border-l  border-slate-700 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: \`var(\${getRandomColor()})\`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={\`col\` + j}
              className="w-16 h-8  border-r border-t border-slate-700 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};`;

function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function codeBlock(file, code) {
	return `
  <div class="codeblock">
    <div class="codeblock__bar">
      <span class="codeblock__file">${file}</span>
      <button class="codeblock__copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span></button>
    </div>
    <pre><code>${esc(code)}</code></pre>
  </div>`;
}
// plain code block — no file bar / copy button (as the dark-mode article renders)
function plainCode(code) {
	return `<div class="codeblock"><pre><code>${esc(code)}</code></pre></div>`;
}
function h2(text) {
	return `<h2 class="cal prose-h">${text}</h2>`;
}
function p(text) {
	return `<p>${text}</p>`;
}

// ---- Dark-mode article (full, faithful to source) ----
const DM_CODE_INSTALL = `npx create-next-app my-app`;
const DM_CODE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Dark Mode Toggle</title>
  </head>
  <body>
    <div class="container mx-auto py-4">
      <h1 class="text-4xl font-bold mb-4">Welcome to my Dark Mode Toggle!</h1>
      <p class="text-lg">Click the button below to switch between light and dark mode.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Toggle Theme
      </button>
    </div>
  </body>
</html>`;
const DM_CODE_CSS_BASIC = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f7fafc;
}

.container {
  max-width: 800px;
}`;
const DM_CODE_USESTATE = `import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={theme === "light" ? "bg-white" : "bg-gray-800"}>
      <div className="container mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to my Dark Mode Toggle!</h1>
        <p className="text-lg">Click the button below to switch between light and dark mode.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}`;
const DM_CODE_USEEFFECT = `import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme === "light" ? "bg-white" : "bg-gray-800"}>
      <div className="container mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to my Dark Mode Toggle!</h1>
        <p className="text-lg">Click the button below to switch between light and dark mode.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}`;
const DM_CODE_CSS_TOGGLE = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f7fafc;
}
.container {
  max-width: 800px;
}
.theme-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}
.theme-toggle-button {
  width: 60px;
  height: 30px;
  border-radius: 15px;
  position: relative;
}
.theme-toggle-button::before {
  content: "";
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: \${({ theme }) => (theme === "light" ? "0" : "30px")};
  transition: all .2s ease-in-out;
}
.theme-toggle-button::after {
  content: "";
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
  top: 0;
  right: \${({ theme }) => (theme === "light" ? "0" : "30px")};
  transition: all .2s ease-in-out;
}
.theme-toggle-button:hover::before {
  transform: scale(1.2);
}
.theme-toggle-button:hover::after {
  transform: scale(1.2);
}`;
const DM_CODE_CSS_MEDIA = `@tailwind base;
@tailwind components;
@tailwind utilities;

@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a202c;
  }
  .text-gray-800 {
    color: #fff;
  }
}`;

function darkModeBody() {
	const c = (t) => `<code class="inline">${t}</code>`;
	return [
		p(
			"As a web developer, you may be wondering how to create a dark mode toggle for your web application. In this tutorial, we will explore how to implement a dark mode toggle with Next.js and Tailwind CSS.",
		),
		h2("Introduction"),
		p(
			"The benefits of implementing a dark mode toggle in a web application are numerous. It can help reduce eye strain, improve readability, and even save battery life on mobile devices. The trend towards dark mode has been growing in popularity, and it's no surprise that users are now expecting it as a standard feature in their favorite applications.",
		),
		p(
			"Next.js is a React framework that provides server-side rendering, making it easier to create performant and scalable web applications. Tailwind CSS is a utility-first CSS framework that allows for quick and easy styling of web applications.",
		),
		p(
			"In this tutorial, we will be using Next.js and Tailwind CSS to create a dark mode toggle for our web application.",
		),
		h2("Setting up the Project"),
		p(
			"To get started, we need to install both Next.js and Tailwind CSS. We can install Next.js by running the following command in our terminal:",
		),
		plainCode(DM_CODE_INSTALL),
		p(
			"Once Next.js is installed, we can install Tailwind CSS by running the following command:",
		),
		p("npm install tailwindcss"),
		p(
			`After installing Tailwind CSS, we need to create the basic structure of our application. We can do this by creating a new file called ${c("index.js")} in the ${c("pages")} directory of our project.`,
		),
		p("In this file, we can add some basic HTML to display our content:"),
		plainCode(DM_CODE_HTML),
		p(
			`We can then add some basic styling to our application using Tailwind CSS. We can do this by creating a new file called ${c("styles.css")} in the ${c("styles")} directory of our project.`,
		),
		p(
			"In this file, we can add the following code to apply some basic styles to our application:",
		),
		plainCode(DM_CODE_CSS_BASIC),
		h2("Implementing the Dark Mode Toggle"),
		p(
			"Now that our basic application structure and styling are complete, we can move on to implementing the dark mode toggle functionality.",
		),
		p(
			`To do this, we need to create a state variable to track the user's preferred theme. We can do this by adding the following code to our ${c("index.js")} file:`,
		),
		plainCode(DM_CODE_USESTATE),
		p(
			`In this code, we are using the ${c("useState")} hook from React to create a state variable called ${c("theme")}. The default value of ${c("theme")} is set to ${c('"light"')}.`,
		),
		p(
			"We are also using a ternary operator to conditionally apply a background color to our application based on the user's preferred theme. If the user has selected the light theme, we apply a white background color. If the user has selected the dark theme, we apply a dark gray background color.",
		),
		p(
			`We are also using an ${c("onClick")} event handler to toggle the user's preferred theme between light and dark.`,
		),
		h2("Improving the User Experience"),
		p(
			"Now that we have implemented the basic functionality of our dark mode toggle, we can improve the user experience by adding some additional features.",
		),
		p(
			`First, we can persist the user's theme preference using localStorage. We can do this by adding the following code to our ${c("index.js")} file:`,
		),
		plainCode(DM_CODE_USEEFFECT),
		p(
			`In this code, we are using the ${c("useEffect")} hook from React to load the user's preferred theme from localStorage when the component mounts. We are also using another ${c("useEffect")} hook to save the user's preferred theme to localStorage whenever it changes.`,
		),
		p(
			`Next, we can add some animations to our toggle button to enhance user feedback. We can do this by adding the following code to our ${c("styles.css")} file:`,
		),
		plainCode(DM_CODE_CSS_TOGGLE),
		p(
			"In this code, we are using CSS to create a toggle button with two states - light and dark. We are also using CSS transitions to animate the button when it is hovered over.",
		),
		p(
			`Finally, we can implement a media query to automatically switch between light and dark themes based on the user's device settings. We can do this by adding the following code to our ${c("styles.css")} file:`,
		),
		plainCode(DM_CODE_CSS_MEDIA),
		p(
			"In this code, we are using a media query to check for the user's preferred color scheme. If the user has selected a dark color scheme, we apply a dark background color and change the text color to white.",
		),
		h2("Conclusion"),
		p(
			"Summary: We've covered creating a dark mode toggle in Next.js and Tailwind CSS, including project setup, implementing toggle functionality, enhancing UX with localStorage and animations, and auto-switching themes based on device settings.",
		),
		p(
			"By implementing a dark mode toggle in your web application, you can improve the user experience and stay up-to-date with current design trends. With Next.js and Tailwind CSS, creating a dark mode toggle is quick and easy.",
		),
		p(
			"If you want to further customize and improve the toggle functionality, you can explore the documentation for Next.js and Tailwind CSS to learn more about their capabilities.",
		),
	].join("");
}

// per-article body (faithful to source)
function bodyFor(slug) {
	if (slug === "clean-code") {
		return (
			LOREM_BODY.map(p).join("") +
			h2("Code Snippet") +
			codeBlock("BoxesContainer.tsx", CLEAN_CODE)
		);
	}
	if (slug === "dark-mode-with-nextjs") {
		return darkModeBody();
	}
	// prose-only articles (how-to-win-clients, tailwindcss-tips-and-tricks)
	return (
		LOREM_BODY.map(p).join("") +
		h2("Lorem Heading") +
		LOREM_BODY2.map(p).join("")
	);
}

const ART_DATES = {
	"clean-code": "August 18, 2023",
	"how-to-win-clients": "August 18, 2023",
	"tailwindcss-tips-and-tricks": "August 18, 2023",
	"dark-mode-with-nextjs": "April 19, 2023",
};

const a = window.ARTICLES.find((x) => x.slug === window.ARTICLE_SLUG);
document.getElementById("app").innerHTML = `
  <a class="back-arrow" href="../blog.html">&larr;</a>
  <h1 class="cal h1">${a.title}</h1>
  <p class="article-date">${ART_DATES[a.slug]}</p>
  <img class="article-hero" src="../${a.image}" alt="${a.title}" />
  <div class="prose">${bodyFor(a.slug)}</div>
`;

window.SidefolioChrome.mountChrome("articles", "../");
