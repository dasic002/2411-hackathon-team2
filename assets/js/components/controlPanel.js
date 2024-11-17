import { speechConfig } from "../config/speechConfig.js";
import { handlePauseResume, stopSpeaking, updateSpeechRate, updateSpeechPitch, updatePlayButtons } from "../services/speechService.js";
import { getEnglishVoices, previewVoice, stopPreview } from "../services/voiceService.js";

function createVoiceControls() {
  const voices = getEnglishVoices();
  const voiceOptions = voices
    .map(
      (voice) =>
        `<option value="${voice.name}" ${voice.name === speechConfig.selectedVoice ? "selected" : ""}>
          ${voice.name} (${voice.lang})
      </option>`
    )
    .join("");

  return `
      <div class="control-group voice-control-group">
          <label for="voice-select">Voice:</label>
          <div class="voice-selection-container">
              <select id="voice-select" class="voice-select">
                  ${voiceOptions}
              </select>
              <button type="button" class="preview-voice" title="Preview voice">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  </svg>
              </button>
          </div>
      </div>
  `;
}

/**
 * Initializes the text-to-speech control panel and sets up its event handlers.
 *
 * @returns {HTMLElement|null} The initialized control panel element if found, null if panel doesn't exist in DOM
 *
 */
export function initializeControlPanel() {
  const panel = document.getElementById("tts-control-panel");
  if (!panel) return null;

  // Add initial body class if panel is visible
  if (panel.classList.contains("visible")) {
    document.body.classList.add("panel-visible");
  }

  const controlsContent = panel.querySelector(".voice-picker");
  if (controlsContent) {
    // Insert voice controls at the beginning
    controlsContent.insertAdjacentHTML("afterbegin", createVoiceControls());

    // Set up voice selection and preview
    const voiceSelect = controlsContent.querySelector("#voice-select");
    const previewButton = controlsContent.querySelector(".preview-voice");

    if (voiceSelect) {
      voiceSelect.addEventListener("change", (e) => {
        stopPreview();
        speechConfig.selectedVoice = e.target.value;
        // Enable pause/resume button if we have content to restart
        updatePlayButtons();
      });
    }

    if (previewButton) {
      previewButton.addEventListener("click", () => {
        if (speechConfig.selectedVoice) {
          // Stop any current speech or preview
          stopPreview();
          // Play new preview
          previewVoice(speechConfig.selectedVoice);
        }
      });
    }
  }

  // Set up other controls (existing code)
  initializeControlPanelEvents(panel);
}

/**
 * Sets up all event listeners for the text-to-speech control panel elements.
 * Handles controls for showing/hiding the panel, speech playback controls (pause/stop),
 * and real-time adjustments of speech rate and pitch.
 *
 * @param {HTMLElement} panel - The control panel DOM element containing all TTS controls
 * @returns {void}
 */
function initializeControlPanelEvents(panel) {
  // Toggle button for showing/hiding controls
  const toggleBtn = panel.querySelector(".controls-toggle");
  const controlsContent = panel.querySelector(".controls-content");

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    controlsContent.classList.toggle("show");
    toggleBtn.textContent = isExpanded ? "Show Controls" : "Hide Controls";
  });

  // Add event listeners for speech controls
  const pauseButton = panel.querySelector(".pause-speech");
  const stopButton = panel.querySelector(".stop-speech");
  const rateSlider = panel.querySelector("#global-speech-rate");
  const pitchSlider = panel.querySelector("#global-speech-pitch");

  // Pause/Resume button handler
  pauseButton.addEventListener("click", () => {
    if (speechConfig.speaking) {
      handlePauseResume();
    }
  });

  // Stop button handler
  stopButton.addEventListener("click", () => {
    if (speechConfig.speaking) {
      stopSpeaking();
    }
  });

  // Rate slider handler - real-time update
  rateSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    e.target.nextElementSibling.textContent = `${value}x`;
    updateSpeechRate(value);
  });

  // Pitch slider handler - real-time update
  pitchSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    e.target.nextElementSibling.textContent = `${value}x`;
    updateSpeechPitch(value);
  });
}

/**
 * Updates the visibility state and content of the text-to-speech control panel.
 * Controls the panel's visibility and updates the currently reading title if provided.
 *
 * @param {boolean} [show=true] - Whether to show (true) or hide (false) the control panel
 * @param {string} [title=""] - The title text to display in the reading-title element
 * @returns {void}
 */
export function updateControlPanel(show = true, title = "") {
  const panel = document.getElementById("tts-control-panel");
  if (!panel) return;

  if (!show) {
    panel.classList.remove("visible");
    document.body.classList.remove("panel-visible");
  } else {
    panel.classList.add("visible");
    document.body.classList.add("panel-visible");
    if (title) {
      panel.querySelector(".reading-title").textContent = title;
    }
  }
}
