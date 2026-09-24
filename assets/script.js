const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const hero = document.querySelector("[data-hero-slideshow]");

if (hero) {
  const images = hero.dataset.heroSlideshow
    .split("|")
    .map((src) => src.trim())
    .filter(Boolean);

  if (images.length) {
    const slideshow = document.createElement("div");
    slideshow.className = "hero-slideshow";
    slideshow.setAttribute("aria-hidden", "true");

    const slides = images.map((src, index) => {
      const slide = document.createElement("div");
      slide.className = `hero-slide${index === 0 ? " is-active" : ""}`;
      slide.style.backgroundImage = `url("${src}")`;
      slideshow.appendChild(slide);
      return slide;
    });

    hero.prepend(slideshow);

    let activeIndex = 0;
    hero.style.setProperty("--hero-bg", `url("${images[activeIndex]}")`);

    if (images.length > 1) {
      setInterval(() => {
        slides[activeIndex].classList.remove("is-active");
        activeIndex = (activeIndex + 1) % images.length;
        slides[activeIndex].classList.add("is-active");
        hero.style.setProperty("--hero-bg", `url("${images[activeIndex]}")`);
      }, 5600);
    }
  }
}
