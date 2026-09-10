/**
 * US States & Capitals - Flashcard Study App
 * Streamlined Hero Card Controller with Settings Sheet & Memory Hooks
 */

(function () {
  'use strict';

  // Local Storage Keys
  const STORAGE_KEY_PROGRESS_CARDS = 'states_capitals_progress_cards_v1';
  const STORAGE_KEY_PROGRESS_MAP = 'states_capitals_progress_map_v1';
  const STORAGE_KEY_PROGRESS_LEGACY = 'states_capitals_progress_v1';
  const STORAGE_KEY_SETTINGS = 'states_capitals_settings_v2';

  // DOM Elements - Main UI
  const cardWrapper = document.getElementById('cardWrapper');
  const flashcard = document.getElementById('flashcard');
  const badgeMissed = document.getElementById('badgeMissed');
  const badgeGotIt = document.getElementById('badgeGotIt');

  const cardFrontMeta = document.getElementById('cardFrontMeta');
  const cardFrontLabel = document.getElementById('cardFrontLabel');
  const cardFrontTitle = document.getElementById('cardFrontTitle');
  const cardFrontStatusDot = document.getElementById('cardFrontStatusDot');

  const cardBackMeta = document.getElementById('cardBackMeta');
  const cardBackLabel = document.getElementById('cardBackLabel');
  const cardBackTitle = document.getElementById('cardBackTitle');
  const cardBackStatusDot = document.getElementById('cardBackStatusDot');
  const cardHookBox = document.getElementById('cardHookBox');
  const hookQuote = document.getElementById('hookQuote');
  const hookKey = document.getElementById('hookKey');

  const cardCounter = document.getElementById('cardCounter');
  const deckEmptyView = document.getElementById('deckEmptyView');
  const emptyDeckTitle = document.getElementById('emptyDeckTitle');
  const emptyDeckDesc = document.getElementById('emptyDeckDesc');
  const btnEmptyAction = document.getElementById('btnEmptyAction');
  const actionButtonsGroup = document.getElementById('actionButtonsGroup');

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnFlipCard = document.getElementById('btnFlipCard');
  const btnMarkMissed = document.getElementById('btnMarkMissed');
  const btnMarkKnown = document.getElementById('btnMarkKnown');

  const headerMasteredCount = document.getElementById('headerMasteredCount');
  const headerMasteredPercent = document.getElementById('headerMasteredPercent');
  const progressBarKnown = document.getElementById('progressBarKnown');
  const progressBarMissed = document.getElementById('progressBarMissed');
  const activeDeckBadge = document.getElementById('activeDeckBadge');
  const activeStatsBadge = document.getElementById('activeStatsBadge');

  // DOM Elements - Settings Modal
  const btnOpenSettings = document.getElementById('btnOpenSettings');
  const settingsModal = document.getElementById('settingsModal');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const btnDoneSettings = document.getElementById('btnDoneSettings');
  const settingDirectionGroup = document.getElementById('settingDirectionGroup');
  const settingFilterGroup = document.getElementById('settingFilterGroup');
  const settingOrderGroup = document.getElementById('settingOrderGroup');
  const settingsMissedCount = document.getElementById('settingsMissedCount');
  const toggleHints = document.getElementById('toggleHints');
  const btnTriggerReset = document.getElementById('btnTriggerReset');

  // DOM Elements - View Switcher & Panels
  const tabFlashcards = document.getElementById('tabFlashcards');
  const tabMapQuiz = document.getElementById('tabMapQuiz');
  const cardsView = document.getElementById('cardsView');
  const mapView = document.getElementById('mapView');

  // DOM Elements - Map Arena
  const mapSvgContainer = document.getElementById('mapSvgContainer');
  const mapModeBadge = document.getElementById('mapModeBadge');
  const mapStreakPill = document.getElementById('mapStreakPill');
  const mapPromptQuestion = document.getElementById('mapPromptQuestion');
  const mapChoiceBtns = [
    document.getElementById('mapChoice0'),
    document.getElementById('mapChoice1'),
    document.getElementById('mapChoice2'),
    document.getElementById('mapChoice3')
  ];
  const mapChoiceTexts = [
    document.getElementById('mapChoiceText0'),
    document.getElementById('mapChoiceText1'),
    document.getElementById('mapChoiceText2'),
    document.getElementById('mapChoiceText3')
  ];
  const mapFeedbackCard = document.getElementById('mapFeedbackCard');
  const mapFeedbackIcon = document.getElementById('mapFeedbackIcon');
  const mapFeedbackTitle = document.getElementById('mapFeedbackTitle');
  const mapFeedbackSubtitle = document.getElementById('mapFeedbackSubtitle');
  const mapFeedbackHook = document.getElementById('mapFeedbackHook');
  const mapHookQuote = document.getElementById('mapHookQuote');
  const mapHookKey = document.getElementById('mapHookKey');
  const btnNextMapState = document.getElementById('btnNextMapState');
  const btnToggleMapZoom = document.getElementById('btnToggleMapZoom');
  const zoomPillIcon = document.getElementById('zoomPillIcon');
  const zoomPillText = document.getElementById('zoomPillText');
  const toggleMapAutoZoom = document.getElementById('toggleMapAutoZoom');

  // DOM Elements - Reset Modal
  const resetModal = document.getElementById('resetModal');
  const btnCancelReset = document.getElementById('btnCancelReset');
  const btnConfirmReset = document.getElementById('btnConfirmReset');

  // DOM Elements - Dad Joke Milestone Modal & Vault
  const btnOpenVault = document.getElementById('btnOpenVault');
  const vaultModal = document.getElementById('vaultModal');
  const btnCloseVault = document.getElementById('btnCloseVault');
  const btnDoneVault = document.getElementById('btnDoneVault');
  const vaultProgressFill = document.getElementById('vaultProgressFill');
  const vaultProgressPercent = document.getElementById('vaultProgressPercent');

  const jokeModal = document.getElementById('jokeModal');
  const jokeBadge = document.getElementById('jokeBadge');
  const jokeSetup = document.getElementById('jokeSetup');
  const jokePunchline = document.getElementById('jokePunchline');
  const btnJokeContinue = document.getElementById('btnJokeContinue');

  const vaultJokesCount = document.getElementById('vaultJokesCount');
  const rankIcon = document.getElementById('rankIcon');
  const rankTitle = document.getElementById('rankTitle');
  const rankSub = document.getElementById('rankSub');
  const jokeVaultList = document.getElementById('jokeVaultList');

  const STORAGE_KEY_ACTIVE_VIEW = 'states_capitals_active_view_v1';
  const STORAGE_KEY_UNLOCKED_JOKES = 'states_capitals_jokes_v1';
  const STORAGE_KEY_AWARDED_TIERS = 'states_capitals_awarded_tiers_v1';
  const CURRENT_CACHE_VERSION = 'states-capitals-v9';

  // Application State
  let progressCards = loadProgressCards();
  let progressMap = loadProgressMap();
  let settings = loadSettings();
  let unlockedJokeIds = loadUnlockedJokes();
  let awardedTotalMilestones = loadAwardedMilestones();
  let jokeQueue = [];
  let activeView = localStorage.getItem(STORAGE_KEY_ACTIVE_VIEW) || 'cards';
  let deck = [];
  let currentIndex = 0;
  let isFlipped = false;
  let cardDirectionCache = {};

  // Map Quiz & Camera Zoom State
  let mapDeck = [];
  let mapIndex = 0;
  let mapStreak = 0;
  let currentMapState = null;
  let currentMapChoices = [];
  let currentMapRoundMode = 'state-first';
  let isMapAnswered = false;
  let isMapSvgLoaded = false;
  const SVG_DEFAULT_VIEWBOX = { x: 0, y: 0, width: 959, height: 593 };
  let currentViewBox = { ...SVG_DEFAULT_VIEWBOX };
  let isMapZoomedIn = false;
  let mapCameraAnimId = null;

  // Swipe & Touch variables
  let touchStartX = 0;
  let touchStartY = 0;
  let currentTranslateX = 0;
  let currentTranslateY = 0;
  let isDragging = false;
  let isTouchMoved = false;

  // Initialize App
  init();

  function init() {
    // Purge any stale service worker caches immediately (iOS / Safari cache buster)
    if ('caches' in window) {
      caches.keys().then(keys => {
        keys.forEach(k => {
          if (k !== CURRENT_CACHE_VERSION) {
            console.log('Purging stale cache:', k);
            caches.delete(k);
          }
        });
      });
    }

    buildDeck();
    syncSettingsUI();
    renderStats();
    renderCurrentCard();
    initMapSvg();
    initMapQuiz();
    switchView(activeView);
    bindEvents();
    registerServiceWorker();

    // Request persistent storage from browser (Safari iOS / Chrome)
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(() => {});
    }
  }

  // =========================================================================
  // Storage & Settings Helpers
  // =========================================================================
  function loadProgressCards() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROGRESS_CARDS);
      if (data) return JSON.parse(data);
      // Migrate legacy progress to cards if exists
      const legacy = localStorage.getItem(STORAGE_KEY_PROGRESS_LEGACY);
      return legacy ? JSON.parse(legacy) : {};
    } catch (e) {
      console.warn('LocalStorage cards progress error:', e);
      return {};
    }
  }

  function saveProgressCards() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS_CARDS, JSON.stringify(progressCards));
    } catch (e) {
      console.warn('LocalStorage save cards progress error:', e);
    }
  }

  function loadProgressMap() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROGRESS_MAP);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn('LocalStorage map progress error:', e);
      return {};
    }
  }

  function saveProgressMap() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS_MAP, JSON.stringify(progressMap));
    } catch (e) {
      console.warn('LocalStorage save map progress error:', e);
    }
  }

  function loadSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return data ? Object.assign({
        direction: 'state-first',
        filter: 'all',
        order: 'shuffle',
        hintsEnabled: true,
        mapAutoZoom: true
      }, JSON.parse(data)) : {
        direction: 'state-first',
        filter: 'all',
        order: 'shuffle',
        hintsEnabled: true,
        mapAutoZoom: true
      };
    } catch (e) {
      return {
        direction: 'state-first',
        filter: 'all',
        order: 'shuffle',
        hintsEnabled: true,
        mapAutoZoom: true
      };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // =========================================================================
  // Deck Generation & Filtering
  // =========================================================================
  function buildDeck() {
    let list = [...US_STATES];

    // Filter Deck
    if (settings.filter === 'missed') {
      list = list.filter(item => progressCards[item.state] === 'missed');
    }

    // Sort Deck
    if (settings.order === 'shuffle') {
      shuffleArray(list);
    } else {
      list.sort((a, b) => a.state.localeCompare(b.state));
    }

    deck = list;
    currentIndex = 0;
    isFlipped = false;
    cardDirectionCache = {};
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadUnlockedJokes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_UNLOCKED_JOKES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUnlockedJokes() {
    try {
      localStorage.setItem(STORAGE_KEY_UNLOCKED_JOKES, JSON.stringify(unlockedJokeIds));
    } catch (e) {}
  }

  function loadAwardedMilestones() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_AWARDED_TIERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveAwardedMilestones() {
    try {
      localStorage.setItem(STORAGE_KEY_AWARDED_TIERS, JSON.stringify(awardedTotalMilestones));
    } catch (e) {}
  }

  function getExplorerRank(knownCount) {
    if (knownCount >= 50) return { rank: 'President of Geography!', icon: '👑', next: 'Mastered all 50 States! 🎉' };
    if (knownCount >= 40) return { rank: 'State Governor', icon: '🏛️', next: `Master ${50 - knownCount} more to become President!` };
    if (knownCount >= 30) return { rank: 'Park Ranger', icon: '🦅', next: `Master ${40 - knownCount} more to become Governor!` };
    if (knownCount >= 20) return { rank: 'Trail Guide', icon: '🧭', next: `Master ${30 - knownCount} more to become Park Ranger!` };
    if (knownCount >= 10) return { rank: 'Road Tripper', icon: '🚗', next: `Master ${20 - knownCount} more to become Trail Guide!` };
    return { rank: 'Backseat Passenger', icon: '🥉', next: `Master ${10 - knownCount} more to become Road Tripper!` };
  }

  function updateRankAndVaultUI(knownCount) {
    const rankInfo = getExplorerRank(knownCount);
    if (rankIcon) rankIcon.textContent = rankInfo.icon;
    if (rankTitle) rankTitle.textContent = rankInfo.rank;
    if (rankSub) rankSub.textContent = rankInfo.next;

    if (typeof STATE_DAD_JOKES !== 'undefined') {
      const totalJokes = STATE_DAD_JOKES.length;
      const count = unlockedJokeIds.length;
      const pct = Math.round((count / totalJokes) * 100);

      if (vaultJokesCount) {
        vaultJokesCount.textContent = `${count}/${totalJokes} Collected`;
      }
      if (vaultProgressFill) {
        vaultProgressFill.style.width = `${pct}%`;
      }
      if (vaultProgressPercent) {
        vaultProgressPercent.textContent = `${pct}% Collected • ${count} of ${totalJokes} Unlocked`;
      }

      if (jokeVaultList) {
        if (count === 0) {
          jokeVaultList.innerHTML = '<div class="joke-vault-empty">Hit 5-question streaks or conquer states on the map to collect hilarious jokes!</div>';
        } else {
          jokeVaultList.innerHTML = unlockedJokeIds.map(id => {
            const joke = STATE_DAD_JOKES.find(j => j.id === id);
            if (!joke) return '';
            return `<div class="joke-vault-item">
              <div class="joke-vault-q">❓ ${joke.setup}</div>
              <div class="joke-vault-a">💡 ${joke.punchline}</div>
            </div>`;
          }).filter(Boolean).join('');
        }
      }
    }
  }

  function queueDadJoke(reasonBadge) {
    if (typeof STATE_DAD_JOKES === 'undefined' || STATE_DAD_JOKES.length === 0) return;

    // Pick randomly from all jokes to incentivize repeat play & sticker collection
    const joke = STATE_DAD_JOKES[Math.floor(Math.random() * STATE_DAD_JOKES.length)];
    const isNew = !unlockedJokeIds.includes(joke.id);

    if (isNew) {
      unlockedJokeIds.push(joke.id);
      saveUnlockedJokes();
    }

    const badgeText = isNew 
      ? `✨ NEW JOKE UNLOCKED! • ${reasonBadge}`
      : `🔄 CLASSIC DAD JOKE! • ${reasonBadge}`;

    jokeQueue.push({ badge: badgeText, joke, isNew });
    if (!jokeModal.classList.contains('is-open')) {
      showNextQueuedJoke();
    } else if (btnJokeContinue) {
      btnJokeContinue.innerHTML = '<span>Next Joke! 🥁 (' + jokeQueue.length + ' more)</span>';
    }
  }

  function showNextQueuedJoke() {
    if (!jokeModal || !jokeSetup || !jokePunchline) return;

    if (jokeQueue.length === 0) {
      jokeModal.classList.remove('is-open');
      return;
    }

    const item = jokeQueue.shift();
    if (jokeBadge) jokeBadge.textContent = item.badge;
    jokeSetup.textContent = item.joke.setup;
    jokePunchline.textContent = item.joke.punchline;

    if (btnJokeContinue) {
      if (jokeQueue.length > 0) {
        btnJokeContinue.innerHTML = '<span>Next Joke! 🥁 (' + jokeQueue.length + ' more)</span>';
      } else {
        btnJokeContinue.innerHTML = '<span>Keep Rolling! 🚗</span>';
      }
    }

    jokeModal.classList.add('is-open');

    let knownMap = 0;
    US_STATES.forEach(s => { if (progressMap[s.state] === 'known') knownMap++; });
    updateRankAndVaultUI(knownMap);
  }

  function renderStats() {
    let known = 0;
    let missed = 0;
    const total = US_STATES.length;

    // Active progress depends on active view (Flashcards vs Map Quiz)
    const activeProgress = activeView === 'map' ? progressMap : progressCards;

    US_STATES.forEach(item => {
      const status = activeProgress[item.state];
      if (status === 'known') known++;
      else if (status === 'missed') missed++;
    });

    const remaining = total - known - missed;
    const masteryPercent = Math.round((known / total) * 100);

    headerMasteredCount.textContent = known;
    headerMasteredPercent.textContent = `${masteryPercent}%`;
    settingsMissedCount.textContent = missed;

    progressBarKnown.style.width = `${(known / total) * 100}%`;
    progressBarMissed.style.width = `${(missed / total) * 100}%`;

    // Active Indicator Badge Text
    const deckName = settings.filter === 'missed' ? 'Missed Only' : 'All 50 States';
    let dirName = 'State First';
    if (settings.direction === 'capital-first') dirName = 'Capital First';
    if (settings.direction === 'random') dirName = 'Random Mix';

    if (activeView === 'map') {
      activeDeckBadge.textContent = `Map Quiz • ${dirName}`;
      if (headerStatsPill) headerStatsPill.title = 'Map Quiz Progress';
    } else {
      activeDeckBadge.textContent = `${deckName} • ${dirName}`;
      if (headerStatsPill) headerStatsPill.title = 'Flashcards Study Progress';
    }

    // Vault and Rank are tied to Map Quiz territory conquered
    let knownMap = 0;
    US_STATES.forEach(s => { if (progressMap[s.state] === 'known') knownMap++; });
    const rankInfo = getExplorerRank(knownMap);
    activeStatsBadge.textContent = `${rankInfo.icon} ${rankInfo.rank} • ❌ ${missed} Missed • ${remaining} Left`;
    updateRankAndVaultUI(knownMap);
  }

  function syncSettingsUI() {
    // Direction
    settingDirectionGroup.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.direction === settings.direction);
    });

    // Filter
    settingFilterGroup.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === settings.filter);
    });

    // Order
    settingOrderGroup.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.order === settings.order);
    });

    // Hints
    toggleHints.checked = settings.hintsEnabled !== false;

    // Map Camera Auto-Zoom
    if (toggleMapAutoZoom) {
      toggleMapAutoZoom.checked = settings.mapAutoZoom !== false;
    }
  }

  function renderCurrentCard() {
    isFlipped = false;
    flashcard.classList.remove('is-flipped');
    resetCardTransforms();

    // Handle Empty Deck
    if (!deck || deck.length === 0) {
      cardWrapper.style.display = 'none';
      actionButtonsGroup.style.display = 'none';
      btnPrev.disabled = true;
      btnNext.disabled = true;
      cardCounter.textContent = '0 cards';
      deckEmptyView.style.display = 'flex';

      if (settings.filter === 'missed') {
        const anyMissed = US_STATES.some(s => progressCards[s.state] === 'missed');
        if (anyMissed) {
          emptyDeckTitle.textContent = 'Set Finished!';
          emptyDeckDesc.textContent = 'You have reviewed all your missed cards. Switch back to "All States" or review again.';
          btnEmptyAction.textContent = 'Show All 50 States';
        } else {
          emptyDeckTitle.textContent = 'No Missed Cards!';
          emptyDeckDesc.textContent = 'You haven\'t marked any states as "Need Practice" yet. Quiz through all states to start tracking!';
          btnEmptyAction.textContent = 'Start Practicing';
        }
      } else {
        emptyDeckTitle.textContent = 'Deck Completed!';
        emptyDeckDesc.textContent = 'Great session! Reset progress or shuffle again to keep your memory sharp.';
        btnEmptyAction.textContent = 'Shuffle & Restart';
      }
      return;
    }

    // Bounds Check
    if (currentIndex >= deck.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = deck.length - 1;
    }

    cardWrapper.style.display = 'block';
    actionButtonsGroup.style.display = 'flex';
    deckEmptyView.style.display = 'none';

    const item = deck[currentIndex];
    const status = progressCards[item.state] || 'unseen';

    // Determine Side Orientation
    let isStateOnFront = true;
    if (settings.direction === 'capital-first') {
      isStateOnFront = false;
    } else if (settings.direction === 'random') {
      if (cardDirectionCache[item.id] === undefined) {
        cardDirectionCache[item.id] = Math.random() < 0.5;
      }
      isStateOnFront = cardDirectionCache[item.id];
    }

    // Set Front & Back Text
    if (isStateOnFront) {
      cardFrontMeta.textContent = 'QUESTION (STATE)';
      cardFrontLabel.textContent = 'US STATE';
      cardFrontTitle.textContent = item.state;

      cardBackMeta.textContent = 'ANSWER (CAPITAL)';
      cardBackLabel.textContent = 'CAPITAL';
      cardBackTitle.textContent = item.capital;
    } else {
      cardFrontMeta.textContent = 'QUESTION (CAPITAL)';
      cardFrontLabel.textContent = 'CAPITAL';
      cardFrontTitle.textContent = item.capital;

      cardBackMeta.textContent = 'ANSWER (STATE)';
      cardBackLabel.textContent = 'US STATE';
      cardBackTitle.textContent = item.state;
    }

    // Render Memory Hook Callout on Back
    if (settings.hintsEnabled !== false && item.hook) {
      cardHookBox.style.display = 'flex';
      hookQuote.textContent = `"${item.hook}"`;
      hookKey.textContent = item.key || '';
    } else {
      cardHookBox.style.display = 'none';
    }

    // Update Status Dots
    [cardFrontStatusDot, cardBackStatusDot].forEach(dot => {
      dot.className = 'card-status-dot';
      if (status === 'known') dot.classList.add('known');
      if (status === 'missed') dot.classList.add('missed');
    });

    // Navigation & Counter
    cardCounter.textContent = `Card ${currentIndex + 1} of ${deck.length}`;
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === deck.length - 1;
  }

  let lastFlipTime = 0;

  // =========================================================================
  // Card Navigation & Action Handlers
  // =========================================================================
  function toggleCardFlip() {
    if (deck.length === 0) return;
    isFlipped = !isFlipped;
    flashcard.classList.toggle('is-flipped', isFlipped);
    flashcard.style.transform = '';
    lastFlipTime = Date.now();
  }

  function nextCard() {
    if (currentIndex < deck.length - 1) {
      currentIndex++;
      renderCurrentCard();
    } else {
      renderCurrentCard();
    }
  }

  function prevCard() {
    if (currentIndex > 0) {
      currentIndex--;
      renderCurrentCard();
    }
  }

  function markCard(status) {
    if (deck.length === 0) return;
    const currentItem = deck[currentIndex];
    progressCards[currentItem.state] = status;
    saveProgressCards();
    renderStats();

    animateCardExit(status === 'known' ? 1 : -1, () => {
      if (settings.filter === 'missed' && status === 'known') {
        deck.splice(currentIndex, 1);
        if (currentIndex >= deck.length && deck.length > 0) {
          currentIndex = deck.length - 1;
        }
      } else {
        if (currentIndex < deck.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
      }
      renderCurrentCard();
    });
  }

  // =========================================================================
  // Swipe Gestures & Touch Engine (iPad & Mobile Support)
  // =========================================================================
  function onTouchStart(e) {
    if (deck.length === 0) return;
    const touch = e.touches ? e.touches[0] : e;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    currentTranslateX = 0;
    currentTranslateY = 0;
    isDragging = true;
    isTouchMoved = false;
  }

  function onTouchMove(e) {
    if (!isDragging || deck.length === 0) return;
    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    // Only engage dragging physics once user moves significantly (> 15px)
    if (Math.abs(deltaX) > 15 || Math.abs(deltaY) > 15) {
      isTouchMoved = true;
      cardWrapper.classList.add('is-dragging');
    }

    if (!isTouchMoved) return;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      if (e.cancelable) e.preventDefault();
    }

    currentTranslateX = deltaX;
    currentTranslateY = deltaY * 0.2;

    const rotation = deltaX * 0.04;
    const flipRotation = isFlipped ? 'rotateY(180deg)' : '';

    flashcard.style.transform = `${flipRotation} translate3d(${currentTranslateX}px, ${currentTranslateY}px, 0) rotate(${rotation}deg)`;

    // Badges Opacity
    if (deltaX > 25) {
      const opacity = Math.min(1, (deltaX - 25) / 90);
      badgeGotIt.style.opacity = opacity;
      badgeMissed.style.opacity = 0;
    } else if (deltaX < -25) {
      const opacity = Math.min(1, (-deltaX - 25) / 90);
      badgeMissed.style.opacity = opacity;
      badgeGotIt.style.opacity = 0;
    } else {
      badgeGotIt.style.opacity = 0;
      badgeMissed.style.opacity = 0;
    }
  }

  let didSwipe = false;

  function onTouchEnd(e) {
    if (!isDragging || deck.length === 0) return;
    isDragging = false;
    cardWrapper.classList.remove('is-dragging');

    badgeGotIt.style.opacity = 0;
    badgeMissed.style.opacity = 0;

    const threshold = 65;

    if (currentTranslateX > threshold) {
      didSwipe = true;
      markCard('known');
    } else if (currentTranslateX < -threshold) {
      didSwipe = true;
      markCard('missed');
    } else {
      // Release without swipe: reset drag offset and let standard click flip the card
      resetCardTransforms();
    }
  }

  function animateCardExit(direction, onComplete) {
    cardWrapper.classList.add('is-animating');
    const throwDistance = direction * (window.innerWidth || 500);
    const flipRotation = isFlipped ? 'rotateY(180deg)' : '';

    flashcard.style.transform = `${flipRotation} translate3d(${throwDistance}px, 0, 0) rotate(${direction * 20}deg)`;
    flashcard.style.opacity = '0';

    setTimeout(() => {
      resetCardTransforms();
      if (onComplete) onComplete();
    }, 280);
  }

  function resetCardTransforms() {
    cardWrapper.classList.remove('is-animating', 'is-dragging');
    flashcard.style.transform = '';
    flashcard.style.opacity = '1';
    badgeGotIt.style.opacity = 0;
    badgeMissed.style.opacity = 0;
    currentTranslateX = 0;
    currentTranslateY = 0;
  }

  // =========================================================================
  // Event Bindings
  // =========================================================================
  function bindEvents() {
    // Direct tap/click on card wrapper
    cardWrapper.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      if (didSwipe) {
        didSwipe = false;
        return;
      }
      toggleCardFlip();
    });

    // Touch events: handle swipe-to-rate gestures only
    cardWrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    cardWrapper.addEventListener('touchmove', onTouchMove, { passive: false });
    cardWrapper.addEventListener('touchend', onTouchEnd, { passive: true });
    cardWrapper.addEventListener('touchcancel', onTouchEnd, { passive: true });
    // NOTE: No mousedown/mouseup listeners here — on iOS those synthetic events
    // would double-fire and undo the flip triggered by the click event.

    // Action Buttons
    btnFlipCard.addEventListener('click', toggleCardFlip);
    btnMarkKnown.addEventListener('click', () => markCard('known'));
    btnMarkMissed.addEventListener('click', () => markCard('missed'));

    // Navigation
    btnPrev.addEventListener('click', prevCard);
    btnNext.addEventListener('click', nextCard);

    // Empty Deck Action Button
    btnEmptyAction.addEventListener('click', () => {
      settings.filter = 'all';
      saveSettings();
      syncSettingsUI();
      buildDeck();
      renderStats();
      renderCurrentCard();
    });

    // Settings Modal Open / Close
    btnOpenSettings.addEventListener('click', () => {
      syncSettingsUI();
      settingsModal.classList.add('is-open');
    });

    const closeSettings = () => settingsModal.classList.remove('is-open');
    btnCloseSettings.addEventListener('click', closeSettings);
    btnDoneSettings.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', e => {
      if (e.target === settingsModal) closeSettings();
    });

    // Setting: Direction
    settingDirectionGroup.addEventListener('click', e => {
      const btn = e.target.closest('.segmented-btn');
      if (!btn) return;
      settings.direction = btn.dataset.direction;
      saveSettings();
      syncSettingsUI();
      renderStats();
      renderCurrentCard();
      if (activeView === 'map' && !isMapAnswered) {
        renderMapQuestion();
      }
    });

    // Setting: Filter
    settingFilterGroup.addEventListener('click', e => {
      const btn = e.target.closest('.segmented-btn');
      if (!btn) return;
      settings.filter = btn.dataset.filter;
      saveSettings();
      syncSettingsUI();
      buildDeck();
      renderStats();
      renderCurrentCard();
    });

    // Setting: Order
    settingOrderGroup.addEventListener('click', e => {
      const btn = e.target.closest('.segmented-btn');
      if (!btn) return;
      settings.order = btn.dataset.order;
      saveSettings();
      syncSettingsUI();
      buildDeck();
      renderCurrentCard();
    });

    // Setting: Memory Hints Toggle
    toggleHints.addEventListener('change', () => {
      settings.hintsEnabled = toggleHints.checked;
      saveSettings();
      renderCurrentCard();
      if (mapFeedbackCard.style.display !== 'none') {
        mapFeedbackHook.style.display = settings.hintsEnabled ? 'flex' : 'none';
      }
    });

    // Setting: Map Camera Auto-Zoom Toggle
    if (toggleMapAutoZoom) {
      toggleMapAutoZoom.addEventListener('change', () => {
        settings.mapAutoZoom = toggleMapAutoZoom.checked;
        saveSettings();
        if (!settings.mapAutoZoom) {
          zoomToFullMap(true);
        } else if (currentMapState) {
          zoomToState(currentMapState.id, true);
        }
      });
    }

    // Explorer Vault Modal Open / Close
    const openVault = () => {
      let known = 0;
      US_STATES.forEach(s => { if (progressMap[s.state] === 'known') known++; });
      updateRankAndVaultUI(known);
      if (vaultModal) vaultModal.classList.add('is-open');
    };
    const closeVault = () => {
      if (vaultModal) vaultModal.classList.remove('is-open');
    };

    if (btnOpenVault) btnOpenVault.addEventListener('click', openVault);
    if (mapStreakPill) mapStreakPill.addEventListener('click', openVault);
    if (btnCloseVault) btnCloseVault.addEventListener('click', closeVault);
    if (btnDoneVault) btnDoneVault.addEventListener('click', closeVault);
    if (vaultModal) {
      vaultModal.addEventListener('click', e => {
        if (e.target === vaultModal) closeVault();
      });
    }

    // Trigger Reset from Settings
    btnTriggerReset.addEventListener('click', () => {
      settingsModal.classList.remove('is-open');
      resetModal.classList.add('is-open');
    });

    btnCancelReset.addEventListener('click', () => {
      resetModal.classList.remove('is-open');
    });

    btnConfirmReset.addEventListener('click', () => {
      progressCards = {};
      saveProgressCards();
      progressMap = {};
      saveProgressMap();
      awardedTotalMilestones = [];
      saveAwardedMilestones();
      resetModal.classList.remove('is-open');
      mapStreak = 0;
      mapStreakPill.textContent = '🔥 Streak: 0 • 🏆 Vault';
      renderStats();
      buildDeck();
      renderCurrentCard();
      if (activeView === 'map') {
        initMapQuiz();
      }
    });

    resetModal.addEventListener('click', e => {
      if (e.target === resetModal) resetModal.classList.remove('is-open');
    });

    // Dad Joke Milestone Modal Dismiss & Sequential Queue Advancer
    if (btnJokeContinue && jokeModal) {
      btnJokeContinue.addEventListener('click', () => {
        showNextQueuedJoke();
      });
      jokeModal.addEventListener('click', e => {
        if (e.target === jokeModal) {
          showNextQueuedJoke();
        }
      });
    }

    // View Switcher Tabs
    tabFlashcards.addEventListener('click', () => switchView('cards'));
    tabMapQuiz.addEventListener('click', () => switchView('map'));

    // Map Quiz Choice Buttons
    mapChoiceBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => handleMapChoice(idx));
    });

    // Next Map Question Button
    btnNextMapState.addEventListener('click', advanceMapQuestion);

    // Toggle Map Zoom Floating Button
    if (btnToggleMapZoom) {
      btnToggleMapZoom.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMapZoom();
      });
    }

    // Keyboard Shortcuts (Magic Keyboard / Desktop)
    window.addEventListener('keydown', e => {
      if (
        settingsModal.classList.contains('is-open') || 
        resetModal.classList.contains('is-open') ||
        (vaultModal && vaultModal.classList.contains('is-open')) ||
        (jokeModal && jokeModal.classList.contains('is-open'))
      ) return;

      if (activeView === 'cards') {
        if (e.code === 'Space') {
          e.preventDefault();
          toggleCardFlip();
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          markCard('known');
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          markCard('missed');
        } else if (e.code === 'ArrowUp') {
          e.preventDefault();
          prevCard();
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          nextCard();
        }
      } else if (activeView === 'map') {
        if (['1', 'a', 'A'].includes(e.key)) {
          e.preventDefault();
          handleMapChoice(0);
        } else if (['2', 'b', 'B'].includes(e.key)) {
          e.preventDefault();
          handleMapChoice(1);
        } else if (['3', 'c', 'C'].includes(e.key)) {
          e.preventDefault();
          handleMapChoice(2);
        } else if (['4', 'd', 'D'].includes(e.key)) {
          e.preventDefault();
          handleMapChoice(3);
        } else if (['Enter', ' '].includes(e.key) && isMapAnswered) {
          e.preventDefault();
          advanceMapQuestion();
        } else if (['z', 'Z'].includes(e.key)) {
          e.preventDefault();
          toggleMapZoom();
        }
      }
    });
  }

  // =========================================================================
  // View Switching (Flashcards vs Map Quiz)
  // =========================================================================
  function switchView(viewName) {
    activeView = viewName;
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_VIEW, viewName);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    if (viewName === 'map') {
      tabFlashcards.classList.remove('active');
      tabFlashcards.setAttribute('aria-selected', 'false');
      tabMapQuiz.classList.add('active');
      tabMapQuiz.setAttribute('aria-selected', 'true');

      cardsView.style.display = 'none';
      mapView.style.display = 'flex';

      if (!isMapSvgLoaded) {
        initMapSvg();
      }
      if (!currentMapState) {
        initMapQuiz();
      } else if (settings.mapAutoZoom !== false) {
        setTimeout(() => {
          if (currentMapState) zoomToState(currentMapState.id, true);
        }, 80);
      }
    } else {
      tabMapQuiz.classList.remove('active');
      tabMapQuiz.setAttribute('aria-selected', 'false');
      tabFlashcards.classList.add('active');
      tabFlashcards.setAttribute('aria-selected', 'true');

      mapView.style.display = 'none';
      cardsView.style.display = 'flex';
    }
    renderStats();
  }

  // =========================================================================
  // Map Quiz Engine & Smart Camera Zoom
  // =========================================================================
  function initMapSvg() {
    if (window.US_MAP_SVG && mapSvgContainer) {
      mapSvgContainer.innerHTML = window.US_MAP_SVG;
      isMapSvgLoaded = true;

      const svg = mapSvgContainer.querySelector('.us-vector-map');
      if (svg) {
        currentViewBox = { ...SVG_DEFAULT_VIEWBOX };
        svg.setAttribute('viewBox', '0 0 959 593');

        // Clicking highlighted state pulses it; tapping map elsewhere toggles zoom
        svg.addEventListener('click', (e) => {
          const path = e.target.closest('path[data-state-id]');
          if (path && currentMapState && path.id === `state-${currentMapState.id}`) {
            path.style.transform = 'scale(1.04)';
            setTimeout(() => { path.style.transform = ''; }, 200);
          } else {
            toggleMapZoom();
          }
        });
      }
    }
  }

  function calculateStateViewBox(stateId) {
    const targetPath = document.getElementById(`state-${stateId}`);
    if (!targetPath || typeof targetPath.getBBox !== 'function') {
      return { ...SVG_DEFAULT_VIEWBOX };
    }

    let bbox;
    try {
      bbox = targetPath.getBBox();
    } catch (e) {
      return { ...SVG_DEFAULT_VIEWBOX };
    }

    if (!bbox || bbox.width <= 0 || bbox.height <= 0) {
      return { ...SVG_DEFAULT_VIEWBOX };
    }

    // Minimum viewport dimensions to maintain regional geographic context (neighbors, coastlines)
    const MIN_W = 320;
    const MIN_H = 198;
    const ASPECT = 959 / 593;

    // Generous padding around the state
    const padX = Math.max(65, bbox.width * 0.45);
    const padY = Math.max(45, bbox.height * 0.45);

    let targetW = Math.max(MIN_W, bbox.width + padX * 2);
    let targetH = Math.max(MIN_H, bbox.height + padY * 2);

    if (targetW / targetH > ASPECT) {
      targetH = targetW / ASPECT;
    } else {
      targetW = targetH * ASPECT;
    }

    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    let targetX = centerX - targetW / 2;
    let targetY = centerY - targetH / 2;

    // Keep within reasonable SVG bounds
    if (targetX < -20) targetX = -20;
    if (targetY < -20) targetY = -20;
    if (targetX + targetW > 980) targetX = 980 - targetW;
    if (targetY + targetH > 615) targetY = 615 - targetH;

    return {
      x: Math.round(targetX),
      y: Math.round(targetY),
      width: Math.round(targetW),
      height: Math.round(targetH)
    };
  }

  function animateSvgViewBox(targetBox, duration = 450) {
    const svg = mapSvgContainer ? mapSvgContainer.querySelector('.us-vector-map') : null;
    if (!svg) return;

    if (mapCameraAnimId) {
      cancelAnimationFrame(mapCameraAnimId);
      mapCameraAnimId = null;
    }

    const startX = currentViewBox.x;
    const startY = currentViewBox.y;
    const startW = currentViewBox.width;
    const startH = currentViewBox.height;

    const dx = targetBox.x - startX;
    const dy = targetBox.y - startY;
    const dw = targetBox.width - startW;
    const dh = targetBox.height - startH;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(dw) < 1 && Math.abs(dh) < 1) {
      currentViewBox = { ...targetBox };
      svg.setAttribute('viewBox', `${targetBox.x} ${targetBox.y} ${targetBox.width} ${targetBox.height}`);
      return;
    }

    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      const curX = startX + dx * ease;
      const curY = startY + dy * ease;
      const curW = startW + dw * ease;
      const curH = startH + dh * ease;

      currentViewBox = { x: curX, y: curY, width: curW, height: curH };
      svg.setAttribute('viewBox', `${curX.toFixed(1)} ${curY.toFixed(1)} ${curW.toFixed(1)} ${curH.toFixed(1)}`);

      if (progress < 1) {
        mapCameraAnimId = requestAnimationFrame(step);
      } else {
        mapCameraAnimId = null;
        currentViewBox = { ...targetBox };
        svg.setAttribute('viewBox', `${targetBox.x} ${targetBox.y} ${targetBox.width} ${targetBox.height}`);
      }
    }

    mapCameraAnimId = requestAnimationFrame(step);
  }

  function zoomToState(stateId, smooth = true) {
    if (!isMapSvgLoaded) return;
    const box = calculateStateViewBox(stateId);
    isMapZoomedIn = true;
    updateZoomPillUI(true);
    if (smooth) {
      animateSvgViewBox(box, 450);
    } else {
      const svg = mapSvgContainer ? mapSvgContainer.querySelector('.us-vector-map') : null;
      if (svg) {
        currentViewBox = { ...box };
        svg.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
      }
    }
  }

  function zoomToFullMap(smooth = true) {
    if (!isMapSvgLoaded) return;
    isMapZoomedIn = false;
    updateZoomPillUI(false);
    if (smooth) {
      animateSvgViewBox(SVG_DEFAULT_VIEWBOX, 400);
    } else {
      const svg = mapSvgContainer ? mapSvgContainer.querySelector('.us-vector-map') : null;
      if (svg) {
        currentViewBox = { ...SVG_DEFAULT_VIEWBOX };
        svg.setAttribute('viewBox', '0 0 959 593');
      }
    }
  }

  function toggleMapZoom() {
    if (isMapZoomedIn) {
      zoomToFullMap(true);
    } else if (currentMapState) {
      zoomToState(currentMapState.id, true);
    }
  }

  function updateZoomPillUI(zoomed) {
    if (!btnToggleMapZoom) return;
    btnToggleMapZoom.classList.toggle('is-zoomed', zoomed);
    if (zoomPillIcon) zoomPillIcon.textContent = zoomed ? '🇺🇸' : '🔍';
    if (zoomPillText) zoomPillText.textContent = zoomed ? 'Full USA' : 'Focus';
  }

  function initMapQuiz() {
    mapDeck = [...US_STATES];
    shuffleArray(mapDeck);
    mapIndex = 0;
    mapStreak = 0;
    mapStreakPill.textContent = '🔥 Streak: 0 • 🏆 Vault';
    renderMapQuestion();
  }

  function getHardDistractors(targetState) {
    const stateById = {};
    US_STATES.forEach(s => { stateById[s.id] = s; });

    // 1. Gather direct neighbors
    const poolIds = new Set(targetState.neighbors || []);

    // 2. If fewer than 3, add secondary neighbors (neighbors of neighbors)
    if (poolIds.size < 3) {
      (targetState.neighbors || []).forEach(nId => {
        const neighbor = stateById[nId];
        if (neighbor && neighbor.neighbors) {
          neighbor.neighbors.forEach(nnId => {
            if (nnId !== targetState.id) poolIds.add(nnId);
          });
        }
      });
    }

    // 3. Fallback: fill with other states if needed
    if (poolIds.size < 3) {
      US_STATES.forEach(s => {
        if (s.id !== targetState.id) poolIds.add(s.id);
      });
    }

    // Filter out target state, shuffle and pick exactly 3
    const candidates = Array.from(poolIds).filter(id => id !== targetState.id);
    shuffleArray(candidates);
    const chosenIds = candidates.slice(0, 3);

    return chosenIds.map(id => stateById[id]);
  }

  function renderMapQuestion() {
    if (!mapDeck.length) {
      mapDeck = [...US_STATES];
      shuffleArray(mapDeck);
      mapIndex = 0;
    }

    if (mapIndex >= mapDeck.length) {
      shuffleArray(mapDeck);
      mapIndex = 0;
    }

    currentMapState = mapDeck[mapIndex];
    isMapAnswered = false;

    // Resolve question mode based on settings
    let mode = settings.direction;
    if (mode === 'random') {
      mode = Math.random() < 0.5 ? 'state-first' : 'capital-first';
    }
    currentMapRoundMode = mode;

    // Update prompt
    if (mode === 'state-first') {
      mapModeBadge.textContent = '🗺️ Name the State';
      mapPromptQuestion.textContent = 'What state is highlighted on the map?';
    } else {
      mapModeBadge.textContent = '⭐ Name the Capital';
      mapPromptQuestion.textContent = 'What is the capital of this highlighted state?';
    }

    // Reset feedback card
    mapFeedbackCard.style.display = 'none';

    // Highlight map path & render territory colors (Green = conquered, Red = missed)
    if (isMapSvgLoaded) {
      const allStatePaths = mapSvgContainer.querySelectorAll('.us-vector-map path[data-state-id]');
      allStatePaths.forEach(p => {
        p.classList.remove('state-active', 'state-correct', 'state-incorrect');
        const stateCode = p.dataset.stateId;
        const stateObj = US_STATES.find(s => s.id === stateCode);
        if (stateObj) {
          const status = progressMap[stateObj.state];
          if (status === 'known') {
            p.classList.add('state-conquered');
            p.classList.remove('state-missed');
          } else if (status === 'missed') {
            p.classList.add('state-missed');
            p.classList.remove('state-conquered');
          } else {
            p.classList.remove('state-conquered', 'state-missed');
          }
        }
      });

      const targetPath = document.getElementById(`state-${currentMapState.id}`);
      if (targetPath) {
        targetPath.classList.add('state-active');
      }

      // Smart Camera Auto-Zoom to active state
      if (settings.mapAutoZoom !== false) {
        setTimeout(() => {
          if (currentMapState) {
            zoomToState(currentMapState.id, true);
          }
        }, 50);
      } else {
        zoomToFullMap(false);
      }
    }

    // Generate hard choices using real neighbors
    const distractors = getHardDistractors(currentMapState);
    const allFour = [currentMapState, ...distractors];

    currentMapChoices = allFour.map(s => ({
      stateObj: s,
      label: mode === 'state-first' ? s.state : s.capital,
      isCorrect: s.id === currentMapState.id
    }));
    shuffleArray(currentMapChoices);

    // Render choice buttons
    mapChoiceBtns.forEach((btn, i) => {
      btn.disabled = false;
      btn.classList.remove('is-correct', 'is-wrong');
      const textEl = mapChoiceTexts[i];
      if (textEl && currentMapChoices[i]) {
        textEl.textContent = currentMapChoices[i].label;
      }
    });
  }

  function handleMapChoice(index) {
    if (isMapAnswered || !currentMapChoices[index]) return;
    isMapAnswered = true;

    // Disable buttons
    mapChoiceBtns.forEach(btn => {
      btn.disabled = true;
    });

    const chosen = currentMapChoices[index];
    const targetPath = document.getElementById(`state-${currentMapState.id}`);
    if (targetPath) {
      targetPath.classList.remove('state-active');
    }

    if (chosen.isCorrect) {
      if (targetPath) {
        targetPath.classList.remove('state-conquered', 'state-missed');
        targetPath.classList.add('state-correct');
      }
      mapChoiceBtns[index].classList.add('is-correct');
      mapStreak++;
      mapStreakPill.textContent = `🔥 Streak: ${mapStreak} • 🏆 Vault`;

      // Automatically register progress as Mastered (Green)
      progressMap[currentMapState.state] = 'known';
      saveProgressMap();
      renderStats();

      // Trigger A: 5-in-a-row Streak Milestone
      if (mapStreak > 0 && mapStreak % 5 === 0) {
        queueDadJoke(`🔥 ${mapStreak}-IN-A-ROW STREAK BONUS!`);
      }

      // Trigger B: Cumulative Conquered Milestone (every 5 states total: 5, 10, 15...)
      let knownCount = 0;
      US_STATES.forEach(s => { if (progressMap[s.state] === 'known') knownCount++; });
      const currentTier = Math.floor(knownCount / 5) * 5;
      if (currentTier >= 5 && !awardedTotalMilestones.includes(currentTier)) {
        awardedTotalMilestones.push(currentTier);
        saveAwardedMilestones();
        queueDadJoke(`🗺️ ${currentTier} STATES CONQUERED MILESTONE!`);
      }

      mapFeedbackIcon.textContent = '✅';
      mapFeedbackTitle.textContent = 'Correct!';
      if (currentMapRoundMode === 'state-first') {
        mapFeedbackSubtitle.textContent = `That's ${currentMapState.state}! Its capital is ${currentMapState.capital}.`;
      } else {
        mapFeedbackSubtitle.textContent = `${currentMapState.capital} is the capital of ${currentMapState.state}!`;
      }
    } else {
      if (targetPath) {
        targetPath.classList.remove('state-conquered');
        targetPath.classList.add('state-missed', 'state-incorrect');
      }
      mapChoiceBtns[index].classList.add('is-wrong');

      // Highlight the correct one
      const correctIdx = currentMapChoices.findIndex(c => c.isCorrect);
      if (correctIdx !== -1) {
        mapChoiceBtns[correctIdx].classList.add('is-correct');
      }

      mapStreak = 0;
      mapStreakPill.textContent = '🔥 Streak: 0 • 🏆 Vault';

      // Automatically register progress as Need Practice (Red)
      progressMap[currentMapState.state] = 'missed';
      saveProgressMap();
      renderStats();

      mapFeedbackIcon.textContent = '❌';
      mapFeedbackTitle.textContent = 'Not quite!';
      if (currentMapRoundMode === 'state-first') {
        mapFeedbackSubtitle.textContent = `The highlighted state is ${currentMapState.state} (Capital: ${currentMapState.capital}).`;
      } else {
        mapFeedbackSubtitle.textContent = `The capital of ${currentMapState.state} is ${currentMapState.capital}.`;
      }
    }

    // Display Memory Hook if enabled
    if (settings.hintsEnabled && currentMapState.hook) {
      mapFeedbackHook.style.display = 'flex';
      mapHookQuote.textContent = `"${currentMapState.hook}"`;
      mapHookKey.textContent = currentMapState.key;
    } else {
      mapFeedbackHook.style.display = 'none';
    }

    mapFeedbackCard.style.display = 'flex';
  }

  function advanceMapQuestion() {
    mapIndex++;
    renderMapQuestion();
  }

  // =========================================================================
  // Service Worker for Offline / iPad PWA (with iOS Force Update)
  // =========================================================================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`./sw.js?v=9`).then(reg => {
          // Proactively check for newer versions on iOS / mobile Safari
          reg.update().catch(() => {});

          // If a new worker is waiting, trigger instant activation
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }

          reg.addEventListener('updatefound', () => {
            const installing = reg.installing;
            if (installing) {
              installing.addEventListener('statechange', () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  installing.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        }).catch(err => {
          console.log('SW registration note:', err);
        });

        // Automatically reload when new service worker takes control on iOS
        let isRefreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!isRefreshing) {
            isRefreshing = true;
            window.location.reload();
          }
        });
      });
    }
  }

})();
