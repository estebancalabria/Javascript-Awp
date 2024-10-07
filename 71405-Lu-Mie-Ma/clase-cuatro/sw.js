
self.addEventListener("install", async function (event) {
    console.log("Service Worker installed");
    //cacheo el index.html

    //Sincrono
    let cache = await caches.open("todo-list-cache");
    return cache.addAll([
        "/index.html",
    ]);

    //Asincrono
    /*event.waitUntil(
        caches.open("cache1").then(function(cache) {
            return cache.addAll([
                "/index.html",
            ]);
        })
    );*/


    //self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    console.log("Service Worker activated");
    self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    //Recupero el index.html del cache si estoy offlinne
    if (!navigator.onLine && event.request.url.includes("index.html")) {
        console.log("Ioffline - Haciendo un fetch ", event.request.url);
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
            })
        );
    }
});
