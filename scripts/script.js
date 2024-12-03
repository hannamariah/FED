// JavaScript Document
console.log("hi");

document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll("#slideshow ul li");
  const dots = document.querySelectorAll("nav button");
  const slideInterval = 3000; // 3 seconden tussen slides

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    const offset = -currentIndex * 100;
    document.querySelector("#slideshow ul").style.transform = `translateX(${offset}%)`;
    updateDots();
  };

  const updateDots = () => {
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-slide"), 10);
      showSlide(index);
    });
  });

  // Automatisch sliden
  let autoSlide = setInterval(() => {
    showSlide(currentIndex + 1);
  }, slideInterval);

  // Pauzeer de slideshow bij hover
  const slideshow = document.querySelector("#slideshow");
  slideshow.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slideshow.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideInterval);
  });

  // Toon de eerste slide bij het laden van de pagina
  showSlide(0);
});



