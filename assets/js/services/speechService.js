import { speechConfig } from "../config/speechConfig.js";
import { updateControlPanel } from "../components/controlPanel.js";
import { togglePreview, clearLastReadingState, stopPreview } from "./voiceService.js";

// Chrome-specific: Track last resume time to prevent auto resumes and pauses
let lastResumeTime = 0;
const RESUME_THRESHOLD = 250; // ms

/**
 * Checks if the browser's speech synthesis API is ready and has voices available
 * @returns {Promise<boolean>} Resolves to true when voices are available
 */
async function isSpeechSynthesisReady() {
  if (!("speechSynthesis" in window)) {
    throw new Error("Speech synthesis not supported in this browser");
  }

  // If voices are already loaded, return immediately
  let voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    return true;
  }

  // Wait for voices to be loaded
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 10;
    const checkVoices = () => {
      voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(true);
      } else if (attempts >= maxAttempts) {
        reject(new Error("Could not load speech synthesis voices"));
      } else {
        attempts++;
        setTimeout(checkVoices, 100);
      }
    };

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve(true);
        }
      },
      { once: true }
    );

    checkVoices();
  });
}

/**
 * Gets available English voices from speech synthesis, limited to first 10
 * @returns {Array<SpeechSynthesisVoice>} Array of English voices
 */
function getEnglishVoices() {
  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang.startsWith("en")).slice(0, 10); // Limit to first 10 English voices
  return englishVoices;
}

/**
 * Gets the currently selected voice or falls back to first English voice
 * @returns {SpeechSynthesisVoice|null} Selected voice or default English voice
 */
function getBestVoice() {
  const voices = window.speechSynthesis.getVoices();

  // Use selected voice if available
  if (speechConfig.selectedVoice) {
    const selectedVoice = voices.find((v) => v.name === speechConfig.selectedVoice);
    if (selectedVoice) return selectedVoice;
  }

  // Fallback to first English voice or first available voice
  return voices.find((voice) => voice.lang.startsWith("en")) || voices[0] || null;
}

/**
 * Creates the voice selection dropdown HTML
 * @returns {string} HTML for voice selection dropdown
 */
export function createVoiceSelection() {
  const voices = getEnglishVoices();
  const options = voices
    .map(
      (voice) =>
        `<option value="${voice.name}" ${voice.name === speechConfig.selectedVoice ? "selected" : ""}>
          ${voice.name} (${voice.lang})
      </option>`
    )
    .join("");

  return `
      <div class="control-group">
          <label for="voice-select">Voice:</label>
          <select id="voice-select" class="voice-select">
              ${options}
          </select>
      </div>
  `;
}

export async function speakContent(text, articleId, title) {
  try {
    // Ensure speech synthesis is ready
    await isSpeechSynthesisReady();

    if (!text) {
      throw new Error("No text provided for speech synthesis");
    }

    // Get the voice before creating utterance
    const voice = getBestVoice();
    if (!voice) {
      throw new Error("No voices available for speech synthesis");
    }

    // If we're previewing, stop the preview first
    if (speechConfig.isPreview) {
      stopPreview();
    }

    // Handle pause/resume for current article
    if (speechConfig.speaking && articleId === speechConfig.currentArticleId) {
      handlePauseResume();
      return;
    }

    // Stop any current speech
    stopSpeaking();

    // Create and configure utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = speechConfig.pitch;
    utterance.rate = speechConfig.rate;
    utterance.volume = 1;

    // Ensure no ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    // Setup events and update state
    setupUtteranceEvents(utterance, articleId, title);

    speechConfig.speaking = true;
    speechConfig.paused = false;
    speechConfig.currentUtterance = utterance;
    speechConfig.currentText = text;
    speechConfig.currentArticleId = articleId;
    speechConfig.currentTitle = title;
    speechConfig.isPreview = false;

    // Clear stored state and update UI
    clearLastReadingState();
    updateControlPanel(true, title);

    // Start speaking
    window.speechSynthesis.cancel(); // Clear any pending speech
    window.speechSynthesis.speak(utterance);
    lastResumeTime = Date.now();
    updatePlayButtons();
  } catch (error) {
    console.error("Speech synthesis error:", error);

    // Reset state on error
    speechConfig.speaking = false;
    speechConfig.paused = false;
    updatePlayButtons();

    // Show user-friendly error message
    const errorMessage = error.message.includes("not supported")
      ? "Speech synthesis is not supported in your browser."
      : "There was an error with the text-to-speech system. Please try again.";

    alert(errorMessage);
  }
}

function setupUtteranceEvents(utterance, articleId, title) {
  let resumeTimeout = null;

  utterance.onstart = () => {
    updateControlPanel(true, title);
    disableOtherButtons(articleId);

    // Chrome workaround for long text
    if (window.chrome) {
      utterance._startTime = Date.now();
      // Use a longer interval for the resume check
      utterance._checkInterval = setInterval(() => {
        if (!speechConfig.paused && window.speechSynthesis.speaking && Date.now() - lastResumeTime >= 14000) {
          // Only resume if we haven't resumed recently
          lastResumeTime = Date.now();
          window.speechSynthesis.pause();
          setTimeout(() => {
            if (!speechConfig.paused && speechConfig.speaking) {
              window.speechSynthesis.resume();
            }
          }, 50);
        }
      }, 10000); // Check less frequently
    }
  };

  utterance.onend = () => {
    if (utterance._checkInterval) {
      clearInterval(utterance._checkInterval);
    }
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
    }
    // Only update control panel if this wasn't a preview
    if (!speechConfig.isPreview) {
      updateControlPanel(false);
      resetSpeechState();
    }
  };

  utterance.onerror = (event) => {
    if (event.error === "interrupted") return;

    console.error("Speech synthesis error:", event);
    if (utterance._checkInterval) {
      clearInterval(utterance._checkInterval);
    }
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
    }
    // Only reset state if this wasn't a preview
    if (!speechConfig.isPreview) {
      resetSpeechState();
    }
  };

  utterance.onpause = () => {
    if (speechConfig.speaking && !speechConfig.paused) {
      // Only resume if this wasn't a manual pause
      const timeSinceLastResume = Date.now() - lastResumeTime;
      if (timeSinceLastResume > RESUME_THRESHOLD) {
        resumeTimeout = setTimeout(() => {
          if (speechConfig.speaking && !speechConfig.paused) {
            window.speechSynthesis.resume();
            lastResumeTime = Date.now();
          }
        }, 50);
      }
    }
    updatePlayButtons();
  };

  utterance.onresume = () => {
    lastResumeTime = Date.now();
    updatePlayButtons();
  };
}

export function handlePauseResume() {
  // Handle preview pause/resume
  if (speechConfig.isPreview) {
    if (togglePreview()) {
      return;
    }
    // If toggle failed, stop preview and restore last reading
    stopPreview();
    return;
  }

  // Normal pause/resume logic
  if (!window.speechSynthesis.speaking) {
    if (speechConfig.currentText) {
      restartLastContent();
    } else if (speechConfig.lastReadingState) {
      // If we have a stored reading state, restore it
      const { text, articleId, title } = speechConfig.lastReadingState;
      speakContent(text, articleId, title);
    }
    return;
  }

  if (speechConfig.paused) {
    speechConfig.paused = false;
    window.speechSynthesis.resume();
    lastResumeTime = Date.now();
  } else {
    speechConfig.paused = true;
    window.speechSynthesis.pause();
  }

  updatePlayButtons();
}

/**
 * Restarts the last played content with current voice settings
 */
function restartLastContent() {
  if (!speechConfig.currentText) return;

  const utterance = new SpeechSynthesisUtterance(speechConfig.currentText);
  utterance.voice = getBestVoice();
  utterance.pitch = speechConfig.pitch;
  utterance.rate = speechConfig.rate;

  setupUtteranceEvents(utterance, speechConfig.currentArticleId, speechConfig.currentTitle);

  speechConfig.speaking = true;
  speechConfig.paused = false;
  speechConfig.currentUtterance = utterance;
  speechConfig.isPreview = false;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  lastResumeTime = Date.now();
  updatePlayButtons();
}

export function stopSpeaking() {
  if (speechConfig.isPreview) {
    stopPreview();
  } else if (speechConfig.speaking || window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechState();
  }
}

export function resetSpeechState() {
  speechConfig.speaking = false;
  speechConfig.paused = false;
  speechConfig.currentUtterance = null;
  speechConfig.currentText = "";
  speechConfig.currentArticleId = null;
  speechConfig.currentTitle = "";
  clearLastReadingState();
  updateControlPanel(false);
  updatePlayButtons();
  enableAllButtons();
}

export function updateSpeechRate(value) {
  const newRate = parseFloat(value);
  speechConfig.rate = newRate;
  if (speechConfig.currentUtterance) {
    restartSpeechWithNewSettings();
  }
}

export function updateSpeechPitch(value) {
  const newPitch = parseFloat(value);
  speechConfig.pitch = newPitch;
  if (speechConfig.currentUtterance) {
    restartSpeechWithNewSettings();
  }
}

function restartSpeechWithNewSettings() {
  const utterance = new SpeechSynthesisUtterance(speechConfig.currentText);
  utterance.voice = getBestVoice();
  utterance.pitch = speechConfig.pitch;
  utterance.rate = speechConfig.rate;
  setupUtteranceEvents(utterance, speechConfig.currentArticleId, speechConfig.currentTitle);

  const wasPaused = speechConfig.paused;
  window.speechSynthesis.cancel();
  speechConfig.currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  lastResumeTime = Date.now();

  if (wasPaused) {
    window.speechSynthesis.pause();
  }
  updatePlayButtons();
}

function disableOtherButtons(currentArticleId) {
  document.querySelectorAll(".news-card").forEach((card) => {
    const cardId = card.dataset.articleId;
    const titleBtn = card.querySelector(".read-title");
    const articleBtn = card.querySelector(".speak-content");
    const playingIndicator = card.querySelector(".playing-indicator");

    if (titleBtn) titleBtn.disabled = speechConfig.speaking;
    if (articleBtn) articleBtn.disabled = speechConfig.speaking;

    if (cardId === currentArticleId && speechConfig.speaking) {
      if (playingIndicator) {
        playingIndicator.classList.add("visible");
        playingIndicator.textContent = speechConfig.paused ? "Paused" : "Playing";
      }
    } else if (playingIndicator) {
      playingIndicator.classList.remove("visible");
    }
  });
}

function enableAllButtons() {
  document.querySelectorAll(".news-card button").forEach((btn) => {
    btn.disabled = false;
  });
}

export function updatePlayButtons() {
  const globalPauseButton = document.querySelector("#tts-control-panel .pause-speech");
  const globalStopButton = document.querySelector("#tts-control-panel .stop-speech");

  if (globalPauseButton) {
    // Enable pause button if we're speaking or have content to restart
    globalPauseButton.disabled = !speechConfig.speaking && !speechConfig.currentText;
    const buttonText = globalPauseButton.querySelector(".button-text");
    if (buttonText) {
      if (speechConfig.isPreview) {
        buttonText.textContent = "Resume";
      } else {
        buttonText.textContent = speechConfig.paused ? "Resume" : "Pause";
      }
    }
  }

  if (globalStopButton) {
    globalStopButton.disabled = !speechConfig.speaking && !speechConfig.currentText;
  }

  disableOtherButtons(speechConfig.currentArticleId);
}
