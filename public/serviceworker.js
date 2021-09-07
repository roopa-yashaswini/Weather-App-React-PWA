const CACHE_NAME = 'version-1';
const URLSToCache = ['index.html', 'offline.html'];

const self = this;

self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened Cache');
                return cache.addAll(URLSToCache);
            })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

self.addEventListener('activate', (e) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                Promise.all(
                    cacheNames.map(cacheName => {
                        if(!cacheWhiteList.includes(cacheName)){
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
    )
});