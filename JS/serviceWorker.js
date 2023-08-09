const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "../images/background_images/bac-3.webp",
    "../images/background_images/back-00.webp",
    "../images/background_images/back-1.webp",
    "../images/background_images/back-001.webp",
    "../images/background_images/back-2.webp",
    "../images/background_images/back-4.webp",
    "../images/image_display/MH45.webp",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})