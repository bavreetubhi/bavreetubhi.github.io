// navbar.js
// Loads navbar.html + handles mobile menu + scroll opacity
// Works from root pages AND /projects/* pages

window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  // Detect if we are inside /projects/
  const path = window.location.pathname.toLowerCase();
  const inProjectsFolder = path.includes("/projects/");

  // Correct path to navbar.html
  const navbarUrl = inProjectsFolder ? "../navbar.html" : "navbar.html";

  fetch(navbarUrl)
    .then(response => response.text())
    .then(html => {
      navbarContainer.innerHTML = html;

      // ================================
      // FIX NAVBAR LINKS WHEN IN /projects/
      // ================================
      if (inProjectsFolder) {
        const navLinks = navbarContainer.querySelectorAll(".nav-links a");

        navLinks.forEach(link => {
          const href = link.getAttribute("href");
          if (!href) return;

          // Don't modify absolute URLs, anchors, mailto, or already-correct "../"
          if (
            href.startsWith("http") ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("../")
          ) {
            return;
          }

          // Convert "home.html" → "../home.html"
          link.setAttribute("href", "../" + href);
        });

        // Fix the top-left logo link
        const logo = navbarContainer.querySelector("#navbar-logo");
        if (logo) {
          const href = logo.getAttribute("href");
          if (!href.startsWith("../")) {
            logo.setAttribute("href", "../" + href);
          }
        }
      }

      // ================================
      // MOBILE MENU TOGGLE
      // ================================
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");

      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");

          const icon = menuToggle.querySelector("i");
          if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
          }
        });
      }

      // ================================
      // SCROLL OPACITY FADE
      // ================================
      const header = document.querySelector(".site-header");

      // Support both root page hero and project page hero
      const hero =
        document.querySelector(".hero") ||
        document.querySelector(".project-hero");

      function updateNavbarOpacity() {
        if (!header) return;

        // If NO hero exists → always fully solid
        if (!hero) {
          header.style.backgroundColor = "rgba(17, 17, 17, 1)";
          return;
        }

        const heroHeight = hero.offsetHeight || 1;
        let opacity = window.scrollY / heroHeight;

        opacity = Math.max(0, Math.min(1, opacity)); // clamp 0–1

        header.style.backgroundColor = `rgba(17, 17, 17, ${opacity})`;
      }

      updateNavbarOpacity();
      window.addEventListener("scroll", updateNavbarOpacity);
      window.addEventListener("resize", updateNavbarOpacity);
    })
    .catch(err => console.error("Navbar failed to load:", err));
});
