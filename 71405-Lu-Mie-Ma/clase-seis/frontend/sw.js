

const CACHE_NAME = 'cache-v1';
//Cachea los archivos el index y bootstrap
const UTL_TO_CACHE = [
    'index.html',
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
];

//El metodo install sirve para cachear los archivos 
self.addEventListener('install', function(event) {
    //Skip Waiting
    //self.skipWaiting();
    
    //En vez de return hago event.waitUntil() que recibe una promesa de lo que quiero devolver
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(UTL_TO_CACHE);
            })
    );
    self.skipWaiting();
    
});

self.addEventListener('activate', function(event) {
    //Activo inmediatamente el SW
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    //Primero el fectch y si no puede luego el cache
    event.respondWith(
        fetch(event.request)
            .then(function(response) {

                //si pude hacer el fetch que actualice el cache
                caches.open(CACHE_NAME)
                    .then(function(cache) {
                        //Guardo la respuesta en el cache
                        cache.put(event.request, response);
                    });

                //Como la respuesta se usa dos veces se clona
                //para que se pueda usar dos veces
                //La respuesta es un stream y solo se puede usar una vez
                return response.clone();
            })
            .catch(function() {
                return caches.match(event.request);
            })
    );
});