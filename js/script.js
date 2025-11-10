// ===== IMAGE CAROUSEL =====
document.addEventListener("DOMContentLoaded", () => {
  const slide = document.querySelector(".carousel-slide");
  const images = document.querySelectorAll(".carousel-slide img");

  if (!slide || !images.length) return;

  let counter = 0;
  const total = images.length;

  // Auto-slide every 4 seconds
  setInterval(() => {
    counter++;
    if (counter >= total) {
      slide.style.transition = "none";
      counter = 0;
      slide.style.transform = `translateX(0%)`;
      // small delay to restart animation smoothly
      setTimeout(() => {
        slide.style.transition = "transform 1s ease-in-out";
      }, 50);
    } else {
      slide.style.transform = `translateX(${-counter * 100}%)`;
    }
  }, 4000);
});

// ===== NAVBAR LOADER =====
(function () {
  const mount = document.getElementById("navbar-placeholder");
  if (!mount) return;

  fetch("navbar.html")
    .then(r => r.text())
    .then(html => {
      mount.innerHTML = html;

      // Add solid background on scroll
      const navbar = document.getElementById("navbar");
      const onScroll = () => {
        if (window.scrollY > 50) navbar.classList.add("solid");
        else navbar.classList.remove("solid");
      };
      onScroll();
      window.addEventListener("scroll", onScroll);

      // Highlight current page
      let page = window.location.pathname.split("/").pop();
      if (page === "" || page === "/") page = "index.html";
      document.querySelectorAll(".nav-links a").forEach(a => {
        if (a.getAttribute("href") === page) a.classList.add("active");
      });
    })
    .catch(err => console.error("Navbar load failed:", err));
})();
