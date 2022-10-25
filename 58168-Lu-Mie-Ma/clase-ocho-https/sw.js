self.addEventListener("install", ()=>{
    console.log("SW", "Install");
});

self.addEventListener("activate", (evt)=>{
    console.log("SW", "activate");
});

self.addEventListener("fetch", (evt)=>{
    console.log("SW", "fetch");
    /*console.log("ID");
    console.log(evt.clientId.length);*/
    clients.matchAll().then((page)=>{
        console.log(page);
    });
    /*setInterval(()=>{
        clients.get(evt.clientId).then((page)=>{
            console.log(page);
            if (!page) return;
            page.postMessage({
                msg : "Mensaje desde el Service Worker"
            });
        })
    },5000);*/
}); 