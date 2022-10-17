const CACHE_NAME = "APW_AWESOME_CAHCHE";

const timeOutPromise = new Promise((accept, reject) => {
    setTimeout(() => {
        accept();
    }, 7000);
});

self.addEventListener("install", (evt) => {
    console.log("SW", "Install Event");
    //El waitUntil es simil al return pero de este eento
    evt.waitUntil(
        //timeOutPromise.then(()=>{console.log("Espero valga la espera")})
        self.caches.open(CACHE_NAME).then((cache) => {
            //Aca guardo cosas en el cache del service worker
            return cache.addAll(["index.html", 
            "./images/Offline.jpg", 
            "./images/Offline3.jpg"])
        })
    );
})

self.addEventListener("activate", () => {
    console.log("SW", "Activate Event");
});

self.addEventListener("fetch", (evt) => {
    //Estrategia del service Worker
    console.log("SW", "Fetch Event", evt.request);

    (!navigator.onLine) &&
    evt.respondWith(
        self.caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
            .then((match) => {
                //El match no va al catch, te devuelve null
                if (match){   
                    return match;
                }else{
                    return cache.match("./images/Offline3.jpg").then((match3)=>{
                        return match3;
                    });
                }

            });
        })
    );
});