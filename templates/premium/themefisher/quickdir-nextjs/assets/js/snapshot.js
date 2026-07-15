const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")
const showButton = document.querySelector("#show-button")
const hideButton = document.querySelector("#hide-button")

navToggle?.addEventListener("change", () => {
  navMenu?.classList.toggle("hidden", !navToggle.checked)
  showButton?.classList.toggle("hidden", navToggle.checked)
  hideButton?.classList.toggle("hidden", !navToggle.checked)
})

const searchModal = document.querySelector("#searchModal")
document.querySelectorAll("[data-search-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => searchModal?.classList.add("show"))
})
document.querySelector("#searchModalOverlay")?.addEventListener("click", () => searchModal?.classList.remove("show"))

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

document.querySelectorAll(".swiper").forEach((slider) => {
  const wrapper = slider.querySelector(".swiper-wrapper")
  const slide = slider.querySelector(".swiper-slide")
  let index = 4
  const move = (direction) => {
    if (!wrapper || !slide) return
    index = Math.max(0, Math.min(wrapper.children.length - 1, index + direction))
    wrapper.style.transform = `translate3d(-${index * slide.getBoundingClientRect().width}px, 0px, 0px)`
  }
  slider.parentElement?.querySelector(".testimonial-button-next")?.addEventListener("click", () => move(1))
  slider.parentElement?.querySelector(".testimonial-button-prev")?.addEventListener("click", () => move(-1))
})
