
self.addEventListener("install",(evt)=>{
  console.log("SW: Install");
  self.skipWaiting();
});


self.addEventListener("activate",(evt)=>{
    console.log("SW: Activate");
    self.clients.claim();
});

  
self.addEventListener("fetch",(evt)=>{
    console.log("SW: Fetch");
    console.log(evt);
    /*if (evt.clientId) {
        /*self.clients.get(evt.clientId).then((client)=>{
            client.postMessage({msg:"Mensaje del SW"});
        })*/
        /*self.clients.matchAll().then((clients)=>{
            for (let client of clients){
                client.postMessage({msg:"Mensaje del SW"});
            }
        })*/
    //}
});

  
self.addEventListener("message",(evt)=>{
    console.log("SW: Message");
    self.clients.matchAll().then((clients)=>{
        for (let client of clients){
           //if (client.id !== evt.source.id){
                client.postMessage({
                    sender: evt.source.id,
                    texto:evt.data.texto
                });
            //}
        }
    })
});