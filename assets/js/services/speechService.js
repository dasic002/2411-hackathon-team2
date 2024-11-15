import { speechConfig } from "../config/speechConfig.js";
import { updateControlPanel } from "../components/controlPanel.js";

export function speakContent(text, articleId, title) {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech is not supported in your browser");
    return;
  }

  if (speechConfig.speaking && articleId === speechConfig.currentArticleId) {
    handlePauseResume();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = speechConfig.pitch;
  utterance.rate = speechConfig.rate;

  setupUtteranceEvents(utterance, articleId, title);

  speechConfig.speaking = true;
  speechConfig.paused = false;
  speechConfig.currentUtterance = utterance;
  speechConfig.currentText = text;
  speechConfig.currentArticleId = articleId;
  speechConfig.currentTitle = title;

  const panel = document.getElementById("tts-control-panel");
  panel.classList.add("visible");
  updateControlPanel(true, title);

  window.speechSynthesis.speak(utterance);
  updatePlayButtons();
}

function setupUtteranceEvents(utterance, articleId, title) {
  utterance.onstart = () => {
    const panel = document.getElementById("tts-control-panel");
    panel.classList.add("visible");
    updateControlPanel(true, title);
    disableOtherButtons(articleId);
  };

  utterance.onend = () => {
    const panel = document.getElementById("tts-control-panel");
    panel.classList.remove("visible");
    resetSpeechState();
  };

  utterance.onpause = () => {
    speechConfig.paused = true;
    updatePlayButtons();
  };

  utterance.onresume = () => {
    speechConfig.paused = false;
    updatePlayButtons();
  };
}

export function handlePauseResume() {
  if (speechConfig.paused) {
    window.speechSynthesis.resume();
    speechConfig.paused = false;
  } else {
    window.speechSynthesis.pause();
    speechConfig.paused = true;
  }
  updatePlayButtons();
}

export function stopSpeaking() {
  if (speechConfig.speaking || window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechState();
    const panel = document.getElementById("tts-control-panel");
    panel.classList.remove("visible");
  }
}

export function resetSpeechState() {
  speechConfig.speaking = false;
  speechConfig.paused = false;
  speechConfig.currentUtterance = null;
  speechConfig.currentText = "";
  speechConfig.currentArticleId = null;
  speechConfig.currentTitle = "";
  updateControlPanel(false);
  updatePlayButtons();
  enableAllButtons();
}

export function updateSpeechRate(value) {
  const newRate = parseFloat(value);
  speechConfig.rate = newRate;

  if (speechConfig.currentUtterance) {
    const utterance = new SpeechSynthesisUtterance(speechConfig.currentText);
    utterance.pitch = speechConfig.pitch;
    utterance.rate = newRate;

    setupUtteranceEvents(utterance, speechConfig.currentArticleId, speechConfig.currentTitle);
    speechConfig.currentUtterance = utterance;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    updatePlayButtons();
  }
}

export function updateSpeechPitch(value) {
  const newPitch = parseFloat(value);
  speechConfig.pitch = newPitch;

  if (speechConfig.currentUtterance) {
    const utterance = new SpeechSynthesisUtterance(speechConfig.currentText);
    utterance.pitch = newPitch;
    utterance.rate = speechConfig.rate;

    setupUtteranceEvents(utterance, speechConfig.currentArticleId, speechConfig.currentTitle);
    speechConfig.currentUtterance = utterance;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    updatePlayButtons();
  }
}

function disableOtherButtons(currentArticleId) {
  // Disable all buttons when speaking
  document.querySelectorAll(".news-card").forEach((card) => {
    const cardId = card.dataset.articleId;
    const titleBtn = card.querySelector(".read-title");
    const articleBtn = card.querySelector(".speak-content");
    const playingIndicator = card.querySelector(".playing-indicator");

    titleBtn.disabled = speechConfig.speaking;
    articleBtn.disabled = speechConfig.speaking;

    // Show/hide playing indicator
    if (cardId === currentArticleId && speechConfig.speaking) {
      playingIndicator.classList.add("visible");
      playingIndicator.textContent = speechConfig.paused ? "Paused" : "Playing";
    } else {
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
    globalPauseButton.disabled = !speechConfig.speaking;
    globalPauseButton.querySelector(".button-text").textContent = speechConfig.paused ? "Resume" : "Pause";
  }

  if (globalStopButton) {
    globalStopButton.disabled = !speechConfig.speaking;
  }

  // Update article buttons disabled state
  disableOtherButtons(speechConfig.currentArticleId);
}
