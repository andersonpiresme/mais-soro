/**
 * Mais Soro — Service Worker
 * Cache estratificado: shell crítico (síncrono) + dados (assíncrono lazy).
 * Estratégias:
 *   - SHELL: cache-first com fallback para network
 *   - DADOS: stale-while-revalidate (responde do cache, atualiza em background)
 *   - DEMAIS: network-first com fallback para cache
 *
 * IMPORTANTE: ao alterar dados em data/*.json, troque DATA_VERSION para forçar refresh.
 */

const VERSION = 'mais-soro-v3.0';
const SHELL_CACHE = `${VERSION}-shell`;
const DATA_CACHE = `${VERSION}-data`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

// Shell: tudo o que precisa estar disponível na primeira pintura
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js'
];

// Dados: carregam depois do shell, idealmente em segundo plano
const DATA_ASSETS = [
  './data/hospitais.json',
  './data/overrides.json'
];

// ═══════════════════════════════════════════════
//   INSTALL — pré-cacheia o shell crítico
// ═══════════════════════════════════════════════
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ═══════════════════════════════════════════════
//   ACTIVATE — limpa caches antigos + assume controle
// ═══════════════════════════════════════════════
self.addEventListener('activate', (event) => {
  const validCaches = [SHELL_CACHE, DATA_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => !validCaches.includes(name))
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

// ═══════════════════════════════════════════════
//   FETCH — roteamento por tipo de recurso
// ═══════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Recursos externos voláteis (Google Maps, geolocation): nunca cachear
  if (url.hostname.includes('google.com') ||
      url.hostname.includes('googleapis.com') ||
      url.pathname.includes('geolocation')) {
    return;
  }

  // Dados (JSON): stale-while-revalidate
  if (url.pathname.endsWith('hospitais.json') ||
      url.pathname.endsWith('overrides.json')) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  // Shell e demais: cache-first
  event.respondWith(cacheFirst(request, RUNTIME_CACHE));
});

// ═══════════════════════════════════════════════
//   ESTRATÉGIAS DE CACHE
// ═══════════════════════════════════════════════

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Offline + sem cache: fallback para o index para navegação SPA
    if (request.mode === 'navigate') {
      const indexFallback = await caches.match('./index.html');
      if (indexFallback) return indexFallback;
    }
    throw err;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Revalidação em background — não bloqueia resposta
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
        // Notifica clientes que dados foram atualizados
        notifyClients({ type: 'DATA_UPDATED', url: request.url });
      }
      return response;
    })
    .catch(() => null);

  // Se temos cache, retorna imediatamente; senão espera a rede
  return cached || fetchPromise;
}

// ═══════════════════════════════════════════════
//   MENSAGENS DO CLIENTE
//   - CACHE_DATA: força download e cacheamento dos JSONs (para "disponível offline")
//   - CHECK_DATA_CACHED: responde se os dados já estão em cache
// ═══════════════════════════════════════════════
self.addEventListener('message', (event) => {
  if (event.data?.type === 'CACHE_DATA') {
    event.waitUntil(precacheData());
  }

  if (event.data?.type === 'CHECK_DATA_CACHED') {
    event.waitUntil(checkDataCached().then((cached) => {
      event.source?.postMessage({ type: 'DATA_CACHED_STATUS', cached });
    }));
  }
});

async function precacheData() {
  const cache = await caches.open(DATA_CACHE);
  try {
    await cache.addAll(DATA_ASSETS);
    notifyClients({ type: 'DATA_CACHED' });
  } catch (err) {
    notifyClients({ type: 'DATA_CACHE_ERROR', error: err.message });
  }
}

async function checkDataCached() {
  const cache = await caches.open(DATA_CACHE);
  const checks = await Promise.all(
    DATA_ASSETS.map((url) => cache.match(url).then((r) => !!r))
  );
  return checks.every(Boolean);
}

async function notifyClients(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach((client) => client.postMessage(message));
}
