// Constants
const CACHE_NAME = "my-cache";
const CACHE_URLS = ["../index.html", "../css_files", "lightbox.min.js", "main.js", "../images"];

// Installation event
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_URLS))
    );
});

// Fetch event
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => cachedResponse || fetch(event.request))
    );
});

// Background Sync event
self.addEventListener('sync', event => {
    if (event.tag == 'myFirstSync') {
        event.waitUntil(doSomeStuff());
    }
});

// Periodic Sync event
self.addEventListener('periodicsync', event => {
    if (event.tag == 'get-latest-news') {
        event.waitUntil(fetchAndCacheLatestNews());
    }
});

// Push Notifications event
self.addEventListener('push', event => {
    const title = 'Get Started With Workbox';
    const options = { body: event.data.text() };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Background Sync function
async function doSomeStuff() {
    // Your code here. For example, you might want to retry failed requests.
}

// Periodic Sync function
async function fetchAndCacheLatestNews() {
    const response = await fetch('https://api.example.com/latest-news');
    const news = await response.json();
    const cache = await caches.open(CACHE_NAME);
    await cache.put('mostafasensei106.github.io/Sensei/JS/manifest.json\n' +
        '\n', new Response(JSON.stringify(news)));
}
