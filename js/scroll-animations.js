document.addEventListener("DOMContentLoaded", () => {
  const slidingBlocks = document.querySelectorAll(".slide-in");

  if (!("IntersectionObserver" in window)) {
    // Fallback: show everything if observer isn't supported
    slidingBlocks.forEach(block => block.classList.add("in-view"));
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
      threshold: 0.15,
    }
  );

  slidingBlocks.forEach(block => observer.observe(block));
});
