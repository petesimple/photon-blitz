# Changelog

## Photon Blitz Score System — v1.4.0 (April 29, 2025)

### ✨ New Features
- **⏯ Toggle Symbol:** Replaced "Pause/Resume" button text with ⏯ icon for cleaner UI.
- **⚡ Blitz Mode Banner:** Added a centered, less-glowy animated banner that triggers at the 1-minute mark.
- **Responsive Button Layout:** All control buttons now wrap gracefully and scale better on mobile devices.

### 🛠 UI Enhancements
- .scoreboard is now position: relative to correctly contain Blitz banner.
- Improved button visibility with font-weight: bold.
- Standardized scoreboard width with min(500px, 90vw) and better box-sizing handling.
- Gear menu (#menu) now has a clear layout with padding and background contrast.

### 📱 Mobile Optimization
- Buttons stack and resize better under 600px width.
- .name-container now stacks vertically with responsive inputs.
- Menu and controls scale better on smaller viewports for tap-friendly design.

### 🐛 Fixes
- Blitz banner no longer escapes the scoreboard box.
- Score buttons are now visible again (flex-wrap fix and display ensured).
- Gear menu alignment fixed on mobile.
