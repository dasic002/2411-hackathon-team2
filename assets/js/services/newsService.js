import { mockData } from "../mockData.js";
import { NEWS_API_KEY, NEWS_API_URL } from "../../../secrets.js";
import { formatArticleText } from "../utils/textUtils.js";

/**
 * Fetches and formats news articles from The Guardian API or mock data.
 * Attempts to fetch live data first, falls back to mock data if API fails.
 *
 * @async
 * @returns {Promise<Array<Object>>} Array of formatted article objects
 */
export async function fetchGuardianNews() {
  try {
    // Attempt to fetch from The Guardian API
    const response = await fetch(`${NEWS_API_URL}?${NEWS_API_KEY}&show-fields=bodyText,headline,thumbnail&page-size=5`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response.results.map(formatArticleData);
  } catch (error) {
    console.warn("Failed to fetch from API, using mock data:", error);
    // Fallback to mock data
    return mockData.map(formatArticleData);
  }
}

/**
 * Formats raw article data from The Guardian API into a standardized structure.
 * Maps API-specific field names to internal application field names and
 * formats the article body text.
 *
 * @param {Object} article - Raw article data from API or mock data
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
