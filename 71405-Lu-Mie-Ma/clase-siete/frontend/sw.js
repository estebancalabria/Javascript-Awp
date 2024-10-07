
function log(message) {
    console.log("%c" + message, "color: blue; font-weight: bold; background-color: yellow; font-size: 20px;");
}

const CACHE_NAME = "cache-v2";
const URLS_TO_CACHE = [
    "index.html",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
];

self.addEventListener("install", function(event) {
    log("Service Worker installing.", "color: blue; font-weight: bold; background-color: yellow; fotn-size: 25px;");
    //El skipWaitting se encarga de activar el service worker inmediatamente

    //Guardo en cache los archivos que quiero
    /*event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(URLS_TO_CACHE);
        })
    );*/

    //Con async y await
    event.waitUntil( (async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS_TO_CACHE);
        self.skipWaiting();
    })() );  
});

self.addEventListener("activate", function(event) {
    log("Service Worker activating.");
    self.clients.claim();
});

self.addEventListener("fetch", function(event) {
    log("Fetching: " + event.request.url);
    event.respondWith(fetch(event.request));
});
