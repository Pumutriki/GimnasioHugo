/* Service worker
   Estrategia: primero la red, y si no hay internet, lo guardado.
   Así, cuando se sube una versión nueva a GitHub, al abrir la app ya sale
   actualizada; y sin cobertura sigue funcionando con la última que se cargó. */
const CACHE = 'gimnasio-hugo-v2';
const ARCHIVOS = [
  './', './index.html', './styles.css', './figures.js', './data.js', './app.js',
  './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => { });
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
