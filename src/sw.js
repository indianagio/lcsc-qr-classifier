// LCSC QR Classifier — Service Worker
const CACHE_NAME = 'lcsc-qr-v2';
const STATIC_ASSETS = [
  '/lcsc-qr-classifier.html',
  '/manifest.webmanifest',
  '/icons/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isApi =
    url.hostname.includes('jlcsearch.tscircuit.com') ||
    url.hostname.includes('wmsc.lcsc.com') ||
    url.hostname.includes('codetabs.com') ||
    url.hostname.includes('api.fontshare.com');

  if (isApi) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res.ok) caches.open(CACHE_NAME).then((c) => c.put(event.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(
        (cached) => cached || fetch(event.request).then((res) => {
          if (res.ok) caches.open(CACHE_NAME).then((c) => c.put(event.request, res.clone()));
          return res;
        })
      )
    );
  }
});
