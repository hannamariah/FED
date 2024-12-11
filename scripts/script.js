// Constante variabelen
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

// Variabelen met let
let currentIndex = 0;
let autoSlide;
let currentSlide = 0;

// Functies
const showSlide = (index, slides, dots) => {
  currentIndex = (index + slides.length) % slides.length;
  const offset = -currentIndex * 100;
  document.querySelector("#slideshow ul").style.transform = `translateX(${offset}%)`;
  updateDots(dots);
};

const updateDots = (dots) => {
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
};

const moveSlider = (index, slider, buttons) => {
  currentSlide = index;
  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;
  buttons.forEach((button, idx) => {
    button.classList.toggle("active", idx === currentSlide);
  });
};

const moveToSlide = (track, targetSlide, dots) => {
  track.style.transform = `translateX(-${targetSlide * 100}%)`;
  dots[currentSlide].classList.remove("active");
  dots[targetSlide].classList.add("active");
  currentSlide = targetSlide;
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("#slideshow ul li");
  const dots = document.querySelectorAll("nav button");

  autoSlide = setInterval(() => showSlide(currentIndex + 1, slides, dots), 3000);

  const slideshow = document.querySelector("#slideshow");
  slideshow.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slideshow.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => showSlide(currentIndex + 1, slides, dots), 3000);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-slide"), 10);
      showSlide(index, slides, dots);
    });
  });

  showSlide(0, slides, dots);
});

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
