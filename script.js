const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const mainNav = document.querySelector(".main-nav");

const updateNavScrollState = () => {
  mainNav?.classList.toggle("is-scrolled", window.scrollY > 8);
};

updateNavScrollState();
window.addEventListener("scroll", updateNavScrollState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".accordion button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".accordion button").forEach((item) => {
      if (item !== button) item.classList.remove("is-open");
    });
    button.classList.toggle("is-open");
  });
});
