
const CACHE_STATIC = "SW_CACHE_STATIC";
const CACHE_OFFLINE = "CACHE_OFFLINE";
const PRECACHE = [
    "index.html",
    "manifest.json",
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "images/icon-192x192.png",
    "images/icon-256x256.png",
    "images/icon-384x384.png",
    "images/icon-512x512.png"
];

self.addEventListener("install", (evt) => {
    console.log("SW INSTALL");
    self.skipWaiting();
    /*evt.waitUntil(
        self.caches.open(CACHE_STATIC)
            .then((cache) => {
                return cache.addAll(PRECACHE);
            })
    );*/
    evt.waitUntil((async () => {
        const cache = await self.caches.open(CACHE_STATIC);
        await cache.addAll(PRECACHE);
        const offlineCache = await self.caches.open(CACHE_OFFLINE);
        return offlineCache.add("/images/offline.png");
    })())
});

self.addEventListener("activate", () => {
    console.log("SW ACTIVATE");
    self.clients.claim();
})

self.addEventListener("fetch", (evt) => {
    if (!navigator.onLine) {
        /*evt.respondWith(
            self.caches.open(CACHE_STATIC).then((cache) => {
                return cache.match(evt.request).then((item) => {
                    if (item) {
                        console.log("SW", item);
                        return item;
                    }
                })
            })
        );*/
        if (evt.request.url.endsWith("online.png")) {
            evt.respondWith((async () => {
                const cache = await self.caches.open(CACHE_OFFLINE);
                const resp = await cache.match("images/offline.png");
                return resp;
            })())
        } else {
            evt.respondWith((async () => {
                const cache = await self.caches.open(CACHE_STATIC);
                const page = await cache.match(evt.request);
                if (page) return page;
                return undefined;
            })());
        }
    }
});