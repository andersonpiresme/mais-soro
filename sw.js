const CACHE_NAME = 'socorro-peconhentos-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js'
];

// Instalar: cachear todos os recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto, armazenando recursos...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativar: limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first para recursos conhecidos, network-first para o resto
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorar requisições que não são GET
  if (request.method !== 'GET') return;

  // Ignorar requisições de geolocalização e Google Maps (precisam ser online)
  if (request.url.includes('maps.google') || 
      request.url.includes('google.com/maps') ||
      request.url.includes('geolocation')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then((response) => {
            // Não cachear respostas inválidas
            if (!response || response.status !== 200) {
              return response;
            }
            // Cachear o recurso para uso futuro
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            // Offline fallback: retornar a página principal
            if (request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
