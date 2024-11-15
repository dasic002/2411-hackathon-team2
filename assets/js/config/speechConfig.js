/**
 * Configuration object for text-to-speech functionality.
 * Maintains the state of speech synthesis including settings and current playback status.
 */
export const speechConfig = {
  pitch: 1,
  rate: 1,
  speaking: false,
  paused: false,
  currentUtterance: null,
  currentText: "",
  currentArticleId: null,
  currentTitle: "",
};
