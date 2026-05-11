const CACHE_NAME = 'tuskers-v1.0.3';
const ASSETS = [
    'index.html',
    'css/style.css',
    'js/supabase.js',
    'js/auth.js',
    'js/app.js',
    'assets/logo.webp',
    'assets/logo-full.webp',
    'assets/rehab.jpeg',
    'assets/diddeniya.webp',
    'assets/spiderplus.webp',
    'assets/thambapanni.webp',
    'assets/fazaa.webp',
    'assets/gulf.jpeg',
    'assets/mcs.webp'
];

// Install Event
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('index.html');
                    }
                });
            })
    );
});

// Listen for skipWaiting message
self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
