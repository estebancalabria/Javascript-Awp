
self.addEventListener("install", (evt)=>{
    console.log("%c Service Worker Instalado", "color:white; background:black; font-size:30px");
    self.skipWaiting();
});

self.addEventListener("activate", (evt)=>{
    console.log("%c Service Worker Activado", "color:white; background:black; font-size:30px");
    self.clients.claim();
});

self.addEventListener("fetch", (evt)=>{
    console.log("%c Service Worker Fetch", "color:white; background:black; font-size:30px");
    console.log(`%c URL : ${evt.request.url}`, "color:white; background:red; font-size:25px");

    if (evt.request.url.endsWith("hellosw")){
        //Es Igual que el return
        //evt.respondWith(new Response(JSON.stringify({mensaje:"Hola desde el SWWorker"})));

        evt.respondWith(
            new Promise((accept,reject)=>{
                accept(new Response(JSON.stringify({mensaje:"Hola desde el SWWorker"})))
            })
        );
    }
});