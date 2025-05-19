# Photon Blitz Score System – Changelog

## 🧾 Version 1.6.0 (deathproof) – 2025-05-19

**Codename:** `deathproof`  
**Status:** 🟢 Stable  
**Release Highlights:** After what felt like an endless round of sudden deaths, the scoreboard is now *truly* deathproof. Pips behave. Layout survives. We did it.

---

### ✅ Major Fixes
- 🧠 **Pip Logic Resolved Across Side Swaps**  
  Sudden death stars and ☠️ loser icons now *follow the actual outcome* even after a visual side swap.  
  No more confused champions or ghost pips.

- 🔁 **`swapSides()` Stability Fix**  
  Visual layout no longer breaks when swapping sides mid-match. Scoreboard maintains structure and integrity.

- ⚖️ **Accurate Compact Summary Post-Swap**  
  The bottom mini-summary now reflects true outcomes, even if sides were swapped after the game.

---

### 🧪 UI / UX Polishing
- 🧷 Anchored player name and score integrity during swaps  
- 🧼 Cleaned up scoreboard click logic to avoid phantom score taps  
- 🔮 General layout resilience improvements — the scoreboard is now ready for live battle conditions

---

### 🧨 Under-the-Hood
- Refactored `updateNameDisplays()` with proper side reversal logic
- Added internal side tracking using `.reverse` class to drive all visual logic

---

### 🗿 Known Legends
- You can still tap the timer to pause/play like a Jedi.
- Blitz Mode remains aggressively cool.
- Sudden Death is still sudden. Now with 100% more accuracy.

---

### 🔚 Final Verdict
This build is **deathproof**, sideproof, pip-proof, and stream-ready.  
No more phantom stars. No more cursed swaps.

---
