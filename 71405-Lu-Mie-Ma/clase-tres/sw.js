

self.addEventListener("install", function(event) {
    console.log("Service Worker installed");
    self.skipWaiting();
});

self.addEventListener("activate", function(event) {
    console.log("Service Worker activated");
    self.clients.claim();
});

self.addEventListener("fetch", function(event) {    
    console.log("Haciendo un fetch ", event.request.url);
    //throw new Error("Fetch event for " + event.request.url);
    if (!event.request.url.includes("index.html")) {
        if (navigator.onLine) {
            //Podemos devolver una promesa
            event.respondWith(fetch(event.request));
        }else{
            //Podemos devolver una respuesta (un objeto Response)
            let resp = new Response("<h1>Remplazo cualquier respuesta</h1>");
            event.respondWith(resp);
    
        }

    }
});