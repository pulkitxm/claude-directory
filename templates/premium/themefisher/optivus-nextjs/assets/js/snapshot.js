const menuButton = document.querySelector("#nav-toggle-btn")
const mobileMenu = document.querySelector("#mobile-menu")

if (location.pathname === "/") {
  const headlineCounter = [...document.querySelectorAll(".counter")].find((counter) => counter.dataset.target === "100" && counter.dataset.suffix === "%")
  if (headlineCounter) headlineCounter.textContent = "71%"
}

menuButton?.addEventListener("click", () => {
  const opening = menuButton.getAttribute("aria-expanded") !== "true"
  menuButton.setAttribute("aria-expanded", String(opening))
  mobileMenu?.classList.toggle("hidden", !opening)
})

document.querySelectorAll("[role='button'][data-faq-id]").forEach((item) => {
  const initialAnswer = item.querySelector(".faq-answer")
  if (initialAnswer) initialAnswer.style.maxHeight = item.getAttribute("aria-expanded") === "true" ? `${initialAnswer.scrollHeight}px` : "0px"
  item.addEventListener("click", () => {
    const opening = item.getAttribute("aria-expanded") !== "true"
    item.parentElement?.querySelectorAll("[role='button'][data-faq-id]").forEach((other) => {
      const active = other === item && opening
      other.setAttribute("aria-expanded", String(active))
      other.classList.toggle("open", active)
      const answer = other.querySelector(".faq-answer")
      if (answer) answer.style.maxHeight = active ? `${answer.scrollHeight}px` : "0px"
      const icon = other.querySelector(".toggle-icon")
      if (icon) icon.textContent = active ? "−" : "+"
    })
  })
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

document.querySelectorAll(".swiper").forEach((slider) => {
  const wrapper = slider.querySelector(".swiper-wrapper")
  const slides = [...slider.querySelectorAll(".swiper-slide")]
  const controls = slider.parentElement
  if (innerWidth < 1024) slides.forEach((slide) => { slide.style.width = `${slider.clientWidth}px` })
  controls?.querySelectorAll(".swiper-pagination-bullet").forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      const width = slides[0]?.getBoundingClientRect().width || 0
      if (wrapper) wrapper.style.transform = `translate3d(-${index * width}px, 0px, 0px)`
      controls.querySelectorAll(".swiper-pagination-bullet").forEach((item, itemIndex) => item.classList.toggle("swiper-pagination-bullet-active", itemIndex === index))
    })
  })
})
