

// Wacht tot de DOM volledig is geladen
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll("#slideshow ul li");
  const dots = document.querySelectorAll("nav button");
  const slideInterval = 3000; // 3 seconden tussen slides

  // Functie om een slide te tonen
  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    const offset = -currentIndex * 100;
    document.querySelector("#slideshow ul").style.transform = `translateX(${offset}%)`;
    updateDots();
  };

  // Functie om de actieve dot bij te werken
  const updateDots = () => {
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  };

  // Event listener voor elke dot
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


// Event listener voor het wijzigen van de modus (donkere/lichte modus)
const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", modeToggle.checked);
});
