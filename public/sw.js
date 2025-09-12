const CACHE_NAME = 'casa-del-jaguar-v2';
const STATIC_CACHE = [
  '/',
  '/css/critical.css',
  '/js/scroll-animations.js',
  '/js/retreat-calendar.js',
  '/cj-logo.webp',
  '/cj-icon-light.webp',
  '/cj-icon-dark.webp'
];

// Install event - cache critical resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests and external requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache static assets
            if (event.request.url.match(/\.(jpg|jpeg|png|webp|gif|svg|css|js)$/)) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }

            return response;
          });
      })
  );
});
