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

const videoModal = document.querySelector("#video-modal");
const videoFrame = videoModal?.querySelector("[data-video-frame]");
const videoCloseButtons = videoModal?.querySelectorAll("[data-video-close]");
let activeVideoTrigger = null;

const closeVideoModal = () => {
  if (!videoModal || !videoFrame) return;

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("video-modal-open");
  videoFrame.replaceChildren();
  activeVideoTrigger?.focus();
  activeVideoTrigger = null;
};

document.querySelectorAll(".video-play").forEach((button) => {
  button.addEventListener("click", () => {
    if (!videoModal || !videoFrame) return;

    activeVideoTrigger = button;
    const videoUrl = button.dataset.videoUrl;
    const iframe = document.createElement("iframe");
    iframe.src = `${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`;
    iframe.title = "Bright Future U virtual tour video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    videoFrame.replaceChildren(iframe);
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("video-modal-open");
    videoModal.querySelector(".video-modal-close")?.focus();
  });
});

videoCloseButtons?.forEach((button) => {
  button.addEventListener("click", closeVideoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideoModal();
  }
});
