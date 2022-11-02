
self.addEventListener("install", (evt) => {
    console.log("SW", "Installado");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("SW", "Activado");
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {

    console.log("SW", "Fetch");
    console.log("SW", evt);
    console.log("SW", evt.request.url);

    if (evt.request.url.endsWith("fakeurl")) {
        console.log("SW", "Me Interesa");
        let resp = new Response("Respuesta Armada", { status: 200, statusText: "OK" });
        evt.respondWith(resp);
    } else {
        console.log("SW", "No Me Interesa", evt.request.url);
    }

});

setInterval(() => {
    console.log("SW", "Heart Beat v2")
}, 5000);