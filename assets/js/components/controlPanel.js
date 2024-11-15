import { speechConfig } from "../config/speechConfig.js";
import { handlePauseResume, stopSpeaking, updateSpeechRate, updateSpeechPitch } from "../services/speechService.js";

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

  initializeControlPanelEvents(panel);
  return panel;
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
    toggleBtn.textContent = isExpanded ? "Show Speed & Pitch Controls" : "Hide Speed & Pitch Controls";
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
