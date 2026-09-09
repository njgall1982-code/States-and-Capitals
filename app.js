/**
 * US States & Capitals - Flashcard Study App
 * Main Controller & State Management
 */

(function () {
  'use strict';

  // Local Storage Keys
  const STORAGE_KEY_PROGRESS = 'states_capitals_progress_v1';
  const STORAGE_KEY_SETTINGS = 'states_capitals_settings_v1';

  // DOM Elements
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

  const statKnownCount = document.getElementById('statKnownCount');
  const statMissedCount = document.getElementById('statMissedCount');
  const statRemainingCount = document.getElementById('statRemainingCount');
  const masteryPercentText = document.getElementById('masteryPercentText');
  const progressBarKnown = document.getElementById('progressBarKnown');
  const progressBarMissed = document.getElementById('progressBarMissed');

  const directionGroup = document.getElementById('directionGroup');
  const filterGroup = document.getElementById('filterGroup');
  const filterMissedCount = document.getElementById('filterMissedCount');
  const btnOrderToggle = document.getElementById('btnOrderToggle');
  const orderIcon = document.getElementById('orderIcon');
  const orderLabel = document.getElementById('orderLabel');

  const btnReset = document.getElementById('btnReset');
  const resetModal = document.getElementById('resetModal');
  const btnCancelReset = document.getElementById('btnCancelReset');
  const btnConfirmReset = document.getElementById('btnConfirmReset');

  // Application State
  let progress = loadProgress();
  let settings = loadSettings();
  let deck = [];
  let currentIndex = 0;
  let isFlipped = false;
  let cardDirectionCache = {}; // Cache per-card random direction

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
    buildDeck();
    updateControlsUI();
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
        order: 'shuffle'
      };
    } catch (e) {
      return { direction: 'state-first', filter: 'all', order: 'shuffle' };
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
  // UI Rendering
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

    statKnownCount.textContent = known;
    statMissedCount.textContent = missed;
    statRemainingCount.textContent = remaining;
    filterMissedCount.textContent = missed;

    masteryPercentText.textContent = `${masteryPercent}% Mastered`;
    progressBarKnown.style.width = `${(known / total) * 100}%`;
    progressBarMissed.style.width = `${(missed / total) * 100}%`;
  }

  function updateControlsUI() {
    // Direction segmented control
    directionGroup.querySelectorAll('.segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.direction === settings.direction);
    });

    // Filter pills
    filterGroup.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.filter === settings.filter);
    });

    // Order toggle
    if (settings.order === 'shuffle') {
      orderIcon.textContent = '🔀';
      orderLabel.textContent = 'Shuffled';
    } else {
      orderIcon.textContent = '🔤';
      orderLabel.textContent = 'A to Z';
    }
  }

  function renderCurrentCard() {
    // Reset flip state on new card
    isFlipped = false;
    flashcard.classList.remove('is-flipped');
    resetCardTransforms();

    // Handle Empty Deck View
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

    // Ensure within bounds
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

    // Determine card side layout (State First vs Capital First vs Random)
    let isStateOnFront = true;
    if (settings.direction === 'capital-first') {
      isStateOnFront = false;
    } else if (settings.direction === 'random') {
      if (cardDirectionCache[item.id] === undefined) {
        cardDirectionCache[item.id] = Math.random() < 0.5;
      }
      isStateOnFront = cardDirectionCache[item.id];
    }

    // Set Front Side
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

  // =========================================================================
  // Interactions & Card Navigation
  // =========================================================================
  function toggleCardFlip() {
    if (deck.length === 0) return;
    isFlipped = !isFlipped;
    flashcard.classList.toggle('is-flipped', isFlipped);
  }

  function nextCard() {
    if (currentIndex < deck.length - 1) {
      currentIndex++;
      renderCurrentCard();
    } else {
      // Reached the end of deck
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

    // Trigger smooth exit animation
    animateCardExit(status === 'known' ? 1 : -1, () => {
      if (settings.filter === 'missed' && status === 'known') {
        // If in "Missed Only" mode and card is now known, remove it from the deck
        deck.splice(currentIndex, 1);
        if (currentIndex >= deck.length && deck.length > 0) {
          currentIndex = deck.length - 1;
        }
      } else {
        if (currentIndex < deck.length - 1) {
          currentIndex++;
        } else {
          // Wrapped or finished
          currentIndex = 0;
        }
      }
      renderCurrentCard();
    });
  }

  // =========================================================================
  // Swipe Gestures & Touch Engine (iPad & Touch Screen Support)
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

    cardWrapper.classList.remove('is-animating');
    cardWrapper.classList.add('is-dragging');
  }

  function onTouchMove(e) {
    if (!isDragging || deck.length === 0) return;
    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    // Check if horizontal movement is dominant
    if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
      isTouchMoved = true;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      if (e.cancelable) e.preventDefault(); // Prevent page scrolling during card drag
    }

    currentTranslateX = deltaX;
    currentTranslateY = deltaY * 0.2; // subtle vertical follow

    const rotation = deltaX * 0.04;
    const flipRotation = isFlipped ? 'rotateY(180deg)' : '';

    flashcard.style.transform = `${flipRotation} translate3d(${currentTranslateX}px, ${currentTranslateY}px, 0) rotate(${rotation}deg)`;

    // Dynamic Swipe Badges Opacity
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

  function onTouchEnd(e) {
    if (!isDragging || deck.length === 0) return;
    isDragging = false;
    cardWrapper.classList.remove('is-dragging');
    cardWrapper.classList.add('is-animating');

    badgeGotIt.style.opacity = 0;
    badgeMissed.style.opacity = 0;

    const threshold = 75; // Drag threshold in px to register swipe

    if (currentTranslateX > threshold) {
      // Swiped Right -> Got It!
      markCard('known');
    } else if (currentTranslateX < -threshold) {
      // Swiped Left -> Need Practice
      markCard('missed');
    } else {
      // Insufficient drag -> Tap to flip or spring back
      if (!isTouchMoved || (Math.abs(currentTranslateX) < 10 && Math.abs(currentTranslateY) < 10)) {
        toggleCardFlip();
      }
      resetCardTransforms();
    }
  }

  function animateCardExit(direction, onComplete) {
    cardWrapper.classList.add('is-animating');
    const throwDistance = direction * (window.innerWidth || 500);
    const flipRotation = isFlipped ? 'rotateY(180deg)' : '';

    flashcard.style.transform = `${flipRotation} translate3d(${throwDistance}px, 0, 0) rotate(${direction * 22}deg)`;
    flashcard.style.opacity = '0';

    setTimeout(() => {
      resetCardTransforms();
      if (onComplete) onComplete();
    }, 280);
  }

  function resetCardTransforms() {
    cardWrapper.classList.remove('is-animating', 'is-dragging');
    flashcard.style.transform = isFlipped ? 'rotateY(180deg)' : '';
    flashcard.style.opacity = '1';
    badgeGotIt.style.opacity = 0;
    badgeMissed.style.opacity = 0;
    currentTranslateX = 0;
    currentTranslateY = 0;
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================
  function bindEvents() {
    // Touch & Mouse Swipes on Card Arena
    cardWrapper.addEventListener('touchstart', onTouchStart, { passive: false });
    cardWrapper.addEventListener('touchmove', onTouchMove, { passive: false });
    cardWrapper.addEventListener('touchend', onTouchEnd, { passive: false });
    cardWrapper.addEventListener('touchcancel', onTouchEnd);

    cardWrapper.addEventListener('mousedown', onTouchStart);
    window.addEventListener('mousemove', e => {
      if (isDragging) onTouchMove(e);
    });
    window.addEventListener('mouseup', e => {
      if (isDragging) onTouchEnd(e);
    });

    // Action Buttons
    btnFlipCard.addEventListener('click', toggleCardFlip);
    btnMarkKnown.addEventListener('click', () => markCard('known'));
    btnMarkMissed.addEventListener('click', () => markCard('missed'));

    // Navigation
    btnPrev.addEventListener('click', prevCard);
    btnNext.addEventListener('click', nextCard);

    // Direction Mode Buttons
    directionGroup.addEventListener('click', e => {
      const btn = e.target.closest('.segmented-btn');
      if (!btn) return;
      settings.direction = btn.dataset.direction;
      saveSettings();
      updateControlsUI();
      renderCurrentCard();
    });

    // Filter Pills
    filterGroup.addEventListener('click', e => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      settings.filter = pill.dataset.filter;
      saveSettings();
      updateControlsUI();
      buildDeck();
      renderCurrentCard();
    });

    // Order Toggle
    btnOrderToggle.addEventListener('click', () => {
      settings.order = settings.order === 'shuffle' ? 'alpha' : 'shuffle';
      saveSettings();
      updateControlsUI();
      buildDeck();
      renderCurrentCard();
    });

    // Empty Deck Action Button
    btnEmptyAction.addEventListener('click', () => {
      settings.filter = 'all';
      saveSettings();
      updateControlsUI();
      buildDeck();
      renderCurrentCard();
    });

    // Reset Modal Dialog
    btnReset.addEventListener('click', () => {
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
      if (e.target === resetModal) {
        resetModal.classList.remove('is-open');
      }
    });

    // Keyboard Shortcuts (Space to flip, Arrows for Missed/Known/Prev/Next)
    window.addEventListener('keydown', e => {
      if (resetModal.classList.contains('is-open')) return;

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
