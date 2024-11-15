export function formatArticleText(text) {
  const CHARS_PER_PARAGRAPH = 500;
  let remainingText = text;
  let paragraphs = [];

  while (remainingText.length > CHARS_PER_PARAGRAPH) {
    let splitIndex = remainingText.lastIndexOf(".", CHARS_PER_PARAGRAPH);
    if (splitIndex === -1) splitIndex = CHARS_PER_PARAGRAPH;
    paragraphs.push(remainingText.substring(0, splitIndex + 1));
    remainingText = remainingText.substring(splitIndex + 1).trim();
  }
  if (remainingText) {
    paragraphs.push(remainingText);
  }
  return paragraphs.map((p) => `<p>${p.trim()}</p>`).join("");
}

export function cleanBodyText(text) {
  return text.replace(/(https?:\/\/[^\s]+)/g, (url) => {
    try {
      const urlObj = new URL(url);
      return `<a href="${url}" target="_blank" title="${url}">${urlObj.hostname}</a>`;
    } catch {
      return url;
    }
  });
}
