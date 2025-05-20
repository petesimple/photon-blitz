// Set the initial time to 3 minutes (in tenths of seconds)
  let time = 1800;

  // Declare timers and game state variables
  let timerInterval;
  let running = false;
  let homeScoreValue = 0;
  let awayScoreValue = 0;
  let blitz = false; // Blitz mode triggers at 1:00
  let suddenDeath = false;
  let homeGamesWon = 0;
  let awayGamesWon = 0;
  let matchesPlayed = 0;
  let timeoutCounter = 10;
  let timeoutInterval;
  let playPuckAnnounced = false;
  let timeoutActive = false;
  let lastGameWasSuddenDeath = false;
  let suddenDeathLoser = null;  

  // Predefined times in seconds to call out remaining time
  const calloutTimes = new Set([150, 120, 90, 70, 60, 45, 30, 15, 10, 5, 4, 3]);
  let announcedTimes = new Set(); // Keeps track of times already announced
  let gameScores = []; // Stores completed game results

  // Speaks the given text aloud using browser's speech synthesis
  function speak(text) {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.pitch = 1.2;
      msg.rate = 1.1;
      msg.volume = 1;
      speechSynthesis.speak(msg);
    }
  }


  // Updates the visible timer and manages game flow at key time events
  function updateTimer() {
  const timerEl = document.getElementById('timer');
  timerEl.classList.remove('timer-small');
  const minutes = String(Math.floor(time / 600));
  const seconds = String(Math.floor((time % 600) / 10)).padStart(2, '0');
  const tenths = String(time % 10);
  timerEl.textContent = `${minutes}:${seconds}.${tenths}`;

  // Trigger Blitz mode at exactly 1:00 remaining
  const blitzWrapper = document.getElementById('blitzWrapper');
  const logoWrapper = document.getElementById('logoWrapper');
  const blitzBanner = document.getElementById('blitzBanner');

  if (time <= 600 && !blitz) {
    blitz = true;
    blitzWrapper.classList.add('active');
    logoWrapper.classList.add('hidden');
    blitzBanner.style.display = 'block';
    speak("Blitz Blitz Blitz! Double Points!");
  } else if (time > 600 && !running && !blitz) {
    // Reset visuals if not in blitz and timer is above 1:00
    blitzWrapper.classList.remove('active');
    logoWrapper.classList.remove('hidden');
  }

  // Handle end-of-match logic
  if (time === 0) {
    clearInterval(timerInterval);
    running = false;
    if (homeScoreValue === awayScoreValue) {
      startSuddenDeath();
    } else {
      endGame();
    }
  }

  // Announce specific countdown moments
  const sec = Math.floor(time / 10);
  if (!announcedTimes.has(sec)) {
    if (sec === 70) speak("Ten seconds til Blitz!");
  else if (sec === 60) speak("One minute remaining");
  else if (sec === 45) speak("Forty-five seconds");
  else if (sec === 30) speak("Thirty seconds");
  else if (sec === 15) speak("Fifteen seconds");
  else if (sec === 10) speak("Ten seconds");
  else if (sec === 5) speak("Five");
  else if (sec === 4) speak("Four");
  else if (sec === 3) speak("Three");
  else if (sec === 120) speak("Two minutes remaining"); // ✅ new override
  else if (calloutTimes.has(sec)) speak(`${minutes}:${seconds}`);

  announcedTimes.add(sec);
}
}

  // Starts or pauses the timer
  function toggleTimer() {
  const timerEl = document.getElementById('timer');

  if (timeoutInterval) {
    clearInterval(timeoutInterval);
    timeoutInterval = null;
    updateTimer();
  }

  if (running) {
    clearInterval(timerInterval);
    timerEl.classList.remove('running'); // 🟥 Stopped = red
  } else {
    // ✅ Only announce "Play Puck" once per game
    if (!playPuckAnnounced) {
      speak("Play Puck");
      playPuckAnnounced = true;
    }

    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimer();
      }
    }, 100);
    timerEl.classList.add('running'); // 🟩 Running = green
  }

  running = !running;
}

  // Adjusts the timer by a number of seconds (+/-)
  function adjustTime(seconds) {
    time = Math.max(0, Math.min(5999, time + seconds * 10));
    updateTimer();
  }

  // Increments score for specified team (blitz gives double points)
  function score(side) {
  const timerEl = document.getElementById('timer');
  const logicalSide = getLogicalSide(side); // account for visual reversal

  if (logicalSide === 'home') homeScoreValue += blitz ? 2 : 1;
  if (logicalSide === 'away') awayScoreValue += blitz ? 2 : 1;

  document.getElementById('homeScoreDisplay').textContent = homeScoreValue;
  document.getElementById('awayScoreDisplay').textContent = awayScoreValue;

  if (suddenDeath) {
    endGame();
  } else {
    clearInterval(timerInterval);
    running = false;
    timerEl.classList.remove('running');
  }
}

  // Starts a 10-second timeout period
  function startTimeout() {
  if (timeoutActive) return; // 🚫 Prevent multiple timeouts

  timeoutActive = true; // ✅ Lock future triggers
  if (running) toggleTimer(); // ⏸ Pause the game if it's running

  timeoutCounter = 10;
  const timerEl = document.getElementById('timer');
  timerEl.textContent = `Timeout: 10`;
  timerEl.classList.add('timer-small');

  // Add a one-time listener to cancel timeout on tap
  const cancelTimeout = () => {
    if (timeoutActive) {
      clearInterval(timeoutInterval);
      timeoutInterval = null;
      timeoutActive = false;
      timerEl.classList.remove('timer-small');
      updateTimer();
    }
    timerEl.removeEventListener('click', cancelTimeout);
  };
  timerEl.addEventListener('click', cancelTimeout);

  timeoutInterval = setInterval(() => {
    timeoutCounter--;
    if (timeoutCounter > 0) {
      timerEl.textContent = `Timeout: ${timeoutCounter}`;
    } else {
      clearInterval(timeoutInterval);
      timeoutInterval = null;
      timeoutActive = false;
      timerEl.classList.remove('timer-small');
      updateTimer();
      toggleTimer(); // ▶️ Resume the game
      timerEl.removeEventListener('click', cancelTimeout);
    }
  }, 1000);
}

// Game data slots
let game1 = null;
let game2 = null;
let game3 = null;

// Called when a game ends
function endGame() {
  const homeName = document.getElementById('homeName').value || 'Player 1';
  const awayName = document.getElementById('awayName').value || 'Player 2';
  const homeScore = homeScoreValue;
  const awayScore = awayScoreValue;

  // Snapshot layout before swap
  const scoreboard = document.querySelector('.scoreboard');
  const reversed = scoreboard.classList.contains('reverse');
  const leftName = reversed ? awayName : homeName;
  const rightName = reversed ? homeName : awayName;
  const leftScore = reversed ? awayScore : homeScore;
  const rightScore = reversed ? homeScore : awayScore;
  const leftInitial = leftName.charAt(0).toUpperCase();
  const rightInitial = rightName.charAt(0).toUpperCase();

  // Determine actual winner and loser
  let winnerName, loserName, winnerScore, loserScore;
  if (homeScore > awayScore) {
    winnerName = homeName;
    loserName = awayName;
    winnerScore = homeScore;
    loserScore = awayScore;
  } else {
    winnerName = awayName;
    loserName = homeName;
    winnerScore = awayScore;
    loserScore = homeScore;
  }

  const winnerInitial = winnerName.charAt(0).toUpperCase();
  const loserInitial = loserName.charAt(0).toUpperCase();

  const gameData = {
    homeName,
    awayName,
    homeScore,
    awayScore,
    wasSuddenDeath: lastGameWasSuddenDeath,
    suddenDeathWinner: lastGameWasSuddenDeath
      ? homeScore > awayScore
        ? 'home'
        : 'away'
      : null,
    leftName,
    rightName,
    leftScore,
    rightScore,
    leftInitial,
    rightInitial,
    winnerName,
    loserName,
    winnerScore,
    loserScore,
    winnerInitial,
    loserInitial
  };

  if (!game1) game1 = gameData;
  else if (!game2) game2 = gameData;
  else game3 = gameData;

  updateNameDisplays();
  swapSides();
  resetForNextGame(true);
  updateSummary();
}

  // Resets scoreboard for the next game
  function resetForNextGame(preserveSuddenDeath = false) {
  homeScoreValue = 0;
  awayScoreValue = 0;
  time = 1800;
  blitz = false;
  suddenDeath = false;
  announcedTimes.clear();
  timeoutActive = false;
  document.getElementById('blitzBanner').style.display = 'none';
  updateTimer();
  document.getElementById('homeScoreDisplay').textContent = 0;
  document.getElementById('awayScoreDisplay').textContent = 0;

  // Only reset these after the pip logic runs
  if (!preserveSuddenDeath) {
    lastGameWasSuddenDeath = false;
    suddenDeathLoser = null;
  }
}

  // Fully resets match data and stats
  function resetMatch() {
  homeGamesWon = 0;
  awayGamesWon = 0;
  matchesPlayed = 0;
  gameScores = [];
  game1 = null;
  game2 = null;
  game3 = null;
  announcedTimes.clear();
  playPuckAnnounced = false;

  restartGame(true);

  // ✅ Ensure only the correct gear is shown
  document.getElementById('gear').style.display = 'none';
  document.getElementById('gearBack').style.display = 'block';

  // 🧹 Clear summaries and pips
  document.getElementById('compactSummary').textContent = '';
  document.getElementById('summaryText').textContent = '';
  updateNameDisplays();
}

  // Fully resets game and scoreboard UI state
  function restartGame(keepMenuOpen = false) {
  const timerEl = document.getElementById('timer');
  timerEl.classList.remove('timer-small');

  homeScoreValue = 0;
  awayScoreValue = 0;
  time = 1800;
  blitz = false;
  suddenDeath = false;
  announcedTimes.clear();
  timeoutActive = false;
  playPuckAnnounced = false;
  document.getElementById('blitzBanner').style.display = 'none';
  updateTimer();
  document.getElementById('homeScoreDisplay').textContent = 0;
  document.getElementById('awayScoreDisplay').textContent = 0;
  clearInterval(timerInterval);

  if (!keepMenuOpen) {
    document.getElementById('menu').classList.remove('active');
    document.getElementById('buttonsWrapper').style.display = 'flex';
    document.getElementById('gear').style.display = 'block';
    document.querySelector('.timeout-button').style.display = 'block';
    document.getElementById('gearBack').style.display = 'none';
  }

  running = false;
  updateSummary();
}

  // Opens and closes gear menu
  function toggleMenu() {
  const menu = document.getElementById('menu');
  const buttonsWrapper = document.getElementById('buttonsWrapper');
  const gear = document.getElementById('gear');
  const timeoutBtn = document.querySelector('.timeout-button');
  const gearBack = document.getElementById('gearBack');
  const versionTag = document.getElementById('versionTag'); // 👈 add this line

  const isActive = menu.classList.contains('active');
  menu.classList.toggle('active');
  buttonsWrapper.style.display = isActive ? 'flex' : 'none';
  gear.style.display = isActive ? 'block' : 'none';
  timeoutBtn.style.display = isActive ? 'block' : 'none';
  gearBack.style.display = isActive ? 'none' : 'block';
  versionTag.style.display = isActive ? 'block' : 'none'; // 👈 this hides version when menu is open

  if (!isActive) {
    setTimeout(() => {
      document.getElementById('homeName').focus();
    }, 300);
  }
}

  // Puts game into sudden death mode (no timer, first score wins)
  function startSuddenDeath() {
  clearInterval(timerInterval);
  suddenDeath = true;
  lastGameWasSuddenDeath = false;
  running = false;
  time = 0;

  // 🔁 Auto-clear Blitz Mode
  blitz = false;
  document.getElementById('blitzBanner').style.display = 'none';

  const timerEl = document.getElementById('timer');
  timerEl.textContent = 'Sudden Death';
  timerEl.classList.add('timer-small'); // 👈 Add this line
}

  function swapSides() {
  const scoreboard = document.querySelector('.scoreboard');
  scoreboard.classList.toggle('reverse');

  // Swap player names
  const homeInput = document.getElementById('homeName');
  const awayInput = document.getElementById('awayName');
  [homeInput.value, awayInput.value] = [awayInput.value, homeInput.value];

  // Swap scores
  [homeScoreValue, awayScoreValue] = [awayScoreValue, homeScoreValue];
  document.getElementById('homeScoreDisplay').textContent = homeScoreValue;
  document.getElementById('awayScoreDisplay').textContent = awayScoreValue;

  // Swap games won
  [homeGamesWon, awayGamesWon] = [awayGamesWon, homeGamesWon];

  // Update UI
  updateNameDisplays();
  updateSummary();
}

    function saveNames() {
  const homeName = document.getElementById('homeName').value;
  const awayName = document.getElementById('awayName').value;
  localStorage.setItem('homeName', homeName);
  localStorage.setItem('awayName', awayName);
  updateNameDisplays();
  updateSummary();
}
  // Updates name and score UI for each player
  function updateNameDisplays(preLoser = null, preWinner = null, suddenDeathWinner = null) {
  const scoreboard = document.querySelector('.scoreboard');
  const reversed = scoreboard.classList.contains('reverse');

  const homeNameInput = document.getElementById('homeName').value || 'Player 1';
  const awayNameInput = document.getElementById('awayName').value || 'Player 2';

  const gamesTotal = homeGamesWon + awayGamesWon;

  const homeLost = lastGameWasSuddenDeath && preLoser === 'home';
  const awayLost = lastGameWasSuddenDeath && preLoser === 'away';

  const leftDisplay = document.getElementById('homeDisplay');
  const rightDisplay = document.getElementById('awayDisplay');

  // Determine actual sides based on visual layout
  const leftName = reversed ? awayNameInput : homeNameInput;
  const rightName = reversed ? homeNameInput : awayNameInput;
  const leftWins = reversed ? awayGamesWon : homeGamesWon;
  const rightWins = reversed ? homeGamesWon : awayGamesWon;
  const leftLost = reversed ? awayLost : homeLost;
  const rightLost = reversed ? homeLost : awayLost;
  const leftSide = reversed ? 'away' : 'home';
  const rightSide = reversed ? 'home' : 'away';

  if (gamesTotal > 0) {
    leftDisplay.textContent = `${leftName} ${getPips(leftWins, leftLost, gamesTotal, suddenDeathWinner === leftSide)}`;
    rightDisplay.textContent = `${rightName} ${getPips(rightWins, rightLost, gamesTotal, suddenDeathWinner === rightSide)}`;
  } else {
    leftDisplay.textContent = leftName;
    rightDisplay.textContent = rightName;
  }
}
  // Builds summary text for the match summary section
  function updateSummary() {
  const homeName = document.getElementById('homeName').value || 'Player 1';
  const awayName = document.getElementById('awayName').value || 'Player 2';
  let summary = '';

  if (homeGamesWon > awayGamesWon) {
    summary += `<span class='winner'>Home: ${homeName} (${homeGamesWon} Wins)</span><br>Away: ${awayName} (${awayGamesWon} Wins)<br>`;
  } else if (awayGamesWon > homeGamesWon) {
    summary += `Home: ${homeName} (${homeGamesWon} Wins)<br><span class='winner'>Away: ${awayName} (${awayGamesWon} Wins)</span><br>`;
  } else {
    summary += `Home: ${homeName} (${homeGamesWon} Wins)<br>Away: ${awayName} (${awayGamesWon} Wins)<br>`;
  }

  summary += `Matches Played: ${matchesPlayed}<br><br>`;

  const games = [game1, game2, game3].filter(Boolean);
  if (games.length > 0) {
    summary += `<strong>Game Scores:</strong><br>` +
      games.map((g, i) =>
        `Game ${i + 1}: ${g.homeName} ${g.homeScore} – ${g.awayScore} ${g.awayName}${g.wasSuddenDeath ? ' †' : ''}`
      ).join('<br>');
  }

  document.getElementById('summaryText').innerHTML = summary;
  updateCompactSummary();
}
    // Rebuilds the compact “G1…G3” line
function updateCompactSummary() {
  const container = document.getElementById('compactSummary');
  const games = [game1, game2, game3].filter(Boolean);

  if (games.length === 0) {
    container.textContent = '';
    return;
  }

  const parts = games.map((g, i) => {
    const isSD = g.wasSuddenDeath ? '†' : '';
    const winnerInitial = g.winnerInitial;
    const loserInitial = g.loserInitial;
    const winnerScore = g.winnerScore;
    const loserScore = g.loserScore;

    return `G${i + 1} ${isSD}${winnerInitial}${winnerScore}–${loserScore}${loserInitial}`;
  });

  container.textContent = parts.join(', ');
}
  // Loads saved player names from localStorage on page load
  function loadNames() {
    const savedHome = localStorage.getItem('homeName');
    const savedAway = localStorage.getItem('awayName');
    if (savedHome) document.getElementById('homeName').value = savedHome;
    if (savedAway) document.getElementById('awayName').value = savedAway;
    updateNameDisplays();
    updateSummary();
  }

  // Run initial load
  loadNames();
  updateTimer();

    document.getElementById('homeScoreDisplay').addEventListener('click', (e) => {
  e.stopPropagation();
  scoreVisual('left');
});

document.getElementById('awayScoreDisplay').addEventListener('click', (e) => {
  e.stopPropagation();
  scoreVisual('right');
});

    document.querySelector('.scoreboard').addEventListener('click', (e) => {
  const logo = document.getElementById('mainLogo');

  // If the logo was clicked, trigger timeout
  if (logo && logo.contains(e.target)) {
    startTimeout();
    return;
  }

  // If timer was clicked, toggle it
  if (e.target.id === 'timer') {
    toggleTimer();
    return;
  }

  // All scoring is now handled by direct listeners on #homeScoreDisplay and #awayScoreDisplay
  // No fallback scoring logic needed here
});
    document.getElementById('timer').addEventListener('click', (e) => {
  e.stopPropagation(); // prevent scoreboard click fallback
  toggleTimer();       // toggle the match timer
});
  // Toggles the "locked" class on body to fix scoreboard at top
  function toggleLock(checkbox) {
    const scoreboard = document.querySelector('.scoreboard');
    if (checkbox.checked) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }
    function adjustScore(side, delta) {
  if (side === 'home') {
    homeScoreValue = Math.max(0, homeScoreValue + delta);
    document.getElementById('homeScoreDisplay').textContent = homeScoreValue;
  } else {
    awayScoreValue = Math.max(0, awayScoreValue + delta);
    document.getElementById('awayScoreDisplay').textContent = awayScoreValue;
  }
}

function adjustGames(side, delta) {
  if (side === 'home') {
    homeGamesWon = Math.max(0, homeGamesWon + delta);
  } else {
    awayGamesWon = Math.max(0, awayGamesWon + delta);
  }
  updateNameDisplays();
  updateSummary();
}
    // play horn sound at the end of the match
    let soundEnabled = true;

function playHorn() {
  if (soundEnabled) {
    const horn = document.getElementById('hornSound');
    horn.currentTime = 0;
    setTimeout(() => {
      horn.play().catch((e) => {
        console.warn("Horn playback failed:", e);
      });
    }, 0);
  }
}
    // Toggles sound on/off 
    function toggleSound() {
  soundEnabled = document.getElementById('soundToggle').checked;
}
    function switchToPortrait() {
  // Optional: confirm switch
  if (confirm("Switch to Portrait (One-Hand) Mode? Switching layout will reset all game data. Continue?")) {
    window.location.href = "PMindex.html";
  }
}
    function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function checkOrientation() {
    const prompt = document.getElementById('rotatePrompt');
    if (isMobile() && window.innerHeight > window.innerWidth) {
      prompt.style.display = 'flex';
    } else {
      prompt.style.display = 'none';
    }
  }

  window.addEventListener("orientationchange", checkOrientation);
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("load", checkOrientation);

function getPips(wins, isLoser = false, totalGames = 0, isSuddenDeathWinner = false) {
  const pipCount = Math.min(Math.max(totalGames, wins), 7);
  let pips = '';

  for (let i = 0; i < wins; i++) {
    if (isSuddenDeathWinner && i === wins - 1) {
      pips += '⭐'; // Gold star pip for sudden death win
    } else {
      pips += '●';
    }
  }

  const emptySlots = pipCount - wins;

  if (isLoser && emptySlots > 0) {
    pips += '☠️' + '○'.repeat(emptySlots - 1);
  } else {
    pips += '○'.repeat(emptySlots);
  }

  return pips;
}
    
function getLogicalSide(side) {
  const reversed = document.querySelector('.scoreboard').classList.contains('reverse');
  if (reversed) {
    return side === 'home' ? 'away' : 'home';
  }
  return side;
}

    function scoreVisual(visualSide) {
  const reversed = document.querySelector('.scoreboard').classList.contains('reverse');
  const actualSide = (visualSide === 'left')
    ? (reversed ? 'away' : 'home')
    : (reversed ? 'home' : 'away');
  score(actualSide);
}
