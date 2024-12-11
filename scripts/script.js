// Constants (vaste waarden)
// Hier halen we elementen uit de HTML om later mee te werken.
const slides = document.querySelectorAll("#slideshow ul li"); // Alle slides in de slideshow
const dots = document.querySelectorAll("nav button"); // Alle bolletjes onder de slideshow
const slideInterval = 3000; // Tijd tussen slides (3 seconden)
const modeToggle = document.getElementById("modeToggle"); // Donkere modus schakelaar
const searchToggle = document.querySelector(".search-toggle"); // Zoekbalk openen
const searchBar = document.querySelector(".search-bar"); // Zoekbalk zelf
const closeSearch = document.querySelector(".close-search"); // Zoekbalk sluiten
const addToCartButton = document.querySelector(".add-to-cart-button"); // Knop om iets in winkelmandje te doen
const cartCount = document.querySelector(".cart-count"); // Aantal items in winkelmandje
const kerstToggle = document.getElementById("kerst-toggle"); // Schakelaar voor kerstthema
const startVideo = document.getElementById("startVideo"); // Eerste kerstvideo
const myVideo = document.getElementById("myVideo"); // Achtergrond kerstvideo
const kerstAudio = document.getElementById("kerst-audio"); // Kerstmuziek
const bgVideo = document.querySelector(".bgVideo"); // Container voor achtergrondvideo
const kerstSlinger = document.querySelector(".kerst-slinger"); // Kerstslinger element

// Variables (veranderbare waarden)
// Huidige index in de slideshow en slider
let currentIndex = 0; // Voor slideshow
let autoSlide; // Interval voor automatisch afspelen slideshow
let currentSlide = 0; // Voor carousel-slider

// Functions (functies)
// Laat de juiste slide zien in de slideshow
const showSlide = (index) => {
  currentIndex = (index + slides.length) % slides.length; // Blijf binnen de grenzen van slides
  const offset = -currentIndex * 100; // Verplaats de slides met CSS
  document.querySelector("#slideshow ul").style.transform = `translateX(${offset}%)`;
  updateDots(); // Update de bolletjes
};

// Update de actieve bolletjes onder de slideshow
const updateDots = () => {
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex); // Activeer het juiste bolletje
  });
};

// Verplaats de carousel-slider naar de juiste positie
const moveSlider = (index) => {
  currentSlide = index; // Stel de huidige slide in
  const offset = -currentSlide * 100; // Bereken de verschuiving
  document.querySelector(".slider ul").style.transform = `translateX(${offset}%)`;
  document.querySelectorAll(".slider-nav button").forEach((button, idx) => {
    button.classList.toggle("active", idx === currentSlide); // Activeer het juiste bolletje
  });
};

// Verplaats een specifieke slide in de carousel
const moveToSlide = (track, current, target) => {
  track.style.transform = `translateX(-${target * 100}%)`; // Verplaats slides
  document.querySelectorAll(".carousel-nav button")[current].classList.remove("active");
  document.querySelectorAll(".carousel-nav button")[target].classList.add("active");
  currentSlide = target; // Update huidige slide
};

// Schakel het kerstthema in of uit
const toggleKerstThema = () => {
  if (kerstToggle.checked) { // Als kerst is ingeschakeld
    console.log("Kerst thema actief");
    document.documentElement.classList.add("kerst"); // Voeg kerststijl toe
    startVideo.currentTime = 0; // Begin startvideo opnieuw
    myVideo.currentTime = 0; // Begin achtergrondvideo opnieuw
    kerstAudio.pause();
    kerstAudio.currentTime = 0;
    kerstAudio.play().catch((error) => console.log("Muziek kon niet starten:", error));
    bgVideo.classList.remove("hide"); // Laat achtergrondvideo zien
    kerstSlinger.classList.remove("hide"); // Laat kerstslinger zien
    startVideo.classList.remove("hide");
    startVideo.play(); // Speel de startvideo
    setTimeout(() => {
      startVideo.pause(); // Stop startvideo na 5 seconden
      startVideo.classList.add("hide");
      myVideo.classList.remove("hide"); // Start achtergrondvideo
      myVideo.play();
    }, 5000);
  } else { // Als kerst is uitgeschakeld
    console.log("Kerst thema uitgeschakeld");
    document.documentElement.classList.remove("kerst");
    bgVideo.classList.add("hide"); // Verberg achtergrondvideo
    kerstSlinger.classList.add("hide"); // Verberg kerstslinger
    startVideo.pause();
    startVideo.currentTime = 0;
    startVideo.classList.add("hide");
    myVideo.pause();
    myVideo.currentTime = 0;
    myVideo.classList.add("hide");
    kerstAudio.pause();
    kerstAudio.currentTime = 0;
  }
};

// Event Listeners (luisteren naar interacties)
// Schakel donkere modus in/uit
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", modeToggle.checked);
});

// Toon of verberg de zoekbalk
searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

closeSearch.addEventListener("click", () => {
  searchBar.classList.add("hidden");
});

// Voeg een item toe aan het winkelmandje
addToCartButton.addEventListener("click", () => {
  let currentCount = parseInt(cartCount.textContent); // Haal huidige aantal
  currentCount += 1; // Verhoog het aantal
  cartCount.textContent = currentCount; // Update de teller
  cartCount.classList.add("updated"); // Laat een animatie zien

  /* OPTIE 2 */
  /* Mooier is om het met een animationend event te doen */
  cartCount.onanimationend = () => {
    cartCount.classList.remove("updated");
  };
  /* Dan hoef je de tijden van setTimeout en animatie niet gelijk te houden */
});

// Schakel het kerstthema in/uit wanneer de schakelaar wordt gebruikt
kerstToggle.addEventListener("change", toggleKerstThema);

// DOMContentLoaded (als de pagina klaar is)
window.addEventListener("DOMContentLoaded", () => {
  // Start slideshow
  autoSlide = setInterval(() => {
    showSlide(currentIndex + 1); // Laat volgende slide zien
  }, slideInterval);

  const slideshow = document.querySelector("#slideshow");
  slideshow.addEventListener("mouseenter", () => clearInterval(autoSlide)); // Stop slideshow bij hover
  slideshow.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      showSlide(currentIndex + 1); // Herstart slideshow
    }, slideInterval);
  });
  showSlide(0); // Begin met de eerste slide

  // Start carousel-slider
  moveSlider(0);
  document.querySelectorAll(".slider-nav button").forEach((button, index) => {
    button.addEventListener("click", () => {
      moveSlider(index); // Verplaats naar specifieke slide
    });
  });

  // Carousel logica voor pijltjes
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const dotsNav = document.querySelector(".carousel-nav");

  nextButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      moveToSlide(track, currentSlide, currentSlide + 1); // Volgende slide
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      moveToSlide(track, currentSlide, currentSlide - 1); // Vorige slide
    }
  });

  dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target;
    if (!targetDot.matches("button")) return; // Alleen bij knop klikken
    const targetIndex = Array.from(dotsNav.children).indexOf(targetDot);
    moveToSlide(track, currentSlide, targetIndex); // Ga naar de geselecteerde slide
  });

  // Dropdown-menu logica
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const submenu = toggle.nextElementSibling;
      submenu.classList.toggle("open"); // Toon/verberg submenu
      document.querySelectorAll(".submenu").forEach((otherMenu) => {
        if (otherMenu !== submenu && otherMenu.classList.contains("open")) {
          otherMenu.classList.remove("open"); // Sluit andere submenu's
        }
      });
    });
  });
});
