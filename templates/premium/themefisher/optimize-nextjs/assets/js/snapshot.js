const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")
const showButton = document.querySelector("#show-button")

navToggle?.addEventListener("change", () => {
  navMenu?.classList.toggle("hidden", !navToggle.checked)
  showButton?.classList.toggle("hidden", navToggle.checked)
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

if (location.pathname === "/" || location.pathname === "/index.html") {
  const sections = document.querySelectorAll("main > section")
  if (innerWidth < 640) {
    sections[2].style.height = "1231.984px"
    sections[5].style.height = "412.078px"
  } else if (innerWidth < 1024) {
    sections[2].style.height = "1420.312px"
  }
}
