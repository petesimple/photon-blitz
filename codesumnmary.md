# 📄 Photon Blitz Score System – Updated Code Summary (v1.5 Beta)

---

## 🧱 HTML Structure

The app includes two layout versions:

- **`PMindex.html`** → Portrait Mode (one-hand, mobile-friendly)
- **`index.html`** → Landscape Mode (widescreen / stream view)

### Key Sections (Both Layouts Share):

- **Logo/Blitz Display**:
  - `#logoWrapper` (landscape) / `.logo` (portrait)
  - `#blitzBanner` or `#blitzWrapper`: Shows "Blitz ⚡" at 1:00 with flashing text.
- **Timer Display**: `#timer` shows `mm:ss.t` format.
- **Score Areas**:
  - Portrait: `.names` and `.scores` stacked.
  - Landscape: `.score-side` and `.score-center` arranged horizontally.
- **Score Controls**: Buttons for scoring Home/Away, toggling the timer.
- **Timeout Button**: Now a large blue button for better visibility.
- **Settings Menu (`#menu`)**:
  - Includes gear toggle, name inputs, score/game adjusters, time controls, and summary.
  - **New:** A **Layout Switch button** to jump between modes (warning: resets game data).

---

## 🎨 CSS Purpose & Styles

### Base Styling:
- Digital-theme: Orbitron font, dark neon aesthetic.
- Responsiveness via `flexbox` and `@media` queries.

### Landscape Mode (index.html):
- `.scoreboard` is wide and shallow, arranged in **rows**.
- `.score-side` and `.score-center` group elements for alignment.
- `#logoWrapper` and `#blitzWrapper` swap based on blitz state.
  
### Portrait Mode (PMindex.html):
- `.scoreboard` is tall and narrow, arranged in **columns**.
- Easier for one-handed phone use.

### Shared Visual Features:
- Flash animation on `#blitzBanner` / `#blitzWrapper`.
- `body.locked` state pins scoreboard to top and hides the logo.
- Larger touch targets for buttons.

---

## ⚙️ JavaScript Functionality

### Core Timer Logic:
- `time = 1800` (tenths of seconds → 3:00.0).
- `updateTimer()` runs every 100ms while active.
- `speak()` calls announce critical times and Blitz Mode.

### Scoring System:
- `score('home'/'away')` increases score by 1 or 2 depending on Blitz.
- `suddenDeath` mode disables timer; next score ends the game.

### Blitz Mode:
- Auto-triggers at `time === 600` (1:00 mark).
- Displays banner and calls out "Blitz Blitz Blitz! Double Points!"
- Auto-clears if Sudden Death is triggered before time ends.

### Timeout System:
- `startTimeout()` pauses the game for 10 seconds and shows a countdown.

### Match Control:
- `endGame()`, `resetForNextGame()`, `restartGame()`, `resetMatch()` manage match flow.
- Win counts and game results are tracked.

### Name Handling & Swapping:
- `saveNames()` saves input to `localStorage`.
- `swapSides()` reverses players and scores.
- `updateSummary()` builds match results for review.

### UI Toggles & Layout:
- `toggleMenu()`: Opens/closes settings gear panel.
- `toggleLock()`: Pins scoreboard to top of screen.
- **New: Layout Switch Button**
  - **Switches between portrait and landscape modes.**
  - ⚠️ Displays warning: **“Changing layout will reset all game data.”**

### Audio:
- `playHorn()` plays match end sound.
- Sound toggled by gear menu (`soundEnabled`).

---

## 🧠 Planned Features Not Yet Implemented

- Persistent game data across layouts (possible with shared `localStorage` + URL flags).
- Automated ref mode with minimal interface.

---

## 🧭 Visual Overview (Now With Layout Options)

**Portrait (PMindex.html):**
```
 ____________________________
|        Photon Blitz       |
|---------------------------|
|  [BLITZ ⚡]               |
|  [   02:35.7   ]          |
| Player 1 (3)  Player 2(2) |
|---------------------------|
| [P1] [⏯] [P2]             |
|  Timeout 10s (Big Blue)   |
|     ⚙️ Gear & Settings   |
|___________________________|
```

**Landscape (index.html):**
```
 __________________________________________________
| P1 Name (3)   [Logo/Blitz ⚡]   (2) P2 Name       |
|     Score       [   02:35.7   ]       Score      |
|__________________________________________________|
| [P1] [⏯] [P2]    Timeout 10s   ⚙️ Settings       |
|__________________________________________________|
```
