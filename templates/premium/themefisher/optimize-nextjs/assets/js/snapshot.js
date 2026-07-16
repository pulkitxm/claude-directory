const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")

navToggle?.addEventListener("change", () => {
  navMenu?.classList.toggle("hidden", !navToggle.checked)
})

const searchModal = document.querySelector("#searchModal")
const searchInput = document.querySelector("#searchInput")
const searchBody = searchModal?.querySelector(".search-wrapper-body")
const searchableLinks = [...document.querySelectorAll("main a[href]")].filter((link) => link.querySelector("h3"))

function closeSearch() {
  searchModal?.classList.remove("show")
}

function renderSearchResults() {
  if (!searchBody || !searchInput) return
  const query = searchInput.value.trim().toLowerCase()
  if (!query) {
    searchBody.innerHTML = '<div class="py-8 text-center">Type something to search...</div>'
    return
  }
  const results = searchableLinks.filter((link) => link.textContent.toLowerCase().includes(query))
  searchBody.replaceChildren(
    ...results.map((link) => {
      const result = link.cloneNode(true)
      result.className = "block px-7 py-4 border-b border-border hover:bg-light"
      return result
    }),
  )
  if (!results.length) searchBody.innerHTML = '<div class="py-8 text-center">No matching posts found.</div>'
}

document.querySelectorAll("[data-search-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    searchModal?.classList.add("show")
    searchInput?.focus()
  })
})
searchModal?.querySelector("#searchModalOverlay")?.addEventListener("click", closeSearch)
searchInput?.addEventListener("input", renderSearchResults)
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSearch()
})

document.querySelectorAll(".pricing-check").forEach((toggle) => {
  toggle.addEventListener("change", () => {
    document.querySelectorAll(".data-count").forEach((price) => {
      price.textContent = price.dataset[toggle.checked ? "countYearly" : "countMonthly"]
    })
  })
})

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordion = header.closest(".accordion")
    accordion?.classList.toggle("active")
    const content = accordion?.querySelector(".accordion-content")
    if (content) content.style.maxHeight = accordion.classList.contains("active") ? `${content.scrollHeight}px` : "0px"
    accordion?.querySelector(".accordion-icon-active")?.classList.toggle("opacity-0", accordion.classList.contains("active"))
  })
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

document.querySelectorAll(".swiper").forEach((slider) => {
  let index = 0
  const wrapper = slider.querySelector(".swiper-wrapper")
  const slide = slider.querySelector(".swiper-slide")
  const move = (direction) => {
    if (!wrapper || !slide) return
    index = Math.max(0, Math.min(wrapper.children.length - 1, index + direction))
    wrapper.style.transform = `translate3d(-${index * slide.getBoundingClientRect().width}px, 0px, 0px)`
  }
  slider.parentElement?.querySelector(".swiper-button-next")?.addEventListener("click", () => move(1))
  slider.parentElement?.querySelector(".swiper-button-prev")?.addEventListener("click", () => move(-1))
})

if (location.pathname.endsWith("/optimize-nextjs/") || location.pathname.endsWith("/optimize-nextjs/index.html")) {
  const sections = document.querySelectorAll("main > section")
  if (innerWidth < 640) {
    sections[2].style.height = "1231.984px"
    sections[5].style.height = "412.078px"
  } else if (innerWidth < 1024) {
    sections[2].style.height = "1420.312px"
  }
}
