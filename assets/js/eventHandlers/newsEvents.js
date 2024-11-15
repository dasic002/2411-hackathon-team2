import { speechConfig } from "../config/speechConfig.js";
import { speakContent } from "../services/speechService.js";

/**
 * Initializes event handlers for speech controls in the news container.
 * Sets up event delegation for all speech-related interactions with news articles.
 *
 * @param {HTMLElement} newsContainer - The container element holding all news articles
 * @param {Array<Object>} articles - Array of article objects to be controlled
 * @param {string} articles[].title - Article title
 * @param {string} articles[].fields.bodyText - Article content
 * @returns {void}
 */
export function initializeSpeechControls(newsContainer, articles) {
  initializeArticleEvents(newsContainer, articles);
}

/**
 * Sets up event delegation for article interactions within the news container.
 * Handles click events for:
 * - Expanding/collapsing article content
 * - Reading article content aloud
 * - Reading article title aloud
 *
 * @param {HTMLElement} newsContainer - The container element holding all news articles
 * @param {Array<Object>} articles - Array of article objects
 * @returns {void}
 */
function initializeArticleEvents(newsContainer, articles) {
  newsContainer.addEventListener("click", (e) => {
    handleReadMoreClick(e);
    handleSpeakContentClick(e, articles);
    handleReadTitleClick(e, articles);
  });
}

/**
 * Handles the expand/collapse functionality for article content.
 * Toggles the visibility of article text and updates the button state/text
 * when the "View More/Less" button is clicked.
 *
 * @param {Event} e - Click event object
 * @returns {void}
 */
function handleReadMoreClick(e) {
  if (e.target.classList.contains("view-more")) {
    const content = e.target.closest(".news-card").querySelector(".article-text");
    const isCollapsed = content.classList.contains("collapsed");
    content.classList.toggle("collapsed");
    e.target.textContent = isCollapsed ? "View Less" : "View More";
    e.target.setAttribute("aria-expanded", !isCollapsed);
  }
}

/**
 * Handles click events for speaking article content.
 * Triggers text-to-speech for the article body when the speak content button is clicked.
 * Only starts speech if no other content is currently being spoken.
 *
 * @param {Event} e - Click event object
 * @param {Array<Object>} articles - Array of article objects
 * @param {Object} articles[].fields - Article field data
 * @param {string} articles[].fields.bodyText - Article content to be spoken
 * @param {string} articles[].title - Article title for identification
 * @returns {void}
 *
 * @note
 * Strips HTML tags from bodyText before speaking
 */
function handleSpeakContentClick(e, articles) {
  if (e.target.classList.contains("speak-content")) {
    const articleId = e.target.closest(".news-card").dataset.articleId;
    const article = articles[articleId];
    if (!speechConfig.speaking) {
      speakContent(article.fields.bodyText.replace(/<[^>]*>/g, ""), articleId, article.title);
    }
  }
}

/**
 * Handles click events for speaking article titles.
 * Triggers text-to-speech for the article title when the read title button is clicked.
 * Unlike article content, will speak regardless of current speech state.
 *
 * @param {Event} e - Click event object
 * @param {Array<Object>} articles - Array of article objects
 * @param {string} articles[].title - Article title to be spoken
 * @returns {void}
 */
function handleReadTitleClick(e, articles) {
  if (e.target.classList.contains("read-title")) {
    const articleId = e.target.closest(".news-card").dataset.articleId;
    const article = articles[articleId];
    speakContent(article.title, articleId, `Title: ${article.title}`);
  }
}
