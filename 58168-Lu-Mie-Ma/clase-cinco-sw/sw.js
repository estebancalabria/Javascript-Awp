
const responseOnline = () =>(
    new Response(
        JSON.stringify({nombre:"Esteban", mensaje:"Estoy online"}),
        {status:200, statusText:"OK", headers:{"Content-type":"application/json"}})
      
);

const responseOffline = () =>(
    new Promise((accept, reject) => {
        let resp = new Response(
            JSON.stringify({ nombre: "Elon Musk", mensaje: "Estoy offline" }),
            { status: 200, statusText: "OK", headers: { "Content-type": "application/json" } });
        setTimeout(()=>{accept(resp)}, 1000);    
    })
);


self.addEventListener("install", (evt) => {
    console.log("SW: Installing", evt);
})

self.addEventListener("activate", (evt) => {
    console.log("SW: Activado", evt);
})

self.addEventListener("fetch", (evt) => {
    console.log("SW Fetch:", evt);
    console.log("SW Fetch:", evt.request.url);

    //Ejemplo para devolver una respuesta fija
    /*if (evt.request.url.includes("dummyurl")){
      let resp = new Response(
         JSON.stringify({nombre:"Esteban", lenguaje:"Javascript"}),
         {status:200, statusText:"OK", headers:{"Content-type":"application/json"}});
       
      evt.respondWith(resp);
    }/*

    //Ejemplo para devolver una promesa
    /*if (evt.request.url.includes("dummyurl")) {
        let fetchPromise = new Promise((accept, reject) => {
            let resp = new Response(
                JSON.stringify({ nombre: "Elon Musk", lenguaje: "Javascript" }),
                { status: 200, statusText: "OK", headers: { "Content-type": "application/json" } });
            setTimeout(()=>{accept(resp)}, 1000);    
        });
        //Ejemplo de uso de la promesa
        //fetchPromise.then(r=>{alert(r)})
        evt.respondWith(fetchPromise);
    }*/

    evt.request.url.includes("dummyurl") && navigator.onLine && evt.respondWith(responseOnline());
    evt.request.url.includes("dummyurl") && !navigator.onLine && evt.respondWith(responseOffline());

})
