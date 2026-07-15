const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add("aos-animate")
    revealObserver.unobserve(entry.target)
  })
}, { threshold: 0.05 })

document.querySelectorAll("[data-aos]:not(.aos-animate)").forEach((element) => revealObserver.observe(element))

const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")
const showButton = document.querySelector("#show-button")
const hideButton = document.querySelector("#hide-button")

navToggle?.addEventListener("change", () => {
  navMenu?.classList.toggle("hidden", !navToggle.checked)
  showButton?.classList.toggle("hidden", navToggle.checked)
  hideButton?.classList.toggle("hidden", !navToggle.checked)
})

document.querySelectorAll("[role='button'][aria-expanded]").forEach((item) => {
  if (!item.querySelector(".faq-answer")) return
  item.addEventListener("click", () => {
    const opening = item.getAttribute("aria-expanded") !== "true"
    item.parentElement?.querySelectorAll("[role='button'][aria-expanded='true']").forEach((openItem) => {
      if (openItem === item) return
      openItem.setAttribute("aria-expanded", "false")
      const openAnswer = openItem.querySelector(".faq-answer")
      openAnswer?.classList.replace("opacity-100", "opacity-0")
      if (openAnswer) openAnswer.style.maxHeight = "0px"
      const openIcon = openItem.querySelector(".toggle-icon")
      if (openIcon) openIcon.textContent = "+"
    })
    item.setAttribute("aria-expanded", String(opening))
    const answer = item.querySelector(".faq-answer")
    answer?.classList.toggle("opacity-100", opening)
    answer?.classList.toggle("opacity-0", !opening)
    if (answer) answer.style.maxHeight = opening ? `${answer.scrollHeight}px` : "0px"
    const icon = item.querySelector(".toggle-icon")
    if (icon) icon.textContent = opening ? "−" : "+"
  })
})

document.querySelectorAll(".pricing-check").forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const yearly = toggle.checked
    const section = toggle.closest("section")
    const monthlyPrices = [19, 29, 59, 470]
    const yearlyPrices = [9, 19, 49, 580]
    section?.querySelectorAll("h3.text-h1").forEach((price, index) => {
      const value = (yearly ? yearlyPrices : monthlyPrices)[index]
      const number = price.querySelector("span:last-child")
      if (number && value !== undefined) number.textContent = String(value)
    })
    section?.querySelectorAll(".text-monthly").forEach((item) => item.classList.toggle("hidden", yearly))
    section?.querySelectorAll(".text-yearly").forEach((item) => item.classList.toggle("hidden", !yearly))
  })
})

document.querySelectorAll(".tab").forEach((tab) => {
  const controls = [...tab.querySelectorAll(".tab-nav-item")]
  const panels = [...tab.querySelectorAll(".tab-content")]
  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      controls.forEach((item, itemIndex) => {
        item.classList.toggle("active", itemIndex === index)
        item.tabIndex = itemIndex === index ? 0 : -1
      })
      panels.forEach((panel, panelIndex) => {
        panel.classList.toggle("block", panelIndex === index)
        panel.classList.toggle("hidden", panelIndex !== index)
      })
    })
  })
})

document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => button.closest(".accordion")?.classList.toggle("active"))
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

document.querySelectorAll("lite-youtube").forEach((player) => {
  player.style.display = "block"
  player.style.aspectRatio = "16 / 9"
})

function sizeSlides() {
  const pairedWidth = (slider, gap) => innerWidth < 640 ? slider.clientWidth : (slider.clientWidth - gap) / 2
  document.querySelectorAll(".swiper").forEach((slider) => {
    if (slider.classList.contains("features-slider")) slider.querySelectorAll("img").forEach((image) => { image.loading = "eager" })
    const slides = slider.querySelectorAll(":scope > .swiper-wrapper > .swiper-slide")
    if (!slides.length) return
    let width
    if (slider.classList.contains("is-feature-swiper")) width = slider.clientWidth
    else if (slider.classList.contains("features-slider")) width = innerWidth < 1200 ? pairedWidth(slider, 32) : 393.333
    else width = innerWidth < 1200 ? pairedWidth(slider, 24) : 315.667
    slides.forEach((slide) => { slide.style.width = `${width}px` })
    if (slider.classList.contains("features-slider") && innerWidth < 640) slider.style.height = `${slides[0].firstElementChild.getBoundingClientRect().height}px`
    if (slider.classList.contains("is-feature-swiper")) {
      const wrapper = slider.querySelector(".swiper-wrapper")
      if (wrapper) wrapper.style.transform = `translate3d(-${width + 24}px, 0px, 0px)`
    }
  })
}

sizeSlides()
addEventListener("resize", sizeSlides)
addEventListener("load", sizeSlides)

let featureSlide = 0
function moveFeatureSlider(direction) {
  const wrapper = document.querySelector(".features-slider .swiper-wrapper")
  const slide = wrapper?.querySelector(".swiper-slide")
  if (!wrapper || !slide) return
  featureSlide = Math.max(0, Math.min(wrapper.children.length - 1, featureSlide + direction))
  wrapper.style.transform = `translate3d(-${featureSlide * (slide.getBoundingClientRect().width + 24)}px, 0px, 0px)`
}

document.querySelector(".features-slider-prev")?.addEventListener("click", () => moveFeatureSlider(-1))
document.querySelector(".features-slider-next")?.addEventListener("click", () => moveFeatureSlider(1))

if (location.pathname === "/blog" || location.pathname === "/blog/") {
  const blogGrid = document.querySelector(".shuffle-container")
  if (blogGrid && innerWidth >= 1200) blogGrid.style.height = "3689.81px"
}
