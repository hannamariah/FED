

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




// Slider logica
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slider ul li");
  const buttons = document.querySelectorAll(".slider-nav button");
  const slider = document.querySelector(".slider ul");
  let currentSlide = 0;

  // Functie om de slider te verschuiven
  const moveSlider = (index) => {
    currentSlide = index;
    const offset = -currentSlide * 100; // Berekent de verschuiving in %
    slider.style.transform = `translateX(${offset}%)`;

    // Update de actieve knop
    buttons.forEach((button, idx) => {
      button.classList.toggle("active", idx === currentSlide);
    });
  };

  // Event listener voor de navigatiebolletjes
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      moveSlider(index);
    });
  });

  // Zet de eerste bol actief bij laden van de pagina
  moveSlider(0);
});


document.addEventListener("DOMContentLoaded", () => {
  // Selecteer alle dropdown toggles
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const submenu = toggle.nextElementSibling;

      // Toggle de 'open' class voor het submenu
      submenu.classList.toggle("open");

      // Sluit andere open submenu's
      document.querySelectorAll(".submenu").forEach((otherMenu) => {
        if (otherMenu !== submenu && otherMenu.classList.contains("open")) {
          otherMenu.classList.remove("open");
        }
      });
    });
  });
});




// Selecteer de zoekicoon en zoekbalk
const searchToggle = document.querySelector(".search-toggle");
const searchBar = document.querySelector(".search-bar");
const closeSearch = document.querySelector(".close-search");

// Toon/verberg zoekbalk bij klikken op zoekicoon
searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

// Sluit zoekbalk bij klikken op kruisje
closeSearch.addEventListener("click", () => {
  searchBar.classList.add("hidden");
});



document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const dotsNav = document.querySelector(".carousel-nav");
  const dots = Array.from(dotsNav.children);

  let currentSlide = 0;

  // Functie om naar de juiste slide te gaan
  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide * 100}%)`;
    dots[currentSlide].classList.remove("active");
    dots[targetSlide].classList.add("active");
    currentSlide = targetSlide;
  };

  // Volgende knop
  nextButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      moveToSlide(track, currentSlide, currentSlide + 1);
      currentSlide++;
    }
  });

  // Vorige knop
  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      moveToSlide(track, currentSlide, currentSlide - 1);
      currentSlide--;
    }
  });

  // Navigatie punten
  dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target;
    if (!targetDot.matches("button")) return;
    const targetIndex = dots.indexOf(targetDot);
    moveToSlide(track, currentSlide, targetIndex);
    currentSlide = targetIndex;
  });
});


// Selecteer de knop en de teller
const addToCartButton = document.querySelector(".add-to-cart-button");
const cartCount = document.querySelector(".cart-count");

// Voeg een event listener toe aan de knop
addToCartButton.addEventListener("click", function () {
  // Haal het huidige aantal op uit de teller
  let currentCount = parseInt(cartCount.textContent);

  // Verhoog de teller met 1
  currentCount += 1;

  // Werk de teller bij
  cartCount.textContent = currentCount;

  // Voeg een animatieklasse toe
  cartCount.classList.add("updated");
});

// Verwijder de animatieklasse na de animatie
cartCount.onanimationend = () => {
  cartCount.classList.remove("updated");
};
