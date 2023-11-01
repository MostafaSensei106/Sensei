// Inside sw.js

// Subscribing to the push service
self.registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY_HERE')
}).then(function(subscription) {
  console.log('User is subscribed:', subscription);
}).catch(function(error) {
  console.error('Failed to subscribe the user: ', error);
});

// Handling the push event
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  // Customize notification here
  const title = 'Push Notification';
  const options = {
    body: 'This is a message from your service worker!',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Utility function for converting base64 string to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
