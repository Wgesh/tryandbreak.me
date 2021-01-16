// cache variables
const cacheName = 'Offline Cache';

const cacheAssets = [
    'index.html',

    'local/instantpage-5.1.0.js',
    'local/jquery.min.js',

    'js/main.js',
    'js/lock.js',

]

// call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                // cache the files
                cache.addAll(cacheAssets).catch(r => { console.log('error')});
            })
            .then(() => self.skipWaiting())
    );
});

// call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
});

// call fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});