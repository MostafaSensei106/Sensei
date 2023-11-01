// Define the cache name
const CACHE_NAME = "my-cache";
const CACHE_URLS = [
    "../index.html",
    "../css_files",
    "lightbox.min.js",
    "main.js",
    "../images"
];
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_URLS);
            })
    );
});
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request)
                    .catch(() => {
                        return caches.match("../index.html");
                    });
            })
    );
});
self.addEventListener("activate", event => {
    // Delete any old caches that are not in use
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                );
            })
    );
});