## 📄 Photon Blitz Score System – Code Summary

---

### 🧱 HTML Structure

The HTML defines the visual layout and structure of the web scoreboard.

#### Key Sections:

- **Logo Image**: `<img>` for branding; hidden when the scoreboard is fixed.
- **Scoreboard (`.scoreboard`)**:
  - `#blitzBanner`: Flashing text shown at 1:00 left ("Blitz Mode").
  - `#timer`: Countdown clock in mm:ss.t format.
  - `.names`: Display of current player/team names.
  - `.scores`: Current game score (home vs away).
- **Timeout Button**: Single button for initiating 10-second timeout.
- **Buttons Wrapper (`#buttonsWrapper`)**:
  - Three main buttons for home score, away score, and start/pause toggle.
- **Gear Icon (`#gear`)**: Toggles visibility of configuration menu.
- **Menu Panel (`#menu`)**:
  - Name inputs, control buttons (reset, swap, update), and time adjustment buttons.
  - Match summary display.
  - "Lock scoreboard to top" checkbox.

---

### 🎨 CSS Purpose & Styles

#### General Styles:
- **Fonts and Theme**: Uses the Orbitron font for a digital look. Colors are neon-on-dark.
- **Layout**: Flexbox-based alignment for responsiveness and clarity.

#### Key Classes:

- `.scoreboard`: Main game display panel; becomes `fixed` when locked.
- `.buttons`: Scrollable row of buttons, responsive for mobile.
- `.names`, `.scores`: High visibility for real-time viewing.
- `@media` queries:
  - Adjust font sizes and layout for mobile users.
  - Support a locked scoreboard position on mobile and desktop.

#### Special Behaviors:
- `body.locked`: Adds top-padding, hides logo, and fixes scoreboard.

---

### ⚙️ JavaScript Functionality

#### Game Timer & Blitz Mode:
- `time = 1800`: Timer starts at 3:00. Stored in tenths of seconds.
- `updateTimer()`: Updates the visible timer every 100ms.
- Calls `speak()` for verbal announcements at set time intervals.
- At 1:00 (600 tenths), Blitz Mode activates visually and audibly.

#### Timer Controls:
- `toggleTimer()`: Starts or pauses the timer.
- `adjustTime(seconds)`: Adds or subtracts time dynamically.

#### Scoring:
- `score('home'/'away')`: Adds 1 or 2 points based on blitz state.
- `startTimeout()`: Pauses game for 10s; countdown visible.

#### Game State:
- `endGame()`: Determines winner or triggers sudden death.
- `restartGame()`, `resetForNextGame()`, `resetMatch()`: Manage game rounds.

#### Player & Match Management:
- `saveNames()`: Stores names in `localStorage`.
- `updateSummary()`: Builds HTML summary of game history.
- `swapSides()`: Switches player names and score counts.

#### UI Toggles:
- `toggleMenu()`: Shows or hides the gear/settings menu.
- `toggleLock()`: Locks/unlocks the scoreboard to the top.

#### Speech:
- `speak(text)`: Uses Web Speech API for audible cues.

---

### 🧭 Visual Diagram

```
 ____________________________
|        Photon Blitz       |
|---------------------------|
|  [BLITZ MODE ⚡]          |
|  [   02:35.7   ]          |  <- Timer
| Home (2)    Away (1)      |  <- Names + Scores
|---------------------------|
| [Home] [⏯] [Away]         |  <- Buttons
|   Timeout 10s             |
|     ⚙️ Settings           |
|___________________________|
```

---

