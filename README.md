# Photon Blitz Score System ⚡

Welcome to the **Photon Blitz Score System** – a fast, flexible, and flashy web-based scoreboard built for air hockey tournaments and time-based matchups. Now updated with more polish, clarity, and tracking enhancements than ever before.

## 🆕 What’s New in ver-1.3 (☠️☠️☠️)

- ✨ **Mini Match Record Display**  
  Live game summaries now appear just below the logo and above the timer during matches in a compact format like `G1 A7–5B`.
  
- 🧠 **Smarter Sudden Death Handling**  
  Sudden death now awards only **1 point** by default — open discussion with players if you'd like this behavior adjusted.

- 🧼 **Visual Polish Overhaul**
  - Fixed logo centering and glow issues
  - Added gradient mask behind scoreboard when locked
  - Improved spacing and consistency across all screen sizes

- 🪞 **Refinements to Locked Mode**  
  Scoreboard now sticks perfectly at the top with proper layering behind it — tools and controls scroll cleanly below.

- 💬 **Improved Callouts & UX Prompts**  
  Refined voice announcements for clarity and timing.

---

## 🎯 Core Features

- ⏱ **3-Minute Countdown Timer** with tenths of seconds
- ⚡ **Blitz Mode** activates at 1-minute remaining with visual & audio alerts
- ☠️ **Sudden Death Mode** if the game ends in a tie
- 🔁 **Auto-Side Swapping** between games
- 🧮 **Game Wins Tracking** and skull icon if lost in sudden death
- 📋 **Full Match Summary** with per-game breakdown
- 📝 **Compact Match Log** (new!)
- ⏸ **Timeout Button** (10 seconds, with cancel tap)
- 🎤 **Callout Announcements** using speech synthesis
- 🛠 **Gear Menu**:
  - Change player names
  - Adjust scores or game wins manually
  - Reset game or full match
  - Adjust clock (+/- 0.5s to 1 min)
  - Force Sudden Death
  - Swap Sides
  - Lock scoreboard to top of screen (stream-friendly)

---

## 🚀 How to Use

1. **Open `index.html`** in any modern browser (mobile or desktop).
2. Tap the player buttons to score.
3. Use the ⚙️ **gear icon** to access tools and settings.
4. Player names and match data persist via `localStorage`.

---

## 🧩 Tech Stack

- HTML5 + CSS3
- Vanilla JavaScript
- Google Fonts: Orbitron
- PWA Support via `manifest.json` and `service-worker.js`

---

## 📦 Installation

Clone this repo or download and open locally / deploy to GitHub Pages or any static host:

```bash
git clone https://github.com/petesimple/photon-blitz-score.git
cd photon-blitz-score


---
Created with ❤️ by pete and the Photon Blitz community.
Inspired by real gameplay needs.
Play fast. Play hard. Play Photon.
