const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")
const showButton = document.querySelector("#show-button")
const hideButton = document.querySelector("#hide-button")

navToggle?.addEventListener("change", () => {
  navMenu?.classList.toggle("hidden", !navToggle.checked)
  showButton?.classList.toggle("hidden", navToggle.checked)
  hideButton?.classList.toggle("hidden", !navToggle.checked)
})

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordion = header.closest(".accordion")
    accordion?.classList.toggle("active")
    accordion?.querySelector(".accordion-icon line:first-child")?.classList.toggle("opacity-0", accordion.classList.contains("active"))
  })
})

document.querySelectorAll(".tab").forEach((tab) => {
  const controls = [...tab.querySelectorAll(".tab-nav-item")]
  const panels = [...tab.querySelectorAll(".tab-content")]
  controls.forEach((control, index) => control.addEventListener("click", () => {
    controls.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index))
    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("block", panelIndex === index)
      panel.classList.toggle("hidden", panelIndex !== index)
    })
  }))
})

document.querySelectorAll(".swiper").forEach((slider) => {
  const wrapper = slider.querySelector(".swiper-wrapper")
  const slide = slider.querySelector(".swiper-slide")
  const controls = slider.parentElement
  if (innerWidth < 1024) slider.querySelectorAll(".swiper-slide").forEach((item) => { item.style.width = `${slider.clientWidth}px` })
  controls?.querySelectorAll(".swiper-pagination-bullet").forEach((bullet, index) => bullet.addEventListener("click", () => {
    if (wrapper && slide) wrapper.style.transform = `translate3d(-${index * slide.getBoundingClientRect().width}px, 0px, 0px)`
    controls.querySelectorAll(".swiper-pagination-bullet").forEach((item, itemIndex) => item.classList.toggle("swiper-pagination-bullet-active", itemIndex === index))
  }))
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

if (location.pathname.startsWith("/elements")) {
  const main = document.querySelector("main")
  if (main) main.style.minHeight = `${main.offsetHeight + 582}px`
}
