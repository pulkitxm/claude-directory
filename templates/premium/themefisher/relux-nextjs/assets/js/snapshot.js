const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")

navToggle?.addEventListener("change", () => {
  const open = navToggle.checked
  navMenu?.classList.toggle("hidden", !open)
  if (navMenu) {
    navMenu.style.display = open ? "flex" : "none"
    navMenu.style.pointerEvents = open ? "auto" : "none"
    navMenu.style.opacity = open ? "1" : "0"
  }
  document.body.style.overflow = open ? "hidden" : ""
  document.querySelector(".menu-text")?.classList.toggle("hidden", open)
  document.querySelector(".close-text")?.classList.toggle("hidden", !open)
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

document.querySelectorAll(".swiper").forEach((slider) => {
  const wrapper = slider.querySelector(".swiper-wrapper")
  const slide = slider.querySelector(".swiper-slide")
  let index = 0
  const move = (direction) => {
    if (!wrapper || !slide) return
    index = Math.max(0, Math.min(wrapper.children.length - 1, index + direction))
    wrapper.style.transform = `translate3d(-${index * slide.getBoundingClientRect().width}px, 0px, 0px)`
  }
  const area = slider.parentElement
  area?.querySelectorAll(".swiper-button-next,.room-swiper-button-next").forEach((button) => button.addEventListener("click", () => move(1)))
  area?.querySelectorAll(".swiper-button-prev,.room-swiper-button-prev").forEach((button) => button.addEventListener("click", () => move(-1)))
})

if (location.pathname.includes("/elements")) {
  const main = document.querySelector("main")
  if (main) main.style.minHeight = `${main.offsetHeight + 634}px`
}
