const CACHE_NAME = 'cinematic-sequence-cache-v2';

// Static assets we want to ensure are cached immediately
const PRECACHE_ASSETS = [
  '/sequence/frame_000_delay-0.066s.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Focus caching strategy on image sequence and audio
  // We allow 'cors' responses because Vercel/CDNs often serve assets with that type
  if (url.pathname.includes('/sequence/') || url.pathname.endsWith('.mp3') || url.pathname.endsWith('.webp')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          // Only cache successful responses. We allow 'basic' and 'cors' types.
          if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        }).catch((error) => {
          // If fetch fails, we don't return null if it's a critical asset, 
          // we just let the error propagate or return what we might have in cache (already tried)
          console.error('[SW] Fetch failed:', request.url, error);
          // Return nothing to let the browser handle the error normally
        });
      })
    );
  }
});
