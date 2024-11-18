// Modules import
import { fetchGuardianNews } from "./services/newsService.js";
import { renderNewsCard } from "./components/newsCard.js";
import { initializeSpeechControls } from "./eventHandlers/newsEvents.js";
import { initializeControlPanel } from "./components/controlPanel.js";

// Navbar section
// Navbar : open mobile menu
document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("open");
});
// Navbar : close mobile menu
document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("open");
});

// Hero section
let today = new Date();

function displayGreeting() {
  // Display a different greeting depending on the time
  let hour = today.getHours();
  let greeting = document.getElementById("greeting");
  if (hour < 12) {
    greeting.innerHTML = "Good Morning";
  } else if (12 <= hour & hour <= 18) {
    greeting.innerHTML = "Good Afternoon";
  } else {
    greeting.innerHTML = "Good Evening";
  }
}

function displayCurrentDate() {
  // Display the current date in the DOM
  let currentDate = document.querySelector("#greeting-date");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[today.getDay()];
  let date = today.getDate();
  let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let month = months[today.getMonth()];
  let year = today.getFullYear();
  currentDate.innerHTML = `${day}` + " " + `${date}` + " " + `${month}` + " " + `${year}`;
}

// News and Control Panel initialization

async function initializeSpeechSynthesis() {
  if (!("speechSynthesis" in window)) {
    console.error("Speech synthesis not supported");
    return false;
  }

  // Force voice loading in Chrome
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(true);
      return;
    }

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        voices = window.speechSynthesis.getVoices();
        resolve(true);
      },
      { once: true }
    );
  });
}

async function initializeNewsAndControl() {
  // Initialize control panel
  initializeControlPanel();

  // Initialize news section
  await renderNews();
}

async function renderNews() {
  const newsContainer = document.querySelector(".news");
  try {
    const articles = await fetchGuardianNews();
    newsContainer.innerHTML = `
            <h2>Latest News</h2>
            <div class="news-grid">
                ${articles.map((article, index) => renderNewsCard(article, index)).join("")}
            </div>
        `;
    initializeSpeechControls(newsContainer, articles);
  } catch (error) {
    console.error("Failed to render news:", error);
    newsContainer.innerHTML = `
            <p class="error" role="alert">Failed to load news. Please try again later.</p>
        `;
  }
}

// Initialize JS functionality after DOM loaded
document.addEventListener("DOMContentLoaded", async () => {
  await initializeSpeechSynthesis();
  displayCurrentDate();
  displayGreeting();
  initializeNewsAndControl();
});
