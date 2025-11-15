// ===== NAVBAR SCROLL BACKGROUND =====
window.addEventListener('scroll', function () {
  const header = document.querySelector('.site-header');
  header.classList.toggle('solid', window.scrollY > 50);
});

// ===== MOBILE NAVBAR TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// ===== IMAGE CAROUSEL =====
let index = 0;
function showNextImage() {
  const slides = document.querySelectorAll(".carousel-slide img");
  index = (index + 1) % slides.length;
  document.getElementById("carousel-slide").style.transform = `translateX(-${index * 100}%)`;
}
setInterval(showNextImage, 4000);


