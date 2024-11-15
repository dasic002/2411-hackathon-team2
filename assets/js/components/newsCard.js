import { cleanBodyText } from "../utils/textUtils.js";

/**
 * Creates the HTML markup for speech control buttons and indicators.
 * Generates a template for the speech controls interface including 'Read Title',
 * 'Read Article' buttons, and a playing status indicator.
 *
 * @returns {string} HTML string containing the speech controls markup
 */
export function createSpeechControls() {
  return `
        <div class="speech-controls">
            <div class="speech-buttons">
                <button type="button" class="read-title" aria-label="Read title aloud">
                    Read Title
                </button>
                <button type="button" class="speak-content" aria-label="Read article aloud">
                    Read Article
                </button>
            </div>
            <span class="playing-indicator">Playing</span>
        </div>
    `;
}

/**
 * Renders a news article card as HTML markup.
 * Creates a card containing article title, section, thumbnail image (if available),
 * text content, speech controls, and action buttons.
 *
 * @param {Object} article - The article object containing news data
 * @param {string} article.title - Article title
 * @param {string} article.section - Article section/category
 * @param {Object} article.fields - Article fields containing additional data
 * @param {string} article.fields.thumbnail - URL of article thumbnail image (optional)
 * @param {string} article.fields.bodyText - Article content text
 * @param {string} article.url - URL to original article
 * @param {number} index - Index of the article in the list
 * @returns {string} HTML string of the complete news card
 */
export function renderNewsCard(article, index) {
  return `
        <div class="news-card" data-article-id="${index}">
            <h3>${article.title}</h3>
            <p class="section">${article.section}</p>
            <div class="article-container">
                ${
                  article.fields.thumbnail
                    ? `<div class="image-container">
                            <img src="${article.fields.thumbnail}" alt="${article.title}">
                           </div>`
                    : ""
                }
                ${createSpeechControls()}
            </div>
            <div class="content">
                <div class="article-text collapsed">
                    <p>${cleanBodyText(article.fields.bodyText)}</p>
                </div>
            </div>
            <div class="article-actions">
                <button class="view-more" aria-expanded="false">View More</button>
                <a href="${article.url}"
                   target="_blank"
                   class="original-link"
                   aria-label="View original article on The Guardian website (opens in new tab)"> 
                    View Original Article
                </a>
            </div>
        </div>
    `;
}
