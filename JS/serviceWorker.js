// Define a cache name
const CACHE_NAME = "my-cache";
// Define an array of URLs to cache
const CACHE_URLS = [
    "../index.html",
    "../css_files/master.css",
    "../css_files/master.css",
    "../css_files/normal.css",
    "../css_files/slide.css",
    "/JS/lightbox.min.js",
];

// Listen for the installation event
self.addEventListener("install", event => {
    // Wait until the promise resolves
    event.waitUntil(
        // Open the cache
        caches.open(CACHE_NAME)
            .then(cache => {
                // Add all URLs to the cache
                return cache.addAll(CACHE_URLS);
            })
    );
});

// Listen for the fetch event
self.addEventListener("fetch", event => {
    // Respond with a custom response
    event.respondWith(
        // Check if there is a cached response for the request
        caches.match(event.request)
            .then(cachedResponse => {
                // Return the cached response if there is one
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Otherwise, make a network request and return the response
                return fetch(event.request);
            })
    );
});
