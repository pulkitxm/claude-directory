(() => {
  var PRODUCTS = [{
    img: "original-visual.svg",
    name: "Noorani Silk Tunic",
    mat: "Hand-spun Mulberry Silk",
    price: "14,500"
  }, {
    img: "original-visual.svg",
    name: "Ikat Drape Trousers",
    mat: "Natural Indigo Dye",
    price: "8,900"
  }, {
    img: "original-visual.svg",
    name: "Solaris Brass Cuff",
    mat: "Antique Gold Finish",
    price: "4,200"
  }, {
    img: "original-visual.svg",
    name: "Studio Khadi Shirt",
    mat: "Hand-woven Bengal Khadi",
    price: "6,500"
  }, {
    img: "original-visual.svg",
    name: "Dawn Mist Banaras Saree",
    mat: "100% Pure Zari",
    price: "42,000"
  }, {
    img: "original-visual.svg",
    name: "Slate Nehru Jacket",
    mat: "Organic Linen Blend",
    price: "18,500"
  }, {
    img: "original-visual.svg",
    name: "Lotus Kalamkari Tunic",
    mat: "Vegetable Dyes",
    price: "12,000"
  }, {
    img: "original-visual.svg",
    name: "Crescent Silver Drops",
    mat: "925 Sterling Silver",
    price: "3,500"
  }];
  function renderProducts() {
    var grid = document.getElementById("prodGrid");
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => '<article class="prod">' + '<div class="prod-img">' + '<img src="' + p.img + '" alt="Original abstract geometric study" loading="lazy" />' + '<button class="quick-add">Quick Add ,  ₹' + p.price + "</button>" + "</div>" + "<h3>" + p.name + "</h3>" + '<p class="mat">' + p.mat + "</p>" + "</article>").join("");
  }
  function initSlider() {
    var slides = document.querySelectorAll("#heroSlider img");
    if (slides.length < 2) return;
    var i = 0;
    setInterval(() => {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 5000);
  }
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => {
        el.classList.add("in");
      });
      return;
    }
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
    els.forEach(el => {
      io.observe(el);
    });
  }
  function initMenu() {
    var burger = document.getElementById("burger");
    var menu = document.getElementById("mobileMenu");
    var close = document.getElementById("mmClose");
    var links = document.querySelectorAll(".mm-link");
    if (!burger || !menu) return;
    function open() {
      menu.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function shut() {
      menu.classList.remove("open");
      document.body.style.overflow = "";
    }
    burger.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);
    links.forEach(l => {
      l.addEventListener("click", shut);
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") shut();
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    initSlider();
    initReveal();
    initMenu();
  });
})();
