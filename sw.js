const CACHE_NAME = 'states-capitals-v16';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=16',
  './app.js?v=16',
  './data/states.js?v=16',
  './data/jokes.js?v=16',
  './data/cards.js?v=16',
  './data/us-map-template.js?v=16',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // Force immediate activation of new service worker
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Claim clients immediately and wipe old caches
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  // Only handle http and https GET requests (skips chrome-extension://, file://, etc.)
  if (!event.request.url.startsWith('http')) return;
  if (event.request.method !== 'GET') return;

  // Network first: always try to fetch fresh files, fall back to cache only when offline
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and update cache with fresh network copy
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
