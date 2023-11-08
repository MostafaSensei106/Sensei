// Import the Workbox library
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
    console.log(`Workbox is loaded`);

    // Cache files
    workbox.precaching.precacheAndRoute([
        "../index.html",
        "../css_files/*.css",
        "*.js",
        "../images/*"
    ]);

    // Use a stale-while-revalidate strategy for all other requests.
    workbox.routing.setDefaultHandler(
        new workbox.strategies.StaleWhileRevalidate()
    );

    // Add a fallback for offline navigation
    workbox.routing.setCatchHandler(({event}) => {
        switch (event.request.destination) {
            case 'document':
                return caches.match('../index.html');
                break;
            default:
                return Response.error();
        }
    });

    // Add background sync
    const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('Sync', {
        maxRetentionTime: 24 * 60
    });

    workbox.routing.registerRoute(
        /\/api\/.*\/*.json/,
        new workbox.strategies.NetworkOnly({
            plugins: [bgSyncPlugin]
        }),
        'POST'
    );

    //push notifications
    self.addEventListener('push', (event) => {
        const title = 'Notification';
        const options = {
            body: event.data.text()
        };
        event.waitUntil(self.registration.showNotification(title, options));
    });
} else {
    console.log(`Workbox didn't load`);
}
