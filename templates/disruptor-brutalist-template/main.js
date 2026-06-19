/* ===================== DISRUPTOR — main.js ===================== */
(() => {
  "use strict";

  /* ---------- inline SVG square avatar (no external requests) ---------- */
  function avatar(seed, bg) {
    const initials = seed
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
      <rect width='48' height='48' fill='${bg}'/>
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle'
        font-family='Archivo, sans-serif' font-weight='900' font-size='20' fill='#000'>${initials}</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  /* ---------- tickers ---------- */
  function buildTicker(el, items) {
    if (!el) return;
    const once = items.map((t) => `<span>${t}</span>`).join("");
    el.innerHTML = once + once; // duplicate track for seamless -50% loop
  }
  buildTicker(document.getElementById("ticker-top"), [
    "HIGH OUTPUT •",
    "ZERO BLOAT •",
    "SHIP DAILY •",
    "BUILD LOUD •",
    "TECHNICAL PRECISION •",
    "4PX BORDERS •",
  ]);
  buildTicker(document.getElementById("ticker-foot"), [
    "SHIP FAST •",
    "BUILD LOUD •",
    "DISRUPT EVERYTHING •",
    "NO GUESSWORK •",
  ]);

  /* ---------- social proof sticker cards ---------- */
  const PROOF = [
    { name: "Maya Cole", role: "CTO // VELOCITY", q: "We cut our deploy time by 80%. Disruptor is unfair.", rot: -2, av: "#ccff00" },
    { name: "Jonas Reed", role: "ENG LEAD // FORGE", q: "Heavy borders, zero bloat. Exactly how we ship.", rot: 2, av: "#ffffff" },
    { name: "Lena Park", role: "FOUNDER // NORTHBYTE", q: "Brutalist by design, fast by default. Shipped in days.", rot: -2, av: "#ccff00" },
    { name: "Theo Mensah", role: "VP ENG // PULSE", q: "The most opinionated stack we've ever loved.", rot: 2, av: "#ffffff" },
  ];
  const pg = document.getElementById("proof-grid");
  if (pg) {
    pg.innerHTML = PROOF.map(
      (p) => `
      <article class="scard reveal" style="transform:rotate(${p.rot}deg)">
        <div class="scard__top">
          <img class="scard__av" src="${avatar(p.name, p.av)}" alt="" width="48" height="48"/>
          <div>
            <div class="scard__name">${p.name}</div>
            <div class="scard__role">${p.role}</div>
          </div>
        </div>
        <p class="scard__quote">"${p.q.toUpperCase()}"</p>
      </article>`
    ).join("");
  }

  /* ---------- comparison rows ---------- */
  const ROWS = [
    { old: "Slow Setup", better: "Instant Deploy" },
    { old: "Bloated Stack", better: "Lean Core" },
    { old: "Guesswork", better: "Hard Data" },
  ];
  const cr = document.getElementById("compare-rows");
  if (cr) {
    cr.innerHTML = ROWS.map(
      (r) => `
      <div class="crow reveal">
        <div class="chalf chalf--old">
          <span class="mono-label" style="color:#64748b">// THE OLD WAY</span>
          <h3 class="display chalf__title">${r.old}</h3>
        </div>
        <div class="chalf chalf--new">
          <span class="mono-label">// THE BETTER WAY</span>
          <h3 class="display chalf__title">${r.better}</h3>
        </div>
      </div>`
    ).join("");
  }

  /* ---------- process blueprint cards ---------- */
  const STEPS = [
    { n: "01", title: "Design", body: "Lay the blueprint. Strict tokens, heavy borders, zero ambiguity. Every pixel has a job." },
    { n: "02", title: "Build", body: "Assemble the machine. Lean core, no dead weight. Components that snap together hard." },
    { n: "03", title: "Ship", body: "Push it live, loud. Solid shadows, high contrast, undeniable presence. No second-guessing." },
  ];
  const prg = document.getElementById("process-grid");
  if (prg) {
    prg.innerHTML = STEPS.map(
      (s) => `
      <article class="pcard reveal">
        <span class="pcard__wm display">${s.n}</span>
        <span class="pcard__step">STEP ${s.n}</span>
        <h3 class="display pcard__title">${s.title}</h3>
        <p class="pcard__body">${s.body}</p>
      </article>`
    ).join("");
  }

  /* ---------- live countdown ---------- */
  const target = new Date();
  target.setDate(target.getDate() + 12);
  target.setHours(target.getHours() + 8, target.getMinutes() + 42, target.getSeconds() + 15, 0);
  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
  const elD = document.getElementById("cd-d");
  const elH = document.getElementById("cd-h");
  const elM = document.getElementById("cd-m");
  const elS = document.getElementById("cd-s");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tick() {
    let diff = Math.floor((target - new Date()) / 1000);
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / 86400);
    const h = Math.floor((diff % 86400) / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    if (elD) elD.textContent = pad(d);
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) {
      elS.textContent = pad(s);
      if (!reduce) {
        elS.classList.add("pulse");
        setTimeout(() => elS.classList.remove("pulse"), 120);
      }
    }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const sibs = Array.from(e.target.parentElement.querySelectorAll(".reveal"));
            const idx = Math.max(0, sibs.indexOf(e.target));
            e.target.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("in"));
  }
})();
