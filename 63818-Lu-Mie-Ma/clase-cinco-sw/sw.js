
const SW_CACHE = "SW_CACHE";

self.addEventListener("install",(evt)=>{
    //self.skipWaiting();
    
    //promesa_tarea.then(()=>{}); //Se puede hacer esto
    let promesa_instalacion = self.caches.open(SW_CACHE).then((cache)=>{
        return cache.add("index.html");
    }).then(()=> { return self.skipWaiting()});
    
    evt.waitUntil( promesa_instalacion );
});

self.addEventListener("active",(event)=>{
    //Notificar para dar de baja otros service workers
    //y posicionarnos como el utlimo
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch",(evt)=>{
    console.log("Se hace un fetch", evt.request.url);
    if (!navigator.onLine){
        let promesa_response = self.caches.open(SW_CACHE).then((cache) =>{
            return cache.match(evt.request).then((response)=>{
                console.log("El response es " + response);
                return response;
            })
        });

        evt.respondWith(promesa_response);     
    }
});