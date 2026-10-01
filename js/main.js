// ===========================================================
// Breakthrough Author Live — Landing Page
// ===========================================================

// --- CHECKOUT URL -------------------------------------------------
// Replace this with your real checkout link (GHL / Stripe / etc).
// Every "Join the Challenge" button on the page uses this one value.
const CHECKOUT_URL = "https://checkout.example.com/breakthrough-author-live";

document.querySelectorAll(".cta-btn").forEach((btn) => {
  btn.setAttribute("href", CHECKOUT_URL);
  btn.setAttribute("target", "_blank");
  btn.setAttribute("rel", "noopener");
});

// --- THEME TOGGLE ---------------------------------------------------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const STORAGE_KEY = "bal-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", String(theme === "light"));
    toggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  }

  applyTheme(getPreferredTheme());

  toggle.addEventListener("click", function () {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Follow system changes only if the user hasn't picked a theme explicitly.
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? "light" : "dark");
      }
    });
})();

// --- STICKY MOBILE CTA -----------------------------------------------
(function () {
  const sticky = document.getElementById("sticky-cta");
  const hero = document.querySelector(".hero");
  if (!sticky || !hero) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        sticky.classList.toggle("show", !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  observer.observe(hero);
})();
