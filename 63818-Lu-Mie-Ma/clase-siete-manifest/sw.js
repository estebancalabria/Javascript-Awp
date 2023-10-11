const PRE_CACHE = "PRE_CACHE";

function swLog(mensaje){
    console.log(`%c [SW: ${mensaje}]`,"color:green, font-size:30px");
}

self.addEventListener("install", (evt)=>{
    swLog("Install");
    //funcion flecha auto invocante (async ()=>{})()
    evt.waitUntil((async ()=>{
        const cache = await self.caches.open(PRE_CACHE);
        return cache.addAll(["index.html"]);
    })());
});

self.addEventListener("activate", (evt)=>{
    swLog("Activate")
   evt.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (evt)=>{
    swLog("Fetch " + evt.request.url);  
});
