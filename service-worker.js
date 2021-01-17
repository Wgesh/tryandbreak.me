// cache variables
const cacheName = 'Offline Cache';

const cacheAssets = [
    'index.html',
    'menu.html',
    './rm1/rm1-1.html',
    './rm1/rm1-1-end.html',
    './rm1/rm1-1-tv.html',
    './rm1/rm1-2.html',
    './rm1/rm1-3.html',
    './rm2/rm2-1.html',
    './rm2/rm2-2.html',
    './rm2/rm2-3.html',
    'rm3/rm3-1.html',
    'rm3/rm3-2.html',
    'rm3/rm3-3.html',

    './images/pfp/gpfp.jpg',
    './images/pfp/rpfp.jpg',
    './images/pfp/wpfp.jpg',

    './images/rm1/rm1-1.jpg',
    './images/rm1/rm1-1-tv.jpg',
    './images/rm1/rm1-2.jpg',
    './images/rm1/rm1-3.jpg',

    'images/rm2/rm2-1.jpg',
    'images/rm2/rm2-2.jpg',
    'images/rm2/rm2-3.jpg',

    './images/arrow-down.svg',
    './images/cloud-off.svg',
    './images/eye-off.svg',
    './images/responsive-design.svg',
    './images/server-warning.svg',

    './js/lock.js',
    './js/main.js',

    './local/bootstrap.bundle.min.js',
    './local/bootstrap.min.css',
    './local/instantpage-5.1.0.js',
    './local/jquery.min.js',

    './sounds/bombsound.mp3',
    './sounds/creak.mp3',
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
