const CACHE ="CACHE";

self.addEventListener("install", (evt)=>{
    console.log("SW", "Install");

    evt.waitUntil(async function install(){
        let cache = await self.caches.open(CACHE);
        return cache.addAll(["index.html"]);
    }());
})

self.addEventListener("activate", ()=>{
    console.log("SW", "activate");
})

self.addEventListener("fetch", (evt)=>{
    console.log("SW", "Fetch");
    console.log("Includes", evt.request.url.includes("/api/productos"));

    //Caso 1 : Si estoy offline devuelvo el index del cache
    if ((!navigator.onLine) && (evt.request.url.includes("index.html"))){
        evt.respondWith((async ()=>{
            console.log("SW","Fetch", evt.request.url);
            console.log("SW","Me piden el index");
            var cache = await self.caches.open(CACHE);
            var match = await cache.match(evt.request);
            if (match) return match;
        })());
    }

    //Caso 2: Si me piden un fech a /api/productos
    //        Si lo tengo en el cache lo devuelvo del mismo
    //        Si no lo tengo en cache voy a internet, lo devuelvo y  actualizo el cache
    if (evt.request.url.includes("/api/productos")){
        console.log("SW","Fetch api productos")
        evt.respondWith((async()=>{
            var cache = await self.caches.open(CACHE);
            var match = await cache.match(evt.request);
            if (!match){
                let resp = await fetch(evt.request);
                cache.put(evt.request, resp);
                return resp
            }else{
                return match;
            }    
        })());
    }
})