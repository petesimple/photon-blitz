# Photon Blitz Score System – Changelog

## [v2.3.3] - 2025-05-22

### 🔧 Fixed
- Score pips and compact summary now remain accurate across side swaps and sudden death logic.
- Final game data snapshot now reliably records winner/loser details before side changes.

### 🧪 Known Issues
- Full Match Summary section may still display inconsistent win counts or game ordering in some edge cases.

### 🕶️ Workaround
- Temporarily **hides full Match Summary** section from UI via CSS (`#matchSummary { display: none; }`) until logic is stabilized.
- Compact summary (`G1 A7-5B` format) remains visible and operational.

### 🎯 Stable Features
- Blitz Mode triggers at 1:00 with visual + voice callout ("Blitz Blitz Blitz! Double Points!")
- "Ten seconds til Blitz" pre-callout at 1:10
- Sudden Death handling with visual cues and pip tracking (☠️, ⭐, etc.)
- Tap-to-score, timeout countdown, gear menu, and visual side swap supported
- Player names, scores, and match state persist locally
- Portrait mode redirect logic removed from menu (locked for landscape use)

---

🛠️ Build: `v2.3.3 (ready)`
