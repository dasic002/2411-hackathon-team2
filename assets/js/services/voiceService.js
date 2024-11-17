import { speechConfig } from "../config/speechConfig.js";
import { updatePlayButtons } from "./speechService.js";

/**
 * Gets available English voices from speech synthesis, limited to first 10
 * @returns {Array<SpeechSynthesisVoice>} Array of English voices
 */
export function getEnglishVoices() {
  const voices = window.speechSynthesis.getVoices();
  return voices.filter((voice) => voice.lang.startsWith("en")).slice(0, 10);
}

/**
 * Plays a sample text with the selected voice
 * @param {string} voiceName - Name of the voice to preview
 */
export function previewVoice(voiceName) {
  // Store current reading state before preview if not already stored
  if (!speechConfig.isPreview && speechConfig.speaking) {
    speechConfig.lastReadingState = {
      text: speechConfig.currentText,
      articleId: speechConfig.currentArticleId,
      title: speechConfig.currentTitle,
      paused: speechConfig.paused,
    };
  }

  // Flag to track intentional interruption
  speechConfig.intentionallyInterrupted = true;

  // Stop any current speech or preview
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.name === voiceName);
  if (!voice) return;

  const sampleText = "This is a preview of the selected voice.";
  const utterance = new SpeechSynthesisUtterance(sampleText);
  utterance.voice = voice;
  utterance.pitch = speechConfig.pitch;
  utterance.rate = speechConfig.rate;

  // Set preview flag and update state
  speechConfig.isPreview = true;
  speechConfig.speaking = true;
  speechConfig.paused = false;

  // Set up event listeners
  utterance.onend = () => {
    if (speechConfig.isPreview) {
      speechConfig.isPreview = false;
      speechConfig.speaking = false;
      speechConfig.previewUtterance = null;

      // If there was a previous reading, restore its state
      if (speechConfig.lastReadingState) {
        restoreLastReading();
      } else {
        updatePlayButtons();
      }
    }
  };

  utterance.onerror = (event) => {
    // Only log errors that aren't from intentional interruption
    if (event.error === "interrupted" && speechConfig.intentionallyInterrupted) {
      return;
    }
    console.error("Speech synthesis error:", event);
    speechConfig.isPreview = false;
    speechConfig.speaking = false;
    speechConfig.previewUtterance = null;
    updatePlayButtons();
  };

  utterance.onpause = () => {
    speechConfig.paused = true;
    updatePlayButtons();
  };

  utterance.onresume = () => {
    speechConfig.paused = false;
    updatePlayButtons();
  };

  speechConfig.previewUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  updatePlayButtons();
}

/**
 * Stops any ongoing voice preview and restores previous reading if available
 */
export function stopPreview() {
  if (speechConfig.previewUtterance || speechConfig.isPreview) {
    window.speechSynthesis.cancel();
    speechConfig.previewUtterance = null;
    speechConfig.isPreview = false;
    speechConfig.speaking = false;
    speechConfig.paused = false;

    // If there was a previous reading, restore it
    if (speechConfig.lastReadingState) {
      restoreLastReading();
    } else {
      updatePlayButtons();
    }
  }
}

/**
 * Restores the last reading state after preview
 */
function restoreLastReading() {
  if (speechConfig.lastReadingState) {
    const { text, articleId, title, paused } = speechConfig.lastReadingState;

    // Import speakContent dynamically to avoid circular dependency
    import("./speechService.js").then(({ speakContent }) => {
      speakContent(text, articleId, title);
      if (paused) {
        // Small delay to ensure the speech has started before pausing
        setTimeout(() => {
          window.speechSynthesis.pause();
          speechConfig.paused = true;
          updatePlayButtons();
        }, 50);
      }
    });
  }
}

/**
 * Pauses or resumes the current preview
 * @returns {boolean} True if preview was toggled, false if no preview is active
 */
export function togglePreview() {
  if (!speechConfig.isPreview || !speechConfig.previewUtterance) {
    return false;
  }

  if (speechConfig.paused) {
    window.speechSynthesis.resume();
    speechConfig.paused = false;
  } else {
    window.speechSynthesis.pause();
    speechConfig.paused = true;
  }

  updatePlayButtons();
  return true;
}

/**
 * Clears the last reading state
 */
export function clearLastReadingState() {
  speechConfig.lastReadingState = null;
}
