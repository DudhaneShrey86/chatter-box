const sitecache = "site-cache";
const cachearr = [
  '/chat/',
  '/chat/index.php',
  '/chat/css/index.css',
  '/chat/css/roboto.css',
  '/chat/js/index.js',
  '/chat/conn.php',
  '/chat/js/jquery.js',
  '/chat/js/app.js'
];

self.addEventListener('install', evt=>{
  evt.waitUntil(
    caches.open(sitecache).then((cache)=>{
      cache.addAll(cachearr);
    })
  );
});
self.addEventListener('activate', evt=>{

});
self.addEventListener('fetch', evt=>{
  evt.respondWith(
    caches.match(evt.request).then((cacheRes)=>{
      return cacheRes || fetch(evt.request);
    })
  );
});
