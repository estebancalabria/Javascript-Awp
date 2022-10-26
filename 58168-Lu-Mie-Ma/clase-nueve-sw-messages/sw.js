
self.addEventListener("install", () => {
    console.log("SW", "install");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("SW", "install");
});

self.addEventListener("fetch", () => {
    console.log("SW", "install");
});

self.addEventListener("message", (evt) => {
    //console.log("msg");
    console.log("SW", "Recibi el mensaje", evt.data);

    self.clients.matchAll({ includeUncontrolled: true, type: "window" })
        .then((clients) => {
            for (let client of clients){
                client.postMessage(evt.data);
            }
        });
});