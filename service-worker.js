// cache variables
const cacheName = 'Offline Cache';

var fs = require('fs');
var files = fs.readdirSync('./images/');
console.log(files);

const cacheAssets = [
    './images/*'
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
        fetch(e.request)
            .then(res => {
                // make copy of response
                const resClone = res.clone();
                caches
                    .open(cacheName)
                    .then(cache => {
                        // add response to cache
                        cache.put(e.request, resClone).catch(r => { console.log('error')});
                        // cache.addAll(cacheAssets);
                    })
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    );
});