(() => {
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".strip").forEach(s => {
        s.classList.add("up");
      });
    });
  });
  setTimeout(() => {
    document.querySelectorAll(".strip").forEach(s => {
      s.classList.add("up");
    });
  }, 400);
  var io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12
  });
  document.querySelectorAll("[data-reveal]").forEach(el => {
    io.observe(el);
  });
  var topbar = document.getElementById("topbar");
  var onScroll = () => {
    if (window.scrollY > 40) topbar.classList.add("scrolled");else topbar.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, {
    passive: true
  });
  var overlay = document.getElementById("overlay");
  document.querySelectorAll("[data-menu]").forEach(btn => {
    btn.addEventListener("click", () => {
      var action = btn.getAttribute("data-menu");
      if (action === "open") {
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
      } else {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });
  var form = document.getElementById("resForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      var c = document.getElementById("confirm");
      c.classList.add("show");
      form.querySelector(".submit").textContent = "Table Secured";
    });
  }
})();
