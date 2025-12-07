// navbar.js
// Loads /navbar.html + handles mobile menu + scroll opacity
// Works from root pages AND subfolders like /projects/, /html/projects/, /projects_html/

window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  // Where navbar.html lives (root-relative)
  const NAVBAR_PATH = "/navbar.html";

  const path = window.location.pathname.toLowerCase();

  // Treat anything in these paths as a "project subpage"
  const inProjectSubpage =
    path.includes("/projects/") ||
    path.includes("/projects_html/") ||
    path.includes("/html/projects/");

  fetch(NAVBAR_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} when loading navbar`);
      }
      return response.text();
    })
    .then((html) => {
      navbarContainer.innerHTML = html;

      // ================================
      // FIX NAVBAR LINKS ON SUBPAGES
      // ================================
      if (inProjectSubpage) {
        const navLinks = navbarContainer.querySelectorAll(".nav-links a");

        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;

          // Already fine? then leave it alone
          if (
            href.startsWith("http") ||    // absolute URL
            href.startsWith("#") ||       // anchor
            href.startsWith("mailto:") || // email
            href.startsWith("/") ||       // already root-relative
            href.startsWith("../")        // already relative up
          ) {
            return;
          }

          // Convert "index.html" → "/index.html"
          link.setAttribute("href", "/" + href.replace(/^\/+/, ""));
        });

        // Fix logo link too
        const logo = navbarContainer.querySelector("#navbar-logo");
        if (logo) {
          const logoHref = logo.getAttribute("href") || "/";
          if (!logoHref.startsWith("/") && !logoHref.startsWith("http")) {
            logo.setAttribute("href", "/" + logoHref.replace(/^\/+/, ""));
          }
        }
      }

      // ================================
      // MOBILE MENU TOGGLE
      // ================================
      const menuToggle = navbarContainer.querySelector("#menu-toggle");
      const navLinksEl = navbarContainer.querySelector("#nav-links");

      if (menuToggle && navLinksEl) {
        menuToggle.addEventListener("click", () => {
          navLinksEl.classList.toggle("active");

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
      const hero =
        document.querySelector(".hero") ||
        document.querySelector(".project-hero");

      function updateNavbarOpacity() {
        if (!header) return;

        // No hero? stay fully opaque
        if (!hero) {
          header.style.backgroundColor = "rgba(17, 17, 17, 1)";
          return;
        }

        const heroHeight = hero.offsetHeight || 1;
        let opacity = window.scrollY / heroHeight;

        // clamp 0–1
        opacity = Math.max(0, Math.min(1, opacity));

        header.style.backgroundColor = `rgba(17, 17, 17, ${opacity})`;
      }

      updateNavbarOpacity();
      window.addEventListener("scroll", updateNavbarOpacity);
      window.addEventListener("resize", updateNavbarOpacity);
    })
    .catch((err) => console.error("Navbar failed to load:", err));
});
