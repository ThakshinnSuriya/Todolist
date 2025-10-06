self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("todo-cache-v1").then(cache => cache.addAll([
      "/", "/index.html", "/manifest.json"
    ]))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
