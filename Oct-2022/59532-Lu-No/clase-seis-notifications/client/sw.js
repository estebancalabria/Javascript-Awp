
const CACHE = "PAGE_CACHE";
const STATIC_RESOURCES = [
    "index.html",
    "manifest.json",
    "./img/icon-512x512.png",
    "./img/icon-384x384.png",
    "./img/icon-256x256.png",
    "./img/icon-192x192.png"
];

self.addEventListener("install", (evt) => {
    console.log("SW Install");
    evt.waitUntil(
        self.caches.open(CACHE)
            .then((cache) => (cache.addAll(STATIC_RESOURCES)))
    );
    self.skipWaiting();
})

self.addEventListener("activate", (evt)=>{
    console.log("SW Activate");
    self.clients.claim();
});

self.addEventListener("fetch",(evt)=>{
  //TODO: Que vaya a buscar los recursos estaticos al cache
  if (!navigator.onLine){
    evt.respondWith(
        self.caches.open(CACHE)
            .then((cache) => (cache.match(evt.request))
            .then((match)=>(match)))
    )
  }
});

self.addEventListener("push",(evt)=>{
   /*console.log(`%cNotificacion Push : ${evt.data.text()}`, 
    `background-color:black;
    color:yellow`);*/
    self.registration.showNotification(evt.data.text()+ "(SW)",{
        vibrate : true,
        body : "No te pierdas esta notificacion",
        image : "./img/noti.png"
    });
});
