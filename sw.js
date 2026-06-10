const CACHE_NAME = 'zangxin-blog-v2';
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/css/bootstrap.min.css',
  '/css/hux-blog.min.css',
  '/js/jquery.min.js',
  '/js/bootstrap.min.js',
  '/js/hux-blog.min.js',
  '/js/simple-jekyll-search.min.js',
  '/img/home-bg.jpg',
  '/img/404-bg.jpg',
  '/img/icon_wechat.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(PRECACHE_URLS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(function (response) {
        if (!response.ok) return response;

        const copy = response.clone();
        return caches.open(CACHE_NAME)
          .then(function (cache) { return cache.put(request, copy); })
          .then(function () { return response; });
      })
      .catch(function () {
        return caches.match(request)
          .then(function (cached) {
            if (cached) return cached;
            if (request.mode === 'navigate') return caches.match('/offline.html');
            return Response.error();
          });
      })
  );
});
