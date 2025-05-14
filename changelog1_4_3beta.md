# Changelog

## Photon Blitz Score System — v1.4.3 (May 2, 2025)

### ✨ New Features
- **🔊 Sound Toggle:** Added checkbox in gear menu to enable/disable match audio (e.g., horn, speech).
- **🎵 Horn Sound:** A horn sound plays at the end of each match for a satisfying win cue.
- **🔐 Lock Scoreboard:** New checkbox in the gear menu pins the scoreboard to the top of the screen for OBS or streaming setups.
- **⚡ Blitz Mode Update:** "Blitz" announcement now triggers speech and visual at exactly 1:00 with proper reset mechanics on restart.

### 🛠 UI Enhancements
- **🔄 Gear Button Behavior Fixed:** Only one gear icon is visible at a time. Resetting match no longer leaves both gear icons showing.
- **🎨 Menu Button Styling:** Key match control buttons in the settings menu (`Update Names`, `Restart Game`, `Force Sudden Death`, `Swap Sides`, `Reset Match`) are now styled with the bright blue theme, matching other control buttons.
- **📏 Timer Height Locked:** Timer height is fixed to avoid layout shifting during updates and transitions like “Timeout” or “Sudden Death”.
- **🧼 Logo Positioning Polished:** Main logo now stays properly anchored at the top inside the scoreboard using `top: -20px` and `justify-content: flex-start`.

### 🐛 Bug Fixes
- **🧭 Click Zones Refined:** Clicking on score or timer now reliably triggers the correct action without misfires (especially in logo/timer areas).
- **🛑 Timeout Countdown Fix:** Timeout text displays cleanly and transitions back to the main timer without glitches or missed resumes.
- **📋 Gear Menu State Bug Fixed:** Resetting the match now keeps the correct gear icon visible (either main or back), avoiding duplicate display.
