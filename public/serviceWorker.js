const CACHE_NAME = "version-1";
const urlToCache = ["index.html", "offline.html"];

//Adding cache to open
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opend Cache!");
      return cache.addAll(urlToCache);
    })
  );
});

//In case of offline to load offline.html
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//To activate pwa and make it installable
this.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
