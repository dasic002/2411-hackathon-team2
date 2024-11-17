import { mockData } from "../mockData.js";
import { NEWS_API_KEY, NEWS_API_URL } from "../../../secrets.js";
import { formatArticleText } from "../utils/textUtils.js";

// Set to true to use mock data for development
const USE_MOCK_DATA = true;

/**
 * Fetches and formats news articles from The Guardian API or mock data.
 * In development, returns formatted mock data with artificial delay.
 * In production, fetches live data from The Guardian API.
 *
 * @async
 * @returns {Promise<Array<Object>>} Array of formatted article objects
 * @throws {Error} When API request fails or data formatting fails
 */
export async function fetchGuardianNews() {
  try {
    // Mock data for development
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockData.map(formatArticleData);
    }

    // Fetch data from The Guardian API in production
    const response = await fetch(`${NEWS_API_URL}?${NEWS_API_KEY}&show-fields=bodyText,headline,thumbnail&page-size=5`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response.results.map(formatArticleData);
  } catch (error) {
    console.error("Error fetching news from The Guardian:", error);
    throw error;
  }
}

/**
 * Formats raw article data from The Guardian API into a standardized structure.
 * Maps API-specific field names to internal application field names and
 * formats the article body text.
 *
 * @returns {Object} Formatted article object with standardized field names
 */
function formatArticleData(article) {
  return {
    id: article.id,
    title: article.webTitle,
    section: article.sectionName,
    url: article.webUrl,
    publishedAt: article.webPublicationDate,
    fields: {
      ...article.fields,
      bodyText: formatArticleText(article.fields.bodyText),
    },
    tags: article.tags,
  };
}
