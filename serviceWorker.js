
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "my-cache";

const offlineFallbackPage = "../index.html";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.add(offlineFallbackPage))
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {

                const cache = await caches.open(CACHE);
                const cachedResp = await cache.match(offlineFallbackPage);
                return cachedResp;
            }
        })());
    }
});
// const CACHE_NAME = "my-cache";
// // Define an array of URLs to cache
// const CACHE_URLS = [
//     "../index.html",
//     "../css_files",
//     "lightbox.min.js",
//     "main.js",
//     "../images"
// ];
//
// // Listen for the installation event
// self.addEventListener("install", event => {
//     // Wait until the promise resolves
//     event.waitUntil(
//         // Open the cache
//         caches.open(CACHE_NAME)
//             .then(cache => {
//                 // Add all URLs to the cache
//                 return cache.addAll(CACHE_URLS);
//             })
//     );
// });
//
// // Listen for the fetch event
// self.addEventListener("fetch", event => {
//     // Respond with a custom response
//     event.respondWith(
//         // Check if there is a cached response for the request
//         caches.match(event.request)
//             .then(cachedResponse => {
//                 // Return the cached response if there is one
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }
//                 // Otherwise, make a network request and return the response
//                 return fetch(event.request);
//             })
//     );
// });