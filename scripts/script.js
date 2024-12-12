// Const//
const modeToggle = document.getElementById("modeToggle"); // Toggle voor donker/licht modus//
const searchToggle = document.querySelector(".search-toggle"); // Knop om de zoekbalk te openen//
const searchBar = document.querySelector(".search-bar"); // De zoekbalk zelf//
const closeSearch = document.querySelector(".close-search"); // Knop om de zoekbalk te sluiten//
const addToCartButton = document.querySelector(".add-to-cart-button"); // Knop om een product aan de winkelwagen toe te voegen//
const cartCount = document.querySelector(".cart-count"); // Teller voor het aantal producten in de winkelwagen//
const kerstToggle = document.getElementById("kerst-toggle"); // Toggle voor het kerstthema//
const startVideo = document.getElementById("startVideo"); // De startvideo (speelt eerst af bij kerstthema)//
const myVideo = document.getElementById("myVideo"); // De achtergrondvideo voor het kerstthema//
const kerstAudio = document.getElementById("kerst-audio"); // De achtergrondmuziek voor het kerstthema//
const bgVideo = document.querySelector(".bgVideo"); // Container voor de video's//
const kerstSlinger = document.querySelector(".kerst-slinger"); // De decoratieve kerst-slinger//

// 'let' (waarden kunnen veranderen tijdens het gebruik)
let currentIndex = 0;
let autoSlide; 
let currentSlide = 0; 


/* ============================================================================== 
    - carrousel show homepagina, bron : bron 1 : carrousel thomas : https://codepen.io/shooft/pen/yLKjzWa en behulp van https://chat.openai.com/  om het te laten werken.       
   ============================================================================== */
// Laat een specifieke slide zien//
const showSlide = (index, slides, dots) => {
  // Bereken de huidige index binnen de grenzen van de slides//
  currentIndex = (index + slides.length) % slides.length;

  //verschuiving van de slides (horizontaal)//
  const offset = -currentIndex * 100;
  document.querySelector("#slideshow ul").style.transform = `translateX(${offset}%)`;

  // Werk de bolletjes (dots) bij om de actieve slide te tonen//
  updateDots(dots);
};

// Update de bolletjes om te laten zien welke slide actief is//
const updateDots = (dots) => {
  dots.forEach((dot, idx) => {
    // Zet het actieve bolletje aan/uit//
    dot.classList.toggle("active", idx === currentIndex);
  });
};

// Schuif de slider naar een specifieke index//
const moveSlider = (index, slider, buttons) => {
  currentSlide = index;


  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;

  buttons.forEach((button, idx) => {
    button.classList.toggle("active", idx === currentSlide);
  });
};

// Verplaats de track naar de gewenste slide//
const moveToSlide = (track, targetSlide, dots) => {
  // Verplaats de slides zodat de targetSlide zichtbaar wordt//
  track.style.transform = `translateX(-${targetSlide * 100}%)`;

  // Update de actieve dot//
  dots[currentSlide].classList.remove("active");
  dots[targetSlide].classList.add("active");

  // Update de huidige slide//
  currentSlide = targetSlide;
};

document.addEventListener("DOMContentLoaded", () => {
  // Selecteer alle slides en bolletjes//
  const slides = document.querySelectorAll("#slideshow ul li");
  const dots = document.querySelectorAll("nav button");

  // Start de automatische slideshow (elke 3 seconden)//
  autoSlide = setInterval(() => showSlide(currentIndex + 1, slides, dots), 3000);


  // Voeg klik-events toe aan de bolletjes//
  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      // Haal de index op van het aangeklikte bolletje//
      const index = parseInt(event.target.getAttribute("data-slide"), 10);

      // Laat de slide zien die hoort bij het bolletje
      showSlide(index, slides, dots);
    });
  });

  // Laat de eerste slide zien als de pagina opent//
  showSlide(0, slides, dots);
});

 /* ============================================================================== 
    - toggle dark mode, bron :  bron 6: toggle menu : https://codepen.io/LayalaDev/pen/RwEYEPZ                 
   ============================================================================== */
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", modeToggle.checked);
});

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

closeSearch.addEventListener("click", () => {
  searchBar.classList.add("hidden");
});

 /* ============================================================================== 
    - animatie cart update, bron codepen opdracht 3 https://codepen.io/shooft/pen/MWMGLGV-                    
   ============================================================================== */
addToCartButton.addEventListener("click", () => {
  let currentCount = parseInt(cartCount.textContent);
  currentCount += 1;
  cartCount.textContent = currentCount;
  cartCount.classList.add("updated");
});

cartCount.onanimationend = () => {
  cartCount.classList.remove("updated");
};

 /* ============================================================================== 
    - slider pagina 2, met pijltjes. bron :   https://chat.openai.com/                    
   ============================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const dotsNav = document.querySelector(".carousel-nav");
  const dots = Array.from(dotsNav.children);

  nextButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      moveToSlide(track, currentSlide + 1, dots);
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      moveToSlide(track, currentSlide - 1, dots);
    }
  });

  dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target;
    if (!targetDot.matches("button")) return;
    const targetIndex = dots.indexOf(targetDot);
    moveToSlide(track, targetIndex, dots);
  });

  moveToSlide(track, 0, dots);
});

 /* ============================================================================== 
     - kerst thema, inspiratie : Lara. bron :behulp van chatgpt -   OpenAI. (2024). ChatGPT-interactie over kerstthema-implementatie. https://chat.openai.com/                  
   ============================================================================== */
kerstToggle.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.classList.add("kerst");

    startVideo.currentTime = 0;
    myVideo.currentTime = 0;
    kerstAudio.pause();
    kerstAudio.currentTime = 0;
    kerstAudio.play().catch((error) => console.log("Muziek kon niet starten:", error));

    bgVideo.classList.remove("hide");
    kerstSlinger.classList.remove("hide");
    startVideo.classList.remove("hide");
    startVideo.play();

    setTimeout(() => {
      startVideo.pause();
      startVideo.classList.add("hide");
      myVideo.classList.remove("hide");
      myVideo.play();
    }, 5000);
  } else {
    document.documentElement.classList.remove("kerst");

    bgVideo.classList.add("hide");
    kerstSlinger.classList.add("hide");
    startVideo.pause();
    startVideo.currentTime = 0;
    startVideo.classList.add("hide");
    myVideo.pause();
    myVideo.currentTime = 0;
    myVideo.classList.add("hide");
    kerstAudio.pause();
    kerstAudio.currentTime = 0;
  }
});
