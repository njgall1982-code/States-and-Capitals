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

  // DOM Elements - Left Rail Sidebar
  const sidebarNavCards = document.getElementById('sidebarNavCards');
  const sidebarNavMap = document.getElementById('sidebarNavMap');
  const sidebarNavArena = document.getElementById('sidebarNavArena');
  const sidebarNavBinder = document.getElementById('sidebarNavBinder');
  const sidebarNavLadder = document.getElementById('sidebarNavLadder');
  const sidebarBtnPacks = document.getElementById('sidebarBtnPacks');
  const sidebarBtnVault = document.getElementById('sidebarBtnVault');
  const sidebarBtnSettings = document.getElementById('sidebarBtnSettings');
  const sidebarPackBadge = document.getElementById('sidebarPackBadge');
  const sidebarDeckCountBadge = document.getElementById('sidebarDeckCountBadge');

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
  const CURRENT_CACHE_VERSION = 'states-capitals-v16';

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
  const playerNodesWon = document.getElementById('playerNodesWon');
  const aiNodesWon = document.getElementById('aiNodesWon');
  const arenaRoundPhase = document.getElementById('arenaRoundPhase');
  const arenaTurnInstruction = document.getElementById('arenaTurnInstruction');
  const arenaLanesBoard = document.getElementById('arenaLanesBoard');
  const arenaHandInstruction = document.getElementById('arenaHandInstruction');
  const btnShowdownAction = document.getElementById('btnShowdownAction');
  const arenaHandGrid = document.getElementById('arenaHandGrid');
  const arenaHandSection = document.getElementById('arenaHandSection');
  const arenaHandNudgePill = document.getElementById('arenaHandNudgePill');
  const btnRallyHowToPlay = document.getElementById('btnRallyHowToPlay');
  const rallyTutorialLayer = document.getElementById('rallyTutorialLayer');
  const rallyTutorialPopover = document.getElementById('rallyTutorialPopover');
  const tutorialArrow = document.getElementById('tutorialArrow');
  const tutorialAvatar = document.getElementById('tutorialAvatar');
  const tutorialBadge = document.getElementById('tutorialBadge');
  const tutorialTitle = document.getElementById('tutorialTitle');
  const tutorialBody = document.getElementById('tutorialBody');
  const tutorialStepDots = document.getElementById('tutorialStepDots');
  const btnTutorialNext = document.getElementById('btnTutorialNext');
  const btnTutorialSkip = document.getElementById('btnTutorialSkip');

  // Math Supercharge Elements
  const mathChallengeModal = document.getElementById('mathChallengeModal');
  const mathChallengeBadge = document.getElementById('mathChallengeBadge');
  const mathTimerCount = document.getElementById('mathTimerCount');
  const mathChallengeContext = document.getElementById('mathChallengeContext');
  const mathQuestionText = document.getElementById('mathQuestionText');
  const mathOptionsGrid = document.getElementById('mathOptionsGrid');
  const btnSkipMath = document.getElementById('btnSkipMath');

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
  let isRallyTutorialActive = false;
  let currentTutorialStep = null;
  let tutorialHighlightEl = null;

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

    // View Switcher Tabs (Legacy fallback if present)
    if (tabFlashcards) tabFlashcards.addEventListener('click', () => switchView('cards'));
    if (tabMapQuiz) tabMapQuiz.addEventListener('click', () => switchView('map'));
    if (tabBattleArena) tabBattleArena.addEventListener('click', () => switchView('battle'));

    // Sidebar Navigation Buttons
    if (sidebarNavCards) {
      sidebarNavCards.addEventListener('click', () => switchView('cards'));
    }
    if (sidebarNavMap) {
      sidebarNavMap.addEventListener('click', () => switchView('map'));
    }
    if (sidebarNavArena) {
      sidebarNavArena.addEventListener('click', () => {
        battleSubPanel = 'match';
        switchView('battle');
        if (!activeMatch || activeMatch.matchFinished) {
          initMatch(currentChallengerId);
        }
        renderBattleArena();
      });
    }
    if (sidebarNavBinder) {
      sidebarNavBinder.addEventListener('click', () => {
        battleSubPanel = 'binder';
        switchView('battle');
        renderBattleArena();
      });
    }
    if (sidebarNavLadder) {
      sidebarNavLadder.addEventListener('click', () => {
        battleSubPanel = 'ladder';
        switchView('battle');
        renderBattleArena();
      });
    }

    // Sidebar Utility Actions
    if (sidebarBtnPacks) {
      sidebarBtnPacks.addEventListener('click', () => {
        openPackModal('📦 UNOPENED BOOSTER PACKS');
      });
    }
    if (sidebarBtnVault) {
      sidebarBtnVault.addEventListener('click', () => {
        let knownCount = 0;
        US_STATES.forEach(s => { if (progressMap[s.state] === 'known') knownCount++; });
        updateRankAndVaultUI(knownCount);
        if (vaultModal) vaultModal.classList.add('is-open');
      });
    }
    if (sidebarBtnSettings) {
      sidebarBtnSettings.addEventListener('click', () => {
        if (settingsModal) settingsModal.classList.add('is-open');
      });
    }

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
  function updateSidebarNav() {
    if (sidebarNavCards) sidebarNavCards.classList.toggle('active', activeView === 'cards');
    if (sidebarNavMap) sidebarNavMap.classList.toggle('active', activeView === 'map');
    if (sidebarNavArena) sidebarNavArena.classList.toggle('active', activeView === 'battle' && battleSubPanel === 'match');
    if (sidebarNavBinder) sidebarNavBinder.classList.toggle('active', activeView === 'battle' && battleSubPanel === 'binder');
    if (sidebarNavLadder) sidebarNavLadder.classList.toggle('active', activeView === 'battle' && battleSubPanel === 'ladder');

    if (activeView === 'battle') {
      document.body.classList.add('view-battle-active');
    } else {
      document.body.classList.remove('view-battle-active');
    }
  }

  function switchView(viewName) {
    activeView = viewName;
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_VIEW, viewName);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    if (viewName === 'map') {
      if (tabFlashcards) {
        tabFlashcards.classList.remove('active');
        tabFlashcards.setAttribute('aria-selected', 'false');
      }
      if (tabBattleArena) {
        tabBattleArena.classList.remove('active');
        tabBattleArena.setAttribute('aria-selected', 'false');
      }
      if (tabMapQuiz) {
        tabMapQuiz.classList.add('active');
        tabMapQuiz.setAttribute('aria-selected', 'true');
      }

      if (cardsView) cardsView.style.display = 'none';
      if (battleView) battleView.style.display = 'none';
      if (mapView) mapView.style.display = 'flex';

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
      if (tabFlashcards) {
        tabFlashcards.classList.remove('active');
        tabFlashcards.setAttribute('aria-selected', 'false');
      }
      if (tabMapQuiz) {
        tabMapQuiz.classList.remove('active');
        tabMapQuiz.setAttribute('aria-selected', 'false');
      }
      if (tabBattleArena) {
        tabBattleArena.classList.add('active');
        tabBattleArena.setAttribute('aria-selected', 'true');
      }

      if (cardsView) cardsView.style.display = 'none';
      if (mapView) mapView.style.display = 'none';
      if (battleView) battleView.style.display = 'flex';

      renderBattleArena();
    } else {
      if (tabMapQuiz) {
        tabMapQuiz.classList.remove('active');
        tabMapQuiz.setAttribute('aria-selected', 'false');
      }
      if (tabBattleArena) {
        tabBattleArena.classList.remove('active');
        tabBattleArena.setAttribute('aria-selected', 'false');
      }
      if (tabFlashcards) {
        tabFlashcards.classList.add('active');
        tabFlashcards.setAttribute('aria-selected', 'true');
      }

      if (mapView) mapView.style.display = 'none';
      if (battleView) battleView.style.display = 'none';
      if (cardsView) cardsView.style.display = 'flex';
    }
    updateSidebarNav();
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

    if (sidebarPackBadge) {
      if (pendingPacks > 0) {
        sidebarPackBadge.textContent = pendingPacks;
        sidebarPackBadge.style.display = 'flex';
      } else {
        sidebarPackBadge.style.display = 'none';
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

    if (sidebarDeckCountBadge) {
      sidebarDeckCountBadge.textContent = `${battleDeck.length}/5`;
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
    if (!card) return 3;

    const entry = cardCollection[cardId];
    const stars = entry ? entry.stars : 1;
    const starBonus = stars === 2 ? 1 : stars === 3 ? 2 : 0;

    const synergies = calculateActiveSynergies(deckIds);
    const synergyBonus = synergies.has(card.stateId) ? 2 : 0;

    return card.power + starBonus + synergyBonus;
  }

  function calculateCardNodePower(cardId, node, deckIds, side, mathBonus = 0) {
    const card = typeof BATTLE_CARDS_MAP !== 'undefined' ? BATTLE_CARDS_MAP[cardId] : null;
    if (!card) return 3;

    let power = card.power; // 1-5 base

    if (side === 'player') {
      const entry = cardCollection[cardId];
      const stars = entry ? entry.stars : 1;
      power += (stars === 2 ? 1 : stars === 3 ? 2 : 0);
    }

    // Node Biome Bonus (+2)
    if (node && node.bonusBiome && node.bonusBiome === card.biome) {
      power += (node.bonusPower || 2);
    } else if (node && node.bonusKind && node.bonusKind === card.kind) {
      power += (node.bonusPower || 1);
    }

    // Underdog Biome Perk (+3 on matching node biome)
    if (card.perkBonus && node && card.perkCondition === node.biome) {
      power += card.perkBonus;
    }

    // 5th Grade Math Supercharge (+1)
    power += mathBonus;

    return power;
  }

  // Web Audio Synth for tactile kid-friendly audio feedback
  function playAudioCue(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        // High ascending chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'synergy') {
        // Glorious triumphant chord
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.2); // A5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'drop') {
        // Soft pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'showdown') {
        // Dramatic fanfare sweep
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function playMathSparkEffect(anchorEl) {
    playAudioCue('correct');
    const badge = document.createElement('div');
    badge.className = 'floating-boost-badge';
    badge.textContent = '⚡ +1 POWER BOOST!';
    badge.style.left = '50%';
    badge.style.top = '40%';
    badge.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(badge);
    setTimeout(() => {
      badge.remove();
    }, 1300);
  }

  function playSynergySparkEffect(nodeName) {
    playAudioCue('synergy');
    const badge = document.createElement('div');
    badge.className = 'floating-boost-badge';
    badge.style.background = 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)';
    badge.style.borderColor = '#fbbf24';
    badge.style.color = '#ffffff';
    badge.style.boxShadow = '0 0 24px rgba(245, 158, 11, 0.8)';
    badge.innerHTML = `✨ CAPITAL CONNECTION!<br><span style="font-size:0.75rem; font-weight:700;">State + Capital Paired on ${nodeName} (+2 each!)</span>`;
    badge.style.left = '50%';
    badge.style.top = '35%';
    badge.style.textAlign = 'center';
    badge.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(badge);
    setTimeout(() => {
      badge.remove();
    }, 1700);
  }

  let mathTimerInterval = null;

  function triggerMathChallenge(param, onComplete) {
    if (!mathChallengeModal) {
      if (onComplete) onComplete(0);
      return;
    }

    clearInterval(mathTimerInterval);
    mathChallengeModal.style.display = 'flex';

    if (isRallyTutorialActive) {
      setTutorialStep('math_boost');
    }

    let questionText = '';
    let correctVal = 0;
    let options = [];
    let badgeText = '⚡ 5TH GRADE POWER BOOST';
    let contextText = 'Solve in 10s to supercharge your card with +1 Power!';

    const cardName = (typeof param === 'object' && param.cardName) ? param.cardName : 'Your Card';
    const cardPower = (typeof param === 'object' && param.cardPower !== undefined) ? param.cardPower : 5;
    const nodeAiScore = (typeof param === 'object' && param.nodeAiScore !== undefined) ? param.nodeAiScore : 0;
    const nodePlayerScore = (typeof param === 'object' && param.nodePlayerScore !== undefined) ? param.nodePlayerScore : 0;
    const isMultiCardContest = (nodeAiScore > 0 && nodePlayerScore > 0);

    // 1) Multi-Card Lane Math: Adding and subtracting 3 numbers total
    if (isMultiCardContest) {
      const projectedPlayerTotal = nodePlayerScore + cardPower;
      badgeText = '⚡ 5TH GRADE SCORE LEAD CALCULATION';

      if (projectedPlayerTotal > nodeAiScore) {
        correctVal = projectedPlayerTotal - nodeAiScore;
        contextText = `Guide has ${nodeAiScore} Pts. You currently have ${nodePlayerScore} Pts, and this card adds +${cardPower} Pts!`;
        questionText = `You will be in the lead by how many points?`;
        options = [correctVal, correctVal + 1, Math.max(1, correctVal - 1)];
      } else if (projectedPlayerTotal < nodeAiScore) {
        correctVal = nodeAiScore - projectedPlayerTotal;
        contextText = `Guide has ${nodeAiScore} Pts. You have ${nodePlayerScore} Pts + ${cardPower} Pts from this card.`;
        questionText = `How many points behind will you be?`;
        options = [correctVal, correctVal + 1, Math.max(1, correctVal - 1)];
      } else {
        correctVal = projectedPlayerTotal;
        contextText = `Guide has ${nodeAiScore} Pts. Adding this card (+${cardPower}) ties the landmark!`;
        questionText = `What will your new stop score be (${nodePlayerScore} + ${cardPower})?`;
        options = [correctVal, correctVal + 2, Math.max(1, correctVal - 2)];
      }
    } else {
      // 2) 50% 5th Grade Multiplication, 50% 5th Grade Division
      const isDivision = Math.random() < 0.5;

      if (isDivision) {
        badgeText = '⚡ 5TH GRADE DIVISION FACT';
        contextText = `Solve to supercharge ${cardName} with +1 Power!`;
        const divisionFacts = [
          { d: 56, s: 7, q: 8 },
          { d: 56, s: 8, q: 7 },
          { d: 72, s: 9, q: 8 },
          { d: 72, s: 8, q: 9 },
          { d: 63, s: 7, q: 9 },
          { d: 63, s: 9, q: 7 },
          { d: 54, s: 6, q: 9 },
          { d: 54, s: 9, q: 6 },
          { d: 48, s: 6, q: 8 },
          { d: 48, s: 8, q: 6 },
          { d: 42, s: 6, q: 7 },
          { d: 42, s: 7, q: 6 },
          { d: 81, s: 9, q: 9 },
          { d: 64, s: 8, q: 8 },
          { d: 49, s: 7, q: 7 },
          { d: 36, s: 4, q: 9 },
          { d: 36, s: 6, q: 6 },
          { d: 45, s: 5, q: 9 },
          { d: 45, s: 9, q: 5 },
          { d: 84, s: 12, q: 7 },
          { d: 96, s: 12, q: 8 },
          { d: 108, s: 12, q: 9 }
        ];
        const fact = divisionFacts[Math.floor(Math.random() * divisionFacts.length)];
        correctVal = fact.q;
        questionText = `${fact.d} ÷ ${fact.s} = ?`;
        options = [correctVal, correctVal + 1, Math.max(2, correctVal - 1)];
      } else {
        badgeText = '⚡ 5TH GRADE MULTIPLICATION FACT';
        contextText = `Solve to supercharge ${cardName} with +1 Power!`;
        const poolA = [6, 7, 8, 9, 11, 12];
        const poolB = [4, 5, 6, 7, 8, 9];
        const a = poolA[Math.floor(Math.random() * poolA.length)];
        const b = poolB[Math.floor(Math.random() * poolB.length)];
        correctVal = a * b;
        questionText = `${a} × ${b} = ?`;
        options = [correctVal, correctVal + b, Math.max(4, correctVal - a)];
      }
    }

    if (mathChallengeBadge) mathChallengeBadge.textContent = badgeText;
    if (mathChallengeContext) mathChallengeContext.textContent = contextText;

    // Shuffle unique options
    options = Array.from(new Set(options));
    while (options.length < 3) options.push(correctVal + options.length + 2);
    options.sort(() => Math.random() - 0.5);

    if (mathQuestionText) mathQuestionText.textContent = questionText;

    if (mathOptionsGrid) {
      mathOptionsGrid.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-math-option';
        btn.textContent = opt;
        btn.onclick = () => {
          clearInterval(mathTimerInterval);
          if (isRallyTutorialActive && currentTutorialStep === 'math_boost') {
            clearTutorialHighlight();
            if (rallyTutorialLayer) rallyTutorialLayer.style.display = 'none';
          }
          const isCorrect = (opt === correctVal);
          btn.classList.add(isCorrect ? 'math-correct' : 'math-wrong');

          if (isCorrect) {
            playMathSparkEffect();
          }

          setTimeout(() => {
            mathChallengeModal.style.display = 'none';
            if (onComplete) onComplete(isCorrect ? 1 : 0);
          }, 450);
        };
        mathOptionsGrid.appendChild(btn);
      });
    }

    // 10s Timer
    let timeLeft = 10;
    if (mathTimerCount) mathTimerCount.textContent = timeLeft;
    mathTimerInterval = setInterval(() => {
      timeLeft--;
      if (mathTimerCount) mathTimerCount.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(mathTimerInterval);
        if (isRallyTutorialActive && currentTutorialStep === 'math_boost') {
          clearTutorialHighlight();
          if (rallyTutorialLayer) rallyTutorialLayer.style.display = 'none';
        }
        mathChallengeModal.style.display = 'none';
        if (onComplete) onComplete(0);
      }
    }, 1000);

    if (btnSkipMath) {
      btnSkipMath.onclick = () => {
        clearInterval(mathTimerInterval);
        if (isRallyTutorialActive && currentTutorialStep === 'math_boost') {
          clearTutorialHighlight();
          if (rallyTutorialLayer) rallyTutorialLayer.style.display = 'none';
        }
        mathChallengeModal.style.display = 'none';
        if (onComplete) onComplete(0);
      };
    }
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
        ${hasSynergy ? '<span class="bcard-synergy-indicator" title="Home State + Capital Synergy: Pair on same lane for +2 Power!">✨ Synergy</span>' : `<span style="color: var(--text-subtle);">${card.perk || ''}</span>`}
      </div>
    `;

    return cardDiv;
  }

  // =========================================================================
  // Road Trip Rally Interactive Walkthrough & Mobile Optimization Engine
  // =========================================================================

  const TUTORIAL_STEPS_CONFIG = {
    welcome: {
      avatar: '🏕️',
      badge: 'GUIDE • STEP 1 OF 4',
      title: 'Welcome to Road Trip Rally!',
      body: 'Your goal is simple: <strong>Win more Scenic Stops than your Trail Guide!</strong> Each stop is a battle of travel cards. The higher score wins the landmark!',
      stepIndex: 0,
      btnText: 'Let\'s Play! ➡️',
      targetSelector: '#arenaLanesBoard'
    },
    pick_card: {
      avatar: '👇',
      badge: 'GUIDE • STEP 2 OF 4',
      title: 'Pick a Card from Your Hand!',
      body: 'These are your cards in <strong>Your Rally Hand</strong> below! <strong>Tap any card</strong> to choose it for your move.',
      stepIndex: 1,
      btnText: 'Got It! 👍',
      targetSelector: '#arenaHandSection'
    },
    place_card: {
      avatar: '⛰️',
      badge: 'GUIDE • STEP 3 OF 4',
      title: 'Deploy to a Scenic Stop!',
      body: 'Card selected! Now tap any glowing <strong>DEPLOY HERE ⚡</strong> spot above to play it! <strong>Pro Tip:</strong> Matching the landmark\'s region (Mountain or Coast) gives <strong>+2 Bonus Points</strong>!',
      stepIndex: 2,
      btnText: 'Deploying! 🎯',
      targetSelector: '.lane-slot-empty.slot-droppable'
    },
    math_boost: {
      avatar: '⚡',
      badge: 'BONUS • POWER BOOST',
      title: 'Supercharge Your Card!',
      body: 'Solve this quick math problem to give your card a <strong>+1 Power Boost</strong>! If you\'re not sure, tap <em>Skip</em> anytime to play at normal power.',
      stepIndex: 2,
      btnText: 'Solve Math! 🧠',
      targetSelector: '#mathChallengeModal .math-challenge-card'
    },
    synergy_info: {
      avatar: '✨',
      badge: 'GUIDE • STEP 4 OF 4',
      title: 'Round 2: Capital Synergies!',
      body: 'In Round 2, you place another card! <strong>Secret Weapon:</strong> If you place a <strong>State</strong> and its matching <strong>Capital</strong> at the same landmark, you unlock a <strong>huge +2 Synergy Boost</strong>!',
      stepIndex: 3,
      btnText: 'Awesome! 🚀',
      targetSelector: '#arenaLanesBoard'
    },
    mystery_info: {
      avatar: '❓',
      badge: 'ROUND 3 • SECRET DESTINATIONS',
      title: 'Mystery Round: Face-Down Cards!',
      body: 'In Round 3, cards are placed <strong>FACE DOWN</strong> as secrets! The Guide placed mystery cards, and your card will be secret too. Neither side knows who will win until the final reveal!',
      stepIndex: 3,
      btnText: 'Place Mystery Card! 🃏',
      targetSelector: '#arenaHandSection'
    },
    reveal_info: {
      avatar: '🌟',
      badge: 'FINAL STEP • THE GRAND REVEAL',
      title: 'Reveal Secret Destinations!',
      body: 'All cards are locked in! Tap the glowing <strong>🌟 REVEAL DESTINATIONS</strong> button above to flip all mystery cards, see everyone\'s true power, and crown the winner!',
      stepIndex: 3,
      btnText: 'Reveal Destinations! 🏆',
      targetSelector: '#btnShowdownAction'
    }
  };

  function startRallyTutorial(force = false) {
    if (!activeMatch) return;
    if (!force && activeMatch.nodeCount !== 2) return;

    isRallyTutorialActive = true;
    setTutorialStep('welcome');
  }

  function stopRallyTutorial() {
    isRallyTutorialActive = false;
    currentTutorialStep = null;
    clearTutorialHighlight();
    if (rallyTutorialLayer) rallyTutorialLayer.style.display = 'none';
  }

  function clearTutorialHighlight() {
    if (tutorialHighlightEl) {
      tutorialHighlightEl.classList.remove('tutorial-spotlight-active');
      tutorialHighlightEl = null;
    }
    document.querySelectorAll('.tutorial-spotlight-active').forEach(el => {
      el.classList.remove('tutorial-spotlight-active');
    });
  }

  function setTutorialStep(stepName) {
    if (!isRallyTutorialActive || !activeMatch) return;
    const config = TUTORIAL_STEPS_CONFIG[stepName];
    if (!config || !rallyTutorialLayer || !rallyTutorialPopover) return;

    currentTutorialStep = stepName;
    clearTutorialHighlight();

    // Populate details
    if (tutorialAvatar) tutorialAvatar.textContent = config.avatar;
    if (tutorialBadge) tutorialBadge.textContent = config.badge;
    if (tutorialTitle) tutorialTitle.textContent = config.title;
    if (tutorialBody) tutorialBody.innerHTML = config.body;
    if (btnTutorialNext) btnTutorialNext.innerHTML = `<span>${config.btnText}</span>`;

    // Update step dots
    if (tutorialStepDots) {
      const dots = tutorialStepDots.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === config.stepIndex);
      });
    }

    // Target element highlighting & positioning
    let targetEl = null;
    if (config.targetSelector) {
      targetEl = document.querySelector(config.targetSelector);
    }

    rallyTutorialLayer.style.display = 'block';

    if (targetEl) {
      targetEl.classList.add('tutorial-spotlight-active');
      tutorialHighlightEl = targetEl;

      // Ensure target is in view
      if (stepName === 'pick_card') {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else if (stepName === 'place_card') {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    positionTutorialPopover(targetEl, stepName);
  }

  function positionTutorialPopover(targetEl, stepName) {
    if (!rallyTutorialPopover) return;

    const isMobile = window.innerWidth <= 600;
    const arrowEl = tutorialArrow;
    if (arrowEl) arrowEl.className = 'tutorial-arrow';

    if (!targetEl || isMobile) {
      rallyTutorialPopover.style.left = '50%';
      rallyTutorialPopover.style.transform = 'translateX(-50%)';
      if (stepName === 'pick_card') {
        rallyTutorialPopover.style.top = 'auto';
        rallyTutorialPopover.style.bottom = '180px';
        if (arrowEl) arrowEl.classList.add('arrow-bottom');
      } else if (stepName === 'place_card') {
        rallyTutorialPopover.style.top = '120px';
        rallyTutorialPopover.style.bottom = 'auto';
        if (arrowEl) arrowEl.classList.add('arrow-top');
      } else {
        rallyTutorialPopover.style.top = 'auto';
        rallyTutorialPopover.style.bottom = '80px';
      }
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    const popoverWidth = Math.min(440, window.innerWidth - 32);
    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    left = Math.max(16, Math.min(window.innerWidth - popoverWidth - 16, left));

    rallyTutorialPopover.style.left = `${left}px`;
    rallyTutorialPopover.style.transform = 'none';

    const popoverHeight = rallyTutorialPopover.offsetHeight || 180;
    const spaceAbove = rect.top;

    if (stepName === 'pick_card' || (spaceAbove >= popoverHeight + 20 && stepName !== 'place_card')) {
      // Place above target with clearance
      const top = Math.max(16, rect.top - popoverHeight - 16);
      rallyTutorialPopover.style.top = `${top}px`;
      rallyTutorialPopover.style.bottom = 'auto';
      if (arrowEl) {
        arrowEl.classList.add('arrow-bottom');
        const arrowLeft = Math.max(24, Math.min(popoverWidth - 24, rect.left + rect.width / 2 - left));
        arrowEl.style.left = `${arrowLeft}px`;
      }
    } else {
      // Place below target with clearance
      const top = Math.min(window.innerHeight - popoverHeight - 16, rect.bottom + 16);
      rallyTutorialPopover.style.top = `${top}px`;
      rallyTutorialPopover.style.bottom = 'auto';
      if (arrowEl) {
        arrowEl.classList.add('arrow-top');
        const arrowLeft = Math.max(24, Math.min(popoverWidth - 24, rect.left + rect.width / 2 - left));
        arrowEl.style.left = `${arrowLeft}px`;
      }
    }
  }

  function checkHandNudgeVisibility() {
    if (!arenaHandNudgePill || !arenaHandSection) return;
    if (window.innerWidth > 600 || battleSubPanel !== 'match' || !activeMatch || activeMatch.matchFinished) {
      arenaHandNudgePill.style.display = 'none';
      return;
    }

    // Only show on mobile phones if it's the player's turn to play and no card selected yet
    const isPlayerTurn = activeMatch.phase === 'player_turn' || activeMatch.phase === 'blind_prep';
    if (!isPlayerTurn || activeMatch.selectedCardId) {
      arenaHandNudgePill.style.display = 'none';
      return;
    }

    const rect = arenaHandSection.getBoundingClientRect();
    // If cards in hand are below the visible mobile viewport fold
    const isHidden = rect.top > (window.innerHeight - 120);
    arenaHandNudgePill.style.display = isHidden ? 'flex' : 'none';
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

    // Update Left Sidebar Rail selection state
    updateSidebarNav();

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

    const nodeCount = challenger.nodeCount || 3;
    let selectedNodesData = [];

    if (typeof BATTLE_NODES !== 'undefined' && BATTLE_NODES.length > 0) {
      if (nodeCount === 2) {
        selectedNodesData = [BATTLE_NODES[0], BATTLE_NODES[1]]; // Rocky + Pacific
      } else {
        selectedNodesData = [BATTLE_NODES[0], BATTLE_NODES[1], BATTLE_NODES[2]];
      }
    } else {
      selectedNodesData = [
        { id: 'node_1', name: 'Rocky Ridge', biome: 'mountain', icon: '⛰️', bonusBiome: 'mountain', bonusPower: 2, desc: 'Mountain +2' },
        { id: 'node_2', name: 'Pacific Bay', biome: 'coast', icon: '🌊', bonusBiome: 'coast', bonusPower: 2, desc: 'Coast +2' },
        { id: 'node_3', name: 'Heartland Plains', biome: 'heartland', icon: '🌾', bonusBiome: 'heartland', bonusPower: 2, desc: 'Heartland +2' }
      ];
    }

    const activeNodes = selectedNodesData.map(node => ({
      ...node,
      aiCards: [],
      playerCards: [],
      aiScore: 0,
      playerScore: 0,
      winner: null
    }));

    activeMatch = {
      challenger,
      nodeCount,
      nodes: activeNodes,
      round: 1, // 1, 2, or 3
      roundPlaysMade: 0, // Track plays within current round (Option A: R1=1, R2=2, R3=2)
      phase: 'ai_thinking', // 'ai_thinking' | 'player_turn' | 'blind_prep' | 'blind_ready' | 'finished'
      playerRemainingDeck: [...battleDeck],
      aiRemainingDeck: [...challenger.deck],
      selectedCardId: null,
      matchFinished: false
    };

    if (arenaOpponentAvatar) arenaOpponentAvatar.textContent = challenger.avatar;
    if (arenaOpponentName) arenaOpponentName.textContent = challenger.name;
    if (arenaOpponentTitle) arenaOpponentTitle.textContent = `${challenger.title} • ${challenger.badge}`;

    if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
    if (btnShowdownAction) btnShowdownAction.style.display = 'none';

    recalculateNodeScores();
    renderMatchUI();

    // Auto-launch walkthrough tutorial on Stage 1 (2 nodes)
    if (nodeCount === 2) {
      startRallyTutorial();
    } else {
      stopRallyTutorial();
    }

    // Computer goes first!
    setTimeout(() => {
      executeAiTurn();
    }, 600);
  }

  function getRequiredPlaysForRound(round, nodeCount) {
    // Stage 1 (2 nodes = 4 total slots): 1 in R1, 1 in R2, 2 in R3
    if (nodeCount === 2) {
      return round === 3 ? 2 : 1;
    }
    // Standard (3 nodes = 6 total slots): 1 in R1, 2 in R2, 2 in R3 (All 5 cards played!)
    if (round === 1) return 1;
    if (round === 2) return 2;
    return 2;
  }

  function executeAiTurn() {
    if (!activeMatch || activeMatch.matchFinished) return;

    const cardsToPlay = getRequiredPlaysForRound(activeMatch.round, activeMatch.nodeCount);

    if (activeMatch.round <= 2) {
      // Round 1 or 2: AI plays required number of cards face up (1 in R1, 2 in R2)
      for (let i = 0; i < cardsToPlay; i++) {
        const aiDeck = activeMatch.aiRemainingDeck;
        if (aiDeck.length === 0) break;

        const openNodes = activeMatch.nodes.filter(n => n.aiCards.length < 2);
        if (openNodes.length === 0) break;

        let targetNode = openNodes[0];
        let chosenCardId = aiDeck[0];

        // Preference: match node bonus biome
        for (const node of openNodes) {
          const matchCard = aiDeck.find(id => {
            const c = BATTLE_CARDS_MAP[id];
            return c && c.biome === node.bonusBiome;
          });
          if (matchCard) {
            chosenCardId = matchCard;
            targetNode = node;
            break;
          }
        }

        const power = calculateCardNodePower(chosenCardId, targetNode, activeMatch.challenger.deck, 'ai', 0);
        targetNode.aiCards.push({
          cardId: chosenCardId,
          effectivePower: power,
          isFaceDown: false
        });

        activeMatch.aiRemainingDeck = activeMatch.aiRemainingDeck.filter(id => id !== chosenCardId);
      }

      activeMatch.phase = 'player_turn';
      activeMatch.roundPlaysMade = 0;

      playAudioCue('drop');
      recalculateNodeScores();
      renderMatchUI();

      if (isRallyTutorialActive) {
        if (activeMatch.round === 1) {
          setTimeout(() => {
            if (isRallyTutorialActive && (currentTutorialStep === 'welcome' || !currentTutorialStep)) {
              setTutorialStep('pick_card');
            }
          }, 350);
        } else if (activeMatch.round === 2 && activeMatch.roundPlaysMade === 0) {
          setTutorialStep('synergy_info');
        }
      } else {
        if (window.innerWidth <= 600 && arenaHandSection) {
          setTimeout(() => {
            arenaHandSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }, 450);
        }
      }
      setTimeout(checkHandNudgeVisibility, 500);

    } else if (activeMatch.round === 3) {
      // Round 3 (The Grand Double Showdown): AI places remaining 2 cards FACE DOWN
      const aiDeck = activeMatch.aiRemainingDeck;
      const countToDrop = Math.min(cardsToPlay, aiDeck.length);

      for (let i = 0; i < countToDrop; i++) {
        const openNodes = activeMatch.nodes.filter(n => n.aiCards.length < 2);
        const targetNode = openNodes[i % openNodes.length] || activeMatch.nodes[0];
        const chosenCardId = activeMatch.aiRemainingDeck[0];

        targetNode.aiCards.push({
          cardId: chosenCardId,
          effectivePower: 0,
          isFaceDown: true
        });

        activeMatch.aiRemainingDeck = activeMatch.aiRemainingDeck.filter(id => id !== chosenCardId);
      }

      activeMatch.phase = 'blind_prep';
      activeMatch.roundPlaysMade = 0;

      playAudioCue('drop');
      recalculateNodeScores();
      renderMatchUI();

      if (isRallyTutorialActive && activeMatch.round === 3) {
        setTutorialStep('mystery_info');
      }
      checkHandNudgeVisibility();
    }
  }

  function recalculateNodeScores() {
    if (!activeMatch) return;
    let playerTotalWins = 0;
    let aiTotalWins = 0;

    activeMatch.nodes.forEach(node => {
      // Player score calculation
      let pScore = 0;
      const playerCardObjs = node.playerCards.map(c => BATTLE_CARDS_MAP[c.cardId]).filter(Boolean);
      const pStateMap = {};
      playerCardObjs.forEach(c => { pStateMap[c.stateId] = (pStateMap[c.stateId] || 0) + 1; });

      node.playerCards.forEach(pc => {
        if (pc.isFaceDown) return;
        let p = pc.effectivePower;
        const c = BATTLE_CARDS_MAP[pc.cardId];
        // Capital Synergy: State + Capital pair on the SAME node grants +2 to both!
        if (c && pStateMap[c.stateId] >= 2) {
          p += 2;
          pc.hasSynergy = true;
        } else {
          pc.hasSynergy = false;
        }
        pScore += p;
      });
      node.playerScore = pScore;

      // AI score calculation
      let aScore = 0;
      const aiCardObjs = node.aiCards.map(c => BATTLE_CARDS_MAP[c.cardId]).filter(Boolean);
      const aStateMap = {};
      aiCardObjs.forEach(c => { aStateMap[c.stateId] = (aStateMap[c.stateId] || 0) + 1; });

      node.aiCards.forEach(ac => {
        if (ac.isFaceDown) return;
        let p = ac.effectivePower;
        const c = BATTLE_CARDS_MAP[ac.cardId];
        if (c && aStateMap[c.stateId] >= 2) {
          p += 2;
          ac.hasSynergy = true;
        } else {
          ac.hasSynergy = false;
        }
        aScore += p;
      });
      node.aiScore = aScore;

      // Winner determination
      if (node.playerScore > node.aiScore) {
        node.winner = 'player';
        playerTotalWins++;
      } else if (node.aiScore > node.playerScore) {
        node.winner = 'ai';
        aiTotalWins++;
      } else {
        node.winner = 'tie';
      }
    });

    if (playerNodesWon) playerNodesWon.textContent = playerTotalWins;
    if (aiNodesWon) aiNodesWon.textContent = aiTotalWins;
  }

  function renderMatchUI() {
    if (!activeMatch) return;

    const targetPlays = getRequiredPlaysForRound(activeMatch.round, activeMatch.nodeCount);
    const playsLeftThisRound = Math.max(0, targetPlays - activeMatch.roundPlaysMade);

    // Update Round Tracker
    if (arenaRoundPhase && arenaTurnInstruction) {
      if (activeMatch.round === 1) {
        arenaRoundPhase.textContent = 'Round 1 of 3: Opening Moves';
        arenaTurnInstruction.textContent = activeMatch.phase === 'ai_thinking'
          ? `${activeMatch.challenger.name} is choosing an opening landmark...`
          : `${activeMatch.challenger.name} made their opening move! Place 1 card to match.`;
      } else if (activeMatch.round === 2) {
        arenaRoundPhase.textContent = 'Round 2 of 3: Travel Reinforcements (2 Cards)';
        arenaTurnInstruction.textContent = activeMatch.phase === 'ai_thinking'
          ? `${activeMatch.challenger.name} is placing 2 cards...`
          : (playsLeftThisRound === 2 
              ? `${activeMatch.challenger.name} placed 2 cards! Place your 1st card.` 
              : 'Great choice! Now place your 2nd card.');
      } else if (activeMatch.round === 3) {
        arenaRoundPhase.textContent = '🌟 Round 3: THE SECRET DESTINATION SHOWDOWN';
        if (activeMatch.phase === 'blind_prep') {
          arenaTurnInstruction.textContent = playsLeftThisRound === 2
            ? `${activeMatch.challenger.name} placed 2 secret cards! Place your 1st secret card.`
            : '1 secret card locked in! Place your final card at any open stop.';
        } else if (activeMatch.phase === 'blind_ready') {
          arenaTurnInstruction.textContent = 'All 5 cards placed! Tap REVEAL DESTINATIONS to see who won each landmark!';
        }
      }
    }

    // Render Battlefield Lanes
    if (arenaLanesBoard) {
      arenaLanesBoard.className = `arena-lanes-board nodes-${activeMatch.nodeCount}`;
      arenaLanesBoard.innerHTML = '';

      activeMatch.nodes.forEach((node, nodeIdx) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'arena-node-column';
        if (node.winner === 'player') colDiv.classList.add('node-player-winning');
        else if (node.winner === 'ai') colDiv.classList.add('node-ai-winning');
        else if (node.winner === 'tie' && (node.playerScore > 0 || node.aiScore > 0)) colDiv.classList.add('node-tied');

        // Header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'node-header-banner';
        headerDiv.innerHTML = `
          <div class="node-title-row">
            <span>${node.icon}</span>
            <span>${node.name}</span>
          </div>
          <span class="node-buff-badge biome-${node.biome}">${node.desc}</span>
        `;
        colDiv.appendChild(headerDiv);

        // AI Side
        const aiSide = document.createElement('div');
        aiSide.className = 'lane-side lane-side-ai';
        aiSide.innerHTML = `
          <div class="lane-side-header">
            <span class="lane-owner-tag">Guide</span>
            <span class="lane-power-meter">${node.aiScore} Pts</span>
          </div>
          <div class="lane-cards-dock" id="aiDockNode_${nodeIdx}"></div>
        `;
        colDiv.appendChild(aiSide);
        const aiDock = aiSide.querySelector('.lane-cards-dock');
        renderLaneCards(aiDock, node.aiCards, 'ai');

        // Middle Gap / Status Divider
        const statusDiv = document.createElement('div');
        statusDiv.className = 'lane-status-divider';
        const gap = Math.abs(node.playerScore - node.aiScore);
        let gapText = 'Tied (0)';
        let gapClass = 'tied';
        if (node.playerScore > node.aiScore) {
          gapText = `YOU LEAD (+${gap})`;
          gapClass = 'winning';
        } else if (node.aiScore > node.playerScore) {
          gapText = `GUIDE +${gap}`;
          gapClass = 'losing';
        }
        statusDiv.innerHTML = `<span class="lane-gap-pill ${gapClass}">${gapText}</span>`;
        colDiv.appendChild(statusDiv);

        // Player Side
        const playerSide = document.createElement('div');
        playerSide.className = 'lane-side lane-side-player';
        playerSide.innerHTML = `
          <div class="lane-cards-dock" id="playerDockNode_${nodeIdx}"></div>
          <div class="lane-side-header">
            <span class="lane-owner-tag">You</span>
            <span class="lane-power-meter">${node.playerScore} Pts</span>
          </div>
        `;
        colDiv.appendChild(playerSide);
        const playerDock = playerSide.querySelector('.lane-cards-dock');
        renderLaneCards(playerDock, node.playerCards, 'player', nodeIdx);

        arenaLanesBoard.appendChild(colDiv);
      });
    }

    // Showdown button visibility
    if (btnShowdownAction) {
      if (activeMatch.round === 3 && activeMatch.phase === 'blind_ready') {
        btnShowdownAction.style.display = 'block';
        btnShowdownAction.innerHTML = '<span>🌟 REVEAL DESTINATIONS!</span>';
      } else {
        btnShowdownAction.style.display = 'none';
      }
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

        if (!isPlayed && activeMatch.phase !== 'ai_thinking' && activeMatch.phase !== 'finished') {
          cardEl.addEventListener('click', () => {
            activeMatch.selectedCardId = isSelected ? null : cardId;
            renderMatchUI();

            if (isRallyTutorialActive) {
              if (activeMatch.selectedCardId) {
                setTutorialStep('place_card');
              } else {
                setTutorialStep('pick_card');
              }
            }
            checkHandNudgeVisibility();
          });
        }
        arenaHandGrid.appendChild(cardEl);
      });
    }

    if (arenaHandInstruction) {
      if (activeMatch.selectedCardId) {
        arenaHandInstruction.textContent = 'Card selected! Tap a highlighted open stop in any landmark above';
      } else {
        arenaHandInstruction.textContent = `Select a card (${activeMatch.playerRemainingDeck.length} in hand), then tap a highlighted stop`;
      }
    }
  }

  function renderLaneCards(dockEl, cardsArray, side, nodeIdx = null) {
    dockEl.innerHTML = '';

    for (let slot = 0; slot < 2; slot++) {
      const cardData = cardsArray[slot];
      if (cardData) {
        if (cardData.isFaceDown) {
          // Blind Showdown Face-Down Card
          const blindCard = document.createElement('div');
          blindCard.className = 'lane-card-blind';
          blindCard.innerHTML = `
            <span class="blind-icon">❓</span>
            <span>SECRET</span>
          `;
          dockEl.appendChild(blindCard);
        } else {
          // Face-Up Mini Placed Card
          const card = BATTLE_CARDS_MAP[cardData.cardId];
          const placedDiv = document.createElement('div');
          placedDiv.className = `lane-card-placed biome-${card ? card.biome : 'mountain'}`;
          placedDiv.innerHTML = `
            <div class="mini-card-top">
              <span class="mini-card-type">${card ? card.kind : 'state'}</span>
              <span class="mini-card-power">${cardData.effectivePower}</span>
            </div>
            <div class="mini-card-center">
              <span class="mini-card-emoji">${card ? card.emoji : '⭐'}</span>
              <span class="mini-card-name">${card ? card.name : '-'}</span>
            </div>
            ${cardData.hasSynergy ? '<span class="mini-card-bonus-tag synergy-glow">✨ +2 Capital Pair</span>' : (cardData.mathBonus ? '<span class="mini-card-bonus-tag">⚡ +1 Math</span>' : '')}
          `;
          dockEl.appendChild(placedDiv);
        }
      } else {
        // Empty Slot
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'lane-slot-empty';

        if (side === 'player' && activeMatch.selectedCardId && (activeMatch.phase === 'player_turn' || activeMatch.phase === 'blind_prep')) {
          emptyDiv.classList.add('slot-droppable');
          emptyDiv.textContent = 'DEPLOY HERE ⚡';
          emptyDiv.onclick = () => {
            onPlayerAttemptPlay(activeMatch.selectedCardId, nodeIdx);
          };
        } else {
          emptyDiv.textContent = 'Open Slot';
        }
        dockEl.appendChild(emptyDiv);
      }
    }
  }

  function onPlayerAttemptPlay(cardId, nodeIdx) {
    if (!activeMatch || !cardId || nodeIdx === null) return;
    const node = activeMatch.nodes[nodeIdx];
    if (!node || node.playerCards.length >= 2) return;

    const selectedCard = BATTLE_CARDS_MAP[cardId];
    const cardName = selectedCard ? selectedCard.name : 'Card';
    const cardPower = calculateCardNodePower(cardId, node, battleDeck, 'player', 0);

    triggerMathChallenge({
      cardName,
      cardPower,
      nodeAiScore: node.aiScore,
      nodePlayerScore: node.playerScore
    }, (mathBonus) => {
      const targetPlays = getRequiredPlaysForRound(activeMatch.round, activeMatch.nodeCount);

      if (activeMatch.round <= 2) {
        // Round 1 or 2 play
        const power = calculateCardNodePower(cardId, node, battleDeck, 'player', mathBonus);
        node.playerCards.push({
          cardId,
          effectivePower: power,
          mathBonus,
          isFaceDown: false
        });

        // Check if this play created a State + Capital synergy on this lane!
        if (selectedCard) {
          const partnerId = selectedCard.kind === 'state' ? `CAP_${selectedCard.stateId}` : `ST_${selectedCard.stateId}`;
          const partnerPresent = node.playerCards.some(c => c.cardId === partnerId);
          if (partnerPresent) {
            playSynergySparkEffect(node.name);
          }
        }

        activeMatch.playerRemainingDeck = activeMatch.playerRemainingDeck.filter(id => id !== cardId);
        activeMatch.selectedCardId = null;
        activeMatch.roundPlaysMade++;

        playAudioCue('drop');
        recalculateNodeScores();

        if (activeMatch.roundPlaysMade >= targetPlays) {
          // Finished this round's plays, advance to next round!
          activeMatch.round++;
          activeMatch.roundPlaysMade = 0;
          activeMatch.phase = 'ai_thinking';
          renderMatchUI();

          setTimeout(() => {
            executeAiTurn();
          }, 800);
        } else {
          // Still have 1 more reinforcement card to play in Round 2
          renderMatchUI();
          if (isRallyTutorialActive) {
            setTutorialStep('pick_card');
          }
        }

      } else if (activeMatch.round === 3) {
        // Round 3 (The Double Blind Showdown Placement)
        node.playerCards.push({
          cardId,
          effectivePower: 0,
          mathBonus,
          isFaceDown: true
        });

        activeMatch.playerRemainingDeck = activeMatch.playerRemainingDeck.filter(id => id !== cardId);
        activeMatch.selectedCardId = null;
        activeMatch.roundPlaysMade++;

        playAudioCue('drop');

        if (activeMatch.roundPlaysMade >= targetPlays || activeMatch.playerRemainingDeck.length === 0) {
          activeMatch.phase = 'blind_ready';
          renderMatchUI();
          if (isRallyTutorialActive) {
            setTutorialStep('reveal_info');
          }
        } else {
          activeMatch.phase = 'blind_prep';
          renderMatchUI();
          if (isRallyTutorialActive) {
            setTutorialStep('pick_card');
          }
        }
      }
    });
  }

  function executeShowdownReveal() {
    if (!activeMatch || activeMatch.matchFinished) return;
    if (isRallyTutorialActive) {
      stopRallyTutorial();
    }
    if (btnShowdownAction) btnShowdownAction.style.display = 'none';

    playAudioCue('showdown');

    // Reveal all face-down cards
    let createdSynergyOnReveal = false;
    activeMatch.nodes.forEach(node => {
      // Reveal AI blind cards
      node.aiCards.forEach(ac => {
        if (ac.isFaceDown) {
          ac.isFaceDown = false;
          ac.effectivePower = calculateCardNodePower(ac.cardId, node, activeMatch.challenger.deck, 'ai', 0);
        }
      });
      // Reveal Player blind cards
      node.playerCards.forEach(pc => {
        if (pc.isFaceDown) {
          pc.isFaceDown = false;
          pc.effectivePower = calculateCardNodePower(pc.cardId, node, battleDeck, 'player', pc.mathBonus || 0);
        }
      });

      // Check if player completed a synergy with their revealed cards
      const playerStates = node.playerCards.map(c => BATTLE_CARDS_MAP[c.cardId]?.stateId).filter(Boolean);
      if (playerStates.length === 2 && playerStates[0] === playerStates[1]) {
        createdSynergyOnReveal = true;
      }
    });

    if (createdSynergyOnReveal) {
      playSynergySparkEffect('Showdown Lane');
    }

    recalculateNodeScores();
    renderMatchUI();

    if (arenaRoundPhase) arenaRoundPhase.textContent = '🌟 DESTINATIONS REVEALED!';
    if (arenaTurnInstruction) arenaTurnInstruction.textContent = 'Tallying travel points across all landmarks...';

    setTimeout(() => {
      finishMatch();
    }, 1800);
  }

  function finishMatch() {
    if (!activeMatch) return;
    stopRallyTutorial();
    activeMatch.matchFinished = true;
    activeMatch.phase = 'finished';

    let playerWins = 0;
    let aiWins = 0;
    let playerTotalScore = 0;
    let aiTotalScore = 0;

    activeMatch.nodes.forEach(node => {
      playerTotalScore += node.playerScore;
      aiTotalScore += node.aiScore;
      if (node.winner === 'player') playerWins++;
      else if (node.winner === 'ai') aiWins++;
    });

    // Win if player controlled more nodes, or tiebreaker total score
    let isVictory = false;
    if (playerWins > aiWins) {
      isVictory = true;
    } else if (playerWins === aiWins) {
      isVictory = (playerTotalScore >= aiTotalScore);
    }

    if (arenaMatchOverlay) {
      arenaMatchOverlay.style.display = 'flex';
      if (isVictory) {
        if (matchOverlayIcon) matchOverlayIcon.textContent = '🚗';
        if (matchOverlayTitle) matchOverlayTitle.textContent = 'ROAD TRIP VICTORY!';
        if (matchOverlayDesc) matchOverlayDesc.textContent = `You explored ${playerWins} of ${activeMatch.nodeCount} landmarks with ${activeMatch.challenger.name} (${playerTotalScore} to ${aiTotalScore} Total Travel Points)!`;

        const isFirstClear = !defeatedChallengerIds.includes(activeMatch.challenger.id);
        if (isFirstClear) {
          defeatedChallengerIds.push(activeMatch.challenger.id);
          saveDefeatedChallengers();
          awardBoosterPack(`🏆 Explored with ${activeMatch.challenger.name}!`);

          if (matchRewardPill) {
            matchRewardPill.style.display = 'inline-block';
            matchRewardPill.textContent = '📦 +1 Booster Pack Earned (New Trail Badge)!';
          }
        } else {
          if (matchRewardPill) {
            matchRewardPill.style.display = 'inline-block';
            matchRewardPill.textContent = '🌟 Trail Explored! (Study quizzes & streaks award more booster packs)';
          }
        }

        // Check if next challenger is available
        const currentIdx = AI_CHALLENGERS.findIndex(c => c.id === activeMatch.challenger.id);
        const nextChallenger = (currentIdx !== -1 && currentIdx < AI_CHALLENGERS.length - 1) ? AI_CHALLENGERS[currentIdx + 1] : null;
        const totalCards = Object.keys(cardCollection).length;

        if (nextChallenger) {
          if (totalCards >= nextChallenger.requiredCards) {
            currentChallengerId = nextChallenger.id;
            saveChallengerStage();
            if (btnMatchNextRival) {
              btnMatchNextRival.style.display = 'block';
              btnMatchNextRival.innerHTML = `<span>Next Guide: ${nextChallenger.name} (${nextChallenger.badge}) 🚗</span>`;
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
            btnMatchNextRival.innerHTML = `<span>👑 You Are the Grand Explorer of 50 States! 🎴</span>`;
            btnMatchNextRival.onclick = () => {
              if (arenaMatchOverlay) arenaMatchOverlay.style.display = 'none';
              switchView('cards');
            };
          }
        }
      } else {
        if (matchOverlayIcon) matchOverlayIcon.textContent = '🌟';
        if (matchOverlayTitle) matchOverlayTitle.textContent = 'GREAT RALLY!';
        if (matchOverlayDesc) matchOverlayDesc.textContent = `${activeMatch.challenger.name} reached more landmarks this trip. Match up state biomes and try again!`;
        if (matchRewardPill) matchRewardPill.style.display = 'none';
        if (btnMatchNextRival) {
          btnMatchNextRival.style.display = 'block';
          btnMatchNextRival.innerHTML = `<span>Adjust Deck in Travel Binder 🎒</span>`;
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
              ${isDefeated ? '<span style="color: #10b981; font-weight: 800; font-size: 0.72rem;">✅ EXPLORED</span>' : ''}
            </div>
            <div class="ladder-desc">${challenger.desc}</div>
          </div>
        </div>
        <div class="ladder-right">
          ${isUnlocked 
            ? `<button class="btn-ladder-battle" data-id="${challenger.id}">${isActive ? 'Current Guide 🧭' : 'Rally Together! 🚗'}</button>`
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

    // How to Play button
    if (btnRallyHowToPlay) {
      btnRallyHowToPlay.addEventListener('click', () => {
        startRallyTutorial(true);
      });
    }

    // Tutorial action buttons
    if (btnTutorialNext) {
      btnTutorialNext.addEventListener('click', () => {
        if (currentTutorialStep === 'welcome') {
          if (activeMatch && (activeMatch.phase === 'player_turn' || activeMatch.phase === 'blind_prep')) {
            setTutorialStep('pick_card');
          } else {
            if (rallyTutorialLayer) rallyTutorialLayer.style.display = 'none';
            clearTutorialHighlight();
          }
        } else if (currentTutorialStep === 'pick_card') {
          if (arenaHandSection) arenaHandSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else if (currentTutorialStep === 'place_card') {
          const droppable = document.querySelector('.lane-slot-empty.slot-droppable');
          if (droppable) droppable.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (currentTutorialStep === 'synergy_info' || currentTutorialStep === 'mystery_info') {
          setTutorialStep('pick_card');
        } else if (currentTutorialStep === 'reveal_info') {
          stopRallyTutorial();
          executeShowdownReveal();
        } else {
          if (rallyTutorialLayer) rallyTutorialLayer.style.display = 'none';
          clearTutorialHighlight();
        }
      });
    }

    if (btnTutorialSkip) {
      btnTutorialSkip.addEventListener('click', () => {
        stopRallyTutorial();
      });
    }

    // Floating Hand Nudge Pill
    if (arenaHandNudgePill) {
      arenaHandNudgePill.addEventListener('click', () => {
        if (arenaHandSection) {
          arenaHandSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        arenaHandNudgePill.style.display = 'none';
      });
    }

    window.addEventListener('scroll', checkHandNudgeVisibility, { passive: true });
    window.addEventListener('resize', () => {
      checkHandNudgeVisibility();
      if (isRallyTutorialActive && currentTutorialStep) {
        const config = TUTORIAL_STEPS_CONFIG[currentTutorialStep];
        const targetEl = config?.targetSelector ? document.querySelector(config.targetSelector) : null;
        positionTutorialPopover(targetEl, currentTutorialStep);
      }
    }, { passive: true });

    const mainLayoutEl = document.querySelector('.main-layout');
    if (mainLayoutEl) {
      mainLayoutEl.addEventListener('scroll', checkHandNudgeVisibility, { passive: true });
    }

    // Showdown Reveal Trigger
    if (btnShowdownAction) {
      btnShowdownAction.addEventListener('click', executeShowdownReveal);
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
        navigator.serviceWorker.register(`./sw.js?v=15`).then(reg => {
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
