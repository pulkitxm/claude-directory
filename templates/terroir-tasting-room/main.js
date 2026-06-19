/* TERROIR — reveals + case builder utility */
(function () {
  "use strict";

  /* ---------- section reveal (800ms, 20px Y) ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- case builder ---------- */
  const CAP = 6;
  const wines = [
    { id: "w1", name: "Ember Noir", notes: "Black cherry · smoke · violet", price: "$48", img: "./assets/img/bottle-01.png" },
    { id: "w2", name: "Golden Hour", notes: "Quince · beeswax · saline", price: "$52", img: "./assets/img/bottle-02.png" },
    { id: "w3", name: "Green Cellar", notes: "Fennel · lime leaf · stone", price: "$44", img: "./assets/img/bottle-03.png" },
    { id: "w4", name: "Rosa Antica", notes: "Pomegranate · rose · clove", price: "$56", img: "./assets/img/bottle-01.png" },
    { id: "w5", name: "Sienna Reserve", notes: "Fig · cocoa · tobacco", price: "$84", img: "./assets/img/bottle-02.png" },
    { id: "w6", name: "Stillwater Blanc", notes: "Pear · flint · white tea", price: "$46", img: "./assets/img/bottle-03.png" },
  ];

  const qty = new Map(wines.map((w) => [w.id, 0]));
  // seed a sensible default (4/6) to match the brief's example
  qty.set("w1", 2);
  qty.set("w2", 1);
  qty.set("w5", 1);

  const grid = document.getElementById("caseGrid");
  const fill = document.getElementById("capFill");
  const read = document.getElementById("capRead");

  function total() {
    let t = 0;
    qty.forEach((v) => (t += v));
    return t;
  }

  function sync() {
    const t = total();
    fill.style.width = Math.min((t / CAP) * 100, 100) + "%";
    read.textContent = t + "/" + CAP;
    grid.querySelectorAll(".case-card").forEach((card) => {
      const id = card.dataset.id;
      card.querySelector(".q-val").textContent = qty.get(id);
      card.querySelector(".q-plus").disabled = t >= CAP;
      card.querySelector(".q-minus").disabled = qty.get(id) <= 0;
    });
  }

  wines.forEach((w) => {
    const card = document.createElement("div");
    card.className = "case-card";
    card.dataset.id = w.id;
    card.innerHTML =
      '<img class="bottle" src="' + w.img + '" alt="" />' +
      "<h3>" + w.name + "</h3>" +
      '<p class="cc-notes">' + w.notes + "</p>" +
      '<p class="cc-price label">' + w.price + "</p>" +
      '<div class="qty">' +
      '<button class="q-minus" aria-label="Remove">−</button>' +
      '<span class="q-val mono">0</span>' +
      '<button class="q-plus" aria-label="Add">+</button>' +
      "</div>";

    card.querySelector(".q-plus").addEventListener("click", () => {
      if (total() < CAP) { qty.set(w.id, qty.get(w.id) + 1); sync(); }
    });
    card.querySelector(".q-minus").addEventListener("click", () => {
      if (qty.get(w.id) > 0) { qty.set(w.id, qty.get(w.id) - 1); sync(); }
    });
    grid.appendChild(card);
  });

  sync();
})();
