📦 Photon Blitz Score System — v1.4.4
Release Date: May 2, 2025

✅ New Features
- Dynamic Timer Color
  - Timer now displays green when actively counting down.
  - Timer switches to red when paused or stopped.
  - Adds immediate visual feedback for match status.

🎯 Improvements
- Timer element is now visually more consistent with surrounding elements, using `display: flex` and `height` lock to prevent layout shift.
- Added explicit `classList.remove('running')` when the timer is stopped via scoring or timeout to ensure correct color reset.
- Timeout behavior and animation preserved for clarity during 10s pauses.

🐛 Bug Fixes
- Fixed issue where timer color would sometimes persist incorrectly after pausing.
- Ensured `score()` also resets `running` visuals if a point is scored while the timer is active.
- Cleaned up logic to prevent overlap between timer state and timeout state.

🧪 Tested In
- Chrome (desktop & Android PWA)
- Safari (iOS PWA)
- Edge Chromium
