
const CACHE = "CACHE_CLASE_SEIS";

//Los metodos de los service worker pueden recibir dos parametros
// 1 Promesa

function swlog(message){
    console.log(`%c SW ${message}`, "color:green; font-size:25px");
}

self.addEventListener("install", (evt)=>{
    swlog("SW Install");
    evt.waitUntil((async ()=>{
        let cache = await self.caches.open(CACHE);
        swlog("Agregando index.html al cache");
        return cache.addAll(["index.html"]);
    })());
});

self.addEventListener("activate", (evt)=>{
    self.clients.claim();
});

//Aca tenemos las siguientes opciones
//1 - No hacer nada
//2- Devolver un Response
//3- Devolver una promesa que devuelve un response
self.addEventListener("fetch",(evt)=>{
    //Respondemos con lo que tenemos en el cache para el index
    (!navigator.onLine)
    && evt.request.url.includes("index.html")
    && evt.respondWith(( async ()=>{
        swlog("OFFLINE : Recuperando Index.html del cache");
        const cache = await self.caches.open(CACHE);
        const match = cache.match(evt.request);
        
        //Opcion 1 : Devuelvo una promesa<Response>
        //swlog(match);  //match es una promise que devuelve un response
        //return match;
        
        //Opcion 2 : Devuelvo un response
        const response = await match;
        swlog(response)
        return response;
    })());

    //Actualizo el index y estoy offline
    //Nunca veo el cambio 
    
    //Patron SW : Fetch Then Update Cache
    /*(navigator.onLine)
    && evt.request.url.includes("index.html")
    && evt.respondWith(( async ()=>{
        let response = await fetch(evt.request.url);
        let cache = await self.caches.open(CACHE);
        await cache.add(response);
        return response;
    })());*/

    //Alternativa Patron SW : Cache then Update ()
    //Esto se hace para performance
    //Devuelvo en forma inmediata lo que tengo en el cache
    //Luego tranquilo y en segundo plano actualizo el cache
    (navigator.onLine)
    && evt.request.url.includes("index.html")
    && evt.respondWith(( async ()=>{
        let cache = await self.caches.open(CACHE);
        let match = await cache.match(evt.request);
        
        //Si le pongo await lo tengo que esperar
        //justamente la gracia aca es no esperarlo
        fetch(evt.request.url).then((resp)=>{
            cache.put(evt.request,resp);
        })

        return match;
    })());
        
    //data-fetch
    //1->Devuelvo response
    navigator.onLine 
    && evt.request.url.includes("data-fetch")
    && evt.respondWith(new Response("<h1>Online data-fetch </h1>"));

    //2-Devuelvo un promise<Response>
    (!navigator.onLine) 
    && evt.request.url.includes("data-fetch")
    && evt.respondWith(new Promise((accept,_)=>{
        accept(new Response("<h1>Offline data-fetch </h1>"));      
    }));


})