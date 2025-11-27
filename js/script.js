// script.js
// Global navbar + carousel logic for all pages

window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  // ================================
  //  LOAD NAVBAR.HTML
  // ================================
  fetch("navbar.html")
    .then(response => response.text())
    .then(html => {
      navbarContainer.innerHTML = html;

      const header = document.querySelector(".site-header");
      const hero = document.querySelector(".hero");
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");

      // ================================
      //  MOBILE MENU TOGGLE
      // ================================
      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");

          // Toggle hamburger ↔ X
          const icon = menuToggle.querySelector("i");
          if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
          }
        });
      }

      // ================================
      //  NAVBAR SCROLL OPACITY FADE
      // ================================
      function updateNavbarOpacity() {
        if (!header) return;

        // If page has no hero → always solid
        if (!hero) {
          header.style.backgroundColor = "rgba(17, 17, 17, 1)";
          return;
        }

        const heroHeight = hero.offsetHeight || 1;
        let opacity = window.scrollY / heroHeight;

        // clamp (0→1)
        opacity = Math.max(0, Math.min(1, opacity));

        header.style.backgroundColor = `rgba(17, 17, 17, ${opacity})`;
      }

      updateNavbarOpacity();
      window.addEventListener("scroll", updateNavbarOpacity);
      window.addEventListener("resize", updateNavbarOpacity);

      // ================================
      //  IMAGE CAROUSEL 
      // ================================
      const carousel = document.getElementById("carousel-slide");
      if (carousel) {
        let index = 0;
        const slides = carousel.querySelectorAll("img");

        function showNextImage() {
          if (slides.length === 0) return;
          index = (index + 1) % slides.length;
          carousel.style.transform = `translateX(-${index * 100}%)`;
        }

        setInterval(showNextImage, 4000);
      }
    })
    .catch(err => console.error("Navbar failed to load:", err));
});
