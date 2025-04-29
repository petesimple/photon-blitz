# Photon Blitz Score System ⚡

Welcome to the **Photon Blitz Score System** – a fast, flexible, and flashy web-based scoreboard built for air hockey tournaments and time-based matchups.

## 🎯 Features

- ⏱ **3-Minute Countdown Timer** with tenths of seconds
- ⚡ **Blitz Mode** activates at 1-minute remaining with visual & audio alerts
- 🥶 **Sudden Death Mode** if the game ends in a tie
- 🔁 **Auto-Side Swapping** between games
- 🧮 **Game Wins Tracking** displayed next to each player's name
- 📋 **Match Summary** with per-game score history
- ⏸ **Timeout Button** (10 seconds)
- 🎤 **Callout Announcements** at key time intervals (speech synthesis)
- 🛠 **Gear Menu**:
  - Change player names
  - Reset game or full match
  - Adjust clock (+/- 0.5s to 1 min)
  - Force Sudden Death
  - Swap Sides

## 🚀 How to Use

1. **Open `index.html`** in any modern browser (mobile or desktop).
2. Click on player buttons to score.
3. Use the ⚙️ **gear icon** to access additional controls.
4. Match data and names persist locally between sessions via `localStorage`.

## 🧩 Tech Stack

- HTML5 + CSS3
- JavaScript
- Google Fonts: Orbitron
- PWA Support via `manifest.json` and `service-worker.js`

## 📦 Installation

Clone this repo or download the files and serve with any static host:

```bash
git clone https://github.com/petesimple/photon-blitz-score.git
cd photon-blitz-score

---
Created with ❤️ by pete and the Photon Blitz community.
Inspired by real gameplay needs.
Play fast. Play hard. Play Photon.
