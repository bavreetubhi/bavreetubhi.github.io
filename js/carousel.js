// carousel.js
// Runs only on pages that include #carousel-slide

window.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel-slide");
  if (!carousel) return; // not on this page

  const slides = carousel.querySelectorAll("img");
  if (slides.length === 0) return;

  let index = 0;

  function showNextImage() {
    index = (index + 1) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(showNextImage, 4000);
});
