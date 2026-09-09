/**
 * US States & Capitals - Flashcard Study App
 * Streamlined Hero Card Controller with Settings Sheet & Memory Hooks
 */

(function () {
  'use strict';

  // Local Storage Keys
  const STORAGE_KEY_PROGRESS = 'states_capitals_progress_v1';
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

  // DOM Elements - Reset Modal
  const resetModal = document.getElementById('resetModal');
  const btnCancelReset = document.getElementById('btnCancelReset');
  const btnConfirmReset = document.getElementById('btnConfirmReset');

  // Application State
  let progress = loadProgress();
  let settings = loadSettings();
  let deck = [];
  let currentIndex = 0;
  let isFlipped = false;
  let cardDirectionCache = {};

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
    // Purge any stale service worker caches immediately
    if ('caches' in window) {
      caches.keys().then(keys => {
        keys.forEach(k => {
          if (k !== 'states-capitals-v2') {
            console.log('Purging cache:', k);
            caches.delete(k);
          }
        });
      });
    }

    buildDeck();
    syncSettingsUI();
    renderStats();
    renderCurrentCard();
    bindEvents();
    registerServiceWorker();
  }

  // =========================================================================
  // Storage & Settings Helpers
  // =========================================================================
  function loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn('LocalStorage error:', e);
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function loadSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return data ? JSON.parse(data) : {
        direction: 'state-first',
        filter: 'all',
        order: 'shuffle',
        hintsEnabled: true
      };
    } catch (e) {
      return {
        direction: 'state-first',
        filter: 'all',
        order: 'shuffle',
        hintsEnabled: true
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
      list = list.filter(item => progress[item.state] === 'missed');
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

  // =========================================================================
  // UI Rendering & Stats
  // =========================================================================
  function renderStats() {
    let known = 0;
    let missed = 0;
    const total = US_STATES.length;

    US_STATES.forEach(item => {
      const status = progress[item.state];
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
    
    activeDeckBadge.textContent = `${deckName} • ${dirName}`;
    activeStatsBadge.textContent = `❌ ${missed} Missed • ${remaining} Left`;
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
        const anyMissed = US_STATES.some(s => progress[s.state] === 'missed');
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
    const status = progress[item.state] || 'unseen';

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
    progress[currentItem.state] = status;
    saveProgress();
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
    });

    // Trigger Reset from Settings
    btnTriggerReset.addEventListener('click', () => {
      settingsModal.classList.remove('is-open');
      resetModal.classList.add('is-open');
    });

    btnCancelReset.addEventListener('click', () => {
      resetModal.classList.remove('is-open');
    });

    btnConfirmReset.addEventListener('click', () => {
      progress = {};
      saveProgress();
      resetModal.classList.remove('is-open');
      renderStats();
      buildDeck();
      renderCurrentCard();
    });

    resetModal.addEventListener('click', e => {
      if (e.target === resetModal) resetModal.classList.remove('is-open');
    });

    // Keyboard Shortcuts (Magic Keyboard / Desktop)
    window.addEventListener('keydown', e => {
      if (settingsModal.classList.contains('is-open') || resetModal.classList.contains('is-open')) return;

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
    });
  }

  // =========================================================================
  // Service Worker for Offline / iPad PWA
  // =========================================================================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
          console.log('SW registration note:', err);
        });
      });
    }
  }

})();
