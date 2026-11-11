(() => {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("header");
  var hero = document.getElementById("hero");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (y > 50) header.classList.add("solid");else header.classList.remove("solid");
    var hb = hero ? hero.getBoundingClientRect().bottom : 0;
    if (hb > 80) header.classList.add("over-dark");else header.classList.remove("over-dark");
  }
  window.addEventListener("scroll", onScroll, {
    passive: true
  });
  onScroll();
  var phrases = ["Genomic Sequencing", "Advanced Imaging", "Longevity Science", "Executive Physicals", "Molecular Diagnostics", "Concierge Care"];
  var track = document.getElementById("marquee");
  if (track) {
    var one = document.createElement("span");
    one.className = "marquee__set";
    one.style.display = "flex";
    phrases.forEach(p => {
      var item = document.createElement("span");
      item.className = "marquee__item";
      item.innerHTML = `${p}<span class="diamond"></span>`;
      one.appendChild(item);
    });
    track.appendChild(one);
    track.appendChild(one.cloneNode(true));
  }
  var reveals = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(el => {
      el.classList.add("in");
    });
  } else {
    var io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    });
    reveals.forEach(el => {
      io.observe(el);
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", ev => {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 4;
      window.scrollTo({
        top: top,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  });
  var form = document.getElementById("form");
  var ok = document.getElementById("formOk");
  if (form) {
    form.addEventListener("submit", ev => {
      ev.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var disc = form.querySelector('[name="discipline"]').value;
      if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !disc) {
        ok.textContent = "Please complete every field with a valid email.";
        ok.style.color = "#E0A8A0";
        ok.classList.add("show");
        return;
      }
      ok.textContent = "Thank you, " + name.split(" ")[0] + ". A Meridian concierge will be in touch within one business day.";
      ok.style.color = "#E8D9C0";
      ok.classList.add("show");
      form.reset();
    });
  }
})();
