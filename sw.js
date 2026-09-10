const CACHE_NAME = 'states-capitals-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=7',
  './app.js?v=7',
  './data/states.js?v=7',
  './data/jokes.js?v=7',
  './data/us-map-template.js?v=7',
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

self.addEventListener('fetch', (event) => {
  // Network first: always try to fetch fresh files, fall back to cache only when offline
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and update cache with fresh network copy
        if (response && response.status === 200 && event.request.method === 'GET') {
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
