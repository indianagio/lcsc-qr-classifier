// LCSC QR Classifier — Service Worker
// Strategy: Cache First per assets statici, Network First per le API esterne.

const CACHE_NAME = 'lcsc-qr-v1';
const STATIC_ASSETS = [
  './lcsc-qr-classifier.html',
  './manifest.webmanifest',
  'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap'
];

// Install: pre-cache gli asset statici
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: rimuove le cache vecchie
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: strategia ibrida
// - API esterne (jlcsearch, LCSC, codetabs proxy) → Network First con fallback offline
// - Tutto il resto → Cache First
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Lascia passare le richieste non-GET senza intercettare
  if (event.request.method !== 'GET') return;

  const isApiCall =
    url.hostname.includes('jlcsearch.tscircuit.com') ||
    url.hostname.includes('wmsc.lcsc.com') ||
    url.hostname.includes('codetabs.com') ||
    url.hostname.includes('api.fontshare.com');

  if (isApiCall) {
    // Network First: prova la rete, poi la cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache First: serve dalla cache, poi rete
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
          })
      )
    );
  }
});
