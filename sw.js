const cacheName = "EsqueletoApp";
const assets = [
    'index.html',
    'js/main.js',
    'js/lib/uikit.min.js',
    'js/lib/uikit-icons.min.js',
    'css/main.css',
    'css/lib/nes.css',
    'css/lib/uikit.min.css',
    'img/favicon.ico',
    'fondo-pantalla.jpg',
    'icono-app.png'
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
