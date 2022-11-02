
self.addEventListener("install", ()=>{
   self.skipWaiting();
   console.log("%cService Worker Instalado", 'color: green; background: yellow; font-size: 30px')
});

self.addEventListener("activate",(event)=>{
    event.waitUntil(self.clients.claim());
    console.log("%cService Worker Activado", 'color: green; background: yellow; font-size: 30px')
})

self.addEventListener("fetch",()=>{

})

self.addEventListener("push",(event)=>{
   console.log("%cLLego una notificcion push!",'color: green; background: yellow; font-size: 30px')
   console.log(event);
   console.log("%c" + event.data.text(), 'color: red; background: yellow; font-size: 25px');
   self.registration.showNotification(event.data.text());
})