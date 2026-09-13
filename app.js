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
  const STORAGE_KEY_CARD_COLLECTION = 'states_clash_collection_v1';
  const STORAGE_KEY_BATTLE_DECK = 'states_clash_deck_v1';
  const STORAGE_KEY_PENDING_PACKS = 'states_clash_packs_v1';
  const STORAGE_KEY_CHALLENGER_STAGE = 'states_clash_stage_v1';
  const STORAGE_KEY_DEFEATED_CHALLENGERS = 'states_clash_defeated_v1';
  const CURRENT_CACHE_VERSION = 'states-capitals-v11';

  // DOM Elements - Battle Arena & Pack System
  const tabBattleArena = document.getElementById('tabBattleArena');
  const battleView = document.getElementById('battleView');
  const navPackBadge = document.getElementById('navPackBadge');
  const btnOpenPacks = document.getElementById('btnOpenPacks');
  const headerPackBadge = document.getElementById('headerPackBadge');
  const binderDeckCountPill = document.getElementById('binderDeckCountPill');

  const btnSubNavMatch = document.getElementById('btnSubNavMatch');
  const btnSubNavBinder = document.getElementById('btnSubNavBinder');
  const btnSubNavLadder = document.getElementById('btnSubNavLadder');
  const battlePanelMatch = document.getElementById('battlePanelMatch');
  const battlePanelBinder = document.getElementById('battlePanelBinder');
  const battlePanelLadder = document.getElementById('battlePanelLadder');

  const arenaOpponentAvatar = document.getElementById('arenaOpponentAvatar');
  const arenaOpponentName = document.getElementById('arenaOpponentName');
  const arenaOpponentTitle = document.getElementById('arenaOpponentTitle');
  const btnChangeOpponent = document.getElementById('btnChangeOpponent');
  const arenaPlayerScore = document.getElementById('arenaPlayerScore');
  const arenaAiScore = document.getElementById('arenaAiScore');
  const arenaRoundDots = document.getElementById('arenaRoundDots');
  const aiSlotPlaceholder = document.getElementById('aiSlotPlaceholder');
  const aiCardMount = document.getElementById('aiCardMount');
  const playerSlotPlaceholder = document.getElementById('playerSlotPlaceholder');
  const playerCardMount = document.getElementById('playerCardMount');
  const clashVsBadge = document.getElementById('clashVsBadge');
  const clashResultBanner = document.getElementById('clashResultBanner');
  const clashResultTitle = document.getElementById('clashResultTitle');
  const clashResultDesc = document.getElementById('clashResultDesc');
  const btnClashAction = document.getElementById('btnClashAction');
  const arenaHandGrid = document.getElementById('arenaHandGrid');

  const arenaMatchOverlay = document.getElementById('arenaMatchOverlay');
  const matchOverlayIcon = document.getElementById('matchOverlayIcon');
  const matchOverlayTitle = document.getElementById('matchOverlayTitle');
  const matchOverlayDesc = document.getElementById('matchOverlayDesc');
  const matchRewardPill = document.getElementById('matchRewardPill');
  const btnMatchNextRival = document.getElementById('btnMatchNextRival');
  const btnMatchPlayAgain = document.getElementById('btnMatchPlayAgain');
  const btnMatchGoLadder = document.getElementById('btnMatchGoLadder');
  const btnCloseMatchOverlay = document.getElementById('btnCloseMatchOverlay');

  const dockCountLabel = document.getElementById('dockCountLabel');
  const btnQuickFuse = document.getElementById('btnQuickFuse');
  const dockSlotsRow = document.getElementById('dockSlotsRow');
  const synergyDockBanner = document.getElementById('synergyDockBanner');
  const synergyDockText = document.getElementById('synergyDockText');
  const binderCardsGrid = document.getElementById('binderCardsGrid');
  const binderCountAll = document.getElementById('binderCountAll');
  const binderCountMountain = document.getElementById('binderCountMountain');
  const binderCountCoast = document.getElementById('binderCountCoast');
  const binderCountHeartland = document.getElementById('binderCountHeartland');
  const binderCountState = document.getElementById('binderCountState');
  const binderCountCapital = document.getElementById('binderCountCapital');

  const ladderList = document.getElementById('ladderList');

  const packModal = document.getElementById('packModal');
  const packModalBadge = document.getElementById('packModalBadge');
  const packModalTitle = document.getElementById('packModalTitle');
  const packRemainingPill = document.getElementById('packRemainingPill');
  const packSealedStage = document.getElementById('packSealedStage');
  const boosterFoilPacket = document.getElementById('boosterFoilPacket');
  const packRevealedStage = document.getElementById('packRevealedStage');
  const packCardsRow = document.getElementById('packCardsRow');
  const btnPackCollect = document.getElementById('btnPackCollect');

  // Application State
  let progressCards = loadProgressCards();
  let progressMap = loadProgressMap();
  let settings = loadSettings();
  let unlockedJokeIds = loadUnlockedJokes();
  let awardedTotalMilestones = loadAwardedMilestones();
  let cardCollection = loadCardCollection();
  let battleDeck = loadBattleDeck();
  let pendingPacks = loadPendingPacks();
  let currentChallengerId = loadChallengerStage();
  let defeatedChallengerIds = loadDefeatedChallengers();
  let battleSubPanel = 'match';
  let activeBinderFilter = 'all';
  let activeMatch = null;
  let isOpeningPack = false;
  let packOpeningQueue = [];

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

    initBattleState();
    buildDeck();
    syncSettingsUI();
    renderStats();
    renderCurrentCard();
    initMapSvg();
    initMapQuiz();
    switchView(activeView);
    bindEvents();
    bindBattleEvents();
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

  function loadCardCollection() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CARD_COLLECTION);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCardCollection() {
    try {
      localStorage.setItem(STORAGE_KEY_CARD_COLLECTION, JSON.stringify(cardCollection));
    } catch (e) {}
  }

  function loadBattleDeck() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_BATTLE_DECK);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveBattleDeck() {
    try {
      localStorage.setItem(STORAGE_KEY_BATTLE_DECK, JSON.stringify(battleDeck));
    } catch (e) {}
  }

  function loadPendingPacks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PENDING_PACKS);
      return data !== null ? parseInt(data, 10) : 1;
    } catch (e) {
      return 1;
    }
  }

  function savePendingPacks() {
    try {
      localStorage.setItem(STORAGE_KEY_PENDING_PACKS, pendingPacks.toString());
    } catch (e) {}
  }

  function loadChallengerStage() {
    try {
      return localStorage.getItem(STORAGE_KEY_CHALLENGER_STAGE) || 'challenger_1';
    } catch (e) {
      return 'challenger_1';
    }
  }

  function saveChallengerStage() {
    try {
      localStorage.setItem(STORAGE_KEY_CHALLENGER_STAGE, currentChallengerId);
    } catch (e) {}
  }

  function loadDefeatedChallengers() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_DEFEATED_CHALLENGERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveDefeatedChallengers() {
    try {
      localStorage.setItem(STORAGE_KEY_DEFEATED_CHALLENGERS, JSON.stringify(defeatedChallengerIds));
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

  let flashcardStreak = 0;

  function markCard(status) {
    if (deck.length === 0) return;
    const currentItem = deck[currentIndex];
    progressCards[currentItem.state] = status;
    saveProgressCards();
    renderStats();

    if (status === 'known') {
      flashcardStreak++;
      unlockStateCardIfNew(currentItem.id);
      if (flashcardStreak > 0 && flashcardStreak % 5 === 0) {
        awardBoosterPack(`🔥 ${flashcardStreak}-Flashcard Streak Reward!`);
      }
    } else {
      flashcardStreak = 0;
    }

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
    if (tabBattleArena) tabBattleArena.addEventListener('click', () => switchView('battle'));

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
        (jokeModal && jokeModal.classList.contains('is-open')) ||
        (packModal && packModal.classList.contains('is-open'))
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
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          nextCard();
        } else if (e.code === 'ArrowUp') {
          e.preventDefault();
          prevCard();
        }
      } else if (activeView === 'map') {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (idx >= 0 && idx < 4 && !isMapAnswered) {
            e.preventDefault();
            handleMapChoice(idx);
          }
        } else if (e.code === 'Space' || e.code === 'Enter') {
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
  // View Switching (Flashcards vs Map Quiz vs Battle Arena)
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
      if (tabBattleArena) {
        tabBattleArena.classList.remove('active');
        tabBattleArena.setAttribute('aria-selected', 'false');
      }
      tabMapQuiz.classList.add('active');
      tabMapQuiz.setAttribute('aria-selected', 'true');

      cardsView.style.display = 'none';
      if (battleView) battleView.style.display = 'none';
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
    } else if (viewName === 'battle') {
      tabFlashcards.classList.remove('active');
      tabFlashcards.setAttribute('aria-selected', 'false');
      tabMapQuiz.classList.remove('active');
      tabMapQuiz.setAttribute('aria-selected', 'false');
      if (tabBattleArena) {
        tabBattleArena.classList.add('active');
        tabBattleArena.setAttribute('aria-selected', 'true');
      }

      cardsView.style.display = 'none';
      mapView.style.display = 'none';
      if (battleView) battleView.style.display = 'flex';

      renderBattleArena();
    } else {
      tabMapQuiz.classList.remove('active');
      tabMapQuiz.setAttribute('aria-selected', 'false');
      if (tabBattleArena) {
        tabBattleArena.classList.remove('active');
        tabBattleArena.setAttribute('aria-selected', 'false');
      }
      tabFlashcards.classList.add('active');
      tabFlashcards.setAttribute('aria-selected', 'true');

      mapView.style.display = 'none';
      if (battleView) battleView.style.display = 'none';
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

      // Unlock state card for this state if not yet in collection
      unlockStateCardIfNew(currentMapState.id);

      // Trigger A: 5-in-a-row Streak Milestone
      if (mapStreak > 0 && mapStreak % 5 === 0) {
        queueDadJoke(`🔥 ${mapStreak}-IN-A-ROW STREAK BONUS!`);
        awardBoosterPack(`🔥 ${mapStreak}-Streak Booster Reward!`);
      }

      // Trigger B: Cumulative Conquered Milestone (every 5 states total: 5, 10, 15...)
      let knownCount = 0;
      US_STATES.forEach(s => { if (progressMap[s.state] === 'known') knownCount++; });
      const currentTier = Math.floor(knownCount / 5) * 5;
      if (currentTier >= 5 && !awardedTotalMilestones.includes(currentTier)) {
        awardedTotalMilestones.push(currentTier);
        saveAwardedMilestones();
        queueDadJoke(`🗺️ ${currentTier} STATES CONQUERED MILESTONE!`);
        awardBoosterPack(`🗺️ ${currentTier} States Conquered Booster!`);
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
  // State Clash Battle Arena & Booster Pack Engine
  // =========================================================================

  function initBattleState() {
    if (typeof BATTLE_CARDS === 'undefined') return;

    // Starter pack guarantee if brand new player
    const keys = Object.keys(cardCollection);
    if (keys.length === 0) {
      const starterCardIds = ["ST_TX", "CAP_TX", "ST_CA", "CAP_CA", "ST_CO"];
      starterCardIds.forEach(id => {
        cardCollection[id] = { count: 1, stars: 1 };
      });
      battleDeck = [...starterCardIds];
      pendingPacks = 1; // 1 Free sealed pack waiting to rip open!
      currentChallengerId = 'challenger_1';
      defeatedChallengerIds = [];

      saveCardCollection();
      saveBattleDeck();
      savePendingPacks();
      saveChallengerStage();
      saveDefeatedChallengers();
    } else {
      // Validate deck
      if (!Array.isArray(battleDeck) || battleDeck.length === 0) {
        battleDeck = keys.slice(0, 5);
        saveBattleDeck();
      }
    }

    updatePackBadges();
  }

  function updatePackBadges() {
    if (headerPackBadge) {
      if (pendingPacks > 0) {
        headerPackBadge.textContent = pendingPacks;
        headerPackBadge.style.display = 'flex';
      } else {
        headerPackBadge.style.display = 'none';
      }
    }

    if (navPackBadge) {
      if (pendingPacks > 0) {
        navPackBadge.textContent = pendingPacks;
        navPackBadge.style.display = 'inline-block';
      } else {
        navPackBadge.style.display = 'none';
      }
    }

    if (binderDeckCountPill) {
      binderDeckCountPill.textContent = `${battleDeck.length}/5`;
    }

    if (packRemainingPill) {
      packRemainingPill.textContent = `📦 ${pendingPacks} Pack${pendingPacks === 1 ? '' : 's'} Available`;
    }
  }

  function unlockStateCardIfNew(stateId) {
    if (typeof BATTLE_CARDS_MAP === 'undefined') return;
    const cardId = `ST_${stateId}`;
    if (!BATTLE_CARDS_MAP[cardId]) return;

    if (!cardCollection[cardId]) {
      cardCollection[cardId] = { count: 1, stars: 1 };
      saveCardCollection();
      updatePackBadges();
    }
  }

  function calculateActiveSynergies(deckIds) {
    const synergies = new Set();
    if (!Array.isArray(deckIds)) return synergies;

    deckIds.forEach(id => {
      const card = typeof BATTLE_CARDS_MAP !== 'undefined' ? BATTLE_CARDS_MAP[id] : null;
      if (!card) return;
      const partnerId = card.kind === 'state' ? `CAP_${card.stateId}` : `ST_${card.stateId}`;
      if (deckIds.includes(partnerId)) {
        synergies.add(card.stateId);
      }
    });

    return synergies;
  }

  function getCardEffectivePower(cardId, deckIds = battleDeck) {
    const card = typeof BATTLE_CARDS_MAP !== 'undefined' ? BATTLE_CARDS_MAP[cardId] : null;
    if (!card) return 70;

    const entry = cardCollection[cardId];
    const stars = entry ? entry.stars : 1;
    const starBonus = stars === 2 ? 3 : stars === 3 ? 6 : 0;

    const synergies = calculateActiveSynergies(deckIds);
    const synergyBonus = synergies.has(card.stateId) ? 2 : 0;

    return card.power + starBonus + synergyBonus;
  }

  function createCardElement(cardId, options = {}) {
    const card = typeof BATTLE_CARDS_MAP !== 'undefined' ? BATTLE_CARDS_MAP[cardId] : null;
    const cardDiv = document.createElement('div');
    if (!card) return cardDiv;

    const entry = cardCollection[cardId];
    const isUnlocked = !!entry;
    const stars = entry ? entry.stars : 1;

    const starIcons = stars === 3 ? '★★★' : stars === 2 ? '★★' : '★';
    const effectivePower = getCardEffectivePower(cardId, options.activeDeck || battleDeck);

    cardDiv.className = `battle-card biome-${card.biome} star-level-${stars}`;
    if (options.inDeck) cardDiv.classList.add('in-deck');
    if (options.isSelected) cardDiv.classList.add('is-selected');
    if (options.isPlayed) cardDiv.classList.add('is-played');
    if (options.isLocked && !isUnlocked) cardDiv.classList.add('is-locked');

    const biomeObj = typeof BATTLE_BIOMES !== 'undefined' ? BATTLE_BIOMES[card.biome] : { icon: '✨', name: 'Biome' };

    const synergies = calculateActiveSynergies(options.activeDeck || battleDeck);
    const hasSynergy = synergies.has(card.stateId);

    cardDiv.innerHTML = `
      <div class="bcard-header">
        <span class="bcard-type-badge">${card.kind}</span>
        <span class="bcard-stars">${starIcons}</span>
        <div class="bcard-power-pill">${biomeObj.icon} ${effectivePower}</div>
      </div>
      <div class="bcard-body">
        <span class="bcard-emoji">${card.emoji}</span>
        <div class="bcard-name">${card.name}</div>
        <div class="bcard-title">${card.title}</div>
      </div>
      <div class="bcard-footer">
        <span class="bcard-biome-name">${biomeObj.name}</span>
        ${hasSynergy ? '<span class="bcard-synergy-indicator" title="Home State + Capital Synergy (+2 Power)">✨ Synergy</span>' : `<span style="color: var(--text-subtle);">${card.perk || ''}</span>`}
      </div>
    `;

    return cardDiv;
  }

  function renderBattleArena() {
    // Show correct subpanel
    if (battlePanelMatch) battlePanelMatch.style.display = battleSubPanel === 'match' ? 'flex' : 'none';
    if (battlePanelBinder) battlePanelBinder.style.display = battleSubPanel === 'binder' ? 'flex' : 'none';
    if (battlePanelLadder) battlePanelLadder.style.display = battleSubPanel === 'ladder' ? 'flex' : 'none';

    // Update subnav buttons
    if (btnSubNavMatch) btnSubNavMatch.classList.toggle('active', battleSubPanel === 'match');
    if (btnSubNavBinder) btnSubNavBinder.classList.toggle('active', battleSubPanel === 'binder');
    if (btnSubNavLadder) btnSubNavLadder.classList.toggle('active', battleSubPanel === 'ladder');

    if (battleSubPanel === 'match') {
      if (!activeMatch || activeMatch.matchFinished) {
        initMatch(currentChallengerId);
      } else {
        renderMatchUI();
      }
    } else if (battleSubPanel === 'binder') {
      renderDeckDock();
      renderBinder();
    } else if (battleSubPanel === 'ladder') {
      renderLadder();
    }
  }

  function initMatch(challengerId) {
    if (typeof AI_CHALLENGERS === 'undefined') return;
    const challenger = AI_CHALLENGERS.find(c => c.id === challengerId) || AI_CHALLENGERS[0];
    currentChallengerId = challenger.id;
    saveChallengerStage();

    activeMatch = {
      challenger,
      round: 1,
      playerScore: 0,
      aiScore: 0,
      playerRemainingDeck: [...battleDeck],
      aiRemainingDeck: [...challenger.deck],
      selectedCardId: null,
      isClashing: false,
      matchFinished: false
    };

    if (arenaOpponentAvatar) arenaOpponentAvatar.textContent = challenger.avatar;
    if (arenaOpponentName) arenaOpponentName.textContent = challenger.name;
    if (arenaOpponentTitle) arenaOpponentTitle.textContent = `${challenger.title} • ${challenger.badge}`;

    if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
    if (clashResultBanner) clashResultBanner.style.display = 'none';

    renderMatchUI();
  }

  function renderMatchUI() {
    if (!activeMatch) return;

    if (arenaPlayerScore) arenaPlayerScore.textContent = activeMatch.playerScore;
    if (arenaAiScore) arenaAiScore.textContent = activeMatch.aiScore;

    // Update Round Dots
    if (arenaRoundDots) {
      const dots = arenaRoundDots.querySelectorAll('.round-dot');
      dots.forEach((dot, idx) => {
        const roundNum = idx + 1;
        dot.classList.remove('active');
        if (roundNum === activeMatch.round && !activeMatch.matchFinished) {
          dot.classList.add('active');
        }
      });
    }

    // AI Card Slot Placeholder vs Mount
    if (aiCardMount && aiSlotPlaceholder) {
      aiCardMount.innerHTML = '';
      aiCardMount.style.display = 'none';
      aiSlotPlaceholder.style.display = 'flex';
    }

    // Player Card Slot
    if (playerCardMount && playerSlotPlaceholder) {
      playerCardMount.innerHTML = '';
      if (activeMatch.selectedCardId) {
        playerSlotPlaceholder.style.display = 'none';
        playerCardMount.style.display = 'flex';
        const cardEl = createCardElement(activeMatch.selectedCardId, { activeDeck: battleDeck });
        playerCardMount.appendChild(cardEl);
      } else {
        playerSlotPlaceholder.style.display = 'flex';
        playerCardMount.style.display = 'none';
      }
    }

    // Clash Button State
    if (btnClashAction) {
      btnClashAction.disabled = !activeMatch.selectedCardId || activeMatch.isClashing || activeMatch.matchFinished;
    }

    // Render Hand Tray
    if (arenaHandGrid) {
      arenaHandGrid.innerHTML = '';
      battleDeck.forEach(cardId => {
        const isPlayed = !activeMatch.playerRemainingDeck.includes(cardId);
        const isSelected = activeMatch.selectedCardId === cardId;
        const cardEl = createCardElement(cardId, {
          inDeck: false,
          isSelected,
          isPlayed,
          activeDeck: battleDeck
        });

        if (!isPlayed && !activeMatch.isClashing && !activeMatch.matchFinished) {
          cardEl.addEventListener('click', () => {
            activeMatch.selectedCardId = cardId;
            renderMatchUI();
          });
        }
        arenaHandGrid.appendChild(cardEl);
      });
    }
  }

  function executeClash() {
    if (!activeMatch || !activeMatch.selectedCardId || activeMatch.isClashing || activeMatch.matchFinished) return;
    activeMatch.isClashing = true;
    if (btnClashAction) btnClashAction.disabled = true;

    const playerCardId = activeMatch.selectedCardId;
    const playerCard = BATTLE_CARDS_MAP[playerCardId];

    // AI chooses a card
    const aiDeck = activeMatch.aiRemainingDeck;
    let chosenAiCardId = aiDeck[0];

    const strategy = activeMatch.challenger.strategy;
    if (strategy === 'smart') {
      // Find card with type advantage if possible
      const counter = aiDeck.find(id => {
        const c = BATTLE_CARDS_MAP[id];
        return c && BATTLE_BIOMES[c.biome].beats === playerCard.biome;
      });
      chosenAiCardId = counter || aiDeck[Math.floor(Math.random() * aiDeck.length)];
    } else if (strategy.startsWith('biome_')) {
      const preferredBiome = strategy.replace('biome_', '');
      const biomeCard = aiDeck.find(id => {
        const c = BATTLE_CARDS_MAP[id];
        return c && c.biome === preferredBiome;
      });
      chosenAiCardId = biomeCard || aiDeck[Math.floor(Math.random() * aiDeck.length)];
    } else {
      chosenAiCardId = aiDeck[Math.floor(Math.random() * aiDeck.length)];
    }

    const aiCard = BATTLE_CARDS_MAP[chosenAiCardId];

    // Remove cards from remaining hands
    activeMatch.playerRemainingDeck = activeMatch.playerRemainingDeck.filter(id => id !== playerCardId);
    activeMatch.aiRemainingDeck = activeMatch.aiRemainingDeck.filter(id => id !== chosenAiCardId);

    // Mount AI Card in Slot
    if (aiSlotPlaceholder && aiCardMount) {
      aiSlotPlaceholder.style.display = 'none';
      aiCardMount.style.display = 'flex';
      aiCardMount.innerHTML = '';
      const aiCardEl = createCardElement(chosenAiCardId, { activeDeck: activeMatch.challenger.deck });
      aiCardMount.appendChild(aiCardEl);
    }

    // Power & Biome Advantage calculation
    let playerPower = getCardEffectivePower(playerCardId, battleDeck);
    let aiPower = getCardEffectivePower(chosenAiCardId, activeMatch.challenger.deck);

    let advantageMsg = '';

    if (BATTLE_BIOMES[playerCard.biome].beats === aiCard.biome) {
      playerPower += 3;
      advantageMsg = `⛰️/🌊/🌾 Advantage! ${BATTLE_BIOMES[playerCard.biome].name} beats ${BATTLE_BIOMES[aiCard.biome].name} (+3 Power)!`;
    } else if (BATTLE_BIOMES[aiCard.biome].beats === playerCard.biome) {
      aiPower += 3;
      advantageMsg = `Rival Advantage! ${BATTLE_BIOMES[aiCard.biome].name} beats ${BATTLE_BIOMES[playerCard.biome].name} (+3 Power)!`;
    }

    let roundOutcome = 'tie';
    if (playerPower > aiPower) {
      roundOutcome = 'player';
      activeMatch.playerScore++;
    } else if (aiPower > playerPower) {
      roundOutcome = 'ai';
      activeMatch.aiScore++;
    }

    // Visual impact & Clash badge
    if (clashVsBadge) {
      clashVsBadge.classList.add('clashing');
      setTimeout(() => { clashVsBadge.classList.remove('clashing'); }, 600);
    }

    // Show Result Banner
    if (clashResultBanner && clashResultTitle && clashResultDesc) {
      clashResultTitle.className = `clash-result-title ${roundOutcome === 'player' ? 'player-win' : roundOutcome === 'ai' ? 'ai-win' : 'tie-round'}`;
      if (roundOutcome === 'player') {
        clashResultTitle.textContent = `ROUND WON! (${playerPower} vs ${aiPower})`;
      } else if (roundOutcome === 'ai') {
        clashResultTitle.textContent = `ROUND LOST! (${playerPower} vs ${aiPower})`;
      } else {
        clashResultTitle.textContent = `ROUND TIE! (${playerPower} vs ${aiPower})`;
      }

      clashResultDesc.textContent = advantageMsg || `${playerCard.name} clashed with ${aiCard.name}!`;
      clashResultBanner.style.display = 'block';
    }

    // Update Round Dot
    if (arenaRoundDots) {
      const currentDot = arenaRoundDots.querySelector(`.round-dot[data-round="${activeMatch.round}"]`);
      if (currentDot) {
        if (roundOutcome === 'player') currentDot.classList.add('player-win');
        else if (roundOutcome === 'ai') currentDot.classList.add('ai-win');
        else currentDot.classList.add('tie-round');
      }
    }

    if (arenaPlayerScore) arenaPlayerScore.textContent = activeMatch.playerScore;
    if (arenaAiScore) arenaAiScore.textContent = activeMatch.aiScore;

    // After 1.8 seconds, advance round or finish match
    setTimeout(() => {
      if (!activeMatch) return;
      if (clashResultBanner) clashResultBanner.style.display = 'none';

      if (activeMatch.round < 5) {
        activeMatch.round++;
        activeMatch.selectedCardId = null;
        activeMatch.isClashing = false;
        renderMatchUI();
      } else {
        // Match Finished!
        finishMatch();
      }
    }, 1800);
  }

  function finishMatch() {
    if (!activeMatch) return;
    activeMatch.matchFinished = true;
    activeMatch.isClashing = false;

    const isVictory = activeMatch.playerScore >= activeMatch.aiScore;

    if (arenaMatchOverlay) {
      arenaMatchOverlay.style.display = 'flex';
      if (isVictory) {
        if (matchOverlayIcon) matchOverlayIcon.textContent = '🏆';
        if (matchOverlayTitle) matchOverlayTitle.textContent = 'VICTORY!';
        if (matchOverlayDesc) matchOverlayDesc.textContent = `You defeated ${activeMatch.challenger.name} (${activeMatch.playerScore} to ${activeMatch.aiScore})!`;
        if (matchRewardPill) {
          matchRewardPill.style.display = 'inline-block';
          matchRewardPill.textContent = '📦 +1 Booster Pack Earned!';
        }

        // Check if this was a FIRST-TIME victory or a REMATCH (prevents infinite pack farming!)
        const isFirstClear = !defeatedChallengerIds.includes(activeMatch.challenger.id);
        if (isFirstClear) {
          defeatedChallengerIds.push(activeMatch.challenger.id);
          saveDefeatedChallengers();
          awardBoosterPack(`🏆 First Victory over ${activeMatch.challenger.name}!`);

          if (matchRewardPill) {
            matchRewardPill.style.display = 'inline-block';
            matchRewardPill.textContent = '📦 +1 Booster Pack Earned (First-Time Clear)!';
          }
        } else {
          // NO booster pack awarded on rematches to preserve the study incentive
          if (matchRewardPill) {
            matchRewardPill.style.display = 'inline-block';
            matchRewardPill.textContent = '🌟 Rematch Won! (Quizzes & streaks reward more card packs)';
          }
        }

        // Check if next stage is available
        const currentIdx = AI_CHALLENGERS.findIndex(c => c.id === activeMatch.challenger.id);
        const nextChallenger = (currentIdx !== -1 && currentIdx < AI_CHALLENGERS.length - 1) ? AI_CHALLENGERS[currentIdx + 1] : null;
        const totalCards = Object.keys(cardCollection).length;

        if (nextChallenger) {
          if (totalCards >= nextChallenger.requiredCards) {
            currentChallengerId = nextChallenger.id;
            saveChallengerStage();
            if (btnMatchNextRival) {
              btnMatchNextRival.style.display = 'block';
              btnMatchNextRival.innerHTML = `<span>Battle Next: ${nextChallenger.name} (${nextChallenger.badge}) ⚔️</span>`;
              btnMatchNextRival.onclick = () => {
                if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
                initMatch(nextChallenger.id);
              };
            }
          } else {
            const needed = nextChallenger.requiredCards - totalCards;
            if (btnMatchNextRival) {
              btnMatchNextRival.style.display = 'block';
              btnMatchNextRival.innerHTML = `<span>Study Map Quiz to Unlock ${nextChallenger.badge} (Need ${needed} More Cards) 🗺️</span>`;
              btnMatchNextRival.onclick = () => {
                if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
                switchView('map');
              };
            }
          }
        } else {
          if (btnMatchNextRival) {
            btnMatchNextRival.style.display = 'block';
            btnMatchNextRival.innerHTML = `<span>👑 You Are the Grand Champion! Practice Flashcards 🎴</span>`;
            btnMatchNextRival.onclick = () => {
              if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
              switchView('cards');
            };
          }
        }
      } else {
        if (matchOverlayIcon) matchOverlayIcon.textContent = '💥';
        if (matchOverlayTitle) matchOverlayTitle.textContent = 'DEFEAT!';
        if (matchOverlayDesc) matchOverlayDesc.textContent = `${activeMatch.challenger.name} won this showdown. Swap in type counters in your Deck & Binder!`;
        if (matchRewardPill) matchRewardPill.style.display = 'none';
        if (btnMatchNextRival) {
          btnMatchNextRival.style.display = 'block';
          btnMatchNextRival.innerHTML = `<span>Edit Deck in Binder 🎒</span>`;
          btnMatchNextRival.onclick = () => {
            if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
            battleSubPanel = 'binder';
            renderBattleArena();
          };
        }
      }
    }
  }

  function renderDeckDock() {
    if (!dockSlotsRow) return;
    dockSlotsRow.innerHTML = '';

    if (dockCountLabel) {
      dockCountLabel.textContent = `${battleDeck.length} of 5 Selected`;
    }

    const synergies = calculateActiveSynergies(battleDeck);

    for (let i = 0; i < 5; i++) {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'dock-slot';

      const cardId = battleDeck[i];
      if (cardId) {
        const cardEl = createCardElement(cardId, { inDeck: false, activeDeck: battleDeck });
        cardEl.addEventListener('click', () => {
          toggleDeckCard(cardId);
        });
        slotDiv.appendChild(cardEl);
      } else {
        slotDiv.innerHTML = `<span style="opacity: 0.5;">Slot ${i + 1}<br>Empty</span>`;
      }

      dockSlotsRow.appendChild(slotDiv);
    }

    // Update Synergy banner
    if (synergyDockText) {
      if (synergies.size > 0) {
        const pairedStates = Array.from(synergies).map(sId => {
          const sCard = BATTLE_CARDS_MAP[`ST_${sId}`];
          const cCard = BATTLE_CARDS_MAP[`CAP_${sId}`];
          return `${sCard ? sCard.name : sId} + ${cCard ? cCard.name : 'Capital'}`;
        }).join(', ');
        synergyDockText.innerHTML = `<strong>✨ Home State Synergy Active:</strong> ${pairedStates} <strong>(+2 Power each!)</strong>`;
      } else {
        synergyDockText.textContent = 'Pair a State with its matching Capital in your deck to trigger +2 Home State Synergy!';
      }
    }

    // Check fusible count for Quick Fuse button
    let fusibleCount = 0;
    Object.keys(cardCollection).forEach(id => {
      const entry = cardCollection[id];
      if (entry && entry.count >= 2 && entry.stars < 3) {
        fusibleCount++;
      }
    });

    if (btnQuickFuse) {
      if (fusibleCount > 0) {
        btnQuickFuse.textContent = `⚡ Fuse All Duplicates (${fusibleCount} Ready!)`;
        btnQuickFuse.style.opacity = '1';
        btnQuickFuse.style.pointerEvents = 'auto';
      } else {
        btnQuickFuse.textContent = '⚡ No Duplicates to Fuse';
        btnQuickFuse.style.opacity = '0.5';
        btnQuickFuse.style.pointerEvents = 'none';
      }
    }
  }

  function toggleDeckCard(cardId) {
    const idx = battleDeck.indexOf(cardId);
    if (idx !== -1) {
      if (battleDeck.length <= 1) {
        alert("Your battle deck must have at least 1 card!");
        return;
      }
      battleDeck.splice(idx, 1);
    } else {
      if (battleDeck.length >= 5) {
        alert("Your battle deck can only carry 5 cards. Tap a card in your deck dock to remove it first!");
        return;
      }
      battleDeck.push(cardId);
    }

    saveBattleDeck();
    updatePackBadges();
    renderDeckDock();
    renderBinder();
    if (activeMatch) initMatch(currentChallengerId);
  }

  function renderBinder() {
    if (!binderCardsGrid || typeof BATTLE_CARDS === 'undefined') return;
    binderCardsGrid.innerHTML = '';

    // Calculate Counts
    let cAll = 0, cMtn = 0, cCst = 0, cHrt = 0, cState = 0, cCap = 0;
    Object.keys(cardCollection).forEach(id => {
      const card = BATTLE_CARDS_MAP[id];
      if (card) {
        cAll++;
        if (card.biome === 'mountain') cMtn++;
        if (card.biome === 'coast') cCst++;
        if (card.biome === 'heartland') cHrt++;
        if (card.kind === 'state') cState++;
        if (card.kind === 'capital') cCap++;
      }
    });

    if (binderCountAll) binderCountAll.textContent = cAll;
    if (binderCountMountain) binderCountMountain.textContent = cMtn;
    if (binderCountCoast) binderCountCoast.textContent = cCst;
    if (binderCountHeartland) binderCountHeartland.textContent = cHrt;
    if (binderCountState) binderCountState.textContent = cState;
    if (binderCountCapital) binderCountCapital.textContent = cCap;

    // Filter Cards
    const filtered = BATTLE_CARDS.filter(card => {
      if (activeBinderFilter === 'mountain') return card.biome === 'mountain';
      if (activeBinderFilter === 'coast') return card.biome === 'coast';
      if (activeBinderFilter === 'heartland') return card.biome === 'heartland';
      if (activeBinderFilter === 'state') return card.kind === 'state';
      if (activeBinderFilter === 'capital') return card.kind === 'capital';
      return true;
    });

    filtered.forEach(card => {
      const isOwned = !!cardCollection[card.id];
      const inDeck = battleDeck.includes(card.id);

      const cardEl = createCardElement(card.id, {
        inDeck,
        isLocked: !isOwned,
        activeDeck: battleDeck
      });

      if (isOwned) {
        cardEl.addEventListener('click', () => {
          toggleDeckCard(card.id);
        });
      }

      binderCardsGrid.appendChild(cardEl);
    });
  }

  function quickFuseAll() {
    let upgradedCount = 0;
    Object.keys(cardCollection).forEach(id => {
      const entry = cardCollection[id];
      if (entry && entry.count >= 2 && entry.stars < 3) {
        while (entry.count >= 2 && entry.stars < 3) {
          entry.count -= 1;
          entry.stars += 1;
          upgradedCount++;
        }
      }
    });

    if (upgradedCount > 0) {
      saveCardCollection();
      renderDeckDock();
      renderBinder();
      alert(`🎉 Power Surge! You fused and upgraded ${upgradedCount} cards to higher Star ranks!`);
    }
  }

  function renderLadder() {
    if (!ladderList || typeof AI_CHALLENGERS === 'undefined') return;
    ladderList.innerHTML = '';

    const totalCollected = Object.keys(cardCollection).length;

    AI_CHALLENGERS.forEach(challenger => {
      const isDefeated = defeatedChallengerIds.includes(challenger.id);
      const isUnlocked = totalCollected >= challenger.requiredCards;
      const isActive = currentChallengerId === challenger.id;

      const cardDiv = document.createElement('div');
      cardDiv.className = `ladder-card ${isActive ? 'is-active' : ''} ${isDefeated ? 'is-defeated' : ''} ${!isUnlocked ? 'is-locked' : ''}`;

      cardDiv.innerHTML = `
        <div class="ladder-left">
          <div class="ladder-avatar">${challenger.avatar}</div>
          <div class="ladder-info">
            <div class="ladder-info-title">
              <span class="ladder-name">${challenger.name}</span>
              <span class="ladder-stage-pill">${challenger.badge}</span>
              ${isDefeated ? '<span style="color: #10b981; font-weight: 800; font-size: 0.72rem;">✅ DEFEATED</span>' : ''}
            </div>
            <div class="ladder-desc">${challenger.desc}</div>
          </div>
        </div>
        <div class="ladder-right">
          ${isUnlocked 
            ? `<button class="btn-ladder-battle" data-id="${challenger.id}">${isActive ? 'Current Rival ⚔️' : 'Challenge! ⚔️'}</button>`
            : `<span class="ladder-locked-tag">🔒 Need ${challenger.requiredCards} Cards</span>`
          }
        </div>
      `;

      if (isUnlocked) {
        const battleBtn = cardDiv.querySelector('.btn-ladder-battle');
        if (battleBtn) {
          battleBtn.addEventListener('click', () => {
            currentChallengerId = challenger.id;
            saveChallengerStage();
            if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
            battleSubPanel = 'match';
            initMatch(challenger.id);
            renderBattleArena();
          });
        }
      }

      ladderList.appendChild(cardDiv);
    });
  }

  function awardBoosterPack(reasonBadge = '✨ BOOSTER PACK UNLOCKED!') {
    pendingPacks++;
    savePendingPacks();
    updatePackBadges();

    // Show celebratory notice on header
    if (headerPackBadge) {
      headerPackBadge.classList.add('pulse');
      setTimeout(() => { headerPackBadge.classList.remove('pulse'); }, 1200);
    }
  }

  function openPackModal(badgeText = '✨ BOOSTER PACK UNLOCKED!') {
    if (!packModal) return;
    if (pendingPacks <= 0) {
      alert("No unopened packs available! Play quizzes or battle challengers to earn more booster packs!");
      return;
    }

    if (packModalBadge) packModalBadge.textContent = badgeText;
    if (packSealedStage) packSealedStage.style.display = 'block';
    if (packRevealedStage) packRevealedStage.style.display = 'none';
    if (btnPackCollect) btnPackCollect.style.display = 'none';

    updatePackBadges();
    packModal.classList.add('is-open');
    isOpeningPack = false;
  }

  function handleRipPack() {
    if (isOpeningPack || pendingPacks <= 0 || typeof BATTLE_CARDS === 'undefined') return;
    isOpeningPack = true;

    // Pick 3 cards (weighted: 70% unowned, 30% duplicate for fusion)
    const unowned = BATTLE_CARDS.filter(c => !cardCollection[c.id]);
    const owned = BATTLE_CARDS.filter(c => !!cardCollection[c.id]);

    const dealtCards = [];
    for (let i = 0; i < 3; i++) {
      let pick = null;
      if (unowned.length > 0 && Math.random() < 0.7) {
        const idx = Math.floor(Math.random() * unowned.length);
        pick = unowned.splice(idx, 1)[0];
      } else {
        pick = BATTLE_CARDS[Math.floor(Math.random() * BATTLE_CARDS.length)];
      }
      dealtCards.push(pick);
    }

    // Add to collection
    const results = dealtCards.map(card => {
      const isNew = !cardCollection[card.id];
      if (isNew) {
        cardCollection[card.id] = { count: 1, stars: 1 };
      } else {
        cardCollection[card.id].count += 1;
      }
      return { card, isNew };
    });

    pendingPacks--;
    savePendingPacks();
    saveCardCollection();
    updatePackBadges();

    // Animate stage transition
    if (packSealedStage) packSealedStage.style.display = 'none';
    if (packRevealedStage && packCardsRow) {
      packCardsRow.innerHTML = '';
      packRevealedStage.style.display = 'block';

      results.forEach((res, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'pack-card-item';

        const cardEl = createCardElement(res.card.id, { inDeck: false, activeDeck: battleDeck });
        const tagBadge = document.createElement('span');
        tagBadge.className = `pack-tag-badge ${res.isNew ? 'is-new' : 'is-dup'}`;
        tagBadge.textContent = res.isNew ? 'NEW! ✨' : 'DUPLICATE (+1)';

        itemDiv.appendChild(cardEl);
        itemDiv.appendChild(tagBadge);
        packCardsRow.appendChild(itemDiv);
      });
    }

    if (btnPackCollect) {
      btnPackCollect.style.display = 'inline-block';
      if (pendingPacks > 0) {
        btnPackCollect.innerHTML = `<span>Collect & Open Next (${pendingPacks} Left) 📦</span>`;
      } else {
        btnPackCollect.innerHTML = `<span>Collect All to Binder 🎒</span>`;
      }
    }
  }

  function bindBattleEvents() {
    // Subnav buttons
    if (btnSubNavMatch) btnSubNavMatch.addEventListener('click', () => {
      battleSubPanel = 'match';
      if (!activeMatch || activeMatch.matchFinished) {
        initMatch(currentChallengerId);
      }
      renderBattleArena();
    });
    if (btnSubNavBinder) btnSubNavBinder.addEventListener('click', () => {
      battleSubPanel = 'binder';
      renderBattleArena();
    });
    if (btnSubNavLadder) btnSubNavLadder.addEventListener('click', () => {
      battleSubPanel = 'ladder';
      renderBattleArena();
    });

    // Change opponent button
    if (btnChangeOpponent) {
      btnChangeOpponent.addEventListener('click', () => {
        battleSubPanel = 'ladder';
        renderBattleArena();
      });
    }

    // Clash Trigger
    if (btnClashAction) {
      btnClashAction.addEventListener('click', executeClash);
    }

    // Rematch & Ladder Navigation from overlay
    if (btnMatchPlayAgain) {
      btnMatchPlayAgain.addEventListener('click', () => {
        if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
        initMatch(currentChallengerId);
      });
    }
    if (btnMatchGoLadder) {
      btnMatchGoLadder.addEventListener('click', () => {
        if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
        battleSubPanel = 'ladder';
        renderBattleArena();
      });
    }
    if (btnCloseMatchOverlay) {
      btnCloseMatchOverlay.addEventListener('click', () => {
        if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
        initMatch(currentChallengerId);
      });
    }

    // Quick fuse
    if (btnQuickFuse) {
      btnQuickFuse.addEventListener('click', quickFuseAll);
    }

    // Binder filter buttons
    const filterBtns = document.querySelectorAll('.binder-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeBinderFilter = btn.getAttribute('data-filter') || 'all';
        renderBinder();
      });
    });

    // Header pack button
    if (btnOpenPacks) {
      btnOpenPacks.addEventListener('click', () => {
        openPackModal('📦 UNOPENED BOOSTER PACKS');
      });
    }

    // Rip foil pack
    if (boosterFoilPacket) {
      boosterFoilPacket.addEventListener('click', handleRipPack);
    }

    // Collect pack cards button
    if (btnPackCollect) {
      btnPackCollect.addEventListener('click', () => {
        if (pendingPacks > 0) {
          openPackModal('📦 UNOPENED BOOSTER PACKS');
        } else {
          packModal.classList.remove('is-open');
          renderBattleArena();
        }
      });
    }

    // Dismiss pack modal on backdrop click if cards collected
    if (packModal) {
      packModal.addEventListener('click', (e) => {
        if (e.target === packModal && btnPackCollect && btnPackCollect.style.display !== 'none') {
          packModal.classList.remove('is-open');
          renderBattleArena();
        }
      });
    }
  }

  // =========================================================================
  // Service Worker for Offline / iPad PWA (with iOS Force Update)
  // =========================================================================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`./sw.js?v=11`).then(reg => {
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
