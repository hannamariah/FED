// Constants
const slides = document.querySelectorAll("#slideshow ul li");
const dots = document.querySelectorAll("nav button");
const slideInterval = 3000; // 3 seconden tussen slides
const modeToggle = document.getElementById("modeToggle");
const searchToggle = document.querySelector(".search-toggle");
const searchBar = document.querySelector(".search-bar");
const closeSearch = document.querySelector(".close-search");
const addToCartButton = document.querySelector(".add-to-cart-button");
const cartCount = document.querySelector(".cart-count");
const kerstToggle = document.getElementById("kerst-toggle");
const startVideo = document.getElementById("startVideo");
const myVideo = document.getElementById("myVideo");
const kerstAudio = document.getElementById("kerst-audio");
const bgVideo = document.querySelector(".bgVideo");
const kerstSlinger = document.querySelector(".kerst-slinger");

// Variables
let currentIndex = 0;
let autoSlide;
let currentSlide = 0;

// Functions
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

const moveSlider = (index) => {
  currentSlide = index;
  const offset = -currentSlide * 100;
  document.querySelector(".slider ul").style.transform = `translateX(${offset}%)`;
  document.querySelectorAll(".slider-nav button").forEach((button, idx) => {
    button.classList.toggle("active", idx === currentSlide);
  });
};

const moveToSlide = (track, current, target) => {
  track.style.transform = `translateX(-${target * 100}%)`;
  document.querySelectorAll(".carousel-nav button")[current].classList.remove("active");
  document.querySelectorAll(".carousel-nav button")[target].classList.add("active");
  currentSlide = target;
};

const toggleKerstThema = () => {
  if (kerstToggle.checked) {
    console.log("Kerst thema actief");
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
    console.log("Kerst thema uitgeschakeld");
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
};

// Event Listeners
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", modeToggle.checked);
});

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

closeSearch.addEventListener("click", () => {
  searchBar.classList.add("hidden");
});

addToCartButton.addEventListener("click", () => {
  let currentCount = parseInt(cartCount.textContent);
  currentCount += 1;
  cartCount.textContent = currentCount;
  cartCount.classList.add("updated");
});

cartCount.onanimationend = () => {
  cartCount.classList.remove("updated");
};

kerstToggle.addEventListener("change", toggleKerstThema);

// DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  // Slideshow logic
  autoSlide = setInterval(() => {
    showSlide(currentIndex + 1);
  }, slideInterval);

  const slideshow = document.querySelector("#slideshow");
  slideshow.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slideshow.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideInterval);
  });
  showSlide(0);

  // Slider logic
  moveSlider(0);
  document.querySelectorAll(".slider-nav button").forEach((button, index) => {
    button.addEventListener("click", () => {
      moveSlider(index);
    });
  });

  // Carousel logic
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const dotsNav = document.querySelector(".carousel-nav");

  nextButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      moveToSlide(track, currentSlide, currentSlide + 1);
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      moveToSlide(track, currentSlide, currentSlide - 1);
    }
  });

  dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target;
    if (!targetDot.matches("button")) return;
    const targetIndex = Array.from(dotsNav.children).indexOf(targetDot);
    moveToSlide(track, currentSlide, targetIndex);
  });

  // Dropdown logic
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const submenu = toggle.nextElementSibling;
      submenu.classList.toggle("open");
      document.querySelectorAll(".submenu").forEach((otherMenu) => {
        if (otherMenu !== submenu && otherMenu.classList.contains("open")) {
          otherMenu.classList.remove("open");
        }
      });
    });
  });
});
