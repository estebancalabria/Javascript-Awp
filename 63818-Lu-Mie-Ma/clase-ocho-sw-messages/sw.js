const PRE_CACHE = "PRE_CACHE_8";

function swLog(mensaje){
    console.log(`%c [SW: ${mensaje}]`,"color:green, font-size:30px");
}

self.addEventListener("install", (evt)=>{
    swLog("Install");
    //funcion flecha auto invocante (async ()=>{})()
    evt.waitUntil((async ()=>{
        const cache = await self.caches.open(PRE_CACHE);
        return cache.addAll([
            "index.html",
            "node_modules/bootstrap/dist/css/bootstrap.css"]);
    })());
});

self.addEventListener("activate", (evt)=>{
   swLog("Activate")
   evt.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (evt)=>{
    swLog("Fetch " + evt.request.url); 

    evt.waitUntil((async ()=>{
        swLog("El client id " + evt.clientId);
        if (!evt.clientId) return; 
        const client = await self.clients.get(evt.clientId);

        client.postMessage({
            type : "FETCH",
            url : evt.request.url
        })
    })());

    //Si no esta online lo traigo del cache
    (!navigator.onLine) && evt.respondWith((async ()=>{
        const cache = await self.caches.open(PRE_CACHE);
        const match = await cache.match(evt.request);
        //Que pasa si no esta en el cache?
        return match;
    })());

    //Que traiga la pagina de internet y si esta en el cache que lo remplace
    (navigator.onLine) && evt.respondWith((async ()=>{
        const cache = await self.caches.open(PRE_CACHE);
        const match = await cache.match(evt.request);
        if (match){
            swLog("Actualizando Cache" + evt.request.url);
            let resp = await fetch(evt.request);
            let clonedResp = resp.clone();
            await cache.put(evt.request, clonedResp);
            return resp;
        }
        return await fetch(evt.request);
    })());
});

self.addEventListener("message",(msg)=>{
    swLog(msg.data.payload);
})
