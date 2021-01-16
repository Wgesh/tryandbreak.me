// cache variables
const cacheName = 'Offline Cache';

const cacheAssets = [
    'index.html',

    './css/main.css',
    './css/bootstrap-custom.css',

    './local/instantpage-5.1.0.js',
    './local/jquery.min.js',
    './local/bootstrap.bundle.min.js',
    './local/bootstrap.min.css',

    './js/main.js',
    './js/lock.js',

    'gpfp.jpg',
    './images/rm1-1.jpg',
    './images/rm1-2.jpg',
    './images/rm1-3.jpg',
    './images/rm2-1.jpg',
    './images/rm2-2.jpg',
    './images/rm2-3.jpg',
    './images/rm3-1.jpg',
    './images/rm3-2.jpg',
    './images/rm3-3.jpg',
    'rpfp.png',
    'wpfp.jpg',

    './sounds/bombsound.mp3',
    './sounds/The Bombardier\'s Song Bing Crosby.mp3',
    './sounds/Прощанье Славянки (минус).mp3'
]

// call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Files Cached');
                cache.addAll(cacheAssets);
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