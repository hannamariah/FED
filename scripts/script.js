// JavaScript Document
console.log("hi");
let currentIndex = 0;
const slides = document.querySelectorAll("#slideshow ul li");
const dots = document.querySelectorAll("nav button");

function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length; // Zorgt voor looping
  const offset = -currentIndex * 100; // Verplaatst slides horizontaal
  document.querySelector("#slideshow ul").style.transform = `translateX(${offset}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}

function currentSlide(index) {
  showSlide(index);
}

// Toon de eerste slide bij het laden van de pagina
showSlide(0);




