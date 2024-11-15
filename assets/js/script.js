import { fetchGuardianNews } from "./services/newsService.js";
import { renderNewsCard } from "./components/newsCard.js";
import { initializeSpeechControls } from "./eventHandlers/newsEvents.js";
import { initializeControlPanel } from "./components/controlPanel.js";

async function initializeApp() {
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

document.addEventListener("DOMContentLoaded", initializeApp);
