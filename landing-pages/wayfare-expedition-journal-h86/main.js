(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const trips = [{
    cat: "mountains",
    img: "field-2",
    region: "Dolomites",
    title: "Alta Via Traverse",
    from: "Bolzano",
    to: "Cortina",
    dur: "8 days",
    diff: "Strenuous",
    price: "2,940",
    tick: "IT · 46.5°N"
  }, {
    cat: "coast",
    img: "field-3",
    region: "Lofoten",
    title: "Arctic Sea Trail",
    from: "Svolvær",
    to: "Reine",
    dur: "6 days",
    diff: "Moderate",
    price: "2,210",
    tick: "NO · 68.1°N"
  }, {
    cat: "desert",
    img: "field-1",
    region: "Wadi Rum",
    title: "Red Sands Crossing",
    from: "Aqaba",
    to: "Petra",
    dur: "7 days",
    diff: "Moderate",
    price: "2,480",
    tick: "JO · 29.6°N"
  }, {
    cat: "polar",
    img: "field-2",
    region: "Highlands",
    title: "Glacier &amp; Geyser",
    from: "Reykjavík",
    to: "Höfn",
    dur: "9 days",
    diff: "Strenuous",
    price: "3,360",
    tick: "IS · 64.9°N"
  }, {
    cat: "mountains",
    img: "field-3",
    region: "Patagonia",
    title: "Torres Circuit",
    from: "El Chaltén",
    to: "Paine",
    dur: "10 days",
    diff: "Expert",
    price: "3,690",
    tick: "CL · 50.9°S"
  }, {
    cat: "coast",
    img: "field-1",
    region: "Amalfi",
    title: "Path of the Gods",
    from: "Sorrento",
    to: "Positano",
    dur: "5 days",
    diff: "Easy",
    price: "1,880",
    tick: "IT · 40.6°N"
  }, {
    cat: "desert",
    img: "field-2",
    region: "Atacama",
    title: "High Desert Stars",
    from: "Calama",
    to: "Uyuni",
    dur: "8 days",
    diff: "Moderate",
    price: "2,760",
    tick: "CL · 23.6°S"
  }, {
    cat: "polar",
    img: "field-3",
    region: "Svalbard",
    title: "Frozen North Sail",
    from: "Longyearbyen",
    to: "Pyramiden",
    dur: "7 days",
    diff: "Expert",
    price: "4,120",
    tick: "SJ · 78.2°N"
  }];
  const arr = '<svg class="arr" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const routeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M7.5 16.5 16.5 7.5"/></svg>';
  const grid = document.getElementById("grid");
  grid.innerHTML = trips.map(t => `
    <article class="card" data-cat="${t.cat}">
      <div class="media frame">
        <div role="img" data-visual="${t.img}" aria-label="Original abstract geometric study"  class="procedural-visual"></div>
        <span class="region">${t.region}</span>
        <span class="tick">${t.tick}</span>
      </div>
      <h3>${t.title}</h3>
      <div class="route">${routeIcon}${t.from} → ${t.to}</div>
      <div class="meta">${t.dur}<span class="d"></span>${t.diff}</div>
      <div class="card-foot">
        <div class="price">$${t.price} <small>/ person</small></div>
        <a href="#" class="viewroute">View route ${arr}</a>
      </div>
    </article>`).join("");
  const chips = document.getElementById("chips");
  chips.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    chips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    grid.querySelectorAll(".card").forEach(card => {
      const show = f === "all" || card.dataset.cat === f;
      if (reduce) {
        card.classList.toggle("hide", !show);
        return;
      }
      card.classList.add("fade");
      setTimeout(() => {
        card.classList.toggle("hide", !show);
        requestAnimationFrame(() => card.classList.remove("fade"));
      }, 220);
    });
  });
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  addEventListener("scroll", onScroll, {
    passive: true
  });
  const sheet = document.getElementById("sheet");
  const open = () => {
    sheet.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    sheet.classList.remove("open");
    document.body.style.overflow = "";
  };
  document.getElementById("burger").addEventListener("click", open);
  document.getElementById("sheetX").addEventListener("click", close);
  sheet.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  const revs = document.querySelectorAll("[data-reveal]");
  if (reduce) {
    revs.forEach(el => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en, _i) => {
        if (en.isIntersecting) {
          const sibs = [...en.target.parentElement.querySelectorAll(":scope > [data-reveal]")];
          en.target.style.transitionDelay = `${Math.max(0, sibs.indexOf(en.target)) * 80}ms`;
          en.target.classList.add("in");
          obs.unobserve(en.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    revs.forEach(el => io.observe(el));
  }
  const fmt = n => n >= 1000 ? n.toLocaleString("en-US") : String(n);
  const counters = document.querySelectorAll("[data-count]");
  const runCount = el => {
    const target = +el.dataset.count;
    if (reduce) {
      el.textContent = fmt(target);
      return;
    }
    const start = performance.now(),
      dur = 1500;
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - (1 - p) ** 3;
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const cio = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        runCount(en.target);
        obs.unobserve(en.target);
      }
    });
  }, {
    threshold: 0.6
  });
  counters.forEach(c => cio.observe(c));
  const heroBg = document.getElementById("heroBg");
  if (heroBg && !reduce) {
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.18}px) scale(1.04)`;
        ticking = false;
      });
    }, {
      passive: true
    });
  }
  const gg = document.getElementById("guidesGrid");
  const amt = () => Math.min(gg.clientWidth * 0.7, 560);
  document.getElementById("gNext").addEventListener("click", () => gg.scrollBy({
    left: amt(),
    behavior: "smooth"
  }));
  document.getElementById("gPrev").addEventListener("click", () => gg.scrollBy({
    left: -amt(),
    behavior: "smooth"
  }));
  const quotes = [{
    q: '"Wayfare didn\'t book us a holiday ,  they handed us a <span class="clay">version of ourselves</span> we\'d forgotten existed somewhere above the treeline."',
    img: "field-1",
    who: "Priya &amp; Daniel Nair",
    sub: "Torres del Paine Circuit · 2025"
  }, {
    q: '"I\'ve traveled for thirty years. This was the first time the <span class="clay">logistics disappeared</span> entirely and all that was left was the place itself."',
    img: "field-2",
    who: "Marcus Ahlberg",
    sub: "Lofoten Arctic Sea Trail · 2025"
  }, {
    q: '"Our guide knew which dune to climb at dusk and which family would feed us after. You cannot <span class="clay">buy that from a brochure</span>."',
    img: "field-3",
    who: "Lina Haddad",
    sub: "Wadi Rum Red Sands · 2024"
  }];
  const box = document.getElementById("quoteBox");
  const dots = [...document.getElementById("qdots").children];
  let qi = 0,
    qTimer;
  const renderQuote = i => {
    const t = quotes[i];
    box.innerHTML = `<blockquote>${t.q}</blockquote>
      <div class="attrib"><div role="img" data-visual="${t.img}" aria-label="Procedural color study" class="procedural-visual"></div>
      <div class="who"><b>${t.who}</b><small>${t.sub}</small></div></div>`;
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    qi = i;
  };
  const cycle = () => {
    if (reduce) return;
    qTimer = setInterval(() => renderQuote((qi + 1) % quotes.length), 6000);
  };
  dots.forEach((d, i) => d.addEventListener("click", () => {
    clearInterval(qTimer);
    renderQuote(i);
    cycle();
  }));
  cycle();
})();
