
self.addEventListener("install", (evt)=>{
  
});

self.addEventListener("activate", (evt)=>{
    console.log("Active");
    console.log(evt);
    evt.waitUntil(self.clients.claim());
});

self.addEventListener("fetch",(evt)=>{

});

self.addEventListener("push", (msg)=>{
    //console.log(msg.data.text());
    self.registration.showNotification("Notificacion Recibida",{
        body : msg.data.text()
    });

    for (let c of self.clients){
        c.postMessage(msg.data.text())
    };
})