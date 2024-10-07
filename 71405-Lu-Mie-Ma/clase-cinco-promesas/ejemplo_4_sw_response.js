
self.addEventListener("install", function (event) {
    console.log("Service Worker instalado");

    //El skipWaiting es para que el SW se active inmediatamente
    self.skipWaiting();
}
);

self.addEventListener("activate", function (event) {
    console.log("Service Worker activado");

    //El claim es para que el SW se convierta en el SW activo
    self.clients.claim();
}
);

self.addEventListener("fetch", function (event) {
    console.log("Petición interceptada");
    console.log("SW GET " + event.request.url);
    console.log(event.request.url.includes("sandbox.html"));

    if (event.request.url.includes("sandbox.html")) {
        console.log("ENTRO EN EL IF SW GET " + event.request.url);
        //Devuelvo un objeto Response con un mensaje
        //El objeto response es lo mismo que devuelve fetch
        //El event.respondWith se usa en vez de return
        event.respondWith(
            new Response("Hola Mundo desde el Service Worker con Response")
        )
    }
}
);
