Photon Blitz Score System - Code Summary

1. HTML Structure

The HTML section of the code defines the structure of the Photon Blitz Score System interface:

Header (<head>): Includes meta settings for responsiveness and PWA support, loads a Google font, and registers a service worker for offline capability.

Body (<body>): Contains all main UI elements:

Logo: An image for branding, hidden when scoreboard is locked.

Scoreboard: Displays the timer, player names, and current scores.

Timeout Button: Allows ref to call a 10-second timeout.

Score Buttons: Buttons to award points to Home or Away and to start/pause the game.

Gear Menu: Toggles a menu for game configuration and match management.

Gear Panel (#menu): Inputs for player names, controls for resetting games, time adjustment buttons, and a match summary.

2. CSS Purpose

The CSS styles ensure the app is visually polished and responsive:

General Styling: Uses a futuristic font and dark theme with neon accents.

Scoreboard Styling: Neon border, glowing effects, and a structured layout.

Responsive Layout: Includes media queries to resize elements for smaller screens.

Button Design: Styled with shadows, hover feedback, and spacing for usability.

Gear Menu: Hidden by default; becomes visible when toggled. It is scrollable if scoreboard is locked.

Locked State: When enabled, the scoreboard stays fixed at the top and the logo is hidden for a cleaner display on external screens.

3. JavaScript Functionality

The script section controls all interactivity and game logic:

Variables: Manage timer, score, match state, and game stats.

Timer Logic: Converts tenths of seconds to MM:SS.t, triggers blitz mode at 1:00, ends game at 0:00.

Speech: Uses speechSynthesis to announce times and blitz activation.

Score Tracking: Updates score based on team, accounts for blitz double-points, handles sudden death.

Timeout Feature: Temporarily halts the game and counts down from 10 seconds.

Game Flow:

endGame(): Determines winner and triggers next game setup.

restartGame() / resetMatch(): Fully or partially resets the match.

swapSides(): Switches player names and win counters.

Name Management: Saves and loads player names using localStorage.

UI Updates: Updates scoreboard and match summary after relevant events.

Gear Menu Toggle: Shows/hides the settings panel.

Lock Toggle: Adds a .locked class to the body to pin the scoreboard to the top for external display setups.
