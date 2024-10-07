
function promiseQueDevuelveResponse(){
    return new Promise((resolve, reject) => {
        resolve(new Response("Hola Mundo 2 desde el Service Worker con Promise"));
    });
}

self.addEventListener("install", function(event) {
    console.log("Service Worker instalado");
    self.skipWaiting();
    }
);

self.addEventListener("activate", function(event) {
    console.log("Service Worker activado");
    //El claim es para que el SW se convierta en el SW activo
    self.clients.claim();
    }
);

self.addEventListener("fetch", function(event) {
    console.log("Petición interceptada");
    console.log("SW GET" + event.request.url);
    
    if (event.request.url.includes("sandbox.html")) {
        //Devuelvo un objeto Response con un mensaje
        //El objeto response es lo mismo que devuelve fetch
        //El event.respondWith se usa en vez de return
        event.respondWith(
            promiseQueDevuelveResponse()
        )
    }
    }
);