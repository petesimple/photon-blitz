## Photon Blitz Score System – Changelog

### v2.4.2 (FatBoy) – 2025-06-04
- 🛡️ Enforced single-instance timeout: prevents multiple timeouts from stacking
- ⏸️ Match timer now pauses cleanly during timeout
- 👆 Tap-to-cancel timeout resets timer and resumes match instantly
- 🔁 `cancelTimeoutAndResume()` handles all timeout cleanup and match resumption
- 🧼 Removed legacy functions: `clearTimeoutState()` and `cancelTimeout()`
- 🧠 Improved logic guardrails in `startTimeout()` and `toggleTimer()`
- 🔊 Voice call "Play Puck" resumes after timeout (only once)

---

### v2.4.1 (FIA patch)
- 🎯 Case-insensitive pip attribution using compact summary initials
- 🧼 Polished one-line compact summary layout
- 🎮 Keyboard/gamepad debounce for match controls
- 🔒 Locked landscape scoreboard during OBS mode
- 📱 Improved mobile orientation prompts
