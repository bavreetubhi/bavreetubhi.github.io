document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-section");

  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers: just show everything
    sections.forEach(sec => sec.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // animate when ~15% of the section is visible
    }
  );

  sections.forEach(sec => observer.observe(sec));
});
